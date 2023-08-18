<script lang="ts">
	import { useFahrenheit } from "$lib/stores";
	import { convertTemp, formatTime, getIcon, getUnit, type Weather } from "./weather";

    export let hour: number;
    export let weather: Weather;

    $: unit = getUnit($useFahrenheit);

</script>

<div class="wrapper">
    <h2 class="hour">
        {weather.time}
    </h2>
    <img class="icon" src={getIcon(weather.code, weather.isNight, true)} alt={getIcon(weather.code, weather.isNight, true)}>
    <h2 class="temp">
        {convertTemp(weather.temp, unit)}&deg{unit}
    </h2>
</div>

<style lang="scss">
    @use '/src/lib/style.scss';
    .wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 64px;
        h2 {
            font-size: 12pt;
            
        }
        .icon {
            height: 32px;
            width: 32px;
        }
    }

    @media (min-width: style.$small) {
        .wrapper {
            min-width: 96px;
            h2 {
                font-size: 14pt;
            }
            .icon {
                height: 64px;
                width: 64px;
            }
        }
    }

    @media (min-width: style.$xlarge) {
        .wrapper {
            .hour {
                font-size: 18pt;
            }
            .icon {
                height: 64px;
                width: 64px;
            }
            .temp {
                font-size: 16pt;
            }
        }
    }
</style>