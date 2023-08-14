const DELIMITOR = "_&_";
const LOC_LEN = 3

export const DEFAULT_LOCATION = {
    lat: 45.78749,
    lon: -108.49607,
    name: "Billings, Montana, US",
}


// Will turn coordinates and location name into a single string
// I.E., lat=40.5 lon=110.0 name="foobar, earth" -> "40.5&110.0&foobar, earth"
export function stringifyLocation(loc: {lat: number, lon: number, name: string}): string {
    return loc.lat + DELIMITOR + loc.lon + DELIMITOR + loc.name;
}

// Will unpack a location string
export function parseLocationString(loc: string) {
    const broken = loc.split(DELIMITOR);

    // If parsing fails for some reason, return the default info
    if (broken.length !== LOC_LEN) return DEFAULT_LOCATION

    return {
        lat: broken[0],
        lon: broken[1],
        name: broken[2]
    }
}

export function formatName(city: string, country: string, state?: string) {
    if (state !== undefined) return city + ", " + state + ", " + country
    return city + ", " + country
}