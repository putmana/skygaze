<script lang="ts">
	import Searchbox from "$lib/components/searchbox.svelte"
	import Switch from "$lib/components/switch.svelte"
	import { useFahrenheit } from "$lib/stores"
	import { convertTemp, getIcon, getUnit, type Weather } from "./weather"
	export let weather: Weather
	export let location = ""

	$: unit = getUnit($useFahrenheit)
</script>

<section class="controls">
	<Searchbox />
	<Switch labelLeft="°C" labelRight="°F" bind:active={$useFahrenheit} />
</section>
<div class="wrapper">
	<section class="header">
		<img class="icon" src={getIcon(weather.code, weather.isNight)} />
		<div class="info">
			<h2 class="location">
				{location}
			</h2>

			<h2 class="temp">
				{convertTemp(weather.temp, unit)}&deg{unit}
			</h2>
			<h2 class="desc">
				{weather.description}
			</h2>
		</div>
	</section>
	<section class="body">
		<span class="detail">
			<h4 class="label">Feels Like:</h4>
			<h4 class="data">{convertTemp(weather.feelsLike ?? 0, unit)}&deg{unit}</h4>
		</span>
		<span class="detail">
			<h4 class="label">Humidity:</h4>
			<h4 class="data">{weather.humidity}</h4>
		</span>
		<span class="detail">
			<h4 class="label">Sunrise:</h4>
			<h4 class="data">{weather.sunrise}</h4>
		</span>
		<span class="detail">
			<h4 class="label">Sunset:</h4>
			<h4 class="data">{weather.sunset}</h4>
		</span>
	</section>
</div>

<style lang="scss">
	@use "/src/lib/style.scss";
	.controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 64px;
		padding-left: 16px;
		padding-right: 16px;
	}
	.wrapper {
		display: flex;
		padding: 24px;
		padding-top: 12px;
		box-sizing: border-box;
		flex-direction: column;
		flex-grow: 1;
		min-height: calc(63vh);

		.header {
			display: flex;
			flex-direction: row;

			.icon {
				height: 96px;
				width: 96px;
			}
			.info {
				display: flex;
				flex-grow: 1;
				flex-direction: column;
				justify-content: center;
				gap: 20px;
				text-align: end;
				.location {
					font-size: 14pt;
					margin: 0;
					text-transform: capitalize;
					line-height: 1;
					@include style.lhCrop(1.5);
				}
				.temp {
					margin: 0;
					font-size: 30pt;
					line-height: 1;
					@include style.lhCrop(1.5);
				}
				.desc {
					font-size: 14pt;
					margin: 0;
					text-transform: capitalize;
					line-height: 1;
					@include style.lhCrop(1.5);
				}
				.feel {
					font-size: 14pt;
					margin: 0;
					line-height: 1;
					@include style.lhCrop(1.5);
				}
			}
		}
		.body {
			display: flex;
			flex-direction: column;
			gap: 16px;
			justify-content: end;
			flex-grow: 1;
			.detail {
				h4 {
					margin: 0;
					font-size: 14pt;
				}
				display: flex;
				justify-content: space-between;
			}
		}
	}

	@media (min-width: style.$small) {
		.wrapper {
			.header {
				.icon {
					height: 128px;
					width: 128px;
				}
			}
			.body {
				.detail {
					.label {
						font-size: 16pt;
					}
				}
			}
		}
	}

	@media (min-width: style.$large) {
		.wrapper {
			justify-content: center;
			align-items: center;
			padding: 48px;
			.location {
				margin: 0;
			}
			.header {
				flex-grow: 1;
				align-items: center;
				gap: 24px;
				.icon {
					height: 192px;
					width: 192px;
				}
				.info {
					text-align: start;
					.desc {
						font-size: 16pt;
					}
					.temp {
						font-size: 40pt;
					}
					.feel {
						font-size: 16pt;
					}
				}
			}
			.body {
				flex-direction: row;
				align-items: center;
				gap: 96px;
				flex-grow: 2;
				.detail {
					flex-direction: column;
					text-align: center;
					.label {
						font-size: 16pt;
					}
					.data {
						font-size: 16pt;
					}
				}
			}
		}
	}
</style>
