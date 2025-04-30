export default class Action {
    _name: any;
    _id: any;
    filled(): boolean;
    name(name: any): void;
    id(id: any): void;
    toObject(): {
        action: any;
        id: any;
    } | null;
}
