export default class Action {
    _name: null;
    _id: null;
    constructor();
    filled(): boolean;
    name(name: null): void;
    id(id: null): void;
    toObject(): {
        id: null;
        action: null;
    } | null;
}
