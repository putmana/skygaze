<script lang="ts">
	import { ICON_PATH, WeatherIcons } from "../weather";

    let icons = Object.values(WeatherIcons);
</script>

<h1>Stargaze</h1>

{#each icons as icon}
    <img src={ICON_PATH + icon}>
{/each}


<style lang="scss">
    body {
        background-color: black;
    }
    img {
        image-rendering: pixelated;
        height: 62px;
    }
</style>
