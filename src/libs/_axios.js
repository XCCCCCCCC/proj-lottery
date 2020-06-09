import axios from 'axios'
import { Toast } from 'vant'
// import { delCookie } from '@/utils/filter.js'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
// axios.defaults.headers.common['accountid'] = '10000';
// axios.defaults.headers.common['token'] = '1fQ3h8P03eUcL4Vb';

// const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://10.8.17.183:8080' : 'http://' + location.host
const config = {
  baseURL: process.env.NODE_ENV === 'development' ? '/' : 'https://' + location.host + '/lottery-api',
  timeout: 60000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
}
const CancelToken = axios.CancelToken
const source = CancelToken.source()
window.axiosCancel = source
const _axios = axios.create(config)
_axios.interceptors.request.use(
  function(config) {
    // eslint-disable-next-line new-cap
    // if (config.method === 'put') {
    //     config.url = config.url + `&access_token=${getCookie('token')}`;
    // } else {
    //     config.url = config.url + `?access_token=${getCookie('token')}`;
    // }

    // Do something before request is sent
    // config.cancelToken = new axios.CancelToken((cancel) => {
    //   window.axios_cancel.push({cancel: cancel})
    // })
    config.cancelToken = window.axiosCancel.token
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data

    if (response.status === 200) {
      if (typeof response.data.errors === 'string') {
        // eslint-disable-next-line new-cap
        Toast(response.data.errors)
        return 0
      } else {
        return response.data
      }
    }
  },
  function(error) {
    const res = error.response
    // eslint-disable-next-line new-cap
    Toast('请求失败')
    return Promise.reject(res)
  },
)
export default _axios
