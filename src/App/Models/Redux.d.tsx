declare namespace Redux {
  export interface Object {
    [key: string]: any;
    data: Pagination.Object;
    isLoading: boolean;
    error: string;
  }
}
