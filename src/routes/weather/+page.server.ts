import { API_KEY } from '$env/static/private';
import { DEFAULT_LOCATION, parseLocationString, stringifyLocation } from '$lib/location/location.js';
import { getLocation } from '$lib/location/location.server.js';
import testData from '$lib/weather/data.json' assert {type: 'json'};
import type { Actions } from '@sveltejs/kit';

// Setting DEBUG to true will make Stargaze pull data 
// from a local JSON file rather than the OpenWeatherMap API.
// This will (hopefully) prevent me from accidentally 
// setting my wallet on fire.
const DEBUG = false;

// Arguments for API URL
const BASE_LAT = "&lat=";
const BASE_LON = "&lon=";
const EXCLUDE = "&exclude=minutely,alerts";

// The base API URL
const BASE_API_URL = "https://api.openweathermap.org/data/3.0/onecall?appid=" + API_KEY + EXCLUDE;


export async function load({ cookies }) {
    // Return local data if DEBUG is enabled
    if (DEBUG) return testData;

    // Get the user's location cookie, or set it to the default if there is no location cookie
    const LOCATION_STRING = cookies.get('location') ?? stringifyLocation(DEFAULT_LOCATION);
    cookies.set('location', LOCATION_STRING, { path: "/"})

    // Parse the location cookie 
    const LOCATION = parseLocationString(LOCATION_STRING);

    // Build the query
    const API_URL = BASE_API_URL + BASE_LAT + LOCATION.lat + BASE_LON + LOCATION.lon

    // Run the query and return the results
    const data = await fetch(API_URL)
    return {
        name: LOCATION.name,
        weather: data.json()
    }
}

export const actions = {
    queryLocation: async ({request}) => {
        const formInfo = await request.formData();
        const data = await getLocation(formInfo.get('query')?.toString() ?? "billings")

        console.log(data)
    },
} satisfies Actions;