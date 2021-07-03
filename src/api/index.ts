export const baseUrl =  process.env.REACT_APP_BASEURL;
export const baseSLUrl =  process.env.REACT_APP_SL_BASEURL;
export const baseSocketUrl =  process.env.REACT_APP_SOCKET_BASEURL;
export const timeout =  process.env.REACT_APP_API_TIMEOUT;

export const getToken = () => localStorage.getItem('userToken');
