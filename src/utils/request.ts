/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend, ExtendOptionsInit } from 'umi-request';
import { notification } from 'antd';
import { getCookie } from './utils';

// const codeMessage = {
//   200: 'Máy chủ đã trả lại thành công dữ liệu được yêu cầu.',
//   201: 'Dữ liệu mới hoặc đã sửa đổi thành công.',
//   202: 'Một yêu cầu đã vào hàng đợi nền (tác vụ không đồng bộ)',
//   204: 'Dữ liệu đã được xóa thành công.',
//   400: 'Đã xảy ra lỗi trong yêu cầu được gửi và máy chủ không tạo hoặc sửa đổi dữ liệu.',
//   401: 'Người dùng không có quyền (mã thông báo, tên người dùng, mật khẩu bị sai).',
//   403: 'Người dùng được ủy quyền, nhưng truy cập bị cấm.',
//   404: 'Yêu cầu được gửi dành cho một bản ghi không tồn tại và máy chủ không hoạt động.',
//   406: 'Định dạng được yêu cầu không có sẵn.',
//   410: 'Tài nguyên được yêu cầu sẽ bị xóa vĩnh viễn và sẽ không còn nữa.',
//   422: 'Khi tạo một đối tượng, đã xảy ra lỗi xác thực.',
//   502: 'Lỗi cổng.',
//   503: 'Dịch vụ không khả dụng và máy chủ tạm thời bị quá tải hoặc được bảo trì.',
//   504: 'Cổng vào đã hết thời gian chờ.',
// };  

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  console.log("respone in request file " , response);
  
  // if (response && response.status) {

  //   const errorText = codeMessage[response.status] || response.statusText;
  //   const { status, url } = response;

  //   notification.error({
  //     message: `Yêu cầu lỗi ${status}: ${url}`,
  //     description: errorText,
  //   });
  // } else 
  if (!response) {
    notification.error({
      description: 'Mạng của bạn không bình thường và không thể kết nối với máy chủ',
      message: 'Mạng bất thường',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
//truong

const baseRequest = extend({
  
  prefix : API_BASE,
  headers : {
    'Access-Control-Allow-Origin' : '*',
   
  },
  errorHandler,
});
baseRequest.interceptors.request.use((url, options) => {
  const jwt = getCookie("APP_TOKEN");
  Object.assign(options.headers, {Authorization: `Bearer ${jwt}`});
  return {url, options}
})

const request = (url: string, options?: ExtendOptionsInit | undefined) => {  
  options ??= {};
  options.headers ??= {};
  if (options.headers['Content-Type'] == 'multipart/form-data') {
    delete options.headers['Content-Type'];
  } else {    
    options.headers['Content-Type'] = 'application/json';
  }
  return baseRequest(url, options);
};
export default request;
