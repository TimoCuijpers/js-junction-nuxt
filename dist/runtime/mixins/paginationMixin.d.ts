export default paginationMixin;
declare namespace paginationMixin {
    /**
     * @param {int} page
     * @param {int} [perPage]
     * @param {null|int} [findPageForId] Find the page the given id is on.
     * @returns {this}
     */
    function pagination(page: int, perPage?: int, findPageForId?: null | int): this;
    /**
     * @param {int} page
     * @param {int} [perPage]
     * @returns {this}
     */
    function simplePagination(page: int, perPage?: int): this;
}
