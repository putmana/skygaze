import { API_KEY } from "$env/static/private";
import testData from '$lib/weather/data.json' assert {type: 'json'};

const DEBUG = false;

const ARG_LAT = "&lat="
const ARG_LON = "&lon="
const ARG_EXCLUDE = "&exclude="
const BASE_API_URL = "http://api.openweathermap.org/data/3.0/onecall?appid=" + API_KEY

export async function getWeather(lat: number, lon: number) {
    let data;

    if (DEBUG) {
        data = testData;
    } else {
        const API_URL = BASE_API_URL + ARG_LAT + lat + ARG_LON + lon + ARG_EXCLUDE + "minutely,alerts"

        data = await fetch(API_URL)
        data = await data.json()
    }
    
    return data;
}