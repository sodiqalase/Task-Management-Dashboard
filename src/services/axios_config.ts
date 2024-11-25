import axios, { AxiosRequestConfig } from "axios";
import { APP_CONSTANT } from "../utils/constant.util";

const contentType = "application/json";

const config: AxiosRequestConfig = {
    baseURL: APP_CONSTANT.baseURL,
    headers: {
        "Content-Type": contentType,
        Accept: contentType,
    },
};

export const ApiClient = axios.create(config);

export default ApiClient;
