<script lang="ts">
	import { ICON_PATH, WeatherIcons } from "../weather";

    let icons = Object.values(WeatherIcons);
</script>

<div class="wrapper">
    <div class="content">
        <section class="current">
            <div class="now">
                <h3>
                    Billings, MT
                </h3>
                <img src={ICON_PATH + WeatherIcons.WIND}>
                <h2>
                    Windy - 74&degF
                </h2>
                <h3>
                    Feels like 72&degF
                </h3>
            </div>
            <div class="hourly">
                <span>
                    <h2>2PM</h2>
                    <img src={ICON_PATH + "low_" + WeatherIcons.WIND}>
                    <h3>74&degF</h3>
                </span>
                <span>
                    <h2>3PM</h2>
                    <img src={ICON_PATH + "low_" + WeatherIcons.WIND}>
                    <h3>72&degF</h3>
                </span>
                <span>
                    <h2>4PM</h2>
                    <img src={ICON_PATH + "low_" + WeatherIcons.SUN_PARTIAL}>
                    <h3>71&degF</h3>
                </span>
                <span class="hide-at-xs">
                    <h2>5PM</h2>
                    <img src={ICON_PATH + "low_" + WeatherIcons.SUN_PARTIAL}>
                    <h3>68&degF</h3>
                </span>
                <span class="hide-at-lg">
                    <h2>6PM</h2>
                    <img src={ICON_PATH + "low_" + WeatherIcons.SUN_CLEAR}>
                    <h3>65&degF</h3>
                </span>
            </div>  
        </section>
        <section class="forecast">
            <span>
                <h2>MON</h2>
                <div class="temps">
                    <h3>74&degF</h3>
                    <h3 class="min">56&degF</h3>
                </div>
                <h4>
                    Partial Clouds
                </h4>
                <img src={ICON_PATH + "low_" + WeatherIcons.SUN_PARTIAL}>
            </span>
            <span>
                <h2>TUE</h2>
                <div class="temps">
                    <h3>74&degF</h3>
                    <h3 class="min">56&degF</h3>
                </div>
                <h4>
                    Clear Skies
                </h4>
                <img src={ICON_PATH + "low_" + WeatherIcons.SUN_CLEAR}>
            </span>
            <span>
                <h2>WED</h2>
                <div class="temps">
                    <h3>74&degF</h3>
                    <h3 class="min">56&degF</h3>
                </div>
                <h4>
                    Clear Skies
                </h4>
                <img src={ICON_PATH + "low_" + WeatherIcons.SUN_CLEAR}>
            </span>
            <span>
                <h2>THU</h2>
                <div class="temps">
                    <h3>74&degF</h3>
                    <h3 class="min">56&degF</h3>
                </div>
                <h4>
                    Rain
                </h4>
                <img src={ICON_PATH + "low_" + WeatherIcons.RAIN_MODERATE}>
            </span>
            <span>
                <h2>FRI</h2>
                <div class="temps">
                    <h3>74&degF</h3>
                    <h3 class="min">56&degF</h3>
                </div>
                <h4>
                    Wind
                </h4>
                <img src={ICON_PATH + "low_" + WeatherIcons.WIND}>
            </span>
            <span>
                <h2>SAT</h2>
                <div class="temps">
                    <h3>74&degF</h3>
                    <h3 class="min">56&degF</h3>
                </div>
                <h4>
                    Clouds
                </h4>
                <img src={ICON_PATH + "low_" + WeatherIcons.CLOUDS}>
            </span>
            <span>
                <h2>SUN</h2>
                <div class="temps">
                    <h3>74&degF</h3>
                    <h3 class="min">56&degF</h3>
                </div>
                <h4>
                    Partial Clouds
                </h4>
                <img src={ICON_PATH + "low_" + WeatherIcons.SUN_PARTIAL}>
            </span>
        </section>
    </div>
</div>





<style lang="scss">
    @use "/src/lib/style.scss";
    .wrapper {
        overflow-x: scroll;
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
        background-color: #55727f;
        .now {
            display: flex;
            flex-direction: column;
            flex: 2;
            justify-content: center;
            margin-bottom: 32px;
            align-items: center;
            img {
                height: 128px;
                width: 128px;
            }
            h2 {
                font-size: 30pt;
                margin: 2px;
            }
            h3 {
                font-size: 16pt;
                margin: 2px;
            }
        }
        .hourly {
            display: flex;
            gap: 8px;
            flex-direction: row;
            padding-top: 16px;
            padding-bottom: 16px;
            border-top: 6px solid rgba(255, 255, 255, 75%);
            background-color: rgba(0, 0, 0, 20%);
            span {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 4px;
                align-items: center;
                
                h2 {
                    font-size: 14pt;
                    margin: 12px;
                }
            }
            img {
                height: 64px;
                width: 64px;
            }
        }
    }

    .forecast {
        scroll-snap-align: start;
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 50%);
        border-left: 6px solid rgba(255, 255, 255, 75%);
        span {
            margin-left: 24px;
            margin-right: 24px;
            display: flex;
            flex: 1;
            align-items: center;

            h2 {
                font-size: 16pt;
                min-width: 48px;
                width: 48px;
            }
            img {
                height: 48px;
                width: 48px;
            }
            .temps {
                display: flex;
                flex-direction: column;
                margin-left: 24px;
                margin-right: 24px;
                h3 {
                    font-size: 16pt;
                    margin: 0;
                    &.min {
                        opacity: 70%;
                    }
                }
                
            }
            h4 {
                flex-grow: 1;
                margin-right: 24px;
            }
        }
    }

    @media (min-width: style.$small) {

    }

    /*
    @media (min-width: style.$medium) {
        .content {
            width: 100vw;
        }

        .current {
            flex: 1;
            .hourly {
                flex-direction: column;
                span {
                    flex-direction: row;
                }
            }
        }
        .forecast { 
            flex: 1;
        }
    }
    */

    @media (min-width: style.$large) {
        .wrapper {
            overflow-x: hidden;
            scroll-snap-type: none;
        }
        .content {
            width: 100vw;
        }
        .current {
            flex: 2;
            .hourly {
                flex-direction: row;
                
                span {
                    flex-direction: column;
                }
            }
        }
        .forecast {
            flex: 1;
        }
    }
    @media (min-width: style.$xlarge) {
        .current {
            flex-grow: 1;
            .now {
                img {
                    width: 192px;
                    height: 192px;
                }
            }
            .hourly {
                span {
                    h2 { 
                        font-size: 18pt;
                    }
                    h3 {
                        font-size: 16pt;
                    }
                }
                
                img {
                    width: 96px;
                    height: 96px;
                }
            }
        }
        .forecast {
            flex-grow: 0;
            span {
                img {
                    height: 64px;
                    width: 64px;
                }
            }
        }
    }
   
</style>
