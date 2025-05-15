/**
 * @implements {Property}
 */
export default class Relations implements Property {
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
     * @param {string} relation
     *
     * @returns {*} The value of the relation.
     */
    get(model: Model, relation: string): any;
    /**
     * @param {Model} model
     * @param {string|Object} relation
     * @param {*} value
     *
     * @returns {Relations}
     */
    set(model: Model, relation: string | any, value?: any): Relations;
}
import Model from "../model.js.js";
