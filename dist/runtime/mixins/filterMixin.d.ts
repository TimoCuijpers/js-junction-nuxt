/**
 * @mixin filterMixin
 */
declare const filterMixin: {
    count(relations: any): any;
    limit(amount: any): any;
    order(input: any, direction?: string): any;
    with(relations: any): any;
    scope(name: any, ...params: any[]): any;
    scopes(input: any): any;
    search(value: any, columns?: never[]): any;
    where(column: any, operator: any, value: any): any;
    wheres(input: any): any;
    whereIn(column: any, values: any): any;
    whereIns(input: any): any;
    whereNotIn(column: any, values: any): any;
    whereNotIns(input: any): any;
    pluck(fields: any): any;
};
export default filterMixin;
