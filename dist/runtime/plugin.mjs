import { defineNuxtPlugin } from '#app';
import _ from 'lodash';

class Action {
  constructor() {
    this._name = null;
    this._id = null;
  }
  filled() {
    return !!this._name;
  }
  name(name) {
    this._name = name;
  }
  id(id) {
    this._id = id;
  }
  toObject() {
    if (!this.filled()) return null;
    const data = {};
    data.action = this._name;
    if (this._id) data.id = this._id;
    return data;
  }
}

class Connection {
  constructor() {
    this._abortController = null;
    this._config = {};
    this._api = null;
    this.running = false;
    this.canceled = false;
    this.failed = false;
  }
  cancel() {
    if (!this._abortController || !this.running) return this;
    this._abortController.abort();
    this.canceled = true;
  }
  cancelRunning(request) {
    this._api.cancelRunning(request);
  }
  removeRequest(request) {
    this._api.removeRequest(request);
  }
  getConfig() {
    return this._config;
  }
  setConfig(config) {
    this._config = config;
  }
  setApi(api2) {
    this._api = api2;
  }
  async get(query, params) {
    return this._execute(query, "get", params);
  }
  async post(query, data) {
    return this._execute(query, "post", data);
  }
  async put(query, params) {
    return this._execute(query, "put", params);
  }
  async delete(query) {
    return this._execute(query, "delete");
  }
  async _execute(url, method, data) {
    this.running = true;
    if (!_.startsWith(url, "/")) {
      url = `/${url}`;
    }
    const config = {
      url: (this._api ? this._api.baseUrl : api.baseUrl) + url,
      method,
      ...{
        [method === "get" ? "params" : "data"]: data
      },
      signal: (this._abortController = new AbortController()).signal
    };
    const request = useFetch(url, Object.assign(config, this._config));
    return request;
  }
}

class Filter {
  filled() {
    return !!this.toObject();
  }
  toObject() {
    return null;
  }
}

class Limit extends Filter {
  constructor() {
    super();
    this._amount = null;
  }
  filled() {
    return !!this._amount;
  }
  amount(amount) {
    this._amount = amount;
  }
  toObject() {
    const data = {};
    if (this.filled()) {
      data.limit = this._amount;
    }
    return data;
  }
}

class Order extends Filter {
  constructor() {
    super();
    this._orders = [];
  }
  filled() {
    return this._orders.length > 0;
  }
  add(column, direction) {
    this._orders.push({
      column,
      direction
    });
  }
  toObject() {
    const data = {};
    if (this.filled()) {
      data.orders = this._orders;
    }
    return data;
  }
}

let Relations$2 = class Relations extends Filter {
  constructor() {
    super();
    this._relations = [];
  }
  filled() {
    return this._relations.length > 0;
  }
  add(relations) {
    this._relations.push(...relations);
  }
  toObject() {
    const data = {};
    if (this.filled()) {
      data.with = this._relations;
    }
    return data;
  }
};

let Relations$1 = class Relations extends Filter {
  constructor() {
    super();
    this._scopes = [];
  }
  filled() {
    return this._scopes.length > 0;
  }
  add(name, params) {
    this._scopes.push({
      name,
      params
    });
  }
  toObject() {
    const data = {};
    if (this.filled()) {
      data.scopes = this._scopes;
    }
    return data;
  }
};

class Format {
  static snakeCase(value) {
    const relations = _.split(value, ".");
    const attribute = relations.pop();
    return _.join([
      ...relations,
      _.snakeCase(attribute)
    ], ".");
  }
}

class Search extends Filter {
  constructor() {
    super();
    this._value = null;
    this._columns = null;
  }
  filled() {
    return this._value;
  }
  value(value) {
    this._value = value;
  }
  columns(columns) {
    this._columns = _.map(columns, Format.snakeCase);
  }
  toObject() {
    const data = {};
    if (this.filled()) {
      data.search_value = this._value;
      data.search_columns = this._columns;
    }
    return data;
  }
}

class Wheres extends Filter {
  constructor() {
    super();
    this._wheres = [];
  }
  filled() {
    return this._wheres.length > 0;
  }
  add(column, operator, value) {
    this._wheres.push({
      column: Format.snakeCase(column),
      operator,
      value
    });
  }
  toObject() {
    const data = {};
    if (this.filled()) {
      data.wheres = this._wheres;
    }
    return data;
  }
}

class WhereIn extends Filter {
  constructor() {
    super();
    this._whereIns = [];
  }
  filled() {
    return this._whereIns.length > 0;
  }
  add(column, values) {
    this._whereIns.push({
      column: Format.snakeCase(column),
      values
    });
  }
  toObject() {
    const data = {};
    if (this.filled()) {
      data.where_in = this._whereIns;
    }
    return data;
  }
}

class WhereNotIn extends Filter {
  constructor() {
    super();
    this._whereNotIns = [];
  }
  filled() {
    return this._whereNotIns.length > 0;
  }
  add(column, values) {
    this._whereNotIns.push({
      column: Format.snakeCase(column),
      values
    });
  }
  toObject() {
    const data = {};
    if (this.filled()) {
      data.where_not_in = this._whereNotIns;
    }
    return data;
  }
}

class Count extends Filter {
  constructor() {
    super();
    this._relations = [];
  }
  filled() {
    return this._relations.length > 0;
  }
  add(relations) {
    this._relations.push(...relations);
  }
  toObject() {
    const data = {};
    if (this.filled()) {
      data.count = this._relations;
    }
    return data;
  }
}

class Pluck extends Filter {
  constructor() {
    super();
    this._fields = [];
  }
  filled() {
    return this._fields.length > 0;
  }
  add(fields) {
    this._fields.push(..._.map(fields, Format.snakeCase));
  }
  toObject() {
    const data = {};
    if (this.filled()) {
      data.pluck = this._fields;
    }
    return data;
  }
}

