/**
 * @mixin paginationMixin
 */
declare const paginationMixin: {
    /**
     * @param {int} page
     * @param {int} [perPage]
     * @param {null|int} [findPageForId] Find the page the given id is on.
     * @returns {this}
     */
    pagination(page: any, perPage?: number, findPageForId?: null): any;
    /**
     * @param {int} page
     * @param {int} [perPage]
     * @returns {this}
     */
    simplePagination(page: any, perPage?: number): any;
};
export default paginationMixin;
