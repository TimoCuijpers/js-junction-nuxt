import _ from "lodash";
import Action from "./request/action.js";
import Connection from "./connection.js";
import Filters from "./filters/filters.js";
import Modifiers from "./modifiers/modifiers.js";
import Pagination from "./request/pagination.js";
import actionMixin from "./mixins/actionMixin.js";
import filterMixin from "./mixins/filterMixin.js";
import modifierMixin from "./mixins/modifierMixin.js";
import paginationMixin from "./mixins/paginationMixin.js";
import responseEventsMixin from "./mixins/responseEventsMixin.js";
import ResponseEventsHandler from "./response/responseEventsHandler.js";
export default class Request {
  _action;
  _filters;
  _modifiers;
  _pagination;
  _customParameters;
  _connection;
  _response;
  key;
  url;
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
  setKey(key) {
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
  setUrl(url) {
    this.url = url;
    return this;
  }
  /**
   * @param {object} config
   *
   * @returns {this} The current instance.
   */
  setConfig(config) {
    this._connection.setConfig(_.merge(this._connection.getConfig(), config));
    return this;
  }
  /**
   * @returns {this} The current instance.
   */
  cancel() {
    this._connection.cancel();
    return this;
  }
  /**
   * @returns {this} The current instance.
   */
  async get() {
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
  async post(data = {}) {
    const url = this.url ?? this.constructor.endpoint;
    this._connection.cancelRunning(this);
    this._response = await this._connection.post(url, {
      ...data,
      ...this.bodyParameters
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
  async put(data = {}) {
    const url = this.url ?? this.constructor.endpoint;
    this._connection.cancelRunning(this);
    this._response = await this._connection.put(url, {
      ...data,
      ...this.bodyParameters
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
  async delete() {
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
  async storeFiles(files = {}, data = {}, url = null) {
    let queryUrl = url ?? this.url ?? this.constructor.endpoint;
    this._connection.cancelRunning(this);
    this.setConfig({
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    const formData = this._createFormData(_.merge({}, files, data));
    if (!_.isEmpty(this.bodyParameters)) {
      queryUrl = `${queryUrl}?${this.bodyParameters}`;
    }
    this._response = await this._connection.post(queryUrl, formData);
    this._connection.removeRequest(this);
    this.setConfig({
      headers: {
        "Content-Type": "application/json"
      }
    });
    const responseEventsHandler = this._createResponseEventsHandler();
    await responseEventsHandler.triggerResponseEvents(this._response);
    this.clearAllCallbacks();
    return this;
  }
  /**
   * @returns {Object} Filter and modifier query parameters.
   */
  get bodyParameters() {
    return _.merge(
      ..._.compact([
        this._filters.toObject(),
        this._modifiers.toObject(),
        this._pagination.toObject(),
        this._action.toObject(),
        _.merge(...this._customParameters)
      ])
    );
  }
  /**
   * @returns {ResponseEventsHandler}
   * @private
   */
  _createResponseEventsHandler() {
    const responseEventsHandler = new ResponseEventsHandler();
    responseEventsHandler.addResponseEvents(
      this._connection._api._responseEvents
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
  _createFormData(data = {}) {
    const formData = new FormData();
    function appendFormData(data2, name) {
      name = name || "";
      if (data2 instanceof File) {
        formData.append(name, data2);
      } else if (data2 === true || data2 === false) {
        formData.append(name, data2 ? "1" : "0");
      } else if (_.isArray(data2) || _.isObject(data2)) {
        if (_.size(data2) <= 0) {
          formData.append(name, "");
        } else {
          _.forOwn(data2, (dataItem, key) => {
            const newName = name === "" ? key : name + "[" + key + "]";
            appendFormData(dataItem, newName);
          });
        }
      } else {
        formData.append(name, data2);
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
  setApi(api) {
    this._connection.setApi(api);
    return this;
  }
}
Object.assign(Request, actionMixin);
Object.assign(Request, filterMixin);
Object.assign(Request, modifierMixin);
Object.assign(Request, paginationMixin);
Object.assign(Request, responseEventsMixin);
