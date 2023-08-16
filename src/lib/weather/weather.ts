export const ICON_PATH = "icons/weather_"
export const ICON_PATH_LOW = "icons/low_weather_"

// Weather icons and their path values
export enum WeatherIcon {
    SUN_CLEAR = "sun_clear.png",
    SUN_PARTIAL = "sun_partial.png",
    NIGHT_CLEAR = "night_clear.png",
    NIGHT_PARTIAL = "night_partial.png",
    CLOUDS = "clouds.png",
    WIND = "wind.png",
    RAIN_LIGHT = "rain_light.png",
    RAIN_MODERATE = "rain_moderate.png",
    RAIN_HEAVY = "rain_heavy.png",
    RAIN_SNOW = "rain_snow.png",
    SNOW_LIGHT = "snow_light.png",
    SNOW_MODERATE = "snow_moderate.png",
    SNOW_HEAVY = "snow_heavy.png",
    THUNDERSTORM = "thunderstorm.png",
    ICE = "hail.png",
    FOG = "fog.png",
    DEFAULT = "default.png",
    ERROR = "error.png"
}

export type Weather = {
    description: string;
    code: number;
    temp: number;
    feelsLike?: number;
    lowTemp?: number;
    time?: string;
    day?: string;
    unit: "K" | "C" | "F";
    isNight: boolean;
    sunrise?: string;
    sunset?: string;
    clouds?: string;
    humidity?: string;
}

export function checkIfNight(time: number, sunrise: number, sunset: number, timezone: number) {
    return (time > sunrise && time < sunset) ? false : true;
}

export function getIcon(weatherCode: number, night: boolean, low = false): string {
    let path = (low) ? ICON_PATH_LOW : ICON_PATH
    
    if (night) {
        path += WEATHER_ICON_MAP_NIGHT[weatherCode] ?? WeatherIcon.DEFAULT
    } else {
        path += WEATHER_ICON_MAP_DAY[weatherCode] ?? WeatherIcon.DEFAULT;
    }

    return path;
}

// If showMinutes = true, time will return as 12:34 AM. 
// If showMinutes = false, time it will return 12 AM.
export function formatTime(secs: number, timezone: number, showMinutes = true): string {
    
    // Convert OWM API seconds to milliseconds and create a Date object
    const time = new Date((secs + timezone) * 1000);
    
    const hours = time.getUTCHours();

    // Get suffix
    const suffix = (hours > 11) ? "PM" : "AM";

    // Convert from 24 hour time to 12 hour time
    let formattedHours = (hours % 12);
    if (formattedHours == 0) formattedHours = 12;

    // Return time without minutes if showMinutes == false
    if (showMinutes == false) return formattedHours + " " + suffix;

    // Format minutes as a string with leading zero if needed
    const minutes = time.getMinutes();
    const formattedMinutes = (minutes < 10) ? "0" + minutes.toString() : minutes.toString()

    // Return time with minutes if showMinutes == true
    return formattedHours + ":" + formattedMinutes + " " + suffix;
}

export function formatDay(secs: number, timezone: number): string {
    const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

    // Convert OWM API seconds to milliseconds and create a Date object, and get the day of the week
    const day = new Date((secs + timezone) * 1000).getDay()

    // Return the day of the week
    return DAYS[day];
}

export function convertTemp(degK: number, unit: "K" | "C" | "F"): number {
    // Keep as Kelvin and return rounded number with unit.
    if (unit == "K") return Math.round(degK);
    
    // Convert to Celsius and return rounded number with unit.
    const degC = degK - 273.15;
    if (unit == "C") return Math.round(degC);

    // Convert to Fahrenheit and return rounded number with unit.
    const degF = (degC * 9/5) + 32;
    return Math.round(degF);
}

