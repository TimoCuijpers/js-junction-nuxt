export default actionMixin;
declare namespace actionMixin {
    /**
     * @param {string} name
     * @param {int} [id]
     * @returns {this}
     */
    function action(name: string, id?: int): this;
}
