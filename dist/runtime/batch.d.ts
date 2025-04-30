export default class Batch {
    constructor(requests: any);
    _requests: any;
    get successful(): any;
    get successfulRequests(): any;
    get failedRequests(): any;
    get(): Promise<any[]>;
    post(): Promise<any[]>;
    put(): Promise<any[]>;
    delete(): Promise<any[]>;
    index(): Promise<any[]>;
    show(): Promise<any[]>;
    store(): Promise<any[]>;
    update(): Promise<any[]>;
    destroy(): Promise<any[]>;
    save(): Promise<any[]>;
    storeFiles(): Promise<any[]>;
    /**
     * @param {string} method The methods used to execute the requests. Should be `index`, `show`, `store`, `update` or `delete`.
     * @returns {array} List of results if all requests were successful.
     */
    execute(method: string): any[];
}
