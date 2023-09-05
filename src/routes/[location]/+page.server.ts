import { getLocationByID } from "$lib/location/location.js"
import { getWeather } from "$lib/weather/weather.server.js"

export async function load({ params }) {
	// Get the location ID out of the URL
	const LOCATION_ID = params.location

	// Look up the location and get all of the relvant information
	const LOCATION = await getLocationByID(LOCATION_ID)

	// Fetch the weather at the location
	const WEATHER = await getWeather(LOCATION.coords.lat, LOCATION.coords.lon)

	return {
		name: LOCATION.name,
		fullName: LOCATION.fullName,
		weather: WEATHER
	}
}
