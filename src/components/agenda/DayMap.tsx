"use client";

import { useEffect, useRef } from "react";
import { Activity } from "@/lib/types";
import { LOCATIONS } from "@/data/locations";
import { Volume2, Copy, MapPin } from "lucide-react";

interface DayMapProps {
    activities: Activity[];
}

export function DayMap({ activities }: DayMapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);

    useEffect(() => {
        let isMounted = true;

        const initMap = async () => {
            if (!mapContainerRef.current) return;
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }

            // Dynamically import Leaflet
            const L = (await import("leaflet")).default;
            // @ts-expect-error - CSS file import without TS declaration
            await import("leaflet/dist/leaflet.css");

            if (!isMounted || !mapContainerRef.current) return;

            // Chongqing center fallback (Jiefangbei)
            const defaultCenter: [number, number] = [29.5576, 106.5772];

            // Match activities to locations
            const mappedPoints: { title: string; chineseTitle?: string; coords: [number, number]; time?: string }[] = [];

            activities.forEach((act) => {
                if (act.coordinates && act.coordinates.length === 2) {
                    mappedPoints.push({
                        title: act.title,
                        chineseTitle: act.chineseTitle,
                        coords: [act.coordinates[0], act.coordinates[1]],
                        time: act.time
                    });
                    return;
                }

                // Try finding by name or id in LOCATIONS
                const found = LOCATIONS.find(loc =>
                    act.title.toLowerCase().includes(loc.name.toLowerCase()) ||
                    (act.chineseTitle && loc.chineseName.includes(act.chineseTitle)) ||
                    (act.location && loc.name.toLowerCase().includes(act.location.toLowerCase()))
                );

                if (found) {
                    mappedPoints.push({
                        title: act.title,
                        chineseTitle: found.chineseName,
                        coords: found.coordinates,
                        time: act.time
                    });
                }
            });

            // If no points matched, add major Chongqing landmarks as guides
            const pointsToDisplay = mappedPoints.length > 0 ? mappedPoints : LOCATIONS.slice(0, 5).map(l => ({
                title: l.name,
                chineseTitle: l.chineseName,
                coords: l.coordinates,
                time: ""
            }));

            const initialCenter = pointsToDisplay.length > 0 ? pointsToDisplay[0].coords : defaultCenter;

            const map = L.map(mapContainerRef.current, {
                center: initialCenter,
                zoom: 14,
                zoomControl: false
            });

            L.control.zoom({ position: "bottomright" }).addTo(map);

            // High performance CartoDB Voyager or OSM tiles
            L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
                attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
                maxZoom: 19
            }).addTo(map);

            // Custom lacquer red marker icon
            const customIcon = L.divIcon({
                className: "custom-leaflet-marker",
                html: `
                    <div style="
                        width: 28px;
                        height: 28px;
                        background: #C22424;
                        color: white;
                        border-radius: 50%;
                        border: 2px solid white;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 11px;
                        font-weight: bold;
                    ">
                        ●
                    </div>
                `,
                iconSize: [28, 28],
                iconAnchor: [14, 14],
                popupAnchor: [0, -14]
            });

            const bounds = L.latLngBounds([]);

            pointsToDisplay.forEach((pt, idx) => {
                const marker = L.marker(pt.coords, { icon: customIcon }).addTo(map);
                bounds.extend(pt.coords);

                const popupHtml = `
                    <div style="font-family: inherit; min-width: 160px; padding: 2px;">
                        ${pt.time ? `<div style="font-size: 10px; font-weight: bold; color: #C22424; text-transform: uppercase;">${pt.time}</div>` : ""}
                        <div style="font-size: 13px; font-weight: bold; color: #1D1A16; margin-top: 2px;">${pt.title}</div>
                        ${pt.chineseTitle ? `<div style="font-size: 14px; font-weight: bold; color: #7E1414; margin-top: 2px;">${pt.chineseTitle}</div>` : ""}
                    </div>
                `;
                marker.bindPopup(popupHtml);
            });

            if (pointsToDisplay.length > 1) {
                map.fitBounds(bounds, { padding: [40, 40] });
            }

            mapInstanceRef.current = map;
        };

        initMap();

        return () => {
            isMounted = false;
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [activities]);

    return (
        <div className="w-full h-[480px] rounded-2xl overflow-hidden border border-border relative bg-muted/30">
            <div ref={mapContainerRef} className="w-full h-full" />
            <div className="absolute top-3 left-3 z-[400] bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border text-[11px] font-semibold text-foreground flex items-center gap-1.5 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>Points d'intérêt du jour</span>
            </div>
        </div>
    );
}
