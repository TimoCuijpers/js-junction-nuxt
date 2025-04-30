export default class Search extends Filter {
    _value: any;
    _columns: any;
    filled(): any;
    value(value: any): void;
    columns(columns: any): void;
    toObject(): {
        search_value: any;
        search_columns: any;
    };
}
import Filter from './filter.js';
