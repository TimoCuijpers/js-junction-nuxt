export default class WhereNotIn extends Filter {
    _whereNotIns: any[];
    add(column: any, values: any): void;
    toObject(): {
        where_not_in: any[];
    };
}
import Filter from './filter.js';
