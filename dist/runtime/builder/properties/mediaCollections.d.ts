/**
 * @implements {Property}
 */
export default class MediaCollections implements Property {
    /**
     * @param {Model} model Instance of the model.
     */
    constructor(model: Model);
    /**
     * @param {Model} model
     *
     * @return {Object} The attributes casted to a json object.
     */
    toJson(model: Model): any;
}
