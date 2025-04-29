import Action from './request/action.js';
import Connection from './connection.js.js';
import Filters from './filters/filters.js';
import Modifiers from './modifiers/modifiers.js';
import Pagination from './request/pagination.js';
import ResponseEventsHandler from './response/responseEventsHandler.js';
import Api from "./api.js";
/**
 * @mixes actionMixin
 * @mixes filterMixin
 * @mixes modifierMixin
 * @mixes paginationMixin
 * @mixes responseEventsMixin
 */
export default class Request {
    _action: Action;
    _filters: Filters;
    _modifiers: Modifiers;
    _pagination: Pagination;
    _customParameters: Array<any>;
    _connection: Connection;
    _response: any;
    key: any;
    url: string;
    constructor();
    setKey(key: any): this;
    get response(): any;
    /**
     * @param {string} url
     *
     * @returns {this} The current instance.
     */
    setUrl(url: string): this;
    /**
     * @param {object} config
     *
     * @returns {this} The current instance.
     */
    setConfig(config: object): this;
    /**
     * @returns {this} The current instance.
     */
    cancel(): this;
    /**
     * @returns {this} The current instance.
     */
    get(): Promise<this>;
    /**
     * @param {Object} data
     *
     * @returns {this} The current instance.
     */
    post(data?: object): Promise<this>;
    /**
     * @param {Object} data
     *
     * @returns {this} The current instance.
     */
    put(data?: object): Promise<this>;
    /**
     * @returns {this} The current instance.
     */
    delete(): Promise<this>;
    /**
     * @param {Object} files
     * @param {Object} data
     * @param {string|null} url
     *
     * @returns {this} The current instance.
     */
    storeFiles(files?: object, data?: object, url?: string | null): Promise<this>;
    /**
     * @returns {Object} Filter and modifier query parameters.
     */
    get bodyParameters(): object;
    /**
     * @returns {ResponseEventsHandler}
     * @private
     */
    _createResponseEventsHandler(): ResponseEventsHandler;
    /**
     * Add custom parameters to the request.
     *
     * @param {Object} parameters
     *
     * @returns {this} The current instance.
     */
    customParameters(parameters?: {}): this;
    /**
     * Convert data to FormData.
     *
     * @param {Object} data
     *
     * @returns {FormData}
     */
    _createFormData(data?: object): FormData;
    /**
     * @param {Api} api
     *
     * @returns {this} The current instance.
     */
    setApi(api: Api): this;
}