class Filters {
  constructor() {
    this.count = new Count();
    this.limit = new Limit();
    this.order = new Order();
    this.relations = new Relations$2();
    this.scopes = new Relations$1();
    this.search = new Search();
    this.wheres = new Wheres();
    this.whereIn = new WhereIn();
    this.whereNotIn = new WhereNotIn();
    this.pluck = new Pluck();
  }
  toObject() {
    const items = [];
    for (let i = 0, filters = ["count", "limit", "order", "relations", "scopes", "search", "wheres", "whereIn", "whereNotIn", "pluck"]; i < filters.length; i++) {
      if (this[filters[i]].filled()) items.push(this[filters[i]].toObject());
    }
    return _.merge(...items);
  }
}

class Modifier {
  filled() {
    return !!this.toObject();
  }
  toObject() {
    return null;
  }
}

class Appends extends Modifier {
  constructor() {
    super();
    this._appends = [];
  }
  filled() {
    return this._appends.length > 0;
  }
  add(appends) {
    this._appends.push(..._.map(appends, Format.snakeCase));
  }
  toObject() {
    const data = {};
    if (this.filled()) {
      data.appends = this._appends;
    }
    return data;
  }
}

class HiddenFields extends Modifier {
  constructor() {
    super();
    this._fields = [];
  }
  filled() {
    return this._fields.length > 0;
  }
  add(fields) {
    this._fields.push(...fields);
  }
  toObject() {
    const data = {};
    if (this.filled()) {
      data.hidden_fields = this._fields;
    }
    return data;
  }
}

class Modifiers {
  constructor() {
    this.appends = new Appends();
    this.hiddenFields = new HiddenFields();
  }
  toObject() {
    const items = [];
    for (let i = 0, modifiers = ["appends", "hiddenFields"]; i < modifiers.length; i++) {
      if (this[modifiers[i]].filled()) items.push(this[modifiers[i]].toObject());
    }
    return _.merge(...items);
  }
}

class Pagination {
  constructor() {
    this._page = null;
    this._perPage = null;
    this._findPageForId = null;
    this._simplePagination = false;
  }
  filled() {
    return this._perPage && (this._page || this._findPageForId);
  }
  page(page) {
    this._page = page;
  }
  perPage(perPage) {
    this._perPage = perPage;
  }
  findPageForId(id) {
    this._findPageForId = id;
  }
  simplePagination(simplePagination) {
    this._simplePagination = simplePagination;
  }
  toObject() {
    const data = {};
    if (this.filled()) {
      data.page = this._page;
      data.paginate = this._perPage;
      data.page_for_id = this._findPageForId;
      data.simple_pagination = this._simplePagination;
    }
    return data;
  }
}

const actionMixin = {
  /**
   * @param {string} name
   * @param {int} [id]
   * @returns {this}
   */
  action(name, id) {
    id ??= this._identifier;
    this._action.name(name);
    this._action.id(id);
    return this;
  }
};

const filterMixin = {
  count(relations) {
    if (!Array.isArray(relations)) relations = [relations];
    this._filters.count.add(relations);
    return this;
  },
  limit(amount) {
    this._filters.limit.amount(amount);
    return this;
  },
  order(input, direction = "asc") {
    if (typeof input === "string") {
      this._filters.order.add(_.snakeCase(input), direction);
    } else if (Array.isArray(input)) {
      input.forEach((item) => {
        if (typeof item === "string") {
          this._filters.order.add(_.snakeCase(input), "asc");
        } else if (Array.isArray(item)) {
          const [column, direction2 = "asc"] = item;
          this._filters.order.add(_.snakeCase(column), direction2);
        }
      });
    }
    return this;
  },
  with(relations) {
    if (!Array.isArray(relations)) relations = [relations];
    this._filters.relations.add(relations);
    return this;
  },
  scope(name, ...params) {
    this._filters.scopes.add(name, params);
    return this;
  },
  scopes(input) {
    input.forEach((scope) => {
      if (Array.isArray(scope)) {
        this.scope(...scope);
      } else {
        this.scope(scope);
      }
    });
    return this;
  },
  search(value, columns = []) {
    if (!Array.isArray(columns)) columns = [columns];
    this._filters.search.value(value);
    this._filters.search.columns(columns);
    return this;
  },
  where(column, operator, value) {
    if (arguments.length === 2) {
      value = operator;
      operator = "=";
    }
    this._filters.wheres.add(column, operator, value);
    return this;
  },
  wheres(input) {
    input.forEach((where) => {
      this.where(...where);
    });
    return this;
  },
  whereIn(column, values) {
    if (!Array.isArray(values)) values = [values];
    this._filters.whereIn.add(column, values);
    return this;
  },
  whereIns(input) {
    input.forEach((whereIn) => {
      this.whereIn(...whereIn);
    });
    return this;
  },
  whereNotIn(column, values) {
    if (!Array.isArray(values)) values = [values];
    this._filters.whereNotIn.add(column, values);
    return this;
  },
  whereNotIns(input) {
    input.forEach((whereIn) => {
      this.whereNotIn(...whereIn);
    });
    return this;
  },
  pluck(fields) {
    if (!Array.isArray(fields)) fields = [fields];
    this._filters.pluck.add(fields);
    return this;
  }
};

const modifierMixin = {
  appends(appends) {
    if (!Array.isArray(appends)) appends = [appends];
    this._modifiers.appends.add(appends);
    return this;
  },
  hiddenFields(hiddenFields) {
    if (!Array.isArray(hiddenFields)) hiddenFields = [hiddenFields];
    this._modifiers.hiddenFields.add(hiddenFields);
    return this;
  }
};

const paginationMixin = {
  /**
   * @param {int} page
   * @param {int} [perPage]
   * @param {null|int} [findPageForId] Find the page the given id is on.
   * @returns {this}
   */
  pagination(page, perPage = 25, findPageForId = null) {
    this._pagination.page(page);
    this._pagination.perPage(perPage);
    this._pagination.findPageForId(findPageForId);
    this._pagination.simplePagination(false);
    return this;
  },
  /**
   * @param {int} page
   * @param {int} [perPage]
   * @returns {this}
   */
  simplePagination(page, perPage = 25) {
    this._pagination.page(page);
    this._pagination.perPage(perPage);
    this._pagination.simplePagination(true);
    return this;
  }
};

