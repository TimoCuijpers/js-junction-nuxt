export default class ResponseEventsHandler {
    _responseEventsList: any[];
    _onSuccessData: any;
    /**
     * @param {ResponseEvents} responseEvents
     * @returns {ResponseEventsHandler}
     */
    addResponseEvents(responseEvents: ResponseEvents): ResponseEventsHandler;
    /**
     * @param {*} data
     * @returns {ResponseEventsHandler}
     */
    setOnSuccessData(data: any): ResponseEventsHandler;
    /**
     * @param {Response} response
     */
    triggerResponseEvents(response: Response): Promise<void>;
    /**
     * @param {function[]} callbacks
     * @param data
     * @returns {Promise}
     * @private
     */
    private _executeCallbacks;
    /**
     * @param {Response} response
     */
    _executeOnSuccessCallbacks(response: Response): Promise<void>;
    /**
     * @param {Response} response
     */
    _executeOnErrorCallbacks(response: Response): Promise<void>;
    /**
     * @param {Response} response
     */
    _executeOnValidationErrorCallbacks(response: Response): Promise<void>;
    /**
     * @param {Response} response
     */
    _executeOnUnauthorizedCallbacks(response: Response): Promise<void>;
    /**
     * @param {Response} response
     */
    _executeOnForbiddenCallbacks(response: Response): Promise<void>;
    /**
     * @param {Response} response
     */
    _executeOnFinishedCallbacks(response: Response): Promise<void>;
    /**
     * @param {Response} response
     */
    _executeOnCancelledCallbacks(response: Response): Promise<void>;
}
