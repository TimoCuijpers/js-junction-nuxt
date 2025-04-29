import Accessors from './properties/accessors.js';
import Attributes from './properties/attributes.js';
import Counts from './properties/counts.js';
import Relations from './properties/relations.js';
import MediaCollections from './properties/mediaCollections.js';
import Request from '../request.js';
export declare class Model extends Request {
    _accessors: Accessors;
    _attributes: Attributes;
    _counts: Counts;
    _relations: Relations;
    _mediaCollections: MediaCollections;
    _media: any;
    clearAllCallbacks: any;
    constructor(defaults?: {});
    /**
     * Create an instance of the model for the given JSON object.
     *
     * @param {Object} json
     *
     * @returns {this} An instance of the model.
     */
    static fromJson(json: object): this;
    /**
     * Convert the attributes of the current instance to JSON.
     *
     * @return {Object} The attributes of the current instance as JSON object.
     */
    toJson(): object;
    /**
     * @param values
     * @returns {this}
     */
    fill(values?: {}): this;
    /**
     * The accessors of the model which were appended on the api side.
     *
     * @returns {Object.<any, Object>}
     */
    static accessors(): object;
    /**
     * The attributes of the model.
     *
     * @returns {Object.<any, Object>}
     */
    static attributes(): object;
    /**
     * The counts of relations of the model.
     *
     * @returns {Object.<any, Object>}
     */
    static counts(): object;
    /**
     * The relations of the model.
     *
     * @returns {Object.<any, Object>}
     */
    static relations(): object;
    /**
     * The media collections of the model
     *
     * @returns {Object.<any, Object>}
     */
    static mediaCollections(): object;
    /**
     * @returns {string} Endpoint of the model for the API.
     */
    static get endpoint(): string;
    /**
     * @returns {int} Identifier attribute name of the model.
     */
    get _identifier(): number;
    /**
     * Get a list of models.
     *
     * @returns {this[]} List of models.
     */
    index(): Promise<this[]>;
    /**
     * Get a single model.
     *
     * @param {int} [identifier]
     *
     * @returns {this} Model found for the given id.
     */
    show(identifier: number): Promise<this>;
    /**
     * Create a model.
     *
     * @param {Object} [extraData] Extra data to send to the API
     *
     * @returns {this} The created model.
     */
    store(extraData?: object): Promise<this>;
    /**
     * Update the current model.
     *
     * @param {Object} [extraData] Extra data to send to the API
     *
     * @returns {this} The updated model.
     */
    update(extraData?: object): Promise<this>;
    /**
     * Delete the current model.
     *
     * @returns {boolean} Whether the deletion was successful.
     */
    destroy(): Promise<boolean>;
    /**
     * Upload a temporary media file to the API.
     *
     * @param {array|File} [files] The uploaded file or files.
     * @param {string} [collection] The name of the file collection.
     *
     * @returns {array} The received media ids.
     */
    upload(files: Array<any> | File, collection: string): Promise<Array<any>>;
    /**
     * Save the current model.
     * Based on the value of the identifier `store` or `update` will be called.
     *
     * @param {Object} [extraData] Extra data to send to the API
     *
     * @returns {this} The created or updated model.
     */
    save(extraData?: object): Promise<this>;
    /**
     * @returns {this} The new clone of the current model.
     */
    clone(): this;
    /**
     * Generate the query string for this model.
     * @private
     *
     * @param {int} [identifier] The identifier of the model.
     *
     * @returns {string} The querystring for the model.
     */
    _queryString(identifier?: number): string;
}
export default Model;
