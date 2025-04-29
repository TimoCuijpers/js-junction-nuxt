/**
 * @mixin actionMixin
 */
declare const actionMixin: {
    /**
     * @param {string} name
     * @param {int} [id]
     * @returns {this}
     */
    action(name: any, id: any): any;
};
export default actionMixin;
