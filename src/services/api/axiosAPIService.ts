import {
  APIPaths,
  HTTPCachePolicies,
  HTTPCredentials,
  HTTPMethods,
  HTTPModes,
  HTTPRedirect,
  HTTPReferrerPolicy,
  StringConstants,
} from "../constants/constantsService";
import { isSuccessResponse } from "../globalFunctions";
import { APIService } from "./baseAPIService";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const AuthAPIPaths = APIPaths.AuthAPIPaths;

const CommonRequestParams = {
  mode: HTTPModes.CORS as RequestMode,
  cache: HTTPCachePolicies.NO_CACHE as RequestCache,
  credentials: HTTPCredentials.SAME_ORIGIN as RequestCredentials,
  redirect:  HTTPRedirect.FOLLOW as RequestRedirect,
  referrerPolicy: HTTPReferrerPolicy.NO_REFERRER as ReferrerPolicy,
};

const Headers = {
  "Content-Type": "application/json",
};

const HeadersWithAuth = {
  ...Headers,
  Authorization: `JWT ${localStorage.getItem(
    StringConstants.localStorageKeys.accessToken
  )}`,
};

class AxiosAPIService implements APIService {
  simulateLogout = () => {
    localStorage.removeItem(StringConstants.localStorageKeys.accessToken);
    localStorage.removeItem(StringConstants.localStorageKeys.refreshToken);
    window.location.reload();
  };

  accessRefreshCycle = async () => {
    const accessResponse = await this.apiPost(AuthAPIPaths.VERIFY_TOKEN, {
      token: localStorage.getItem(StringConstants.localStorageKeys.accessToken),
    });
    if (!isSuccessResponse(accessResponse)) {
      const refreshResponse = await this.apiPost(AuthAPIPaths.REFRESH_TOKEN, {
        refresh: localStorage.getItem(
          StringConstants.localStorageKeys.refreshToken
        ),
      });
      if (isSuccessResponse(refreshResponse)) {
        const responseJSON = await refreshResponse.json();
        localStorage.setItem(
          StringConstants.localStorageKeys.accessToken,
          responseJSON.access
        );
        return true;
      } else {
        return false;
      }
    } else return true;
  };

  apiGet = async (url: string) => {
    const response = await fetch(BASE_URL + url, {
      ...CommonRequestParams, // Spread the CommonRequestParams object
      method: HTTPMethods.GET, // *GET, POST, PUT, DELETE, etc.
      headers: Headers,
    });

    return await response;
  };

  apiPost = async (url: string, data: any) => {
    const response = await fetch(BASE_URL + url, {
      ...CommonRequestParams, // Spread the CommonRequestParams object
      method: HTTPMethods.POST, // *GET, POST, PUT, DELETE, etc.
      headers: Headers,
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    return response;
  };

  apiPostAuthenticated = async (url: string, data: any) => {
    if (!this.accessRefreshCycle()) {
      this.simulateLogout();
    }

    const response = await fetch(BASE_URL + url, {
      ...CommonRequestParams, // Spread the CommonRequestParams object
      method: HTTPMethods.POST, // *GET, POST, PUT, DELETE, etc.
      headers: HeadersWithAuth,
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    return await response;
  };

  apiGetAuthenticated = async (url: string) => {
    const result = await this.accessRefreshCycle();
    if (result === false) {
      this.simulateLogout();
    }

    const response = await fetch(BASE_URL + url, {
      ...CommonRequestParams, // Spread the CommonRequestParams object
      method: HTTPMethods.GET, // *GET, POST, PUT, DELETE, etc.
      headers: HeadersWithAuth,
    });
    return await response;
  };

  apiDeleteAuthenticated = async (url: string) => {
    const result = await this.accessRefreshCycle();
    if (result === false) {
      this.simulateLogout();
    }

    const response = await fetch(BASE_URL + url, {
      ...CommonRequestParams, // Spread the CommonRequestParams object
      method: HTTPMethods.DELETE, // *GET, POST, PUT, DELETE, etc.
      headers: HeadersWithAuth,
    });
    return await response;
  };

  apiPatchAuthenticated = async (url: string, data: any) => {
    if (!this.accessRefreshCycle()) {
      this.simulateLogout();
    }

    const response = await fetch(BASE_URL + url, {
      ...CommonRequestParams, // Spread the CommonRequestParams object
      method: HTTPMethods.PATCH, // *GET, POST, PUT, DELETE, etc.
      headers: HeadersWithAuth,
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    return await response;
  };

  apiPatchFileAuthenticated = async (url: string, data: any) => {
    if (!this.accessRefreshCycle()) {
      this.simulateLogout();
    }

    const response = await fetch(BASE_URL + url, {
      ...CommonRequestParams, // Spread the CommonRequestParams object
      method: HTTPMethods.PATCH, // *GET, POST, PUT, DELETE, etc.
      headers: { ...HeadersWithAuth, "Content-Type": "multipart/form-data" },
      body: data, // body data type must match "Content-Type" header
    });

    return await response;
  };
}

export default AxiosAPIService;
