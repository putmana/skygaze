<script lang="ts">
    export let active = false;

    export let labelLeft: string = "";
    export let labelRight: string = "";

    function toggleSwitch() {
        active = !active;
    }

</script>

<button class="btn" on:click={toggleSwitch}>
    <div class="label" class:active={!active}>{labelLeft}</div>
    {#if active}
        <img src="icons/switch_right.png">
    {:else}
        <img src="icons/switch_left.png">
    {/if}
    <div class="label" class:active={active}>{labelRight}</div>
</button>

<style lang="scss">
    @use "/src/lib/style.scss";
    button {
        all: unset;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;
        padding: 12px;
    }
    .label {
        line-height: 0.5;
        opacity: 0.5;
        @include style.lhCrop(1.5);
        &.active {
            opacity: 1;
        }
    }
</style>