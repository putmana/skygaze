<script lang="ts">
	import { goto } from "$app/navigation";
	import type { ActionData, PageData } from "./$types";
    import { location } from "$lib/stores";
	import { formatName, stringifyLocation } from "$lib/location/location";

    export let data: PageData;
    export let form: ActionData;

    let success = false;
    let selected = "";

</script>

<main>
    <section class="header">
        <h1 class="logo">Choose Location</h1>
    </section>
    <section class="forms">

        <form class="search" method="POST" action="?/queryLocation">
            <input class="search-text" type="text" id="query" name="query" placeholder="City or Region" required>
        </form>
        
        {#if form?.success === true}

        <form class="results" method="POST" action="?/setLocation">
            {#each form?.data as result, index}
            <input class="result-option-radio" type="radio" id={index.toString()} name="location" value={stringifyLocation({name: formatName(result.name, result.country, result.state), lat: result.lat, lon: result.lon})} required>
            <label class="result-option" for={index.toString()}>
                {formatName(result.name, result.country, result.state)}
            </label>

            {/each}
            <input class="result-submit" type="submit" value="Choose Location">
        </form>

        {:else if form?.success === false}

        <h3>{form.data}</h3>

        {/if}
    </section>
</main>
    
<style lang="scss">
    @use '/src/lib/style.scss';
    main {
        background-color: #222222;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100vh;
        align-items: center;

        .header {
            display: flex;
            flex: 3;
            justify-content: center;
            align-items: end;

            .logo {
                font-size: 24pt;
                font-weight: normal;
                margin: 24px;
                line-height: 1;
                @include style.lhCrop(1.5);
            }
        }

        .forms {
            display: flex;
            flex-direction: column;
            flex: 5;
            width: 300px;
            .search {
                display: flex;
                input {
                    padding: 12px;
                    border: 2px solid white;

                    &.search-text {
                        background-color: transparent;
                        flex-grow: 1;
                        &:focus-visible {
                            outline: 2px dashed white;
                            outline-offset: -4px;       
                        }
                    }
                    &.search-submit {
                        border-left: none;
                    }
                }
            }

            .results {
                display: flex;
                flex-direction: column; 
                border-top: none;
                .result-option-radio {  
                    opacity: 0;
                    position: fixed;
                    &:checked + .result-option {
                        background-color: rgba(255, 255, 255, 0.4);
                        font-weight: bold;
                    }
                    &:focus-visible + .result-option {
                        outline: 2px dashed white;
                        outline-offset: -4px;
                    }
                }
                .result-option {
                    padding: 12px;
                    padding-bottom: 14px;
                    text-align: center;
                    border-left: 2px solid white;
                    border-right: 2px solid white       ;
                    &:hover {
                        background-color: rgba(255, 255, 255, 0.2);
                    }
                }
                .result-submit {
                    background-color: rgba(255, 255, 255, 0.2);
                    padding: 12px;
                    padding-bottom: 14px;
                    border: 2px solid white;        
                    text-align: center;
                    box-sizing: border-box;
                    &:hover {
                        background-color: rgba(255, 255, 255, 0.4);
                    }
                    &:focus-visible {
                        outline: 2px dashed white;
                        outline-offset: -4px;           
                    }
                    
                }
            }
        }
    }
    @media (min-width: style.$small) {
        main {
            .forms {
                width: 400px;
            }
        }
    }
</style>