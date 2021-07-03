import React, { useState, createContext, useContext } from 'react';

interface IProvider {
    children: React.ReactChild
}

interface IAiSettingContext {
    isLoading:boolean
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<Partial<IAiSettingContext>>({});
export const useStore = () => useContext(Context) as IAiSettingContext;

export const Provider = (props: IProvider) => {
    
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Context.Provider
            value={{
                isLoading,
                setIsLoading
            }}
        >
            {props.children}
        </Context.Provider>
    );
};
