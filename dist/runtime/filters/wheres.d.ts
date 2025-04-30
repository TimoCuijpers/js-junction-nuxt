export default class Wheres extends Filter {
    _wheres: any[];
    add(column: any, operator: any, value: any): void;
    toObject(): {
        wheres: any[];
    };
}
import Filter from './filter.js';
