export default class Connection {
    _abortController: AbortController | null;
    _config: {};
    _api: Api;
    running: boolean;
    canceled: boolean;
    failed: boolean;
    cancel(): this | undefined;
    cancelRunning(request: any): void;
    removeRequest(request: any): void;
    getConfig(): {};
    setConfig(config: any): void;
    setApi(api: any): void;
    get(query: any, params: any): Promise<Response | {
        signal: AbortSignal;
        onResponse({ request: req, response: res, options: opt }: {
            request: any;
            response: any;
            options: any;
        }): Promise<void>;
        onResponseError({ request: req, response: res, options: opt }: {
            request: any;
            response: any;
            options: any;
        }): Promise<void>;
        url: string;
        method: any;
    }>;
    post(query: any, data: any): Promise<Response | {
        signal: AbortSignal;
        onResponse({ request: req, response: res, options: opt }: {
            request: any;
            response: any;
            options: any;
        }): Promise<void>;
        onResponseError({ request: req, response: res, options: opt }: {
            request: any;
            response: any;
            options: any;
        }): Promise<void>;
        url: string;
        method: any;
    }>;
    put(query: any, params: any): Promise<Response | {
        signal: AbortSignal;
        onResponse({ request: req, response: res, options: opt }: {
            request: any;
            response: any;
            options: any;
        }): Promise<void>;
        onResponseError({ request: req, response: res, options: opt }: {
            request: any;
            response: any;
            options: any;
        }): Promise<void>;
        url: string;
        method: any;
    }>;
    delete(query: any): Promise<Response | {
        signal: AbortSignal;
        onResponse({ request: req, response: res, options: opt }: {
            request: any;
            response: any;
            options: any;
        }): Promise<void>;
        onResponseError({ request: req, response: res, options: opt }: {
            request: any;
            response: any;
            options: any;
        }): Promise<void>;
        url: string;
        method: any;
    }>;
    _execute(url: any, method: any, body: any): Promise<Response | {
        signal: AbortSignal;
        onResponse({ request: req, response: res, options: opt }: {
            request: any;
            response: any;
            options: any;
        }): Promise<void>;
        onResponseError({ request: req, response: res, options: opt }: {
            request: any;
            response: any;
            options: any;
        }): Promise<void>;
        url: string;
        method: any;
    }>;
}
import Api from "./api.js.js";
import Response from './response.js';
