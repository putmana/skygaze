<script lang="ts">
	import { lookupLocation } from "$lib/location/location";


    let query = "";

    let timer = 0;
    let debounce = (event: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            query = event.target.value
        }, 1000)
    } 

    $: resultPromise = lookupLocation(query)

    

</script>

<main>
    <input type="text" on:input={debounce}>
    <h4>{query}</h4>
    {#await resultPromise}
        <h4>loading...</h4>
    {:then results}
        {#each results as result}
            <a href="/{result.id}">{result.name}</a>
        {/each}
    {:catch}
        <h2>No results found</h2>
    {/await}
</main>