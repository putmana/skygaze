<script lang="ts">
	import { convertTemp, getIcon, type Weather } from "./weather";

	export let weather: Weather;

</script>

<div class="wrapper">
    <h2 class="day">
        {weather.day}
    </h2>
    <span class="temps">
        <h3 class="high">{convertTemp(weather.temp, weather.unit)}&deg{weather.unit}</h3>
        <h3 class="low">{convertTemp(weather.lowTemp ?? 0, weather.unit)}&deg{weather.unit}</h3>
    </span>
    <h4 class="desc">{weather.description}</h4>
    <img class="icon" src={getIcon(weather.code, false, true)}>
</div>

<style lang="scss">
    @use "/src/lib/style.scss";

    .wrapper {
        margin-left: 32px;
        margin-right: 32px;
        gap: 16px;
        display: flex;
        flex: 1;
        align-items: center;

        .day {
            font-size: 10pt;
            min-width: 36px;
        }
        .temps {
            display: flex;
            flex-direction: column;
            min-width: 48px;

            h3 {
                font-size: 12pt;
                margin: 0;
                &.low {
                    opacity: 70%;
                }
            }
            
        }
        .desc {
            flex: 2;
            text-transform: capitalize;
            font-size: 10pt;
        }
        .icon {
            flex-grow: 0;
            height: 48px;
            width: 48px;
        }
    }

    @media (min-width: style.$small) {
        .wrapper {
            gap: 24px;
            .day {
                font-size: 12pt;
            }
            .temps {
                h3 {   
                    font-size: 14pt;
                }
            }
            .desc {
                font-size: 12pt;
            }
            .icon {
                height: 48px;
                width: 48px;
            }
        }
    }

    @media (min-width: style.$xlarge) {
        .wrapper {
            gap: 32px;
            .day {
                font-size: 14pt;
            }
            .temps {
                min-width: 64px;
                h3 {
                    font-size: 16pt;
                }
            }
            .desc {
                font-size: 14pt;
            }
            .icon {
                height: 64px;
                width: 64px;
            }
        }
    }
</style>