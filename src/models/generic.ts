export type APIResponse<T> = {
    status: number;
    json: ()=>any;
}

export interface ErrorResponse {
    error: string;
    json: ()=>any;
}