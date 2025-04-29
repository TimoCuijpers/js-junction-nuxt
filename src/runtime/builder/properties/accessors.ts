import _ from 'lodash';
import Caster from '../caster.js';
import Model from "../model";

/**
 * @implements {Property}
 */
export default class Accessors {
  /**
   * @param {Model} model Instance of the model.
   */
  constructor(model: this) {
    _.each(
      model.constructor.accessors(),
      (options: { default: any }, key: any) => {
        this.set(
          model,
          key,
          _.has(options, "default") ? options.default : null,
        );
      },
    );
  }

  /**
   * @param {Model} model
   * @param {Object} json.
   */
  fromJson(model: Model, json: any) {
    _.each(
      model.constructor.accessors(),
      (options: { jsonKey: any; default: any }, key: any) => {
        let value = _.get(
          json,
          options.jsonKey ?? _.snakeCase(key),
          _.get(json, _.camelCase(key)),
        );

        if (_.isNil(value)) {
          value = _.has(options, "default") ? options.default : null;
        } else {
          value = Accessors._getCastedFromJsonValue(value, options);
        }

        this.set(model, key, value);
      },
    );
  }

  /**
   * @param {Model} model
   *
   * @return {Object} The attributes cast to a JSON object.
   */
  toJson(model: { constructor: { accessors: () => any } }): object {
    const json = {};

    _.each(
      model.constructor.accessors(),
      (options: { jsonKey?: any; type?: any; toJson?: any }, key: any) => {
        let jsonValue = this.get(model, key);

        jsonValue = Accessors._getCastedToJsonValue(jsonValue, options);

        _.set(json, options.jsonKey ?? _.snakeCase(key), jsonValue);
      },
    );

    return json;
  }

  /**
   * @param {Model} model
   * @param {string} attribute
   *
   * @returns {*} The value of the attribute.
   */
  get(model: { constructor: { accessors: () => any } }, attribute: any): any {
    return _.get(model, attribute);
  }

  /**
   * @param {Model} model
   * @param {string} attribute
   * @param {*} value
   *
   * @returns {*} The value that was set.
   */
  set(model: Model, attribute: string, value: any): any {
    model[attribute] = value;

    return value;
  }

  /**
   * @private
   *
   * @param {*} value
   * @param {Object} options
   *
   * @returns {*} The cast value.
   */
  static _getCastedFromJsonValue(value: any, options: object): any {
    if (_.has(options, "type") || _.has(options, "fromJson")) {
      const cast = options.type ? options.type : options.fromJson;

      if (_.isArray(value)) {
        return _.map(value, (val: any) => Caster.fromJson(cast, val));
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
   * @returns {*} The cast value.
   */
  static _getCastedToJsonValue(
    value: any,
    options: { type: any; toJson: any },
  ): any {
    if (_.has(options, "type") || _.has(options, "toJson")) {
      const cast = options.type ? options.type : options.toJson;

      if (_.isArray(value)) {
        return _.map(value, (val: any) => Caster.toJson(cast, val));
      } else {
        return Caster.toJson(cast, value);
      }
    }

    return value;
  }
}
