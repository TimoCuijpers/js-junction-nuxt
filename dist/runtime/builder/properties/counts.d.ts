/**
 * @implements {Property}
 */
export default class Counts {
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
     * @param {string} attribute
     * @param {*} value
     *
     * @returns {*} The value that was set.
     */
    set(model: any, attribute: any, value: any): any;
    /**
     * @param {string} key
     * @param {boolean} camelCase
     * @returns {string} The key with `count` appended to it, in specified casing.
     */
    key(key: any, camelCase?: boolean): any;
}
