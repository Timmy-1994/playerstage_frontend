import { useState } from 'react';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useStore } from 'src/contexts/globalContext';
import https from 'https';
import {tokenExtend} from 'src/utility/jwtParse';

const useAxios = () => {
    const [error, setError] = useState({} as any);
    const [response, setResponse] = useState({} as AxiosResponse<any>);
    const { setIsLoading } = useStore();

    const axios = Axios.create({
        // Only use in Dev enviroment, should not use this setting in production
        httpsAgent: new https.Agent({
            requestCert: true,
            rejectUnauthorized: false
        })
    });

    axios.interceptors.request.use((Request: AxiosRequestConfig) => {
        tokenExtend();
        Request.headers.Authorization = 'Bearer ' + localStorage.getItem('userToken');
        return Request;
    });

    const apiCaller = async (config = {} as AxiosRequestConfig, hasSpin: boolean = true) => {
        let responseData = [];
        let responseStatus = 0;
        hasSpin && setIsLoading(true);
        try {
            const { data, status } = await axios({
                //   headers: {
                //     Authorization: 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJpYWxOdW1iZXIiOiJ0ZXN0OCIsInNlY3JldEtleSI6IjczOTk2OWI1MzI0NmIyYzcyNzg1MGRiYjM0OTBlZGU2ZTk4YWQ4MDdiZjQyMDNhYjlkNjQwMzRjMDBjNTQwNzE0NTQ1NmUwZjU5ODBkZDM0ZWU2NWFkMGEwYWJiMTk1NjFjMTNiNWY3M2IzZWZiMGE1MzY1OWU1NGNjYzU0YmExIiwicm9sZUlkIjoiNCIsImlhdCI6MTYwODg3OTE5NSwiZXhwIjoxNjE2NjU1MTk1LCJpc3MiOiJiYWNrZW5kLXNlcnZlciJ9.gfeX-92q7UuK14dxNi4g2Cgt5i1j3Y8d0mVCypT84Oc'
                //  },
                ...config
            });
            responseData = data;
            responseStatus = status;
            setResponse(responseData);
        } catch (err) {
            setError(err);
            console.error(err);
        } finally {//不論失敗成功皆會執行
            hasSpin && setIsLoading(false);
        }
        return {
            responseData: responseData,
            responseStatus: responseStatus
        };
    };

    return ({
        apiCaller,
        response,
        error
    });
};

export default useAxios;