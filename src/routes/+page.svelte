<script lang="ts">
	import DayForecast from "$lib/components/day-forecast.svelte";
	import HourForecast from "$lib/components/hour-forecast.svelte";
    import { getIcon, type Weather } from "../weather";

    let testWeather: Weather = {
        description: "Clear Skies",
        code: 800,
        highTemp: 84,
        lowTemp: 65,
        isNight: false,
        time: 3,
        day: "SUN"
    }

</script>

<div class="wrapper">
    <div class="content">
        <section class="current">
            <div class="now">
                <h3>
                    Billings, MT
                </h3>
                <img src={getIcon(771, false)}>
                <h2>
                    Squalls - 74&degF
                </h2>
                <h3>
                    Feels like 72&degF
                </h3>
            </div>
            <div class="hourly">
                <HourForecast weather={testWeather} hour={4}/>
                <HourForecast weather={testWeather} hour={5}/>
                <HourForecast weather={testWeather} hour={6}/>
                <HourForecast weather={testWeather} hour={7}/>
                <HourForecast weather={testWeather} hour={8}/>
            </div>  
        </section>
        <section class="forecast">
            <DayForecast weather={testWeather} day="MON"/>
            <DayForecast weather={testWeather} day="TUE"/>
            <DayForecast weather={testWeather} day="WED"/>
            <DayForecast weather={testWeather} day="THU"/>
            <DayForecast weather={testWeather} day="FRI"/>
            <DayForecast weather={testWeather} day="SAT"/>
            <DayForecast weather={testWeather} day="SUN"/>

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
        .now {
            display: flex;
            flex-direction: column;
            flex: 2;
            justify-content: center;
            margin-bottom: 32px;
            align-items: center;
            img {
                height: 128px;
                width: 128px;
            }
            h2 {
                font-size: 20pt;
                margin: 2px;
            }
            h3 {
                font-size: 14pt;
                margin: 10px;
            }
        }
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
            flex: 1;
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
        }
    }
   
</style>