// Maps the weather codes from OpenWeatherMap to Stargaze's weather icons
// Day icons
export const WEATHER_ICON_MAP_DAY: Record<number, WeatherIcon> = {
    // ---- Group 2xx: Thunderstorm ----
    200: WeatherIcon.THUNDERSTORM, // Thunderstorm with light rain
    201: WeatherIcon.THUNDERSTORM, // Thunderstorm with rain
    202: WeatherIcon.THUNDERSTORM, // Thunderstorm with heavy rain
    210: WeatherIcon.THUNDERSTORM, // Light thunderstorm
    211: WeatherIcon.THUNDERSTORM, // Thunderstorm
    212: WeatherIcon.THUNDERSTORM, // Heavy thunderstorm
    221: WeatherIcon.THUNDERSTORM, // Ragged thunderstorm
    230: WeatherIcon.THUNDERSTORM, // Thunderstorm with light drizzle
    231: WeatherIcon.THUNDERSTORM, // Thunderstorm with drizzle
    232: WeatherIcon.THUNDERSTORM, // Thunderstorm with heavy drizzle

    // ---- Group 3xx: Drizzle ----
    300: WeatherIcon.RAIN_LIGHT, // Light intensity drizzle
    301: WeatherIcon.RAIN_LIGHT, // Drizzle
    302: WeatherIcon.RAIN_LIGHT, // Heavy intensity drizzle
    310: WeatherIcon.RAIN_LIGHT, // Light intensity drizzle rain 
    311: WeatherIcon.RAIN_LIGHT, // Drizzle rain
    312: WeatherIcon.RAIN_LIGHT, // Heavy intensity drizzle rain
    313: WeatherIcon.RAIN_LIGHT, // Shower rain and drizzle
    314: WeatherIcon.RAIN_LIGHT, // Heavy shower rain and drizzle
    321: WeatherIcon.RAIN_LIGHT, // Shower drizzle

    // ---- Group 5xx: Rain ----
    500: WeatherIcon.RAIN_LIGHT, // Light rain
    501: WeatherIcon.RAIN_MODERATE, // Moderate rain
    502: WeatherIcon.RAIN_HEAVY, // Heavy intensity rain
    503: WeatherIcon.RAIN_HEAVY, // Very heavy rain
    504: WeatherIcon.RAIN_HEAVY, // Extreme rain
    511: WeatherIcon.ICE, // Freezing rain
    520: WeatherIcon.RAIN_LIGHT, // Light intensity shower rain
    521: WeatherIcon.RAIN_MODERATE, // Shower rain
    522: WeatherIcon.RAIN_HEAVY, // Heavy intensity shower rain
    531: WeatherIcon.RAIN_MODERATE, // Ragged shower rain

    // ---- Group 6xx: Snow ----
    600: WeatherIcon.SNOW_LIGHT, // Light Snow
    601: WeatherIcon.SNOW_MODERATE, // Snow
    602: WeatherIcon.SNOW_HEAVY, // Heavy snow
    611: WeatherIcon.ICE, // Sleet
    612: WeatherIcon.ICE, // Light shower sleet
    613: WeatherIcon.ICE, // Shower sleet
    615: WeatherIcon.RAIN_SNOW, // Light rain and snow
    616: WeatherIcon.RAIN_SNOW, // Rain and snow
    620: WeatherIcon.RAIN_SNOW, // Light shower snow
    621: WeatherIcon.RAIN_SNOW, // Shower snow
    622: WeatherIcon.RAIN_SNOW, // Heavy shower snow

    // ---- Group 7xx: Atmosphere ----
    701: WeatherIcon.FOG, // Mist
    711: WeatherIcon.FOG, // Smoke
    721: WeatherIcon.FOG, // Haze
    731: WeatherIcon.FOG, // Dand/dust whirls
    741: WeatherIcon.FOG, // Fog
    751: WeatherIcon.FOG, // Sand
    761: WeatherIcon.FOG, // Dust
    762: WeatherIcon.FOG, // Volcanic ash
    771: WeatherIcon.WIND, // Squalls
    781: WeatherIcon.THUNDERSTORM, // Tornado

    // ---- Group 8xx: Clear ----
    800: WeatherIcon.SUN_CLEAR, // Clear sky
    801: WeatherIcon.SUN_PARTIAL, // Few clouds
    802: WeatherIcon.SUN_PARTIAL, // Scattered clouds
    803: WeatherIcon.CLOUDS, // Broken clouds
    804: WeatherIcon.CLOUDS, // Overcast clouds

    // ---- Stargaze Specific ----
    7001: WeatherIcon.WIND, // Windy

    // ---- Debug Use Only ----
    1111: WeatherIcon.DEFAULT,
    9999: WeatherIcon.ERROR
}

