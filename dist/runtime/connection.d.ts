export default class Connection {
    _abortController: AbortController | null;
    _config: {};
    _api: any;
    running: boolean;
    canceled: boolean;
    failed: boolean;
    cancel(): this | undefined;
    cancelRunning(request: any): void;
    removeRequest(request: any): void;
    getConfig(): {};
    setConfig(config: any): void;
    setApi(api: any): void;
    get(query: any, params: any): Promise<Response>;
    post(query: any, data: any): Promise<Response>;
    put(query: any, params: any): Promise<Response>;
    delete(query: any): Promise<Response>;
    _execute(url: any, method: any, body: any): Promise<Response>;
}
import Response from './response.js';
