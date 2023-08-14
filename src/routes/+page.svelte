<script lang="ts">
	import { goto } from "$app/navigation";
	import type { ActionData, PageData } from "./$types";
    import { location } from "$lib/stores";
	import { formatName, stringifyLocation } from "$lib/location/location";

    export let data: PageData;
    export let form: ActionData;

    let success = false;

</script>

<main>
    <section class="header">
        <h1>Choose Location</h1>
    </section>
    <section class="forms">

        <form class="search" method="POST" action="?/queryLocation">
            <input type="text" id="query" name="query" placeholder="City or Region" required>
            <input type="submit">
        </form>
        {#if form?.success === true}
            <form method="POST" action="?/setLocation">
                {#each form?.data as result, index}
                <input class="radio" type="radio" id={index.toString()} name="location" value={stringifyLocation({name: formatName(result.name, result.country, result.state), lat: result.lat, lon: result.lon})} required>
                <label for={index.toString()}>{formatName(result.name, result.country, result.state)}</label>
                {/each}
                <input class="button" type="submit" value="Choose Location">
                
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
            
            flex: 3;
            display: flex;
            justify-content: center;
            align-items: end;
            h1 {
                font-size: 32pt;
                font-weight: normal;
                margin: 0;
                line-height: 1;
                @include style.lhCrop(1.5);
                margin: 24px;
            }
            img {
                height: 96px;
                width: 96px;
            }
        }
        .forms {
            flex: 5;
            form {
                width: 400px;
                display: flex;
                flex-direction: column;
                input[type=submit] {
                    padding: 12px;
                    background-color: rgba(255, 255, 255, 0.10);
                    border: 2px solid white;
                    text-align: center;
                    &:hover {
                        background-color: rgba(255, 255, 255, 0.50);
                    }
                }
                &.search {
                    flex-direction: row;
                    input[type=text] {
                        flex-grow: 1;
                        border-right: none;
                    }
                    
                }
                
            }
            input {
                &.radio {
                    visibility: hidden;
                }
                &.radio:checked + label {
                    background-color: rgba(255, 255, 255, 0.4);
                }
            }
            label {
                padding: 12px;
                padding-top: 16px;
                padding-bottom: 16px;
                box-sizing: border-box;
                text-align: center;
                line-height: 1;
                border-left: 2px solid white;
                border-right: 2px solid white;
                @include style.lhCrop(1.5);
                &:hover {
                    background-color: rgba(255, 255, 255, 20%);
                    
                }
            }
        }
    }
</style>