class ResponseEvents {
  constructor() {
    this._onSuccessCallbacks = [];
    this._onErrorCallbacks = [];
    this._onValidationErrorCallbacks = [];
    this._onUnauthorizedCallbacks = [];
    this._onForbiddenCallbacks = [];
    this._onFinishedCallbacks = [];
    this._onCancelledCallbacks = [];
  }
  /**
   * @param {function()} callback
   *
   * @returns {this} The current instance.
   */
  addOnSuccessCallback(callback = () => {
  }) {
    this._onSuccessCallbacks.push(callback);
    return this;
  }
  /**
   * @param {function()} callback
   *
   * @returns {this} The current instance.
   */
  addOnErrorCallback(callback = () => {
  }) {
    this._onErrorCallbacks.push(callback);
    return this;
  }
  /**
   * @param {function()} callback
   *
   * @returns {this} The current instance.
   */
  addOnValidationErrorCallback(callback = () => {
  }) {
    this._onValidationErrorCallbacks.push(callback);
    return this;
  }
  /**
   * @param {function()} callback
   *
   * @returns {this} The current instance.
   */
  addOnUnauthorizedCallback(callback = () => {
  }) {
    this._onUnauthorizedCallbacks.push(callback);
    return this;
  }
  /**
   * @param {function()} callback
   *
   * @returns {this} The current instance.
   */
  addOnForbiddenCallback(callback = () => {
  }) {
    this._onForbiddenCallbacks.push(callback);
    return this;
  }
  /**
   * @param {function()} callback
   *
   * @returns {this} The current instance.
   */
  addOnFinishedCallback(callback = () => {
  }) {
    this._onFinishedCallbacks.push(callback);
    return this;
  }
  /**
   * @param {function()} callback
   *
   * @returns {this} The current instance.
   */
  addOnCancelledCallback(callback = () => {
  }) {
    this._onCancelledCallbacks.push(callback);
    return this;
  }
  /**
   * Clears all `onSuccess` callbacks.
   *
   * @returns {this} The current instance.
   */
  clearOnSuccessCallbacks() {
    this._onSuccessCallbacks = [];
    return this;
  }
  /**
   * Clears all `onError` callbacks.
   *
   * @returns {this} The current instance.
   */
  clearOnErrorCallbacks() {
    this._onErrorCallbacks = [];
    return this;
  }
  /**
   * Clears all `onValidationError` callbacks.
   *
   * @returns {this} The current instance.
   */
  clearOnValidationErrorCallbacks() {
    this._onValidationErrorCallbacks = [];
    return this;
  }
  /**
   * Clears all `onUnauthorized` callbacks.
   *
   * @returns {this} The current instance.
   */
  clearOnUnauthorizedCallbacks() {
    this._onUnauthorizedCallbacks = [];
    return this;
  }
  /**
   * Clears all `onForbidden` callbacks.
   *
   * @returns {this} The current instance.
   */
  clearOnForbiddenCallbacks() {
    this._onForbiddenCallbacks = [];
    return this;
  }
  /**
   * Clears all `onFinished` callbacks.
   *
   * @returns {this} The current instance.
   */
  clearOnFinishedCallbacks() {
    this._onFinishedCallbacks = [];
    return this;
  }
  /**
   * Clears all `onCancelled` callbacks.
   *
   * @returns {this} The current instance.
   */
  clearOnCancelledCallbacks() {
    this._onCancelledCallbacks = [];
    return this;
  }
  /**
   * Clears all callbacks.
   *
   * @returns {this} The current instance.
   */
  clearAllCallbacks() {
    this.clearOnSuccessCallbacks().clearOnErrorCallbacks().clearOnValidationErrorCallbacks().clearOnUnauthorizedCallbacks().clearOnForbiddenCallbacks().clearOnFinishedCallbacks().clearOnCancelledCallbacks();
    return this;
  }
}

