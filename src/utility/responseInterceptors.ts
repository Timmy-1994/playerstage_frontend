import { AxiosError, AxiosResponse, AxiosInstance } from 'axios';

/**
 * rewrap axios interceptors
 * @see https://axiosIns-http.com/zh/docs/interceptors
 */
type ResponseInterceptorsProps = Partial<{
    onFullfilled:((value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>),
    onReject:((value: AxiosError) => AxiosResponse | Promise<AxiosResponse>),
}>
export class ResponseInterceptors {

    onFullfilled: ResponseInterceptorsProps['onFullfilled'];
    onReject: ResponseInterceptorsProps['onReject'];
    axiosIns:AxiosInstance;
    ptr:number | undefined;

    constructor(axiosIns:AxiosInstance, {onFullfilled, onReject}:ResponseInterceptorsProps) {
        this.onFullfilled = onFullfilled;
        this.onReject = onReject;
        this.axiosIns = axiosIns;
    }

    use() {
        this.ptr = this.axiosIns.interceptors.response.use(
            this.onFullfilled,
            this.onReject
        );
    }

    pause() {
        if(this.ptr === undefined) {
            return;
        }
        this.axiosIns.interceptors.response.eject(this.ptr);
    }
}
