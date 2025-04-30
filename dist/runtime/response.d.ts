export default class Response {
    _ofetchResponse: any;
    _ofetchError: any;
    data: any;
    validation: any;
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
    get isCancelled(): boolean;
    /**
     * @returns {Number} The HTTP response status code.
     */
    get statusCode(): number;
    setOfetchResponse(ofetchResponse: any): void;
    setOfetchError(ofetchError: any): void;
}
