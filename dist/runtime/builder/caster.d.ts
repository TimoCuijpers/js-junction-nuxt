export default class Caster {
    /**
     * Get the casted value from a json value.
     *
     * @param {Object} cast
     * @param {any} value
     *
     * @returns {any}
     */
    static fromJson(cast: any, value: any): any;
    /**
     * Get the casted value of a property so it's safe to send with json.
     *
     * @param {Object} cast
     * @param {any} value
     *
     * @returns {any}
     */
    static toJson(cast: any, value: any): any;
    /**
     * Cast the value with the given cast method.
     *
     * @param {Function} cast
     * @param {any} value
     *
     * @returns {any}
     */
    static _castValue(value: any, cast: Function): any;
}
