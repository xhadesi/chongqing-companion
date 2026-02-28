import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (!lat || !lng) {
        return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
    }

    try {
        // Added models=best_match for highest precision local forecasting
        const fetchUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&models=best_match`;

        const response = await fetch(fetchUrl, {
            // Cache for 15 minutes (900 seconds) to ensure highly precise, real-time data
            next: { revalidate: 900 }
        });

        if (!response.ok) {
            throw new Error(`Open-Meteo returned ${response.status}`);
        }

        const data = await response.json();

        // Add cache-control headers to tell CDN/Browser to cache it as well
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
            },
        });
    } catch (error) {
        console.error('Weather API Proxy Error:', error);
        return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
    }
}
