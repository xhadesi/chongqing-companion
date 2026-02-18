/**
 * Coordinate transformation utilities for China (WGS-84 <-> GCJ-02)
 * Needed because Chinese map providers (AutoNavi/Gaode, Tencent) use GCJ-02 encryption.
 * Nominatim/OpenStreetMap uses WGS-84.
 */

const PI = 3.1415926535897932384626;
const a = 6378245.0;
const ee = 0.00669342162296594323;

function transformLat(x: number, y: number): number {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
    return ret;
}

function transformLon(x: number, y: number): number {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0;
    return ret;
}

/**
 * Validates if coordinates are within China.
 * No offset logic is applied outside China.
 */
function outOfChina(lat: number, lon: number): boolean {
    if (lon < 72.004 || lon > 137.8347) return true;
    if (lat < 0.8293 || lat > 55.8271) return true;
    return false;
}

/**
 * Converts WGS-84 (GPS/Nominatim) to GCJ-02 (AutoNavi/Gaode/Google China)
 */
export function wgs84ToGcj02(lat: number, lon: number): [number, number] {
    if (outOfChina(lat, lon)) return [lat, lon];

    let dLat = transformLat(lon - 105.0, lat - 35.0);
    let dLon = transformLon(lon - 105.0, lat - 35.0);
    const radLat = lat / 180.0 * PI;
    const magic = Math.sin(radLat);
    const sqrtMagic = Math.sqrt(1 - ee * magic * magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);
    const mgLat = lat + dLat;
    const mgLon = lon + dLon;
    return [mgLat, mgLon];
}

/**
 * Converts GCJ-02 to WGS-84
 */
export function gcj02ToWgs84(lat: number, lon: number): [number, number] {
    if (outOfChina(lat, lon)) return [lat, lon];

    let dLat = transformLat(lon - 105.0, lat - 35.0);
    let dLon = transformLon(lon - 105.0, lat - 35.0);
    const radLat = lat / 180.0 * PI;
    const magic = Math.sin(radLat);
    const sqrtMagic = Math.sqrt(1 - ee * magic * magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);
    const mgLat = lat + dLat;
    const mgLon = lon + dLon;
    return [lat * 2 - mgLat, lon * 2 - mgLon];
}
