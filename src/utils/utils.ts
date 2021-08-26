import { parse } from 'querystring';
import { notification } from 'antd';
import jwt_decode from 'jwt-decode';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};
export const sendNotification = (title: string, message: string, type: string) => {
  notification[type]({
    message: title,
    description: message,
  });
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const decodeToken = (token: string) => {
  return jwt_decode(token);
};

export const setCookie = (cname: any, cvalue: any, expireDay = 1) => {
  const d = new Date();
  d.setTime(d.getTime() + expireDay * 7* 60 * 60 * 1000);
  
  const expires = `expires=${d.toUTCString()}`;
  
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
  
};

// set Cookie
export const getCookie = (cname: any) => {
  const name = `${cname}=`;
  
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    //get ${cname}=S{cvalue} 
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      //get cvalue
      return c.substring(name.length, c.length);
    }
    
  }
  
  return '';
};
// delete all cookies
export const deleteAllCookie = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;   
  }
};
export const handleColor = (status: string) => {
  if(status == "Mới") return 'blue'
  else  if(status == "Đang chờ kích hoạt") return 'magenta'
  else if(status == "Đang diễn ra") return 'green'
  else if(status == "Tạm dừng") return 'gold'
  else return 'red';
};