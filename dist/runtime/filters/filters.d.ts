export default class Filters {
    count: Count;
    limit: Limit;
    order: Order;
    relations: Relations;
    scopes: Scopes;
    search: Search;
    wheres: Wheres;
    whereIn: WhereIn;
    whereNotIn: WhereNotIn;
    pluck: Pluck;
    toObject(): any;
}
import Count from './count.js';
import Limit from './limit.js';
import Order from './order.js';
import Relations from './relations.js';
import Scopes from './scopes.js';
import Search from './search.js';
import Wheres from './wheres.js';
import WhereIn from './whereIn.js';
import WhereNotIn from './whereNotIn.js';
import Pluck from './pluck.js';
