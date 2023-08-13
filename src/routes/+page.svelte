<script lang="ts">
	import Daily from "$lib/weather/daily.svelte";
	import DayForecast from "$lib/weather/daily.svelte";
	import Hourly from "$lib/weather/hourly.svelte";
	import HourForecast from "$lib/weather/hourly.svelte";
    import { tempUnit } from "$lib/stores.js";
	import Current from "$lib/weather/current.svelte";

    import { checkIfNight, formatDay, formatTime, type Weather } from "$lib/weather/weather";

    export let data;
    console.log(data);

    let now = data.current;
    let night = (now.dt > now.sunrise && now.dt < now.sunset) ? false : true;
    let clouds = (now.clouds > 50)

    let current: Weather = {
        description: now.weather[0].description,
        code: now.weather[0].id,
        temp: now.temp,
        feelsLike: now.feels_like,
        isNight: checkIfNight(now.dt, now.sunrise,now.sunset),
        unit: $tempUnit,
        sunrise: formatTime(now.sunrise),
        sunset: formatTime(now.sunset),
        clouds: now.clouds + "%",
        humidity: now.humidity + "%"
    }
    
    let hourly: Weather[] = [];
    for (let i = 1; i < 6; i++) {
        let hour = data.hourly[i];
        hourly.push({
            description: hour.weather[0].description,
            code: hour.weather[0].id,
            temp: hour.temp,
            time: formatTime(hour.dt, false),
            isNight: checkIfNight(hour.dt, now.sunrise, now.sunset),
            unit: $tempUnit
        })
    }

    let daily: Weather[] = [];
    for (let i = 0; i < 7; i++) {
        let day = data.daily[i];
        daily.push({
            description: day.weather[0].description,
            code: day.weather[0].id,
            temp: day.temp.max,
            lowTemp: day.temp.min,
            day: formatDay(day.dt),
            isNight: false,
            unit: $tempUnit
        })
    }

    
</script>

<div class="wrapper" class:night class:clouds>
    <div class="content">
        <section class="current">
            <Current weather={current}/>

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
        height: 100vh;
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

        .hourly {
            display: flex;
            gap: 8px;
            flex-direction: row;
            padding-top: 16px;
            padding-bottom: 16px;
            background-color: rgba(0, 0, 0, 20%);
        }
    }

    .forecast {
        scroll-snap-align: start;
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 50%);
    }

    @media (min-width: style.$large) {
        .wrapper {
            overflow-x: hidden;
            scroll-snap-type: none;
        }
        .content {
            width: 100vw;
        }
        .current {
            flex: 2;
            .hourly {
                flex-direction: row;
            }
        }
        .forecast {
            flex-grow: 0;
            flex-basis: auto;
        }
    }

    @media (min-width: style.$xlarge) {
        .current {
            flex-grow: 1;
            .now {
                h2 {
                    font-size: 30pt;
                }
                h3 {
                    font-size: 16pt;
                }
                img {
                    width: 192px;
                    height: 192px;
                }
            }
        }
        .forecast {
            flex-grow: 0;
            flex-basis: auto;
        }
    }
   
</style>
