export default class ResponseEvents {
    constructor();
    /**
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    addOnSuccessCallback(callback?: () => void): this;
    /**
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    addOnErrorCallback(callback?: () => void): this;
    /**
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    addOnValidationErrorCallback(callback?: () => void): this;
    /**
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    addOnUnauthorizedCallback(callback?: () => void): this;
    /**
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    addOnForbiddenCallback(callback?: () => void): this;
    /**
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    addOnFinishedCallback(callback?: () => void): this;
    /**
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    addOnCancelledCallback(callback?: () => void): this;
    /**
     * Clears all `onSuccess` callbacks.
     *
     * @returns {this} The current instance.
     */
    clearOnSuccessCallbacks(): this;
    /**
     * Clears all `onError` callbacks.
     *
     * @returns {this} The current instance.
     */
    clearOnErrorCallbacks(): this;
    /**
     * Clears all `onValidationError` callbacks.
     *
     * @returns {this} The current instance.
     */
    clearOnValidationErrorCallbacks(): this;
    /**
     * Clears all `onUnauthorized` callbacks.
     *
     * @returns {this} The current instance.
     */
    clearOnUnauthorizedCallbacks(): this;
    /**
     * Clears all `onForbidden` callbacks.
     *
     * @returns {this} The current instance.
     */
    clearOnForbiddenCallbacks(): this;
    /**
     * Clears all `onFinished` callbacks.
     *
     * @returns {this} The current instance.
     */
    clearOnFinishedCallbacks(): this;
    /**
     * Clears all `onCancelled` callbacks.
     *
     * @returns {this} The current instance.
     */
    clearOnCancelledCallbacks(): this;
    /**
     * Clears all callbacks.
     *
     * @returns {this} The current instance.
     */
    clearAllCallbacks(): this;
}
