/**
 * @interface
 */
declare class Property {
    /**
     * @param {Model} model
     * @param {string} key
     *
     * @returns {*} The value of the attribute.
     */
    get(model: any, key: any): void;
    /**
     * @param {Model} model
     * @param {string} key
     * @param {*} value
     *
     * @returns {*} The value that was set.
     */
    set(model: any, key: any, value: any): void;
    /**
     * @param {Model} model
     * @param {Object} json.
     */
    fromJson(model: any, json: any): void;
    /**
     * @param {Model} model
     *
     * @return {Object} The json object.
     */
    toJson(model: any): void;
}
