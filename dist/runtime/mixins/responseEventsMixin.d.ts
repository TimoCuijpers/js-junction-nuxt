/**
 * @mixin responseEventsMixin
 */
declare const responseEventsMixin: {
    /**
     * Constructor of the mixin.
     *
     * @protected
     */
    _initResponseEvents(): void;
    /**
     * Add `onSuccess` callback to be called after the request.
     *
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    onSuccess(callback?: () => void): any;
    /**
     * Add `onError` callback to be called after the request.
     *
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    onError(callback?: () => void): any;
    /**
     * Add `onValidationError` callback to be called after the request.
     *
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    onValidationError(callback?: () => void): any;
    /**
     * Add `onUnauthorized` callback to be called after the request.
     *
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    onUnauthorized(callback?: () => void): any;
    /**
     * Add `onForbidden` callback to be called after the request.
     *
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    onForbidden(callback?: () => void): any;
    /**
     * Add `onFinished` callback to be called after the request.
     *
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    onFinished(callback?: () => void): any;
    /**
     * Add `onCancelled` callback to be called after the request.
     *
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    onCancelled(callback?: () => void): any;
    /**
     * Clears all callbacks.
     *
     * @returns {this} The current instance.
     */
    clearAllCallbacks(): any;
    /**
     * Clears all `onSuccess` callbacks.
     *
     * @returns {this} The current instance.
     */
    clearOnSuccessCallbacks(): any;
    /**
     * Clears all `onError` callbacks.
     *
     * @returns {this} The current instance.
     */
    clearOnErrorCallbacks(): any;
    /**
     * Clears all `onValidationError` callbacks.
     *
     * @returns {this} The current instance.
     */
    clearOnValidationErrorCallbacks(): any;
    /**
     * Clears all `onUnauthorized` callbacks.
     *
     * @returns {this} The current instance.
     */
    clearOnUnauthorizedCallbacks(): any;
    /**
     * Clears all `onForbidden` callbacks.
     *
     * @returns {this} The current instance.
     */
    clearOnForbiddenCallbacks(): any;
    /**
     * Clears all `onFinished` callbacks.
     *
     * @returns {this} The current instance.
     */
    clearOnFinishedCallbacks(): any;
    /**
     * Clears all `onCancelled` callbacks.
     *
     * @returns {this} The current instance.
     */
    clearOnCancelledCallbacks(): any;
};
export default responseEventsMixin;
