export interface APIService {
  simulateLogout(): void;
  apiGet(url: string): Promise<Response>;
  apiPost(url: string, data: any): Promise<Response>;
  apiGetAuthenticated(url: string): Promise<Response>;
  apiPostAuthenticated(url: string, data: any): Promise<Response>;
  apiDeleteAuthenticated(url: string): Promise<Response>;
  apiPatchAuthenticated(url: string, data: any): Promise<Response>;
  apiPatchFileAuthenticated(url: string, data: any): Promise<Response>;
}
