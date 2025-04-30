export default class Relations extends Filter {
    _relations: any[];
    add(relations: any): void;
    toObject(): {
        with: any[];
    };
}
import Filter from './filter.js';
