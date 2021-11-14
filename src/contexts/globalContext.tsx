import React, { useState, createContext, useContext } from 'react';
import * as ResponseType from 'src/types/api';

interface IProvider {
    children: React.ReactChild
}

interface IContext {
    isLoading:boolean
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>
    userInfo:ResponseType.ISigninResponse
    setUserInfo:React.Dispatch<React.SetStateAction<ResponseType.ISigninResponse>>
}

export const Context = createContext<IContext>({} as any); // i dont want to set default value
export const useStore = () => useContext(Context);

export const Provider = (props: IProvider) => {

    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<ResponseType.ISigninResponse>(undefined as any);

    return (
        <Context.Provider
            value={{
                isLoading,
                setIsLoading,
                userInfo,
                setUserInfo
            }}
        >
            {props.children}
        </Context.Provider>
    );
};
