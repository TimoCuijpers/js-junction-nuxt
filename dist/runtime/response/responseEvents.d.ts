export default class ResponseEvents {
    _onSuccessCallbacks: any[];
    _onErrorCallbacks: any[];
    _onValidationErrorCallbacks: any[];
    _onUnauthorizedCallbacks: any[];
    _onForbiddenCallbacks: any[];
    _onFinishedCallbacks: any[];
    _onCancelledCallbacks: any[];
    /**
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    addOnSuccessCallback(callback?: () => any): this;
    /**
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    addOnErrorCallback(callback?: () => any): this;
    /**
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    addOnValidationErrorCallback(callback?: () => any): this;
    /**
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    addOnUnauthorizedCallback(callback?: () => any): this;
    /**
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    addOnForbiddenCallback(callback?: () => any): this;
    /**
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    addOnFinishedCallback(callback?: () => any): this;
    /**
     * @param {function()} callback
     *
     * @returns {this} The current instance.
     */
    addOnCancelledCallback(callback?: () => any): this;
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
