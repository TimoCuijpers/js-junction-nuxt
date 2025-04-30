export default class HiddenFields extends Modifier {
    _fields: any[];
    add(fields: any): void;
    toObject(): {
        hidden_fields: any[];
    };
}
import Modifier from './modifier.js';
