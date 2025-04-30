/**
 * @mixes responseEventsMixin
 */
export default class Api {
    _requests: any[];
    /**
     * @param {string} host
     *
     * @returns {this} The current instance.
     */
    host(host: string): this;
    _host: string | undefined;
    /**
     * @param {string} suffix
     *
     * @returns {this} The current instance.
     */
    suffix(suffix: string): this;
    _suffix: string | undefined;
    /**
     * @returns {string} Url containing the host and suffix.
     */
    get baseUrl(): string;
    /**
     * @param {Request} request
     */
    cancelRunning(request: Request): void;
    /**
     * @param {Request} request
     */
    removeRequest(request: Request): void;
    /**
     * @param {string} uri
     *
     * @returns {Request} The created request.
     */
    request(uri: string): Request;
    /**
     * @returns {this} The current instance.
     */
    cancelRequests(): this;
    /**
     * @param {array} requests
     * @returns Batch
     */
    batch(requests: any[]): Batch;
    /**
     * @param {string} token
     */
    setBearer(token: string): void;
    resetBearer(): void;
    /**
     * @param {function(Response)} onSuccess
     * @param {function(Error)} onError
     *
     * @returns {this}
     */
    responseInterceptors(onSuccess?: (arg0: Response) => any, onError?: (arg0: Error) => any): this;
}
import Request from './request.js';
import Batch from './batch.js';
