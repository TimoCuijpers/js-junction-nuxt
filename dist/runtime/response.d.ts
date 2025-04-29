export default class Response {
    constructor();
    /**
     * @deprecated Use `isFailed` instead.
     * @returns {boolean}
     */
    get failed(): boolean;
    /**
     * @returns {boolean}
     */
    get isFailed(): boolean;
    /**
     * Check whether the request is finished and returned a response.
     *
     * @returns {boolean}
     */
    get isFinished(): boolean;
    /**
     * Check whether the request was cancelled.
     *
     * @returns {boolean}
     */
    get isCancelled(): any;
    /**
     * @returns {Number} The HTTP response status code.
     */
    get statusCode(): any;
    setOfetchResponse(ofetchResponse: any): void;
    setOfetchError(ofetchError: any): void;
}
