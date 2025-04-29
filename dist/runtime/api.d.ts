import Request from './request.js';
import Batch from './batch.js';
/**
 * @mixes responseEventsMixin
 */
export default class Api {
    constructor();
    /**
     * @param {string} host
     *
     * @returns {this} The current instance.
     */
    host(host: any): this;
    /**
     * @param {string} suffix
     *
     * @returns {this} The current instance.
     */
    suffix(suffix: any): this;
    /**
     * @returns {string} Url containing the host and suffix.
     */
    get baseUrl(): string;
    /**
     * @param {Request} request
     */
    cancelRunning(request: any): void;
    /**
     * @param {Request} request
     */
    removeRequest(request: any): void;
    /**
     * @param {string} uri
     *
     * @returns {Request} The created request.
     */
    request(uri: any): Request;
    /**
     * @returns {this} The current instance.
     */
    cancelRequests(): this;
    /**
     * @param {array} requests
     * @returns Batch
     */
    batch(requests: any): Batch;
    /**
     * @param {string} token
     */
    setBearer(token: any): void;
    resetBearer(): void;
    /**
     * @param {function(Response)} onSuccess
     * @param {function(Error)} onError
     *
     * @returns {this}
     */
    responseInterceptors(onSuccess?: () => void, onError?: () => void): void;
}
