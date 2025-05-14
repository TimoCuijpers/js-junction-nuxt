/**
 * @mixes actionMixin
 * @mixes filterMixin
 * @mixes modifierMixin
 * @mixes paginationMixin
 * @mixes responseEventsMixin
 */
export default class Request {
    url: string | null;
    _action: Action;
    _filters: Filters;
    _modifiers: Modifiers;
    _pagination: Pagination;
    _customParameters: any[];
    _connection: Connection;
    _response: import("./response").default | null;
    key: any;
    setKey(key: any): this;
    get response(): import("./response").default | null;
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
    get(): this;
    /**
     * @param {Object} body
     *
     * @returns {this} The current instance.
     */
    post(body?: any): this;
    /**
     * @param {Object} body
     *
     * @returns {this} The current instance.
     */
    put(body?: any): this;
    /**
     * @returns {this} The current instance.
     */
    delete(): this;
    /**
     * @param {Object} files
     * @param {Object} body
     * @param {string|null} url
     *
     * @returns {this} The current instance.
     */
    storeFiles(files?: any, body?: any, url?: string | null): this;
    /**
     * @returns {Object} Filter and modifier query parameters.
     */
    get bodyParameters(): any;
    /**
     * @returns {ResponseEventsHandler}
     * @private
     */
    private _createResponseEventsHandler;
    /**
     * Add custom parameters to the request.
     *
     * @param {Object} parameters
     *
     * @returns {this} The current instance.
     */
    customParameters(parameters?: any): this;
    /**
     * Convert data to FormData.
     *
     * @param {Object} data
     *
     * @returns {FormData}
     */
    _createFormData(data?: any): FormData;
    /**
     * @param {Api} api
     *
     * @returns {this} The current instance.
     */
    setApi(api: Api): this;
}
import Action from './request/action.js';
import Filters from './filters/filters.js';
import Modifiers from './modifiers/modifiers.js';
import Pagination from './request/pagination.js';
import Connection from './connection.js';
