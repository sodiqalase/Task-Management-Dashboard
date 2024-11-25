import { ref } from "vue";
import axios, { AxiosRequestConfig } from "axios";
import { useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toastification";

import ApiClient from "../services/axios_config";

type IMethod = "delete" | "post" | "put" | "patch" | "get";

export type IUrlParams = Record<string, any>;

interface IMutationProps {
    method: IMethod;
    url: string | ((params: IUrlParams) => string);
    invalidateKeys?: string[];
    customSuccessMessage?: string;
    showApiSuccessMesssage?: boolean;
    showApiErrorMesssage?: boolean;
    customErrorMessage?: string;
}

const toast = useToast();

const useCustomMutation = (props: IMutationProps) => {
    const {
        showApiErrorMesssage = true,
        showApiSuccessMesssage = false,
        invalidateKeys = [],
        customErrorMessage,
        customSuccessMessage,
        method,
        url,
    } = props;

    const queryClient = useQueryClient();
    const isLoading = ref(false);

    const makeRequest = async (
        body?: object,
        axiosOptions: AxiosRequestConfig = {},
        urlParams: IUrlParams = {} // params for constructing dynamic URLs
    ) => {
        isLoading.value = true;

        const apiUrl = typeof url === "function" ? url(urlParams) : url;

        try {
            const axiosResponse = await ApiClient[method](apiUrl, body || {}, {
                ...axiosOptions,
            });

            const response = axiosResponse.data;

            if (response) {
                if (invalidateKeys?.length > 0) {
                    invalidateKeys.forEach((query_key) => {
                        queryClient.invalidateQueries({
                            queryKey: [query_key],
                        });
                    });
                }

                if (customSuccessMessage?.trim()) {
                    toast.success(customSuccessMessage);
                } else if (showApiSuccessMesssage) {
                    toast.success(
                        response?.message || response?.supportDescriptiveMessage
                    );
                }
            }

            return response;
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                if (err?.response) {
                    if (customErrorMessage?.trim()) {
                        toast.error(customErrorMessage);
                    } else if (showApiErrorMesssage) {
                        const errorData = err.response.data;
                        toast.error(
                            toast.error(
                                errorData?.error ??
                                    errorData?.message ??
                                    "'Seems something went wrong. Please contact our support team.'"
                            )
                        );
                    }
                } else if (err?.request) {
                    if (!navigator?.onLine && err?.code === "ERR_NETWORK") {
                        toast.error(
                            "Cannot connect to the Internet. Check your network."
                        );
                    } else {
                        toast.error(
                            "Seems something went wrong. Please contact our support team."
                        );
                    }
                }
            }

            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    return {
        makeRequest,
        isLoading,
    };
};

export { useCustomMutation };
