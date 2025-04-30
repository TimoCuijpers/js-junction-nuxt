import Filter from './filter.js';
import Format from '../utilities/format.js';

export default class WhereIn extends Filter {
    constructor () {
        super();

        this._whereIns = [];
    }

    filled () {
        return this._whereIns.length > 0;
    }

    add (column, values) {
        this._whereIns.push({
            column: Format.snakeCase(column),
            values,
        });
    }

    toObject () {
        const data = {};

        if (this.filled()) {
            data.where_in = this._whereIns;
        }

        return data;
    }
}