const responseEventsMixin = {
  /**
   * Constructor of the mixin.
   *
   * @private
   */
  _initResponseEvents() {
    this._responseEvents = new ResponseEvents();
  },
  /**
   * Add `onSuccess` callback to be called after the request.
   *
   * @param {function()} callback
   *
   * @returns {this} The current instance.
   */
  onSuccess(callback = () => {
  }) {
    this._responseEvents.addOnSuccessCallback(callback);
    return this;
  },
  /**
   * Add `onError` callback to be called after the request.
   *
   * @param {function()} callback
   *
   * @returns {this} The current instance.
   */
  onError(callback = () => {
  }) {
    this._responseEvents.addOnErrorCallback(callback);
    return this;
  },
  /**
   * Add `onValidationError` callback to be called after the request.
   *
   * @param {function()} callback
   *
   * @returns {this} The current instance.
   */
  onValidationError(callback = () => {
  }) {
    this._responseEvents.addOnValidationErrorCallback(callback);
    return this;
  },
  /**
   * Add `onUnauthorized` callback to be called after the request.
   *
   * @param {function()} callback
   *
   * @returns {this} The current instance.
   */
  onUnauthorized(callback = () => {
  }) {
    this._responseEvents.addOnUnauthorizedCallback(callback);
    return this;
  },
  /**
   * Add `onForbidden` callback to be called after the request.
   *
   * @param {function()} callback
   *
   * @returns {this} The current instance.
   */
  onForbidden(callback = () => {
  }) {
    this._responseEvents.addOnForbiddenCallback(callback);
    return this;
  },
  /**
   * Add `onFinished` callback to be called after the request.
   *
   * @param {function()} callback
   *
   * @returns {this} The current instance.
   */
  onFinished(callback = () => {
  }) {
    this._responseEvents.addOnFinishedCallback(callback);
    return this;
  },
  /**
   * Add `onCancelled` callback to be called after the request.
   *
   * @param {function()} callback
   *
   * @returns {this} The current instance.
   */
  onCancelled(callback = () => {
  }) {
    this._responseEvents.addOnCancelledCallback(callback);
    return this;
  },
  /**
   * Clears all callbacks.
   *
   * @returns {this} The current instance.
   */
  clearAllCallbacks() {
    this._responseEvents.clearAllCallbacks();
    return this;
  },
  /**
   * Clears all `onSuccess` callbacks.
   *
   * @returns {this} The current instance.
   */
  clearOnSuccessCallbacks() {
    this._responseEvents.clearOnSuccessCallbacks();
    return this;
  },
  /**
   * Clears all `onError` callbacks.
   *
   * @returns {this} The current instance.
   */
  clearOnErrorCallbacks() {
    this._responseEvents.clearOnErrorCallbacks();
    return this;
  },
  /**
   * Clears all `onValidationError` callbacks.
   *
   * @returns {this} The current instance.
   */
  clearOnValidationErrorCallbacks() {
    this._responseEvents.clearOnValidationErrorCallbacks();
    return this;
  },
  /**
   * Clears all `onUnauthorized` callbacks.
   *
   * @returns {this} The current instance.
   */
  clearOnUnauthorizedCallbacks() {
    this._responseEvents.clearOnUnauthorizedCallbacks();
    return this;
  },
  /**
   * Clears all `onForbidden` callbacks.
   *
   * @returns {this} The current instance.
   */
  clearOnForbiddenCallbacks() {
    this._responseEvents.clearOnForbiddenCallbacks();
    return this;
  },
  /**
   * Clears all `onFinished` callbacks.
   *
   * @returns {this} The current instance.
   */
  clearOnFinishedCallbacks() {
    this._responseEvents.clearOnFinishedCallbacks();
    return this;
  },
  /**
   * Clears all `onCancelled` callbacks.
   *
   * @returns {this} The current instance.
   */
  clearOnCancelledCallbacks() {
    this._responseEvents.clearOnCancelledCallbacks();
    return this;
  }
};

class ResponseEventsHandler {
  constructor() {
    this._responseEventsList = [];
    this._onSuccessData = null;
  }
  /**
   * @param {ResponseEvents} responseEvents
   * @returns {ResponseEventsHandler}
   */
  addResponseEvents(responseEvents) {
    this._responseEventsList.push(responseEvents);
    return this;
  }
  /**
   * @param {*} data
   * @returns {ResponseEventsHandler}
   */
  setOnSuccessData(data) {
    this._onSuccessData = data;
    return this;
  }
  /**
   * @param {Response} response
   */
  async triggerResponseEvents(response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      await this._executeOnSuccessCallbacks(response);
    } else {
      switch (response.statusCode) {
        case 401:
          await this._executeOnUnauthorizedCallbacks(response);
          break;
        case 403:
          await this._executeOnForbiddenCallbacks(response);
          break;
        case 422:
          await this._executeOnValidationErrorCallbacks(response);
          break;
        default:
          await this._executeOnErrorCallbacks(response);
          break;
      }
    }
    if (response.isFinished) {
      await this._executeOnFinishedCallbacks(response);
    }
    if (response.isCancelled) {
      await this._executeOnCancelledCallbacks(response);
    }
  }
  /**
   * @param {function[]} callbacks
   * @param data
   * @returns {Promise}
   * @private
   */
  _executeCallbacks(callbacks, ...data) {
    return Promise.all(callbacks.map(async (callback) => {
      await callback(...data);
    }));
  }
  /**
   * @param {Response} response
   */
  async _executeOnSuccessCallbacks(response) {
    await this._executeCallbacks(
      this._responseEventsList.flatMap((responseEvent) => responseEvent._onSuccessCallbacks),
      ...[this._onSuccessData, response.data].filter((value) => !!value)
    );
  }
  /**
   * @param {Response} response
   */
  async _executeOnErrorCallbacks(response) {
    await this._executeCallbacks(
      this._responseEventsList.flatMap((responseEvent) => responseEvent._onErrorCallbacks),
      response
    );
  }
  /**
   * @param {Response} response
   */
  async _executeOnValidationErrorCallbacks(response) {
    const validation = {
      message: response.validation.message,
      errors: {}
    };
    _.each(response.validation.errors, (value, key) => {
      return _.set(validation.errors, key, value);
    });
    await this._executeCallbacks(
      this._responseEventsList.flatMap((responseEvent) => responseEvent._onValidationErrorCallbacks),
      validation
    );
  }
  /**
   * @param {Response} response
   */
  async _executeOnUnauthorizedCallbacks(response) {
    await this._executeCallbacks(
      this._responseEventsList.flatMap((responseEvent) => responseEvent._onUnauthorizedCallbacks),
      response
    );
  }
  /**
   * @param {Response} response
   */
  async _executeOnForbiddenCallbacks(response) {
    await this._executeCallbacks(
      this._responseEventsList.flatMap((responseEvent) => responseEvent._onForbiddenCallbacks),
      response
    );
  }
  /**
   * @param {Response} response
   */
  async _executeOnFinishedCallbacks(response) {
    await this._executeCallbacks(
      this._responseEventsList.flatMap((responseEvent) => responseEvent._onFinishedCallbacks),
      response
    );
  }
  /**
   * @param {Response} response
   */
  async _executeOnCancelledCallbacks(response) {
    await this._executeCallbacks(
      this._responseEventsList.flatMap((responseEvent) => responseEvent._onCancelledCallbacks),
      response
    );
  }
}

