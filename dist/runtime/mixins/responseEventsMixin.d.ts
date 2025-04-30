export default responseEventsMixin;
declare namespace responseEventsMixin {
    /**
     * Constructor of the mixin.
     *
     * @protected
     */
    function _initResponseEvents(): void;
    /**
     * Add `onSuccess` callback to be called after the request.
     *
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    function onSuccess(callback?: () => any): this;
    /**
     * Add `onError` callback to be called after the request.
     *
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    function onError(callback?: () => any): this;
    /**
     * Add `onValidationError` callback to be called after the request.
     *
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    function onValidationError(callback?: () => any): this;
    /**
     * Add `onUnauthorized` callback to be called after the request.
     *
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    function onUnauthorized(callback?: () => any): this;
    /**
     * Add `onForbidden` callback to be called after the request.
     *
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    function onForbidden(callback?: () => any): this;
    /**
     * Add `onFinished` callback to be called after the request.
     *
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    function onFinished(callback?: () => any): this;
    /**
     * Add `onCancelled` callback to be called after the request.
     *
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    function onCancelled(callback?: () => any): this;
    /**
     * Clears all callbacks.
     *
     * @returns {this} The current instance.
     */
    function clearAllCallbacks(): this;
    /**
     * Clears all `onSuccess` callbacks.
     *
     * @returns {this} The current instance.
     */
    function clearOnSuccessCallbacks(): this;
    /**
     * Clears all `onError` callbacks.
     *
     * @returns {this} The current instance.
     */
    function clearOnErrorCallbacks(): this;
    /**
     * Clears all `onValidationError` callbacks.
     *
     * @returns {this} The current instance.
     */
    function clearOnValidationErrorCallbacks(): this;
    /**
     * Clears all `onUnauthorized` callbacks.
     *
     * @returns {this} The current instance.
     */
    function clearOnUnauthorizedCallbacks(): this;
    /**
     * Clears all `onForbidden` callbacks.
     *
     * @returns {this} The current instance.
     */
    function clearOnForbiddenCallbacks(): this;
    /**
     * Clears all `onFinished` callbacks.
     *
     * @returns {this} The current instance.
     */
    function clearOnFinishedCallbacks(): this;
    /**
     * Clears all `onCancelled` callbacks.
     *
     * @returns {this} The current instance.
     */
    function clearOnCancelledCallbacks(): this;
}
