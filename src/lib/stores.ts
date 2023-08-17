import { writable, type Writable } from 'svelte/store';
import { SkyColor } from './weather/weather';

export const tempUnit: Writable<"F" | "C" | "K"> = writable("F");
export const color: Writable<SkyColor> = writable(SkyColor.DAY_CLEAR)