import { writable, type Writable } from 'svelte/store';

const DEFAULT_GEOCODE = {
    name: "Billings, MT",
    lat: 45.78,
    lon: -108.50
}

export const tempUnit: Writable<"F" | "C" | "K"> = writable("F");
export const location: Writable<Geocode> = writable(DEFAULT_GEOCODE)