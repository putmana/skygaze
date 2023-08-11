<script lang="ts">
	import { getIcon, type Weather } from "./weather";

    export let day: "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";
	export let weather: Weather;

</script>

<div class="wrapper">
    <h2 class="day">
        {day}
    </h2>
    <span class="temps">
        <h3 class="high">{weather.highTemp}&degF</h3>
        <h3 class="low">{weather.lowTemp}&degF</h3>
    </span>
    <h4 class="desc">{weather.description}</h4>
    <img class="icon" src={getIcon(weather.code, false, true)}>
</div>

<style lang="scss">
    @use "/src/lib/style.scss";

    .wrapper {
        margin-left: 24px;
        margin-right: 24px;
        display: flex;
        flex: 1;
        align-items: center;

        .day {
            font-size: 16pt;
            width: 48px;
        }
        .temps {
            margin-left: 24px;
            margin-right: 24px;
            display: flex;
            flex-direction: column;

            h3 {
                font-size: 16pt;
                margin: 0;
                &.low {
                    opacity: 70%;
                }
            }
            
        }
        .desc {
            flex-grow: 1;
            margin-right: 24px;
        }
        .icon {
            height: 48px;
            width: 48px;
        }
    }

    @media (min-width: style.$xlarge) {
        .wrapper {
            .icon {
                height: 64px;
                width: 64px;
            }
        }
    }
</style>