// Night icons
export const WEATHER_ICON_MAP_NIGHT: Record<number, WeatherIcon> = {
    // ---- Group 2xx: Thunderstorm ----
    200: WeatherIcon.THUNDERSTORM, // Thunderstorm with light rain
    201: WeatherIcon.THUNDERSTORM, // Thunderstorm with rain
    202: WeatherIcon.THUNDERSTORM, // Thunderstorm with heavy rain
    210: WeatherIcon.THUNDERSTORM, // Light thunderstorm
    211: WeatherIcon.THUNDERSTORM, // Thunderstorm
    212: WeatherIcon.THUNDERSTORM, // Heavy thunderstorm
    221: WeatherIcon.THUNDERSTORM, // Ragged thunderstorm
    230: WeatherIcon.THUNDERSTORM, // Thunderstorm with light drizzle
    231: WeatherIcon.THUNDERSTORM, // Thunderstorm with drizzle
    232: WeatherIcon.THUNDERSTORM, // Thunderstorm with heavy drizzle

    // ---- Group 3xx: Drizzle ----
    300: WeatherIcon.RAIN_LIGHT, // Light intensity drizzle
    301: WeatherIcon.RAIN_LIGHT, // Drizzle
    302: WeatherIcon.RAIN_LIGHT, // Heavy intensity drizzle
    310: WeatherIcon.RAIN_LIGHT, // Light intensity drizzle rain 
    311: WeatherIcon.RAIN_LIGHT, // Drizzle rain
    312: WeatherIcon.RAIN_LIGHT, // Heavy intensity drizzle rain
    313: WeatherIcon.RAIN_LIGHT, // Shower rain and drizzle
    314: WeatherIcon.RAIN_LIGHT, // Heavy shower rain and drizzle
    321: WeatherIcon.RAIN_LIGHT, // Shower drizzle

    // ---- Group 5xx: Rain ----
    500: WeatherIcon.RAIN_LIGHT, // Light rain
    501: WeatherIcon.RAIN_MODERATE, // Moderate rain
    502: WeatherIcon.RAIN_HEAVY, // Heavy intensity rain
    503: WeatherIcon.RAIN_HEAVY, // Very heavy rain
    504: WeatherIcon.RAIN_HEAVY, // Extreme rain
    511: WeatherIcon.ICE, // Freezing rain
    520: WeatherIcon.RAIN_LIGHT, // Light intensity shower rain
    521: WeatherIcon.RAIN_MODERATE, // Shower rain
    522: WeatherIcon.RAIN_HEAVY, // Heavy intensity shower rain
    531: WeatherIcon.RAIN_MODERATE, // Ragged shower rain

    // ---- Group 6xx: Snow ----
    600: WeatherIcon.SNOW_LIGHT, // Light Snow
    601: WeatherIcon.SNOW_MODERATE, // Snow
    602: WeatherIcon.SNOW_HEAVY, // Heavy snow
    611: WeatherIcon.ICE, // Sleet
    612: WeatherIcon.ICE, // Light shower sleet
    613: WeatherIcon.ICE, // Shower sleet
    615: WeatherIcon.RAIN_SNOW, // Light rain and snow
    616: WeatherIcon.RAIN_SNOW, // Rain and snow
    620: WeatherIcon.RAIN_SNOW, // Light shower snow
    621: WeatherIcon.RAIN_SNOW, // Shower snow
    622: WeatherIcon.RAIN_SNOW, // Heavy shower snow

    // ---- Group 7xx: Atmosphere ----
    701: WeatherIcon.FOG, // Mist
    711: WeatherIcon.FOG, // Smoke
    721: WeatherIcon.FOG, // Haze
    731: WeatherIcon.FOG, // Dand/dust whirls
    741: WeatherIcon.FOG, // Fog
    751: WeatherIcon.FOG, // Sand
    761: WeatherIcon.FOG, // Dust
    762: WeatherIcon.FOG, // Volcanic ash
    771: WeatherIcon.WIND, // Squalls
    781: WeatherIcon.THUNDERSTORM, // Tornado

    // ---- Group 8xx: Clear ----
    800: WeatherIcon.NIGHT_CLEAR, // Clear sky
    801: WeatherIcon.NIGHT_PARTIAL, // Few clouds
    802: WeatherIcon.NIGHT_PARTIAL, // Scattered clouds
    803: WeatherIcon.CLOUDS, // Broken clouds
    804: WeatherIcon.CLOUDS, // Overcast clouds

    // ---- Debug Use Only ----
    1111: WeatherIcon.DEFAULT,
    9999: WeatherIcon.ERROR
}
