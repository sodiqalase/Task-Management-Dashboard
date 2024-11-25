import { useQuery, useQueryClient, UseQueryOptions } from "@tanstack/vue-query";
import { computed, Ref } from "vue";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import ApiClient from "../services/axios_config";

interface IFetchProps<T>
    extends Omit<UseQueryOptions<T>, "queryKey" | "queryFn"> {
    url: string;
    key: string;
    params?: Ref<Record<string, string | number | null | undefined | boolean>>;
    onSuccess?: (
        result: T,
        queryClient: ReturnType<typeof useQueryClient>
    ) => void;
    axiosOptions?: AxiosRequestConfig;
}

function useFetch<TData>({
    url,
    key,
    params,
    onSuccess = undefined,
    axiosOptions = {},
    ...queryOptions
}: IFetchProps<TData>) {
    const queryClient = useQueryClient();

    const queryKey = computed(() => [key, { url, ...(params?.value ?? {}) }]);

    const queryFn = async () => {
        const response: AxiosResponse<TData> = await ApiClient.get(url, {
            data: {},
            params: Object.keys(params?.value ?? {})
                .filter(
                    (key) =>
                        ![undefined, null, ""].includes(
                            (params?.value as any)[key]
                        )
                )
                .reduce(
                    (acc, cur) => {
                        acc[cur] = params?.value[cur];
                        return acc;
                    },
                    {} as Record<string, any>
                ),
            ...axiosOptions,
        });

        const extractedResponse = response.data;

        onSuccess?.(extractedResponse, queryClient);

        return extractedResponse;
    };

    const queryOptionsWithDefaults = {
        queryKey: queryKey.value,
        queryFn,
        ...queryOptions,
    };

    return useQuery(queryOptionsWithDefaults);
}

export default useFetch;
