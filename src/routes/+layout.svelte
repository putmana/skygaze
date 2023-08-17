<script lang="ts">
    import { color } from "$lib/stores";
    import "../app.scss";
    
</script>

<body style="--background-color: {$color}">
    <nav>
        
    </nav>
    <slot/>
</body>


<style lang="scss">
    body {
        transition: background-color 0.8s ease-in-out;
        color: white;
        background-color: var(--background-color);
        height: 100vh;
    }
</style>