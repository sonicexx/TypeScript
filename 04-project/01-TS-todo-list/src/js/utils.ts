import axios from 'axios';

export function create(
  tagName: string,
  className: string,
  html: string
): HTMLElement {
  const oItem = document.createElement(tagName);
  oItem.className = className;
  oItem.innerHTML = html;

  return oItem;
}

export function findParentNode(
  target: HTMLElement,
  className: string
): HTMLElement | undefined {
  while ((target = target.parentNode as HTMLElement)) {
    if (target.className === className) {
      return target;
    }
  }
}

// axios 方法封装
export function myAxios(path: string, method?: string, data?: object) {
  // 不传 method 默认 get 方法
  method = method ? method : 'GET';

  // 设置默认请求域名
  axios.defaults.baseURL = 'http://localhost:8080';

  // 原装 axios
  return axios(path, {
    method: method,
    data: data,
  });
}
