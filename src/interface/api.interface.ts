export interface PaginatedResponse<T> {
    message: string;
    page_total: number;
    status: number;
    total: number;
    data: T;
    current_page: number;
}
