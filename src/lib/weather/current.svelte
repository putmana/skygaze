<script lang="ts">
    import Searchbox from "$lib/location/searchbox.svelte";
import { convertTemp, getIcon, type Weather } from "./weather";

    export let weather: Weather;
</script>

<div class="wrapper">
    
    <section class="header">
        <img class="icon" src={getIcon(weather.code, weather.isNight)}>
        <div class="info">
            <h2 class="desc">
                {weather.description}
            </h2>
            <h2 class="temp">
                {convertTemp(weather.temp, weather.unit)}&deg{weather.unit}
            </h2>
            <h3 class="feel">
                Feels like {convertTemp(weather.feelsLike ?? 0, weather.unit)}&deg{weather.unit}
            </h3>
        </div>
    </section>
    <section class="body">
        <span class="detail">
            <h4 class="label">Clouds:</h4>
            <h4 class="data">{weather.clouds}</h4>
        </span>
        <span class="detail">
            <h4 class="label">Humidity:</h4>
            <h4 class="data">{weather.humidity}</h4>
        </span>
        <span class="detail">
            <h4 class="label">Sunrise:</h4>
            <h4 class="data">{weather.sunrise}</h4>
        </span>
        <span class="detail">
            <h4 class="label">Sunset:</h4>
            <h4 class="data">{weather.sunset}</h4>
        </span>
    </section>
        
</div>

<style lang="scss">
    @use '/src/lib/style.scss';
    .wrapper {
        display: flex;
        margin: 24px;
        flex-direction: column;
        flex-grow: 1;
        min-height: 60vh;
        
        .header {
            display: flex;
            flex-direction: row;
            .icon {
                height: 128px;
                width: 128px;
            }
            .info {
                display: flex;
                flex-grow: 1;
                flex-direction: column;
                justify-content: center;
                gap: 20px;
                text-align: end;
                .desc {
                    font-size: 14pt;
                    margin: 0;
                    text-transform: capitalize;
                    line-height: 1;
                    @include style.lhCrop(1.5);
                }
                .temp {
                    margin: 0;
                    font-size: 30pt;
                    line-height: 1;
                    @include style.lhCrop(1.5);
                }
                .feel {
                    font-size: 14pt;
                    margin: 0;
                    line-height: 1;
                    @include style.lhCrop(1.5);
                } 
            }
        } 
        .body {
            display: flex;
            flex-direction: column;
            gap: 16px;
            justify-content: end;
            flex-grow: 1;
            .detail {
                h4 {
                    margin: 0;
                    font-size: 14pt;
                }
                display: flex;
                justify-content: space-between;

            }

        }
    }

    @media (min-width: style.$small) {
        .wrapper {
            .body {
                .detail {
                    .label {
                        font-size: 16pt;
                    }
                }
            }
        }
    }

    @media (min-width: style.$large) {
        .wrapper {
            justify-content: space-evenly;
            align-items: center;
            margin: 48px;
            .header {
                gap: 24px;
                .icon {
                    height: 192px;
                    width: 192px;
                }
                .info {
                    text-align: start;
                    .desc {
                        font-size: 16pt;
                    }
                    .temp {
                        font-size: 40pt;
                    }
                    .feel {
                        font-size: 16pt;
                    }
                }
            }
            .body {
                flex-direction: row;
                flex-grow: 0;
                align-items: end;
                gap: 64px;
                .detail {
                    flex-direction: column;
                    text-align: center;
                    .label {
                        font-size: 16pt;
                    }
                    .data {
                        font-size: 16pt;
                    }
                }
            }
        }
    }
</style>