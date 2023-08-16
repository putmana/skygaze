<script lang="ts">
	import { convertTemp, getIcon, type Weather } from "./weather";

	export let weather: Weather;

</script>
<article class="wrapper">
    <img class="icon" src={getIcon(weather.code, false, true)}>
    <span class="details">
        <h3 class="day">{weather.day}</h3>
        <h4 class="desc">{weather.description}</h4>
    </span>
    <span class="temps">
        <h3 class="high">{convertTemp(weather.temp, weather.unit)}&deg{weather.unit}</h3>
        <h4 class="low">L: {convertTemp(weather.lowTemp ?? 0, weather.unit)}&deg{weather.unit}</h4>
    </span>
        
</article>

<style lang="scss">
    @use "/src/lib/style.scss";
    .wrapper {
        min-width: 250px;
        display: flex;
        align-items: center;
        flex: 1;
        margin: 16px;
        gap: 16px;

        h3 {
            margin: 0;
            font-size: 14pt;
        }
        h4 {
            margin: 0;
            font-size: 10pt;
            opacity: 80%;
            text-transform: capitalize;
        }

        .icon {
            height: 48px;
            width: 48px;
        }

        .details {
            flex-grow: 1;
            gap: 4px;
            text-align: left;
        }

        .temps {
            gap: 4px;
            text-align: right;
        }
    }

    @media (min-width: style.$xlarge) {
        .wrapper {
            min-width: 300px;
            h3 {
                font-size: 16pt;
            }
            h4 {
                font-size: 12pt
            }
        }
        
    }
        
</style>