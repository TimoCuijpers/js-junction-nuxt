export default class WhereIn extends Filter {
    _whereIns: any[];
    add(column: any, values: any): void;
    toObject(): {
        where_in: any[];
    };
}
import Filter from './filter.js';
