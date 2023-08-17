// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	type Coordinates = {
		lat: number,
		lon: number
	}

	type Locale = {
		id: string,
		name: string,
		coords: Coordinates
	}
	
}

export {};
