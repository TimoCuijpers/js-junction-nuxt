import _ from 'lodash';
import Action from './request/action';
import Connection from './connection.js';
import Filters from './filters/filters';
import Modifiers from './modifiers/modifiers';
import Pagination from './request/pagination';

import actionMixin from './mixins/actionMixin';
import filterMixin from './mixins/filterMixin';
import modifierMixin from './mixins/modifierMixin';
import paginationMixin from './mixins/paginationMixin';
import responseEventsMixin from './mixins/responseEventsMixin';
import ResponseEventsHandler from './response/responseEventsHandler';
import Api from "./api";

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

  constructor() {
    this.url = null;

    this._action = new Action();
    this._filters = new Filters();
    this._modifiers = new Modifiers();
    this._pagination = new Pagination();
    this._customParameters = [];
    this._initResponseEvents();

    this._connection = new Connection();

    this._response = null;
    this.key = null;
  }

  setKey(key: any) {
    this.key = key;

    return this;
  }

  get response() {
    return this._response;
  }

  /**
   * @param {string} url
   *
   * @returns {this} The current instance.
   */
  setUrl(url: string): this {
    this.url = url;

    return this;
  }

  /**
   * @param {object} config
   *
   * @returns {this} The current instance.
   */
  setConfig(config: object): this {
    this._connection.setConfig(_.merge(this._connection.getConfig(), config));

    return this;
  }

  /**
   * @returns {this} The current instance.
   */
  cancel(): this {
    this._connection.cancel();

    return this;
  }

  /**
   * @returns {this} The current instance.
   */
  async get(): Promise<this> {
    const url = this.url ?? this.constructor.endpoint;

    this._connection.cancelRunning(this);

    this._response = await this._connection.get(url, this.bodyParameters);

    this._connection.removeRequest(this);

    const responseEventsHandler = this._createResponseEventsHandler();
    await responseEventsHandler.triggerResponseEvents(this._response);

    this.clearAllCallbacks();

    return this;
  }

  /**
   * @param {Object} data
   *
   * @returns {this} The current instance.
   */
  async post(data: object = {}): Promise<this> {
    const url = this.url ?? this.constructor.endpoint;

    this._connection.cancelRunning(this);

    this._response = await this._connection.post(url, {
      ...data,
      ...this.bodyParameters,
    });

    this._connection.removeRequest(this);

    const responseEventsHandler = this._createResponseEventsHandler();
    await responseEventsHandler.triggerResponseEvents(this._response);

    this.clearAllCallbacks();

    return this;
  }

  /**
   * @param {Object} data
   *
   * @returns {this} The current instance.
   */
  async put(data: object = {}): Promise<this> {
    const url = this.url ?? this.constructor.endpoint;

    this._connection.cancelRunning(this);

    this._response = await this._connection.put(url, {
      ...data,
      ...this.bodyParameters,
    });

    this._connection.removeRequest(this);

    const responseEventsHandler = this._createResponseEventsHandler();
    await responseEventsHandler.triggerResponseEvents(this._response);

    this.clearAllCallbacks();

    return this;
  }

  /**
   * @returns {this} The current instance.
   */
  async delete(): Promise<this> {
    const url = this.url ?? this.constructor.endpoint;

    this._connection.cancelRunning(this);

    this._response = await this._connection.delete(url);

    this._connection.removeRequest(this);

    const responseEventsHandler = this._createResponseEventsHandler();
    await responseEventsHandler.triggerResponseEvents(this._response);

    this.clearAllCallbacks();

    return this;
  }

  /**
   * @param {Object} files
   * @param {Object} data
   * @param {string|null} url
   *
   * @returns {this} The current instance.
   */
  async storeFiles(
    files: object = {},
    data: object = {},
    url: string | null = null,
  ): Promise<this> {
    let queryUrl = url ?? this.url ?? this.constructor.endpoint;

    this._connection.cancelRunning(this);

    this.setConfig({
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const formData = this._createFormData(_.merge({}, files, data));

    if (!_.isEmpty(this.bodyParameters)) {
      queryUrl = `${queryUrl}?${this.bodyParameters}`;
    }

    this._response = await this._connection.post(queryUrl, formData);

    this._connection.removeRequest(this);

    this.setConfig({
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseEventsHandler = this._createResponseEventsHandler();
    await responseEventsHandler.triggerResponseEvents(this._response);

    this.clearAllCallbacks();

    return this;
  }

  /**
   * @returns {Object} Filter and modifier query parameters.
   */
  get bodyParameters(): object {
    return _.merge(
      ..._.compact([
        this._filters.toObject(),
        this._modifiers.toObject(),
        this._pagination.toObject(),
        this._action.toObject(),
        _.merge(...this._customParameters),
      ]),
    );
  }

  /**
   * @returns {ResponseEventsHandler}
   * @private
   */
  _createResponseEventsHandler(): ResponseEventsHandler {
    const responseEventsHandler = new ResponseEventsHandler();
    responseEventsHandler.addResponseEvents(
      this._connection._api._responseEvents,
    );
    responseEventsHandler.addResponseEvents(this._responseEvents);

    return responseEventsHandler;
  }

  /**
   * Add custom parameters to the request.
   *
   * @param {Object} parameters
   *
   * @returns {this} The current instance.
   */
  customParameters(parameters = {}) {
    this._customParameters.push(parameters);

    return this;
  }

  /**
   * Convert data to FormData.
   *
   * @param {Object} data
   *
   * @returns {FormData}
   */
  _createFormData(data: object = {}): FormData {
    const formData = new FormData();

    function appendFormData(data: string | boolean | object, name?: string) {
      name = name || "";

      if (data instanceof File) {
        formData.append(name, data);
      } else if (data === true || data === false) {
        formData.append(name, data ? "1" : "0");
      } else if (_.isArray(data) || _.isObject(data)) {
        if (_.size(data) <= 0) {
          formData.append(name, "");
        } else {
          _.forOwn(data, (dataItem: string | boolean | object, key: string) => {
            const newName = name === "" ? key : name + "[" + key + "]";

            appendFormData(dataItem, newName);
          });
        }
      } else {
        formData.append(name, data);
      }
    }

    appendFormData(data);

    return formData;
  }

  /**
   * @param {Api} api
   *
   * @returns {this} The current instance.
   */
  setApi(api: Api): this {
    this._connection.setApi(api);

    return this;
  }
}

Object.assign(Request.prototype, actionMixin);
Object.assign(Request.prototype, filterMixin);
Object.assign(Request.prototype, modifierMixin);
Object.assign(Request.prototype, paginationMixin);
Object.assign(Request.prototype, responseEventsMixin);
