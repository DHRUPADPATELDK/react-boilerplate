declare namespace Pagination {
  export interface Object {
    [key: string]: any;
    list: any[];
    count: number;
    total: number;
    currentPage: number;
    totalPage: number;
  }
}
