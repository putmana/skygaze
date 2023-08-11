<script lang="ts">
	import Daily from "$lib/weather/daily.svelte";
	import DayForecast from "$lib/weather/daily.svelte";
	import Hourly from "$lib/weather/hourly.svelte";
	import HourForecast from "$lib/weather/hourly.svelte";
    import { tempUnit } from "$lib/stores.js";
	import Current from "$lib/weather/current.svelte";

    import { checkIfNight, type Weather } from "$lib/weather/weather";

    export let data;

    let current: Weather = {
        description: data.current.weather[0].description,
        code: data.current.weather[0].id,
        temp: data.current.temp,
        feelsLike: data.current.feels_like,
        isNight: checkIfNight(data.current.dt, data.current.sunrise, data.current.sunset),
        unit: $tempUnit
    }
    
    let hourly: Weather[] = [];
    for (let i = 1; i < 6; i++) {
        let hour = data.hourly[i];
        hourly.push({
            description: hour.weather[0].description,
            code: hour.weather[0].id,
            temp: hour.temp,
            time: new Date(hour.dt * 1000).getHours(),
            isNight: checkIfNight(hour.dt, data.current.sunrise, data.current.sunset),
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
            day: new Date(day.dt * 1000).getDay(),
            isNight: false,
            unit: $tempUnit
        })
    }
    
</script>

<div class="wrapper">
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
        background-color: #3aa1d5;

        .hourly {
            display: flex;
            gap: 8px;
            flex-direction: row;
            padding-top: 16px;
            padding-bottom: 16px;
            border-top: 6px solid rgba(255, 255, 255, 75%);
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
            border-left: 6px solid rgba(255, 255, 255, 75%);
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
