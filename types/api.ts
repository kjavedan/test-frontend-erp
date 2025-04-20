export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}
