export default class Relations extends Filter {
    _scopes: any[];
    add(name: any, params: any): void;
    toObject(): {
        scopes: any[];
    };
}
import Filter from './filter.js';
