import _ from 'lodash';
import Limit from './limit.js';
import Order from './order.js';
import Relations from './relations.js';
import Scopes from './scopes.js';
import Search from './search.js';
import Wheres from './wheres.js';
import WhereIn from './whereIn.js';
import WhereNotIn from './whereNotIn.js';
import Count from './count.js';
import Pluck from './pluck.js';

export default class Filters {
    constructor () {
        this.count = new Count();
        this.limit = new Limit();
        this.order = new Order();
        this.relations = new Relations();
        this.scopes = new Scopes();
        this.search = new Search();
        this.wheres = new Wheres();
        this.whereIn = new WhereIn();
        this.whereNotIn = new WhereNotIn();
        this.pluck = new Pluck();
    }

    toObject () {
        const items = [];

        for (let i = 0, filters = ['count', 'limit', 'order', 'relations', 'scopes', 'search', 'wheres', 'whereIn', 'whereNotIn', 'pluck']; i < filters.length; i++) {
            if (this[filters[i]].filled()) items.push(this[filters[i]].toObject());
        }

        return _.merge(...items);
    }
}
