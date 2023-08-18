<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { lookupLocation } from "$lib/location/location";
	import { color } from "$lib/stores";

    let placeholder = "City or ZIP code";

    // Determines whether or not the search box is visible
    let active = false;

    let query = "";

    // Debounce function to stop the API from being pinged too often
    let timer = 0;
    let debounce = (event: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            query = event.target.value
        }, 1000)
    } 

    $: resultPromise = lookupLocation(query)
    
    

    function openSearch() {
        active = true;
    }

    function closeSearch() {
        active = false;
    }



</script>

<button class="btn" on:click={openSearch}>
    <img src="icons/misc_search.png">
</button>
<div class="overlay" class:active>
    <button class="btn" on:click={closeSearch}>
        <img src="icons/misc_close.png">
    </button>
    <div class="search-wrapper">
        <input class="search-box" type="text" placeholder="City or ZIP code" on:input={debounce}>
        {#await resultPromise}
            <span class="search-pending">Loading...</span>
        {:then results}
            {#each results as result}
                <a class="search-result" href="/{result.id}" data-sveltekit-reload>{result.fullName}</a>
            {/each}
        {:catch}
            {#if query != ""}
                <span class="search-pending">No results found.</span>
            {/if}
        {/await}
    </div>
</div>


<style lang="scss">
    @use "/src/lib/style.scss";
    $overlay-color: rgba(0, 0, 0, 50%);
    $search-color: rgba(0, 0, 0, 20%);

    .btn {
        all: unset;
        padding: 8px;           
        width: min-content;             
        &:hover {
            cursor: pointer;
        }
        &:focus-visible {
            outline: 2px dashed white;  
            outline-offset: -2px;
        }
    }
    
    .overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;

        display: flex;
        flex-direction: column;

        padding: 16px;
        background-color: $overlay-color;
        opacity: 0%;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        visibility: hidden;

        &.active {
            visibility: visible;
            opacity: 100%;
        }
        .search-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            border: 2px solid rgba(255, 255, 255, 80%);

            .search-box {
                width: 100%;
                border-bottom: 2px solid rgba(255, 255, 255, 20%);
            }
            .search-pending {
                background-color: rgba(0, 0, 0, 20%);
                padding: 14px;
                box-sizing: border-box;
                width: 100%;
                text-align: center;
            }
            .search-result {
                all: unset;
                background-color: rgba(0, 0, 0, 20%);   
                padding: 14px;
                box-sizing: border-box;
                width: 100%;
                transition: background-color 0.2s ease;
                &:hover {
                    background-color: rgba(255, 255, 255, 10%);
                }
                &:focus-visible {
                    background-color: rgba(255, 255, 255, 10%);
                }
            }
        }

    }

    @media (min-width: style.$medium) {
        .overlay {
            padding: 64px;
        }
    }
    @media(min-width: style.$large) {
        .overlay {
            padding: 128px 256px 128px 256px;
        }
    }

</style>