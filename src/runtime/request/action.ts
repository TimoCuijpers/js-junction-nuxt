export default class Action {
  _name: null;
  _id: null;
  constructor() {
    this._name = null;
    this._id = null;
  }

  filled() {
    return !!this._name;
  }

  name(name: null) {
    this._name = name;
  }

  id(id: null) {
    this._id = id;
  }

  toObject() {
    if (!this.filled()) return null;

    const data = {
      id: null,
      action: null,
    };

    data.action = this._name;
    if (this._id) data.id = this._id;

    return data;
  }
}
