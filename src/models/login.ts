import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { decodeToken, deleteAllCookie, getPageQuery, sendNotification, setCookie } from '@/utils/utils';
import { message } from 'antd';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      
      console.log("response login ", response);
      if (response.body == undefined) { //dang nhap thanh cong
        console.log("response loginsuccess ", response);
        setCookie('APP_TOKEN', response);
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        
        console.log("ok");

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        sendNotification('Đăng nhập thành công!!','','success')
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');

      }else{ 
        sendNotification('Đăng nhập thất bại!!','Sai tài khoản hoặc mật khẩu','error')
      }

    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        deleteAllCookie();
        sendNotification("Đăng xuất thành công!!", "", "success");
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority('admin');

      return {
        ...state,
        status: 'ok',
        type: payload.type,
      };

    },
  },
};

export default Model;
