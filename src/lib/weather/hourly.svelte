<script lang="ts">
	import { convertTemp, getIcon, type Weather } from "./weather";

    export let hour: number;
    export let weather: Weather;

    function formatTime(time: number): string {
        const AM = "AM";
        const PM = "PM";
        if (time === 0) {
            return "12AM";
        } else if (time === 12) {
            return "12PM";
        } else if (time < 12) {
            return time.toString() + AM;
        } else if (time < 24) {
            return (time - 12).toString() + PM;
        } else {
            console.error(time.toString() + " is not a valid hour.")
            return "ERR";
        }
    }

</script>

<div class="wrapper">
    <h2 class="hour">
        {formatTime(weather.time ?? 0)}
    </h2>
    <img class="icon" src={getIcon(weather.code, weather.isNight, true)} alt={getIcon(weather.code, weather.isNight, true)}>
    <h2 class="temp">
        {convertTemp(weather.temp, weather.unit)}&deg{weather.unit}
    </h2>
</div>

<style lang="scss">
    @use '/src/lib/style.scss';
    .wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: center;
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
            h2 {
                font-size: 18pt;
            }
            .icon {
                height: 96px;
                width: 96px;
            }
        }
    }
</style>