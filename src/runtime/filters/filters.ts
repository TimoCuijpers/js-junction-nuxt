import _ from 'lodash';
import Limit from './limit';
import Order from './order';
import Relations from './relations';
import Scopes from './scopes';
import Search from './search';
import Wheres from './wheres';
import WhereIn from './whereIn';
import WhereNotIn from './whereNotIn';
import Count from './count.js';
import Pluck from './pluck';

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
