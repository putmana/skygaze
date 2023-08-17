import { error } from "@sveltejs/kit";

// <============ DIRECT GEOCODING ============>
const URL_DIRECT = "https://geocoding-api.open-meteo.com/v1/search?language=en&format=json"
const ARG_QUERY = "&name="
const ARG_COUNT = "&count="

const LIMIT = 10;

// Uses the Open-Meteo API to find a location based on a query string 
export async function lookupLocation(query: string, count = LIMIT): Promise<Locale[]> {
    const API_URL = URL_DIRECT + ARG_QUERY + query + ARG_COUNT + count
    if (query.length < 2) throw new Error("Name be at least two characters long")

    const res = await fetch(API_URL)
    const data = await res.json()
    const results: Locale[] = []

    data.results.forEach((result: any) => {
        results.push({
            id: result.id,
            name: result.name + ", " + result.admin1,
            coords: {
                lat: result.latitude,
                lon: result.longitude
            }
        })
    });

    return results;
}

// <============ ID-BASED GEOCODING ============>
const URL_ID = "https://geocoding-api.open-meteo.com/v1/get?id="

// Uses the Open-Meteo API to find the location based on the location's ID
export async function getLocationByID(id: string) {
    const API_URL = URL_ID + id

    const res = await fetch(API_URL)
    const data = await res.json()
    if (data.error) throw error(404, {
        message: data.reason
    });

    const result: Locale = {
        id: data.id,
        name: data.name,
        coords: {
            lat: data.latitude,
            lon: data.longitude
        }
    }

    return result;
}