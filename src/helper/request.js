import Axios from "axios";
import ReactDom from 'react-dom';
import { message, Spin } from 'antd';

export const axios = Axios.create({
  timeout: 10000
});

let requestCount = 0;

function showLoading() {
  if (requestCount === 0) {
    const dom = document.createElement('div');
    dom.setAttribute('id', 'loading')
    document.body.appendChild(dom);
    ReactDom.render(<Spin tip="加载中..." size="large" />, dom);
  }
  requestCount++
}

function hideLoading() {
  requestCount--
  if (requestCount === 0) {
    document.body.removeChild(document.getElementById('loading'))
  }
}

// 预请求拦截器
axios.interceptors.request.use(config => {
  // 相对地址，加上BASE_URL作为前缀
  // if (
  //   !config.url.startsWith("https://") &&
  //   !config.url.startsWith("http://") &&
  //   !config.url.startsWith("//")
  // ) {
  //   config.url = BASE_URL + config.url;
  // }
  showLoading()
  config.url = '/api/v1' + config.url;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  if (!!BASE_URL) {
    config.url = BASE_URL + config.url;
  }
  const userInfo = JSON.parse(localStorage.getItem('user'));
  if (userInfo) {
    config.headers.Token = `${userInfo.token}`;
  }
  return config;
});

// 响应拦截器（处理错误）
axios.interceptors.response.use(response => {
  hideLoading()
  return response;
}, error => {
  hideLoading()
  console.log(error)
  return Promise.reject(error)
});

function handleResponse(response) {
  return response.data;
}

export function httpPost(api, data = {}) {
  data = {
    ...data
  };
  return axios.post(api, data)
    .then(handleResponse)
    .catch(error => {
      message.error(error.response.data.errors[0].msg);
      return {'data': 'failed'}
    })
}

export function httpDelete(api, data = {}) {
  data = {
    ...data
  };
  return axios.delete(
    api, data).then(handleResponse)
}


export function httpGet(api, data = {}) {
  data = {
    ...data
  };

  const request = () => axios.get(api, { params: data }).then(handleResponse);
  return request();
}

export function httpPut(api, data = {}) {
  data = {
    ...data
  };
  return axios.put(api, data)
    .then(handleResponse)
    .catch(error => {
      message.error(error.response.data.errors[0].msg);
    })
}
