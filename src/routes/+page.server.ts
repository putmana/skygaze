import { API_KEY } from '$env/static/private';
import testData from '$lib/weather/data.json' assert {type: 'json'};

// Setting DEBUG to true will make Stargaze pull data 
// from a local JSON file rather than the OpenWeatherMap API.
// This will (hopefully) prevent me from accidentally 
// setting my wallet on fire.
const DEBUG = false;

// Billings, MT
const DEFAULT_LOCATION = "45.78,-108.50";

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
    cookies.set('location', cookies.get('location') ?? DEFAULT_LOCATION, { path: "/" })
    const LOCATION = cookies.get('location') ?? DEFAULT_LOCATION;

    // Parse the location cookie 
    const LAT = LOCATION.split(",")[0]
    const LON = LOCATION.split(",")[1]
 
    // Build the query
    const API_URL = BASE_API_URL + BASE_LAT + LAT + BASE_LON + LON

    // Run the query and return the results
    const data = await fetch(API_URL)
    return (data.json())

}