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
    get(model: Model, key: string): any;
    /**
     * @param {Model} model
     * @param {string} key
     * @param {*} value
     *
     * @returns {*} The value that was set.
     */
    set(model: Model, key: string, value: any): any;
    /**
     * @param {Model} model
     * @param {Object} json.
     */
    fromJson(model: Model, json: any): void;
    /**
     * @param {Model} model
     *
     * @return {Object} The json object.
     */
    toJson(model: Model): any;
}
