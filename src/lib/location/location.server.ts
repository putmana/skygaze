import { API_KEY } from "$env/static/private"

export interface LocationResult {
	id: string
	name: string
	coords: Coordinates
}

// <============ DIRECT GEOCODING ============>
const URL_DIRECT = "https://geocoding-api.open-meteo.com/v1/search?language=en&format=json"
const ARG_QUERY = "&name="
const ARG_COUNT = "&count="

const LIMIT = 10

// Uses the Open-Meteo API to find a location based on a query string
export async function lookupLocation(query: string, count = LIMIT): Promise<LocationResult[]> {
	const API_URL = URL_DIRECT + ARG_QUERY + query + ARG_COUNT + count

	const res = await fetch(API_URL)
	const data = await res.json()
	const results: LocationResult[] = []

	data.results.forEach((result: any) => {
		results.push({
			id: result.id,
			name: result.name + ", " + result.admin1,
			coords: {
				lat: result.latitude,
				lon: result.longitude
			}
		})
	})

	return results
}

// <============ ID-BASED GEOCODING ============>
const URL_ID = "https://geocoding-api.open-meteo.com/v1/get?id="

// Uses the Open-Meteo API to find the location based on the location's ID
export async function getLocationByID(id: string): Promise<LocationResult> {
	const API_URL = URL_ID + id

	const res = await fetch(API_URL)
	const data = await res.json()
	const result: LocationResult = {
		id: data.id,
		name: data.name,
		coords: {
			lat: data.latitude,
			lon: data.longitude
		}
	}

	return result
}
