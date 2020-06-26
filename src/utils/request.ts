import { extend } from 'umi-request';
import { notification } from 'antd';
import { history } from 'umi';
import queryString from 'query-string';


const codeMessage: { [key: number]: string } = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: any }) => {
    const { response } = error;

    console.log(error)
    if (response && response.status) {
        const errorText = codeMessage[response.status] || response.statusText;
        const { status, url } = response;
        notification.error({
            message: `请求错误 ${status}: ${url}`,
            description: errorText,
        });
    } else if (!response) {
        notification.error({
            description: '您的网络发生异常，无法连接服务器',
            message: '网络异常',
        });
    }

    return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
    errorHandler, // 默认错误处理
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
    let data = options.data;
    let headers = options.headers;

    const isFormData = data instanceof FormData
    const isObject = data instanceof Object

    if (!isFormData && Object.keys(headers ?? {}).length === 0) {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        };
    }

    if (isObject && Object.keys(data).length > 0) {
        data = queryString.stringify(data);
    }


    const c_token = localStorage.getItem("Authorization");


    if (c_token) {
        headers = {
            ...options.headers,
            'Authorization': c_token,
        };
    }

    return (
        {
            url: url,
            options: { ...options, headers: headers, data: data },
        }
    );
})

// response拦截器, 处理response
request.interceptors.response.use((response, options) => {
    switch (response.status) {
        case 401:
            history.push('/user/login');
            break;
        case 403:
            history.push('/403');
            break;
        case 404:
            history.push('/404');
            break;
        case 500:
            history.push('/500');
            break;
        default:
            break;
    }

    let token = response.headers.get("Authorization");
    if (token) {
        localStorage.setItem("Authorization", token);
    }
    console.log(response)
    return response;
});

export default request;
