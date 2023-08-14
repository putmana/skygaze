import { goto } from '$app/navigation';
import { DEFAULT_LOCATION, stringifyLocation } from '$lib/location/location';
import { getLocation } from '$lib/location/location.server.js';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions = {
    queryLocation: async({request, cookies}) => {
        const formInfo = await request.formData();
        const data = await getLocation(formInfo.get('query')?.toString() ?? "billings").then(result => {
            // If OWM returns no results, throw an error stating as such
            if (result.length === 0) throw new Error("No results found")

            // If OWM returns an error code, return the code and error message
            if (result.cod) throw new Error("Error " + result.cod + ": " +result.message)

            // If no errors are found, set the location cookie and redirect to the weather page
            cookies.set('location', result[0].lat + "," + result[0].lon, { path: "/" })
            return {
                success: true,
                data: result
            }

        }).catch(err => {
            console.log(err)
            return {
                success: false,
                data: err.message
            }
        })

        console.log(data);
        return data;
    },

    setLocation: async({ request, cookies }) => {
        const formInfo = await request.formData();

        const location = formInfo.get('location')?.toString() ?? stringifyLocation(DEFAULT_LOCATION);
        console.log(location)

        cookies.set('location', location);

        throw redirect(303, '/weather');
    }

} satisfies Actions;