import axios from 'axios';
import qs from 'query-string';
import store from '../redux/store';
import {serverAPI} from "../constants/constants";

class Request {
  static token() {
    return store.getState().user.usToken;
  }

  static header(contentType) {
    const header = {
      'content-type': contentType,
      'crm-language': 'en',
    };
    return header;
  }

  static post(endpoint, params = {}, contentType = 'application/json') {
    if (contentType === 'application/x-www-form-urlencoded') {
      params = qs.stringify(params);
    }
    return axios
      .post(serverAPI + endpoint, params, {
        headers: Request.header(contentType),
        withCredentials: true,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'x-csrftoken',
      })
      .catch((error) => {
        if (error.response.status === 401) {
        } else if (error.response.status === 500) {
          return error.response;
        } else if (
          error.response.status === 400 &&
          error.response.data &&
          error.response.data.length
        ) {
          const errorData = error.response.data[0];
          return {
            ...error.response,
            data: {
              error_code: 400,
              detail: Object.keys(errorData)
                .map(key => `${key}: ${errorData[key]}`)
                .join('/n'),
            },
          };
        }
        throw error;
      });
  }

  static put(endpoint, params = {}, contentType = 'application/json') {
    if (contentType === 'application/x-www-form-urlencoded') {
      params = qs.stringify(params);
    }
    return axios
      .put(serverAPI + endpoint, params, {
        headers: Request.header(contentType),
        withCredentials: true,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'x-csrftoken',
      })
      .catch((error) => {
        if (error.response.status === 401) {
        } else if (error.response.status === 500) {
          return error.response;
        }
        throw error;
      });
  }

  static delete(endpoint, params = {}, data, contentType = 'application/json') {
    if (contentType === 'application/x-www-form-urlencoded') {
      params = qs.stringify(params);
    }
    return axios
      .delete(serverAPI + endpoint, {
        params,
        data,
        headers: Request.header(contentType),
        withCredentials: true,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'x-csrftoken',
      })
      .catch((error) => {
        if (error.response.status === 401) {
        } else if (error.response.status === 500) {
          return error.response;
        }
        throw error;
      });
  }

  static postText(endpoint, params = {}, contentType = 'application/json') {
    if (contentType === 'application/x-www-form-urlencoded') {
      params = qs.stringify(params);
    }
    return axios
      .post(serverAPI + endpoint, params, {
        headers: Request.header(contentType),
        withCredentials: true,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'x-csrftoken',
        transformResponse: undefined,
      })
      .catch((error) => {
        if (error.response.status === 401) {
        } else if (error.response.status === 500) {
          return error.response;
        }
        throw error;
      });
  }

  static get(endpoint, params = {}, contentType = 'application/json') {
    if (contentType === 'application/x-www-form-urlencoded') {
      params = qs.stringify(params);
    }
    return axios
      .get(serverAPI + endpoint, {
        params,
        headers: Request.header(contentType),
        withCredentials: true,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'x-csrftoken',
        paramsSerializer: value => qs.stringify(value),
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
        } else if (error.response.status === 500) {
          return error.response;
        }
        throw error;
      });
  }
}

export default Request;
