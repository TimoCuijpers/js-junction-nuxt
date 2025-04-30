export default class Limit extends Filter {
    _amount: any;
    amount(amount: any): void;
    toObject(): {
        limit: any;
    };
}
import Filter from './filter.js';
