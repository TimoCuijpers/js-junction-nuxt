import Response from './response.js';
export default class Connection {
    constructor();
    cancel(): this | undefined;
    cancelRunning(request: any): void;
    removeRequest(request: any): void;
    getConfig(): any;
    setConfig(config: any): void;
    setApi(api: any): void;
    get(query: any, params: any): Promise<Response>;
    post(query: any, data: any): Promise<Response>;
    put(query: any, params: any): Promise<Response>;
    delete(query: any): Promise<Response>;
    _execute(url: any, method: any, body: any): Promise<Response>;
}
