import Model from "../model.js";
/**
 * @implements {Property}
 */
export default class Accessors {
    /**
     * @param {Model} model Instance of the model.
     */
    constructor(model: this);
    /**
     * @param {Model} model
     * @param {Object} json.
     */
    fromJson(model: Model, json: any): void;
    /**
     * @param {Model} model
     *
     * @return {Object} The attributes cast to a JSON object.
     */
    toJson(model: {
        constructor: {
            accessors: () => any;
        };
    }): object;
    /**
     * @param {Model} model
     * @param {string} attribute
     *
     * @returns {*} The value of the attribute.
     */
    get(model: {
        constructor: {
            accessors: () => any;
        };
    }, attribute: any): any;
    /**
     * @param {Model} model
     * @param {string} attribute
     * @param {*} value
     *
     * @returns {*} The value that was set.
     */
    set(model: Model, attribute: string, value: any): any;
    /**
     * @private
     *
     * @param {*} value
     * @param {Object} options
     *
     * @returns {*} The cast value.
     */
    static _getCastedFromJsonValue(value: any, options: object): any;
    /**
     * @private
     *
     * @param {*} value
     * @param {Object} options
     *
     * @returns {*} The cast value.
     */
    static _getCastedToJsonValue(value: any, options: {
        type: any;
        toJson: any;
    }): any;
}
