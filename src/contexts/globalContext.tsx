import React, { useState, createContext, useContext } from 'react';
import * as ResponseType from 'src/types/api';

interface IProvider {
    children: React.ReactChild
}

export interface ICartItem extends ResponseType.IProductResponse{
    amount:number
    priceRangeOfModels:string
    selectedModelUUID:string
    noModelsForSelect:boolean
    isChecked:boolean
}

interface IContext {
    isLoading:boolean
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>
    userInfo:ResponseType.ISigninResponse
    setUserInfo:React.Dispatch<React.SetStateAction<ResponseType.ISigninResponse>>
    cart:Array<ICartItem>
    setCart:React.Dispatch<React.SetStateAction<Array<ICartItem>>>
}

export const Context = createContext<IContext>({} as any); // i dont want to set default value
export const useStore = () => useContext(Context);

export const Provider = (props: IProvider) => {

    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<ResponseType.ISigninResponse>(undefined as any);
    const [cart, setCart] = useState<Array<ICartItem>>([]);

    React.useEffect(() => {
        // for sync in router
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <Context.Provider
            value={{
                isLoading,
                setIsLoading,
                userInfo,
                setUserInfo,
                cart,
                setCart
            }}
        >
            {props.children}
        </Context.Provider>
    );
};
