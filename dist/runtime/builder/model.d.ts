interface JsonMap {
    [key: string]: unknown;
}

declare class Api {
    constructor();

    host(host: string): this;
    suffix(suffix: string): this;
    readonly baseUrl: string;

    request(uri: string): Request;
    cancelRequests(): this;
    batch(requests: Request[]): Batch;

    setBearer(token: string): void;
    resetBearer(): void;
    setCsrf(token: string): void;
    resetCsrf(): void;

    setHeader(key: string, value: string): void;
    removeHeader(key: string): void;

    onSuccess(callback?: (data: any) => void): this;
    onError(callback?: (response: any) => void): this;
    onValidationError(callback?: (validation: any) => void): this;
    onUnauthorized(callback?: (response: any) => void): this;
    onForbidden(callback?: (response: any) => void): this;
    onFinished(callback?: (response: any) => void): this;

    responseInterceptors(
        onSuccess?: (response: any) => void,
        onError?: (error: any) => void
    ): this;
}

interface Response {
    data: any;
    statusCode: number;
    validation?: {
        message: string;
        errors: object;
    };
}

declare class Mixins {
    count(relations: any[]): this;
    limit(amount: number): this;
    order(input: string | any[], direction?: string): this;
    with(relations: any[]): this;
    scope(name: string, ...params: any[]): this;
    scopes(...params: any[]): this;
    search(value: any, columns?: any[]): this;
    where(column: string, operator: string, value?: any): this;
    wheres(...params: any[]): this;
    whereIn(column: string, values: any[]): this;
    whereIns(...params: any[]): this;
    whereNotIn(column: string, values: any[]): this;
    whereNotIns(...params: any[]): this;
    pluck(fields: any[]): this;

    appends(appends: string | string[]): this;
    hiddenFields(hiddenFields: string | string[]): this;

    action(name: string, id?: number): this;

    pagination(page: number, perPage?: number, findPageForId?: number | null): this;
    simplePagination(page: number, perPage?: number): this;
}

declare class Request extends Mixins {
    constructor();
    readonly response: Response;
    setUrl(url: string): this;
    cancel(): this;
    get(): Promise<this>;
    post(data?: object): Promise<this>;
    put(data?: object): Promise<this>;
    setKey(key: string): this;
    delete(): Promise<this>;
    storeFiles(files?: object, data?: object, url?: string|null): Promise<this>;
    readonly bodyParameters: object;
    onSuccess<T = any>(callback?: (result: T, data: any) => void): this;
    onError(callback?: (response: Response) => void): this;
    onValidationError(callback?: (validation: object) => void): this;
    onUnauthorized(callback?: (response: Response) => void): this;
    onForbidden(callback?: (response: Response) => void): this;
    onFinished(callback?: (response: Response) => void): this;
    triggerResponseEvents(response: Response, successResponse?: any): Promise<void>;
    customParameters(parameters?: object): this;
    setConfig(config: object): this;
    setApi(api: Api): this;
}

export default class Model extends Request {
    constructor(defaults?: JsonMap);

    static fromJson(json: JsonMap): Model;

    toJson(): JsonMap;

    fill(values?: JsonMap): this;

    accessors(): JsonMap;

    attributes(): JsonMap;

    counts(): JsonMap;

    relations(): JsonMap;

    mediaCollections(): JsonMap;

    readonly endpoint: string;

    readonly _identifier: number | string;

    index(): Promise<Model[]>;

    show(identifier?: number | string): Promise<Model | null>;

    store(extraData?: JsonMap): Promise<Model>;

    update(extraData?: JsonMap): Promise<Model>;

    destroy(): Promise<boolean>;

    save(extraData?: JsonMap): Promise<Model>;

    upload(files: object|object[], collection: string): Promise<this>;

    clone(): Model;

    _queryString(identifier?: number | string): string;

    static index(): Promise<Model[]>
    static show(identifier?: number | string): Promise<Model | null>
    static store(extraData?: JsonMap): Promise<Model>
    static update(extraData?: JsonMap): Promise<Model>
    static destroy(): Promise<boolean>
    static save(extraData?: JsonMap): Promise<Model>
    static upload(files: object | object[], collection: string): Promise<Model>
    static clone(): Model
    static setApi(api: Api): void
    static setUrl(url: string): void
    static setKey(key: string): void
    static cancel(): void
    static get(): Promise<Model>
    static post(data?: object): Promise<Model>
    static put(data?: object): Promise<Model>
    static delete(): Promise<Model>
    static storeFiles(files?: object, data?: object, url?: string | null): Promise<Model>
    static onSuccess<T = never>(callback?: (result: T, data: never) => void): Model
    static onError(callback?: (response: Response) => void): Model
    static onValidationError(callback?: (validation: object) => void): Model
    static onUnauthorized(callback?: (response: Response) => void): Model
    static onForbidden(callback?: (response: Response) => void): Model
    static onFinished(callback?: (response: Response) => void): Model
    static triggerResponseEvents(response: Response, successResponse?: never): Promise<void>
    static customParameters(parameters?: object): Model
    static setConfig(config: object): Model
    static setBearer(token: string): void
    static resetBearer(): void
    static setCsrf(token: string): void
    static resetCsrf(): void
    static setHeader(key: string, value: string): void
    static removeHeader(key: string): void
    static responseInterceptors(
      onSuccess?: (response: never) => void,
      onError?: (error: never) => void
    ): Model
    static count(relations: never[]): Model
    static limit(amount: number): Model
    static order(input: string | never[], direction?: string): Model
    static with(relations: never[]): Model
    static scope(name: string, ...params: never[]): Model
    static scopes(...params: never[]): Model
    static search(value: never, columns?: never[]): Model
    static where(column: string, operator: string, value?: never): Model
    static wheres(...params: never[]): Model
    static whereIn(column: string, values: never[]): Model
    static whereIns(...params: never[]): Model
    static whereNotIn(column: string, values: never[]): Model
    static whereNotIns(...params: never[]): Model
    static pluck(fields: never[]): Model
    static appends(appends: string | string[]): Model
    static hiddenFields(hiddenFields: string | string[]): Model
    static action(name: string, id?: number): Model
    static pagination(page: number, perPage?: number, findPageForId?: number | null): Model
    static simplePagination(page: number, perPage?: number): Model
    static setUrl(url: string): Model
    static cancel(): Model
    static get(): Promise<Model>
    static post(data?: object): Promise<Model>
    static put(data?: object): Promise<Model>
    static setKey(key: string): Model
    static delete(): Promise<Model>
    static storeFiles(files?: object, data?: object, url?: string | null): Promise<Model>
}

declare class Batch {
    constructor(requests: any[]);

    readonly successful: boolean;
    readonly successfulRequests: any[];
    readonly failedRequests: any[];

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

    execute(method: string): Promise<any[]>;
}
