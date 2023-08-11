<script lang="ts">
    import Searchbox from "$lib/location/searchbox.svelte";
import { convertTemp, getIcon, type Weather } from "./weather";

    export let weather: Weather;
</script>

<div class="wrapper">
    <Searchbox />
    <img class="icon" src={getIcon(weather.code, weather.isNight)}>
    <h2 class="desc">
        {weather.description} - {convertTemp(weather.temp, weather.unit)}&deg{weather.unit}
    </h2>
    <h3 class="feel">
        Feels like {convertTemp(weather.feelsLike ?? 0, weather.unit)}&deg{weather.unit}
    </h3>
</div>

<style lang="scss">
    @use '/src/lib/style.scss';
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        .icon {
            height: 128px;
            width: 128px;
        }
        .desc {
            font-size: 20pt;
            margin: 2px;
            text-transform: capitalize;
        }
        .feel {
            font-size: 14pt;
            margin: 10px;
        }
    }
    @media (min-width: style.$xlarge) {
        .wrapper {
            .icon {
                width: 192px;
                height: 192px;
            }
            .desc {
                font-size: 30pt;
            }
            .feel {
                font-size: 16pt;
            }
        }
    }
</style>