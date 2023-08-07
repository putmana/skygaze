<script lang="ts">
	import { ICON_PATH, WeatherIcons } from "../weather";

    let icons = Object.values(WeatherIcons);
</script>

<div class="wrapper">
    <div class="content">
        <section class="current">
            <div class="now">
                NOW
            </div>
            <div class="hourly">
                SOON
            </div>  
        </section>
        <section class="forecast">

        </section>
    </div>
</div>





<style lang="scss">
    @use "/src/lib/style.scss";
    .wrapper {
        overflow: scroll;
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
        .now {
            flex: 1;
            background-color: green;
        }
        .hourly {
            flex: 1;
            background-color: blue;
        }
    }

    .forecast {
        scroll-snap-align: start;
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: blueviolet;
        overflow-y: scroll;
    }

    @media (min-width: style.$medium) {
        .content {
            width: 100vw;
        }

        .current {
            flex: 1;
            
        }
        .forecast { 
            flex: 1;
        }
    }

    @media (min-width: style.$large) {
        .current {
            flex: 2;
        }
        .forecast {
            flex: 1;
        }
    }
   
</style>
