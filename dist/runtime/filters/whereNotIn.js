import Filter from "./filter.js";
import Format from "../utilities/format.js";
export default class WhereNotIn extends Filter {
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
