export default class Order extends Filter {
    _orders: any[];
    add(column: any, direction: any): void;
    toObject(): {
        orders: any[];
    };
}
import Filter from './filter.js';
