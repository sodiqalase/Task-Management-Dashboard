import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// Define a type for the query parameters
type URLQuery = Record<string, string>;

// Function to parse query parameters from the URL
export const useURLQuery = (effectFn?: (data: URLQuery) => void) => {
    const route = useRoute();
    const router = useRouter();

    // Create a reactive reference for query parameters
    const query = ref<URLQuery>({});

    // Parse the URL query string into an object
    const parseQuery = () => {
        const url = new URLSearchParams((route?.query as any) ?? "");
        const q = Array.from(url.keys()).reduce<URLQuery>((acc, cur) => {
            acc[cur] = url.get(cur) || "";
            return acc;
        }, {});
        query.value = q;
    };

    // Watch for changes in the route to update the query
    watch(
        () => route.query,
        () => {
            parseQuery();
            effectFn?.(query.value);
        }
    );

    // Method to update the query parameters in the URL
    const setURLQuery = (
        queries: Partial<URLQuery>,
        clearAll: boolean = false
    ) => {
        const url = new URLSearchParams(clearAll ? "" : (route.query as any));
        Object.keys(queries).forEach((key) => {
            const value = queries[key];
            if (value !== null) {
                url.set(key, String(value));
            } else if (url.has(key)) {
                url.delete(key);
            }
        });
        router.replace({ query: Object.fromEntries(url.entries()) });
    };

    return {
        value: query,
        setURLQuery,
    };
};
