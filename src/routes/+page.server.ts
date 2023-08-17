import { lookupLocation, type LocationResult } from "$lib/location/location.server";
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, type Actions } from "@sveltejs/kit";

const querySchema = z.object({
    query: z.string().min(2)
})

export async function load(event) {
    // Set up the form stores with Superforms
    const form = await superValidate(event, querySchema)
    const results: LocationResult[] = []
    return {
        form,
    }
}

export const actions = {
    default: async (event) => {
        // Validate the form with Superforms
        const form = await superValidate(event, querySchema)
        const query = form.data.query
        console.log(query)
        // Look up the location
        const results = await lookupLocation(query).catch(error => {
            return fail(400, {
                error: "No results found"
            })
        });

        return { form, results }
    }
} satisfies Actions