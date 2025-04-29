import Filter from './filter.js.js';
export default class Wheres extends Filter {
    constructor();
    filled(): boolean;
    add(column: any, operator: any, value: any): void;
    toObject(): {};
}
