/**
 * @see https://www.rfc-editor.org/rfc/rfc6750
 */

import Axios, { AxiosResponse } from 'axios';
import * as apiType from 'src/types/api';
import { ResponseInterceptors } from 'src/utility/responseInterceptors';

const axiosIns = Axios.create({
    baseURL: process.env.REACT_APP_API_BASEURL as string,
    withCredentials: true
});
// console.log("[axiosIns.defaults]" , axiosIns.defaults)

const responseInterceptorsIns = new ResponseInterceptors(axiosIns, {
    onReject: async error => {

        console.log('[ResponseInterceptors - error.response]', error.response);

        switch(error.response?.status) {
            /** authentication error : without authorization header || accessToken has expired */
            case 401:
                try{
                    // bypass request of accessToken
                    responseInterceptorsIns.pause();

                    const {data: accessToken} = await axiosIns.get<string>('/auth/accessToken');
                    console.log('got new accessToken after 401 : authentication error', accessToken);

                    // after retry previous request which cause 401 , reenable the Interceptors
                    error.config.headers.Authorization = `Bearer ${accessToken}`;
                    const retryResovledPromise = await axiosIns.request(error.config);

                    axiosIns.defaults.headers.Authorization = `Bearer ${accessToken}`;
                    responseInterceptorsIns.use();

                    return retryResovledPromise;
                }catch(e) { /** assume the refresh token has expired */
                    window.location.href = '/signin';
                }
                break;
            case 403:
                console.log('403 auth forbidden');
                break;
        }

        return Promise.reject(error.response);
    }
});

responseInterceptorsIns.use();


export const signup = (payload:apiType.ISignupRequest) => axiosIns.post<apiType.ISignupResponse>('/auth/signup', payload);

export const signin = async (payload:apiType.ISigninRequest) => {
    const res = await axiosIns.post<apiType.ISigninResponse>('/auth/signin', payload);   
    localStorage.setItem('userInfo', JSON.stringify(res.data));
    return res;
};

export const logout = async (userUUID:string) => {
    axiosIns.delete<void>(`/auth/logout?userid=${userUUID}`);
    localStorage.removeItem('userInfo');
    window.location.reload();
};

export class product {
    
    
    static get(params?:Partial<{page:number, pageSize:number}>):Promise<AxiosResponse<Array<apiType.IProductResponse>>>
    static get(params:string):Promise<AxiosResponse<apiType.IProductResponse>>
    static get(params:any) {
        if(typeof params ===  'string') {
            return axiosIns.get<apiType.IProductResponse>(`/products/${params}`);
        }
        return axiosIns.get<Array<apiType.IProductResponse>>('/products', {params});
    }

}