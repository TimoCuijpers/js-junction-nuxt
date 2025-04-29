import _ from 'lodash';
import Accessors from './properties/accessors';
import Attributes from './properties/attributes';
import Counts from './properties/counts';
import Relations from './properties/relations';
import MediaCollections from './properties/mediaCollections';
import Request from '../request';
import Api from "../api";

export class Model extends Request {
  _accessors: Accessors;
  _attributes: Attributes;
  _counts: Counts;
  _relations: Relations;
  _mediaCollections: MediaCollections;
  _media: any;
  clearAllCallbacks: any;
  constructor(defaults = {}) {
    super();

    this._accessors = new Accessors(this);
    this._attributes = new Attributes(this);
    this._counts = new Counts(this);
    this._relations = new Relations(this);
    this._mediaCollections = new MediaCollections(this);

    this.setApi(new Api());
    this.fill(defaults);
  }

  /**
   * Create an instance of the model for the given JSON object.
   *
   * @param {Object} json
   *
   * @returns {this} An instance of the model.
   */
  static fromJson(json: object): this {
    const instance = new this();

    instance._accessors.fromJson(instance, json);
    instance._attributes.fromJson(instance, json);
    instance._counts.fromJson(instance, json);
    instance._relations.fromJson(instance, json);

    return instance;
  }

  /**
   * Convert the attributes of the current instance to JSON.
   *
   * @return {Object} The attributes of the current instance as JSON object.
   */
  toJson(): object {
    return {
      ...this._accessors.toJson(this),
      ...this._attributes.toJson(this),
      ...this._counts.toJson(this),
      ...this._relations.toJson(this),
      ...this._mediaCollections.toJson(this),
    };
  }

  /**
   * @param values
   * @returns {this}
   */
  fill(values = {}): this {
    this._attributes.set(this, values);
    this._relations.set(this, values);

    return this;
  }

  /**
   * The accessors of the model which were appended on the api side.
   *
   * @returns {Object.<any, Object>}
   */
  static accessors(): object {
    return {};
  }

  /**
   * The attributes of the model.
   *
   * @returns {Object.<any, Object>}
   */
  static attributes(): object {
    return {};
  }

  /**
   * The counts of relations of the model.
   *
   * @returns {Object.<any, Object>}
   */
  static counts(): object {
    return {};
  }

  /**
   * The relations of the model.
   *
   * @returns {Object.<any, Object>}
   */
  static relations(): object {
    return {};
  }

  /**
   * The media collections of the model
   *
   * @returns {Object.<any, Object>}
   */
  static mediaCollections(): object {
    return {};
  }

  /**
   * @returns {string} Endpoint of the model for the API.
   */
  static get endpoint(): string {
    throw new Error("No endpoint defined in the model.");
  }

  /**
   * @returns {int} Identifier attribute name of the model.
   */
  get _identifier(): number {
    return _.get(this, "id");
  }

  /**
   * Get a list of models.
   *
   * @returns {this[]} List of models.
   */
  async index(): Promise<this[]> {
    this._connection.cancelRunning(this);

    this._response = await this._connection.post(
      this._queryString() + "/index",
      this.bodyParameters,
    );

    this._connection.removeRequest(this);

    let items: any;

    if (this._response.data) {
      items = _.map(this._response.data.items, (item: any) => {
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
  async show(identifier: number): Promise<this> {
    identifier ??= this._identifier;

    if (!identifier) return null;

    this._connection.cancelRunning(this);

    this._response = await this._connection.post(
      this._queryString(identifier) + "/show",
      this.bodyParameters,
    );

    this._connection.removeRequest(this);

    let item: any;

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
   * Create a model.
   *
   * @param {Object} [extraData] Extra data to send to the API
   *
   * @returns {this} The created model.
   */
  async store(extraData: object = {}): Promise<this> {
    this._connection.cancelRunning(this);

    this._response = await this._connection.post(this._queryString(), {
      ...this._attributes.toJson(this),
      ...this._mediaCollections.toJson(this),
      ...extraData,
    });

    this._connection.removeRequest(this);

    let item: any;

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
  async update(extraData: object = {}): Promise<this> {
    this._connection.cancelRunning(this);

    this._response = await this._connection.put(
      this._queryString(this._identifier),
      {
        ...this._attributes.toJson(this),
        ...this._mediaCollections.toJson(this),
        ...extraData,
      },
    );

    this._connection.removeRequest(this);

    let item: any;

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
  async destroy(): Promise<boolean> {
    this._connection.cancelRunning(this);

    this._response = await this._connection.delete(
      this._queryString(this._identifier),
    );

    this._connection.removeRequest(this);

    const responseEventsHandler = this._createResponseEventsHandler();
    await responseEventsHandler.triggerResponseEvents(this._response);

    this.clearAllCallbacks();

    return !!this._response.data;
  }

  /**
   * Upload a temporary media file to the API.
   *
   * @param {array|File} [files] The uploaded file or files.
   * @param {string} [collection] The name of the file collection.
   *
   * @returns {array} The received media ids.
   */
  async upload(
    files: Array<any> | File,
    collection: string,
  ): Promise<Array<any>> {
    this._media ??= {};
    const filesArray = (Array.isArray(files) ? files : [files]).filter(
      (value: null) => value !== null,
    );

    if (filesArray.length === 0) {
      this._media[collection] = {};
      return;
    }

    const request = await this.storeFiles(
      {
        files: _.flatMapDeep(filesArray),
      },
      {},
      "/media/upload",
    );

    this._media[collection] = request._response.data;

    return request._response.data;
  }

  /**
   * Save the current model.
   * Based on the value of the identifier `store` or `update` will be called.
   *
   * @param {Object} [extraData] Extra data to send to the API
   *
   * @returns {this} The created or updated model.
   */
  async save(extraData: object = {}): Promise<this> {
    return !this._identifier ? this.store(extraData) : this.update(extraData);
  }

  /**
   * @returns {this} The new clone of the current model.
   */
  clone(): this {
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
  _queryString(identifier?: number): string {
    return this.constructor.endpoint + (identifier ? `/${identifier}` : "");
  }
}

export default Model;
