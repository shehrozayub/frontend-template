import { APIService } from "./baseAPIService";
import AxiosAPIService from "./axiosAPIService";

class APIFactory {
    private static APIService: APIService;
    static getAPIService(): APIService {
        this.APIService = new AxiosAPIService();
        return this.APIService;
    }
}

export default APIFactory;