class Request {
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
    this._response = await this._connection.get(
      url,
      this.bodyParameters
    );
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
    this._response = await this._connection.post(
      url,
      { ...data, ...this.bodyParameters }
    );
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
    this._response = await this._connection.put(
      url,
      { ...data, ...this.bodyParameters }
    );
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
    this._response = await this._connection.delete(
      url
    );
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
    this._response = await this._connection.post(
      queryUrl,
      formData
    );
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
    return _.merge(..._.compact([
      this._filters.toObject(),
      this._modifiers.toObject(),
      this._pagination.toObject(),
      this._action.toObject(),
      _.merge(...this._customParameters)
    ]));
  }
  /**
   * @returns {ResponseEventsHandler}
   * @private
   */
  _createResponseEventsHandler() {
    const responseEventsHandler = new ResponseEventsHandler();
    responseEventsHandler.addResponseEvents(this._connection._api._responseEvents);
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
Object.assign(Request.prototype, actionMixin);
Object.assign(Request.prototype, filterMixin);
Object.assign(Request.prototype, modifierMixin);
Object.assign(Request.prototype, paginationMixin);
Object.assign(Request.prototype, responseEventsMixin);

class Batch {
  constructor(requests) {
    this._requests = requests;
  }
  get successful() {
    return _.isEmpty(this.failedRequests);
  }
  get successfulRequests() {
    return _.filter(this._requests, ["response.isFailed", false]);
  }
  get failedRequests() {
    return _.filter(this._requests, ["response.isFailed", true]);
  }
  async get() {
    return this.execute("get");
  }
  async post() {
    return this.execute("post");
  }
  async put() {
    return this.execute("put");
  }
  async delete() {
    return this.execute("delete");
  }
  async index() {
    return this.execute("index");
  }
  async show() {
    return this.execute("show");
  }
  async store() {
    return this.execute("store");
  }
  async update() {
    return this.execute("update");
  }
  async destroy() {
    return this.execute("destroy");
  }
  async save() {
    return this.execute("save");
  }
  async storeFiles() {
    return this.execute("storeFiles");
  }
  /**
   * @param {string} method The methods used to execute the requests. Should be `index`, `show`, `store`, `update` or `delete`.
   * @returns {array} List of results if all requests were successful.
   */
  async execute(method) {
    return await Promise.all(_.map(this._requests, (request) => {
      return request[method]();
    }));
  }
}

class Api {
  constructor() {
    this._requests = [];
    this.host("http://localhost:8080").suffix("");
    this._initResponseEvents();
  }
  /**
   * @param {string} host
   *
   * @returns {this} The current instance.
   */
  host(host) {
    this._host = host;
    return this;
  }
  /**
   * @param {string} suffix
   *
   * @returns {this} The current instance.
   */
  suffix(suffix) {
    if (!_.startsWith(suffix, "/") && suffix) {
      suffix = `/${suffix}`;
    }
    this._suffix = suffix;
    return this;
  }
  /**
   * @returns {string} Url containing the host and suffix.
   */
  get baseUrl() {
    let url = "";
    if (this._host) url += this._host;
    if (this._suffix) url += this._suffix;
    return url;
  }
  /**
   * @param {Request} request
   */
  cancelRunning(request) {
    if (!request.key) {
      return;
    }
    this._requests[request.key]?.cancel();
    this._requests[request.key] = request;
  }
  /**
   * @param {Request} request
   */
  removeRequest(request) {
    if (!request.key) {
      return;
    }
    if (request.response.isFinished) {
      delete this._requests[request.key];
    }
  }
  /**
   * @param {string} uri
   *
   * @returns {Request} The created request.
   */
  request(uri) {
    if (!uri) throw new Error(`Request url is empty.`);
    if (!_.startsWith(uri, "/")) {
      uri = `/${uri}`;
    }
    const request = new Request();
    request.setUrl(uri).setApi(this);
    return request;
  }
  /**
   * @returns {this} The current instance.
   */
  cancelRequests() {
    this._requests.forEach((request) => {
      request.cancel();
    });
    this._requests = [];
    return this;
  }
  /**
   * @param {array} requests
   * @returns Batch
   */
  batch(requests) {
    return new Batch(requests);
  }
  /**
   * @param {string} token
   */
  setBearer(token) {
    this.setHeader("Authorization", "Bearer " + token);
  }
  resetBearer() {
    this.removeHeader("Authorization");
  }
  /**
   * @param {string} token
   */
  setCsrf(token) {
    this.setHeader("X-CSRF-TOKEN", token);
  }
  resetCsrf() {
    this.removeHeader("X-CSRF-TOKEN");
  }
  // /**
  //  * @param {string} key
  //  * @param {string} value
  //  */
  // setHeader (key, value) {
  //     useFetch().defaults.headers.common[key] = value;
  // }
  //
  // /**
  //  * @param {string} key
  //  */
  // removeHeader (key) {
  //     delete useFetch().defaults.headers.common[key];
  // }
  // /**
  //  * @param {function(Response)} onSuccess
  //  * @param {function(Error)} onError
  //  *
  //  * @returns {this}
  //  */
  // responseInterceptors (onSuccess = () => {}, onError = () => {}) {
  //     useFetch().interceptors.response.use((response) => {
  //         onSuccess(response);
  //
  //         return response;
  //     }, (error) => {
  //         onError(error);
  //
  //         return Promise.reject(error);
  //     });
  //
  //     return this;
  // }
}
Object.assign(Api.prototype, responseEventsMixin);

class Caster {
  /**
   * Get the casted value from a json value.
   *
   * @param {Object} cast
   * @param {any} value
   *
   * @returns {any}
   */
  static fromJson(cast, value) {
    if (cast.prototype instanceof Model) {
      return this._castValue(value, (json) => cast.fromJson(json));
    }
    if (cast === Array) {
      return this._castValue(value, (json) => Array.from(json));
    }
    if (cast === Object) {
      return this._castValue(value, (json) => Object.assign({}, json));
    }
    return this._castValue(value, _.flow(cast));
  }
  /**
   * Get the casted value of a property so it's safe to send with json.
   *
   * @param {Object} cast
   * @param {any} value
   *
   * @returns {any}
   */
  static toJson(cast, value) {
    if (_.isNil(value)) {
      return null;
    }
    if (cast.prototype instanceof Model) {
      return this._castValue(value, (model) => model.toJson());
    }
    if (cast === Array) {
      return this._castValue(value, (value2) => Array.from(value2));
    }
    return this._castValue(value, _.flow(cast));
  }
  /**
   * Cast the value with the given cast method.
   *
   * @param {Function} cast
   * @param {any} value
   *
   * @returns {any}
   */
  static _castValue(value, cast) {
    if (_.isNil(value)) {
      return null;
    }
    return cast(value);
  }
}

class Accessors {
  /**
   * @param {Model} model Instance of the model.
   */
  constructor(model) {
    _.each(model.constructor.accessors(), (options, key) => {
      this.set(model, key, _.has(options, "default") ? options.default : null);
    });
  }
  /**
   * @param {Model} model
   * @param {Object} json.
   */
  fromJson(model, json) {
    _.each(model.constructor.accessors(), (options, key) => {
      let value = _.get(json, options.jsonKey ?? _.snakeCase(key), _.get(json, _.camelCase(key)));
      if (_.isNil(value)) {
        value = _.has(options, "default") ? options.default : null;
      } else {
        value = Accessors._getCastedFromJsonValue(value, options);
      }
      this.set(model, key, value);
    });
  }
  /**
   * @param {Model} model
   *
   * @return {Object} The attributes casted to a json object.
   */
  toJson(model) {
    const json = {};
    _.each(model.constructor.accessors(), (options, key) => {
      let jsonValue = this.get(model, key);
      jsonValue = Accessors._getCastedToJsonValue(jsonValue, options);
      _.set(json, options.jsonKey ?? _.snakeCase(key), jsonValue);
    });
    return json;
  }
  /**
   * @param {Model} model
   * @param {string} attribute
   *
   * @returns {*} The value of the attribute.
   */
  get(model, attribute) {
    return _.get(model, attribute);
  }
  /**
   * @param {Model} model
   * @param {string} attribute
   * @param {*} value
   *
   * @returns {*} The value that was set.
   */
  set(model, attribute, value) {
    model[attribute] = value;
    return value;
  }
  /**
   * @private
   *
   * @param {*} value
   * @param {Object} options
   *
   * @returns {*} The casted value.
   */
  static _getCastedFromJsonValue(value, options) {
    if (_.has(options, "type") || _.has(options, "fromJson")) {
      const cast = options.type ? options.type : options.fromJson;
      if (_.isArray(value)) {
        return _.map(value, (val) => Caster.fromJson(cast, val));
      } else {
        return Caster.fromJson(cast, value);
      }
    }
    return value;
  }
  /**
   * @private
   *
   * @param {*} value
   * @param {Object} options
   *
   * @returns {*} The casted value.
   */
  static _getCastedToJsonValue(value, options) {
    if (_.has(options, "type") || _.has(options, "toJson")) {
      const cast = options.type ? options.type : options.toJson;
      if (_.isArray(value)) {
        return _.map(value, (val) => Caster.toJson(cast, val));
      } else {
        return Caster.toJson(cast, value);
      }
    }
    return value;
  }
}

class Attributes {
  /**
   * @param {Model} model Instance of the model.
   */
  constructor(model) {
    _.each(model.constructor.attributes(), (options, key) => {
      this.set(model, key, _.has(options, "default") ? options.default : null);
    });
  }
  /**
   * @param {Model} model
   * @param {Object} json.
   */
  fromJson(model, json) {
    _.each(model.constructor.attributes(), (options, key) => {
      let value = _.get(json, options.jsonKey ?? _.snakeCase(key), _.get(json, _.camelCase(key)));
      if (_.isNil(value)) {
        value = _.has(options, "default") ? options.default : null;
      } else {
        value = Attributes._getCastedFromJsonValue(value, options);
      }
      this.set(model, key, value);
    });
  }
  /**
   * @param {Model} model
   *
   * @return {Object} The attributes casted to a json object.
   */
  toJson(model) {
    const json = {};
    _.each(model.constructor.attributes(), (options, key) => {
      let jsonValue = this.get(model, key);
      jsonValue = Attributes._getCastedToJsonValue(jsonValue, options);
      _.set(json, options.jsonKey ?? _.snakeCase(key), jsonValue);
    });
    return json;
  }
  /**
   * @param {Model} model
   * @param {string} attribute
   *
   * @returns {*} The value of the attribute.
   */
  get(model, attribute) {
    return _.get(model, attribute);
  }
  /**
   * @param {Model} model
   * @param {string|Object} attribute
   * @param {*} value
   *
   * @returns {Attributes}
   */
  set(model, attribute, value = null) {
    if (_.isObject(attribute)) {
      _.each(model.constructor.attributes(), (options, key) => {
        if (!_.has(attribute, key)) return;
        this.set(model, key, attribute[key]);
      });
      return this;
    }
    model[attribute] = value;
    return this;
  }
  /**
   * @private
   *
   * @param {*} value
   * @param {Object} options
   *
   * @returns {*} The casted value.
   */
  static _getCastedFromJsonValue(value, options) {
    if (_.has(options, "type") || _.has(options, "fromJson")) {
      const cast = options.type ? options.type : options.fromJson;
      return Caster.fromJson(cast, value);
    }
    return value;
  }
  /**
   * @private
   *
   * @param {*} value
   * @param {Object} options
   *
   * @returns {*} The casted value.
   */
  static _getCastedToJsonValue(value, options) {
    if (_.has(options, "type") || _.has(options, "toJson")) {
      const cast = options.type ? options.type : options.toJson;
      return Caster.toJson(cast, value);
    }
    return value;
  }
}

class Counts {
  /**
   * @param {Model} model Instance of the model.
   */
  constructor(model) {
    _.each(model.constructor.counts(), (options, key) => {
      this.set(model, this.key(key, true), _.has(options, "default") ? options.default : null);
    });
  }
  /**
   * @param {Model} model
   * @param {Object} json.
   */
  fromJson(model, json) {
    _.each(model.constructor.counts(), (options, key) => {
      let value = _.get(json, this.key(key));
      value = value !== void 0 ? _.toInteger(value) : null;
      this.set(model, this.key(key, true), value);
    });
  }
  /**
   * @param {Model} model
   *
   * @return {Object} The attributes casted to a json object.
   */
  toJson(model) {
    const json = {};
    _.each(model.constructor.counts(), (options, key) => {
      _.set(json, key, this.get(model, key));
    });
    return json;
  }
  /**
   * @param {Model} model
   * @param {string} attribute
   *
   * @returns {*} The value of the attribute.
   */
  get(model, attribute) {
    return _.get(model, this.key(attribute, true));
  }
  /**
   * @param {Model} model
   * @param {string} attribute
   * @param {*} value
   *
   * @returns {*} The value that was set.
   */
  set(model, attribute, value) {
    model[this.key(attribute, true)] = value;
    return value;
  }
  /**
   * @param {string} key
   * @param {boolean} camelCase
   * @returns {string} The key with `count` appended to it, in specified casing.
   */
  key(key, camelCase = false) {
    key = _.snakeCase(key);
    if (!_.endsWith(key, "_count")) {
      key = `${key}_count`;
    }
    return camelCase ? _.camelCase(key) : key;
  }
}

class Relations {
  /**
   * @param {Model} model Instance of the model.
   */
  constructor(model) {
    _.each(model.constructor.relations(), (options, key) => {
      this.set(model, key, _.has(options, "default") ? options.default : null);
    });
  }
  /**
   * @param {Model} model
   * @param {Object} json.
   */
  fromJson(model, json) {
    _.each(model.constructor.relations(), (options, key) => {
      let value = _.get(json, options.jsonKey ?? _.snakeCase(key), _.get(json, _.camelCase(key)));
      value = value ? Relations._getCastedFromJsonValue(value, options) : value;
      this.set(model, key, value);
    });
  }
  /**
   * @param {Model} model
   *
   * @return {Object} The attributes casted to a json object.
   */
  toJson(model) {
    const json = {};
    _.each(model.constructor.relations(), (options, key) => {
      let jsonValue = this.get(model, key);
      jsonValue = Relations._getCastedToJsonValue(jsonValue, options);
      _.set(json, options.jsonKey ?? _.snakeCase(key), jsonValue);
    });
    return json;
  }
  /**
   * @param {Model} model
   * @param {string} relation
   *
   * @returns {*} The value of the relation.
   */
  get(model, relation) {
    return _.get(model, relation);
  }
  /**
   * @param {Model} model
   * @param {string|Object} relation
   * @param {*} value
   *
   * @returns {Relations}
   */
  set(model, relation, value = null) {
    if (_.isObject(relation)) {
      _.each(model.constructor.relations(), (options, key) => {
        if (!_.has(relation, key)) return;
        this.set(model, key, relation[key]);
      });
      return this;
    }
    model[relation] = value;
    return this;
  }
  /**
   * @private
   *
   * @param {*} value
   * @param {Object} options
   *
   * @returns {*} The casted value.
   */
  static _getCastedFromJsonValue(value, options) {
    if (_.has(options, "type")) {
      const cast = options.type;
      if (_.isArray(value)) {
        return _.map(value, (val) => Caster.fromJson(cast, val));
      } else {
        return Caster.fromJson(cast, value);
      }
    }
    return value;
  }
  /**
   * @private
   *
   * @param {*} value
   * @param {Object} options
   *
   * @returns {*} The casted value.
   */
  static _getCastedToJsonValue(value, options) {
    if (_.has(options, "type")) {
      const cast = options.type;
      if (_.isArray(value)) {
        return _.map(value, (val) => Caster.toJson(cast, val));
      } else {
        return Caster.toJson(cast, value);
      }
    }
    return value;
  }
}

class MediaCollections {
  /**
   * @param {Model} model Instance of the model.
   */
  constructor(model) {
  }
  /**
   * @param {Model} model
   *
   * @return {Object} The attributes casted to a json object.
   */
  toJson(model) {
    const json = {};
    _.each(model.constructor.mediaCollections(), (options, key) => {
      const mediaPrefix = "_media.";
      let value = _.get(model, options.jsonKey ?? mediaPrefix + key, _.get(model, mediaPrefix + _.camelCase(key)));
      _.set(json, mediaPrefix + key, value ?? []);
    });
    return json;
  }
}

class Model extends Request {
  constructor(defaults = {}) {
    super();
    this._accessors = new Accessors(this);
    this._attributes = new Attributes(this);
    this._counts = new Counts(this);
    this._relations = new Relations(this);
    this._mediaCollections = new MediaCollections(this);
    this.setApi(api);
    this.fill(defaults);
  }
  /**
   * Create an instance of the model for the given json object.
   *
   * @param {Object} json
   *
   * @returns {this} An instance of the model.
   */
  static fromJson(json) {
    const instance = new this();
    instance._accessors.fromJson(instance, json);
    instance._attributes.fromJson(instance, json);
    instance._counts.fromJson(instance, json);
    instance._relations.fromJson(instance, json);
    return instance;
  }
  /**
   * Convert the attributes of the current instance to json.
   *
   * @return {Object} The attributes of the current instance as json object.
   */
  toJson() {
    return {
      ...this._accessors.toJson(this),
      ...this._attributes.toJson(this),
      ...this._counts.toJson(this),
      ...this._relations.toJson(this),
      ...this._mediaCollections.toJson(this)
    };
  }
  /**
   * @param values
   * @returns {this}
   */
  fill(values = {}) {
    this._attributes.set(this, values);
    this._relations.set(this, values);
    return this;
  }
  /**
   * The accessors of the model which were appended on the api side.
   *
   * @returns {Object.<any, Object>}
   */
  static accessors() {
    return {};
  }
  /**
   * The attributes of the model.
   *
   * @returns {Object.<any, Object>}
   */
  static attributes() {
    return {};
  }
  /**
   * The counts of relations of the model.
   *
   * @returns {Object.<any, Object>}
   */
  static counts() {
    return {};
  }
  /**
   * The relations of the model.
   *
   * @returns {Object.<any, Object>}
   */
  static relations() {
    return {};
  }
  /**
  * The media collections of the model
  *
  * @returns {Object.<any, Object>}
  */
  static mediaCollections() {
    return {};
  }
  /**
   * @returns {string} Endpoint of the model for the API.
   */
  static get endpoint() {
    throw new Error("No endpoint defined in the model.");
  }
  /**
   * @returns {int} Identifier attribute name of the model.
   */
  get _identifier() {
    return _.get(this, "id");
  }
  /**
   * Get a list of models.
   *
   * @returns {this[]} List of models.
   */
  async index() {
    this._connection.cancelRunning(this);
    this._response = await this._connection.post(
      this._queryString() + "/index",
      this.bodyParameters
    );
    this._connection.removeRequest(this);
    let items;
    if (this._response.data) {
      items = _.map(this._response.data.items, (item) => {
        return this.constructor.fromJson(item);
      });
    }
    const responseEventsHandler = this._createResponseEventsHandler();
    responseEventsHandler.setOnSuccessData(items);
    await responseEventsHandler.triggerResponseEvents(this._response);
    this.clearAllCallbacks();
    return items;
  }
  /**
   * Get a single model.
   *
   * @param {int} [identifier]
   *
   * @returns {this} Model found for the given id.
   */
  async show(identifier) {
    identifier ??= this._identifier;
    if (!identifier) return null;
    this._connection.cancelRunning(this);
    this._response = await this._connection.post(
      this._queryString(identifier) + "/show",
      this.bodyParameters
    );
    this._connection.removeRequest(this);
    let item;
    if (this._response.data) {
      item = this.constructor.fromJson(this._response.data);
    }
    const responseEventsHandler = this._createResponseEventsHandler();
    responseEventsHandler.setOnSuccessData(item);
    await responseEventsHandler.triggerResponseEvents(this._response);
    this.clearAllCallbacks();
    return item;
  }
  /**
   * Create an model.
   *
   * @param {Object} [extraData] Extra data to send to the API
   *
   * @returns {this} The created model.
   */
  async store(extraData = {}) {
    this._connection.cancelRunning(this);
    this._response = await this._connection.post(
      this._queryString(),
      { ...this._attributes.toJson(this), ...this._mediaCollections.toJson(this), ...extraData }
    );
    this._connection.removeRequest(this);
    let item;
    if (this._response.data) {
      item = this.constructor.fromJson(this._response.data);
    }
    const responseEventsHandler = this._createResponseEventsHandler();
    responseEventsHandler.setOnSuccessData(item);
    await responseEventsHandler.triggerResponseEvents(this._response);
    this.clearAllCallbacks();
    return item;
  }
  /**
   * Update the current model.
   *
   * @param {Object} [extraData] Extra data to send to the API
   *
   * @returns {this} The updated model.
   */
  async update(extraData = {}) {
    this._connection.cancelRunning(this);
    this._response = await this._connection.put(
      this._queryString(this._identifier),
      { ...this._attributes.toJson(this), ...this._mediaCollections.toJson(this), ...extraData }
    );
    this._connection.removeRequest(this);
    let item;
    if (this._response.data) {
      item = this.constructor.fromJson(this._response.data);
    }
    const responseEventsHandler = this._createResponseEventsHandler();
    responseEventsHandler.setOnSuccessData(item);
    await responseEventsHandler.triggerResponseEvents(this._response);
    this.clearAllCallbacks();
    return item;
  }
  /**
   * Delete the current model.
   *
   * @returns {boolean} Whether the deletion was successful.
   */
  async destroy() {
    this._connection.cancelRunning(this);
    this._response = await this._connection.delete(
      this._queryString(this._identifier)
    );
    this._connection.removeRequest(this);
    const responseEventsHandler = this._createResponseEventsHandler();
    await responseEventsHandler.triggerResponseEvents(this._response);
    this.clearAllCallbacks();
    return !!this._response.data;
  }
  /**
   * Upload an temporary media file to the API.
   *
   * @param {array|File} [files] The uploaded file or files.
   * @param {string} [collection] The name of the file collection.
   *
   * @returns {array} The received media ids.
   */
  async upload(files, collection) {
    this._media ??= {};
    const filesArray = (Array.isArray(files) ? files : [files]).filter((value) => value !== null);
    if (filesArray.length === 0) {
      this._media[collection] = {};
      return;
    }
    const request = await this.storeFiles({
      files: _.flatMapDeep(filesArray)
    }, {}, "/media/upload");
    this._media[collection] = request._response.data;
    return request._response.data;
  }
  /**
   * Save the current model. Based on the value of the identifier `store` or `update` will be called.
   *
   * @param {Object} [extraData] Extra data to send to the API
   *
   * @returns {this} The created or updated model.
   */
  async save(extraData = {}) {
    return !this._identifier ? this.store(extraData) : this.update(extraData);
  }
  /**
   * @returns {this} The new clone of the current model.
   */
  clone() {
    return this.constructor.fromJson(this.toJson());
  }
  /**
   * Generate the query string for this model.
   * @private
   *
   * @param {int} [identifier] The identifier of the model.
   *
   * @returns {string} The querystring for the model.
   */
  _queryString(identifier) {
    return this.constructor.endpoint + (identifier ? `/${identifier}` : "");
  }
}

const api$1 = new Api();
api$1.host("http://localhost:8000/");
const plugin = defineNuxtPlugin({
  dependsOn: ["nuxt-auth-sanctum"],
  provide: {
    api: api$1,
    Model
  }
});

export { plugin as default };
