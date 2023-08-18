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
            name: formatName(result.name, result.admin1, result.country),
            fullName: formatName(result.name, result.admin1, result.country, true),
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
        name: formatName(data.name, data.admin1, data.country),
        fullName: formatName(data.name, data.admin1, data.country, true),
        coords: {
            lat: data.latitude,
            lon: data.longitude
        }
    }

    return result;
}

export function formatName(name: string, region: string, country: string, full = false): string {
    // "name" is the most precise name of the region, usually a city or town.
    // "region" means administrative region (state, province, etc...)
    const DELIMITOR = ", "

    // Display the FULL name (Billings, Montana, United States)
    if (full) {
        name = name + DELIMITOR

        region = (region) ? region + DELIMITOR : ""
        country = country ?? "Earth"

        return name + region + country;
    }

    // Display a brief version of the name (Billings, MT)
    name = name + DELIMITOR
    region = (region) ? (REGION_CODES[region] ?? region) : country ?? "Earth"

    return name + region;


}

export const REGION_CODES: Record<string, string> = {
    // United States
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "District of Columbia": "DC",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY",
    
    // Canada
    "Newfoundland and Labrador": "NL",
    "Prince Edward Island": "PE",
    "Nova Scotia": "NS",
    "New Brunswick": "NB",
    "Quebec": "QC",
    "Ontario": "ON",
    "Manitoba": "MB",
    "Saskatchewan": "SK",
    "Alberta": "AB",
    "British Columbia": "BC",
    "Yukon": "YT",
    "Northwest Territories": "NT",
    "Nunavut": "NU",
}
