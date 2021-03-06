// https://umijs.org/config/

import { getCookie } from '@/utils/utils';
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;
//truong
const global_environment = {
  API_BASE : "http://trunghieu.cosplane.asia",
  
}
export default defineConfig({
  hash: true,
  antd: {

  },
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default en-US 
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  //truong
  define: {
    ...global_environment,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy ,
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
