import Axios, { AxiosRequestConfig } from 'axios';
import https from 'https';
let token;

// jwt解碼
function jwtParse() {
    try {
        token = localStorage.getItem('userToken');
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch {
        return;
    }
}

const refreshToken = async () => {
    const axios = Axios.create({
        // Only use in Dev enviroment, should not use this setting in production
        httpsAgent: new https.Agent({
            requestCert: true,
            rejectUnauthorized: false
        })
    });

    try {
        // const { data, status } = await axios(userLoginConfig({
        //     secretKey: '58afef1bf8c90a43be4c16c54f62940239a0902d64a9d57e7a46bb370bf26b9d2f25fb51256be5afc4790103367c62c955a845977dd422500b296acc5542777c',
        //     serialNumber: 'defaultUser'
        // }) as AxiosRequestConfig);
        // if ( status === 200) {
        //     const {token} = data;
        //     if( token ) {
        //         localStorage.setItem('userToken', token);
        //     }
        // } 
    } catch (err) {
        console.error(err);
    } 
};

// token延長
export const tokenExtend = () => {
    const jwt = jwtParse();
    const dt = new Date();
    if (jwt?.exp < (dt.getTime() / 1000) + 2700) {
        refreshToken();
    }
};

// 檢查token是否有效
export const isTokenValid = () => {
    const jwt = jwtParse();
    const dt = new Date();
    if (jwt?.exp > (dt.getTime() / 1000)) {
        return true;
    } else {
        return false;
    }
};