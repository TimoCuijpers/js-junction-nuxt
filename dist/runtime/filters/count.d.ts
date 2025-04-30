export default class Count extends Filter {
    _relations: any[];
    add(relations: any): void;
    toObject(): {
        count: any[];
    };
}
import Filter from './filter.js';
