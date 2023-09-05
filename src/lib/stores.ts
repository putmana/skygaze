import { writable, type Writable } from "svelte/store"
import { SkyColor } from "./weather/weather"
import { browser } from "$app/environment"

const FAHRENHEIT = true

// Extract the unit from the user's local storage. If not, set it to the default unit.
const USE_FAHRENHEIT = browser
	? window.localStorage.getItem("useFahrenheit") === "true" ?? FAHRENHEIT
	: FAHRENHEIT

export const useFahrenheit: Writable<boolean> = writable(USE_FAHRENHEIT)
export const color: Writable<SkyColor> = writable(SkyColor.DAY_CLEAR)

useFahrenheit.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem("useFahrenheit", value.toString())
	}
})
