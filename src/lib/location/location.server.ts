import { API_KEY } from "$env/static/private";
import testData from '$lib/location/data.json' assert {type: 'json'};


const DEBUG = false;

const LIMIT = 5;

const BASE_API_LOC_URL = "http://api.openweathermap.org/geo/1.0/direct?limit=" + LIMIT + "&appid=" + API_KEY + "&q="
const BASE_API_ZIP_URL = "http://api.openweathermap.org/geo/1.0/zip?appid=" + API_KEY + "&zip="

export async function getLocation(query: string) {

    if (DEBUG) return testData;

    const API_URL = BASE_API_LOC_URL + query
    const data = await fetch(API_URL).then((response) => {
        return response.json()
    })

    return data
}

export async function getZip(query: string) {
    const API_URL = BASE_API_ZIP_URL + query
    const data = await fetch(API_URL).then((response) => {
        return response.json()
    })

    return data
}