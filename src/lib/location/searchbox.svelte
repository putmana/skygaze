<script lang="ts">
	import { invalidateAll } from "$app/navigation";


    let location = "billings";

    function queryLocation(query: string) {
    }
    
</script>
<form method="POST" action="?/queryLocation">
    <input type="text" id="query" name="query">
</form>
