export default class Pagination {
    _page: any;
    _perPage: any;
    _findPageForId: any;
    _simplePagination: boolean;
    filled(): any;
    page(page: any): void;
    perPage(perPage: any): void;
    findPageForId(id: any): void;
    simplePagination(simplePagination: any): void;
    toObject(): {
        page: any;
        paginate: any;
        page_for_id: any;
        simple_pagination: boolean;
    };
}
