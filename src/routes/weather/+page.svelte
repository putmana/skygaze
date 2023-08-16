<script lang="ts">
	import Daily from "$lib/weather/daily.svelte";
	import Hourly from "$lib/weather/hourly.svelte";
    import { tempUnit } from "$lib/stores.js";
	import Current from "$lib/weather/current.svelte";


    import { checkIfNight, formatDay, formatTime, type Weather } from "$lib/weather/weather";

    export let data;

    let name = data.name;
    let now = data.weather.current;
    let night = (now.dt > now.sunrise && now.dt < now.sunset) ? false : true;
    let clouds = (now.clouds > 50)
    let timezone = data.weather.timezone_offset;

    let current: Weather = {
        description: now.weather[0].description,
        code: now.weather[0].id,
        temp: now.temp,
        feelsLike: now.feels_like,
        isNight: checkIfNight(now.dt, now.sunrise, now.sunset),
        unit: $tempUnit,
        sunrise: formatTime(now.sunrise, timezone),
        sunset: formatTime(now.sunset, timezone),
        clouds: now.clouds + "%",
        humidity: now.humidity + "%"
    }
    
    let daily: Weather[] = [];
    for (let i = 0; i < 8; i++) {
        let day = data.weather.daily[i];
        daily.push({
            description: day.weather[0].description,
            code: day.weather[0].id,
            temp: day.temp.max,
            lowTemp: day.temp.min,
            day: formatDay(day.dt, timezone),
            isNight: false,
            unit: $tempUnit
        })
    }

    let hourly: Weather[] = [];
    for (let i = 1; i < 25; i++) {
        let hour = data.weather.hourly[i];

        let sunrise = now.sunrise;
        let sunset = now.sunset;
        let tomorrow = data.weather.daily[1];

        if (hour.dt + timezone >= tomorrow.dt) {
            sunrise = tomorrow.sunrise;
            sunset = tomorrow.sunset;
        }

        hourly.push({
            description: hour.weather[0].description,
            code: hour.weather[0].id,
            temp: hour.temp,
            time: formatTime(hour.dt, timezone, false),
            isNight: checkIfNight(hour.dt, sunrise, sunset),
            unit: $tempUnit
        })
    }



    
</script>
<svelte:head>
    <title>Weather in {name?.split(",")[0]}, {name?.split(",")[1]} | Stargaze</title>
</svelte:head>

<div class="wrapper" class:night class:clouds>
    <div class="content">
        <section class="current">
            <Current weather={current} location={name}/>
            <div class="hourly">
                {#each hourly as hour}
                    <Hourly weather={hour} hour={2}/>
                {/each}
            </div>  
        </section>
        <section class="forecast">
            {#each daily as day}
                <Daily weather={day} />
            {/each}
        </section>
    </div>
</div>





<style lang="scss">
    @use "/src/lib/style.scss";
    .wrapper {
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        background-color: #3aa1d5;
        &.clouds {
            background-color: #7c8c9a;
        }
        &.night {
            background-color: #262b49;
            &.clouds {
                background-color: #2d2e34;
            }
        }

        
    }

    .content {
        display: flex;
        width: calc(2 * 100vw);
        height: 100vh;
    }

    .current {
        scroll-snap-align: start;
        display: flex;
        flex: 1;
        flex-direction: column;
        overflow-y: scroll;
        .location {
            display: flex;
            flex-direction: row-reverse;
            justify-content: center;
            align-items: center;
            gap: 4px;
            img {
                width: 36px;
                height: 36px;
            }
        }

        .hourly {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            max-width: 100vw;
            gap: 8px;
            padding-top: 16px;
            padding-bottom: 120px;
            background-color: rgba(0, 0, 0, 20%);
        }
    }

    .forecast {
        scroll-snap-align: start;
        display: flex;
        flex-direction: column;
        flex: 1;
        background-color: rgba(0, 0, 0, 50%);
    }
    @media (min-width: style.$medium) {
        
        .wrapper {
            overflow-x: hidden;
            scroll-snap-type: none;
        }
        .content {
            width: 100vw;
        }
        .current {       
            .hourly {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        .forecast {
            flex-grow: 0;
            flex-basis: auto;
        }
    }

    @media (min-width: style.$large) {
        .current {
            .hourly {
                grid-template-columns: repeat(6, 1fr);
            }
        }
    }

    @media (min-width: style.$xlarge) {
        
        .current {
            flex-grow: 1;
            .hourly {
                grid-template-columns: repeat(8, 1fr);
            }
        }
        .forecast {
            flex-grow: 0;
            flex-basis: auto;
        }
    }
   
</style>
