import {
  PARSE_URL,
  PARSE_APPLICATION_ID,
  PARSE_REST_API_KEY,
} from './constants';

export default function setupAxios(axios, store) {
  axios.defaults.baseURL = PARSE_URL;
  axios.defaults.headers.common[
    'X-Parse-Application-Id'
  ] = PARSE_APPLICATION_ID;
  axios.defaults.headers.common['X-Parse-REST-API-Key'] = PARSE_REST_API_KEY;

  axios.interceptors.request.use(
    (config) => {
      const { auth } = store.getState();

      if (auth.authToken) {
        config.headers['X-Parse-Session-Token'] = auth.authToken;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );
}
