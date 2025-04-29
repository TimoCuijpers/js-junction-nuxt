import _ from "lodash";
import Filter from "./filter.js";
import Format from "../utilities/format.js";
export default class Pluck extends Filter {
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
