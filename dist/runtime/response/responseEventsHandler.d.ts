export default class ResponseEventsHandler {
    constructor();
    /**
     * @param {ResponseEvents} responseEvents
     * @returns {ResponseEventsHandler}
     */
    addResponseEvents(responseEvents: any): this;
    /**
     * @param {*} data
     * @returns {ResponseEventsHandler}
     */
    setOnSuccessData(data: any): this;
    /**
     * @param {Response} response
     */
    triggerResponseEvents(response: any): Promise<void>;
    /**
     * @param {function[]} callbacks
     * @param data
     * @returns {Promise}
     * @private
     */
    _executeCallbacks(callbacks: any, ...data: any[]): Promise<any[]>;
    /**
     * @param {Response} response
     */
    _executeOnSuccessCallbacks(response: any): Promise<void>;
    /**
     * @param {Response} response
     */
    _executeOnErrorCallbacks(response: any): Promise<void>;
    /**
     * @param {Response} response
     */
    _executeOnValidationErrorCallbacks(response: any): Promise<void>;
    /**
     * @param {Response} response
     */
    _executeOnUnauthorizedCallbacks(response: any): Promise<void>;
    /**
     * @param {Response} response
     */
    _executeOnForbiddenCallbacks(response: any): Promise<void>;
    /**
     * @param {Response} response
     */
    _executeOnFinishedCallbacks(response: any): Promise<void>;
    /**
     * @param {Response} response
     */
    _executeOnCancelledCallbacks(response: any): Promise<void>;
}
