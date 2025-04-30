/**
 * @implements {Property}
 */
export default class Accessors implements Property {
    /**
     * @private
     *
     * @param {*} value
     * @param {Object} options
     *
     * @returns {*} The casted value.
     */
    private static _getCastedFromJsonValue;
    /**
     * @private
     *
     * @param {*} value
     * @param {Object} options
     *
     * @returns {*} The casted value.
     */
    private static _getCastedToJsonValue;
    /**
     * @param {Model} model Instance of the model.
     */
    constructor(model: Model);
    /**
     * @param {Model} model
     * @param {Object} json.
     */
    fromJson(model: Model, json: any): void;
    /**
     * @param {Model} model
     *
     * @return {Object} The attributes casted to a json object.
     */
    toJson(model: Model): any;
    /**
     * @param {Model} model
     * @param {string} attribute
     *
     * @returns {*} The value of the attribute.
     */
    get(model: Model, attribute: string): any;
    /**
     * @param {Model} model
     * @param {string} attribute
     * @param {*} value
     *
     * @returns {*} The value that was set.
     */
    set(model: Model, attribute: string, value: any): any;
}
