<script lang="ts">
    import { page } from "$app/stores";

</script>

<article class="error">
    <img class="icon" src="icons/weather_wind.png">
    <h1>
        {$page.status} : {$page.error?.message}
    </h1>
</article>


<style lang="scss">
    .error {
        display: flex;
        flex-direction: column;
        height: 100vh;
        align-items: center;
        justify-content: center;

        .icon {
            height: 96px;
            width: 96px;
        }

        h1 {
            font-size: 24pt;
        }
    }
</style>