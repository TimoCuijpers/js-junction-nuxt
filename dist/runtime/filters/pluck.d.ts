export default class Pluck extends Filter {
    _fields: any[];
    add(fields: any): void;
    toObject(): {
        pluck: any[];
    };
}
import Filter from './filter.js';
