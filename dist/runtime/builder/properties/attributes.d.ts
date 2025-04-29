/**
 * @implements {Property}
 */
export default class Attributes {
    /**
     * @param {Model} model Instance of the model.
     */
    constructor(model: any);
    /**
     * @param {Model} model
     * @param {Object} json.
     */
    fromJson(model: any, json: any): void;
    /**
     * @param {Model} model
     *
     * @return {Object} The attributes casted to a json object.
     */
    toJson(model: any): {};
    /**
     * @param {Model} model
     * @param {string} attribute
     *
     * @returns {*} The value of the attribute.
     */
    get(model: any, attribute: any): any;
    /**
     * @param {Model} model
     * @param {string|Object} attribute
     * @param {*} value
     *
     * @returns {Attributes}
     */
    set(model: any, attribute: any, value?: null): this;
    /**
     * @private
     *
     * @param {*} value
     * @param {Object} options
     *
     * @returns {*} The casted value.
     */
    static _getCastedFromJsonValue(value: any, options: any): any;
    /**
     * @private
     *
     * @param {*} value
     * @param {Object} options
     *
     * @returns {*} The casted value.
     */
    static _getCastedToJsonValue(value: any, options: any): any;
}
