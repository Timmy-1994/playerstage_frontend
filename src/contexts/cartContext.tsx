import React, { createContext, useContext, useReducer } from 'react';
import * as ResponseType from 'src/types/api';

interface IProvider {
    children: React.ReactChild
}

export interface ICartItem extends ResponseType.IProductResponse{
    amount:number
    selectedModelUUID:string
    noModelsForSelect:boolean
    isChecked:boolean
}

type action = (
    {type: 'POST_ITEM', payload:Partial<ICartItem>}|
    {type: 'DELETE_ITEM', payload:{modelUUID:string}}|
    {type: 'PUT_ITEM', payload:{modelUUID:string, data:Partial<ICartItem>}}|
    {type: 'DELETE_ALL_ITEM'}
)

interface IContext {
    cart:Array<ICartItem>
    dispatchCart:React.Dispatch<action>
}

const buildACartItem:(item:Partial<ICartItem>)=>ICartItem = item => {
    const {
        uuid,
        coverImage = '',
        imgUrl = [],
        models,
        brand = '',
        time = '',
        description = '',
        isPreOrder = false,
        name = '',
        rating = 0,
        sold = 0
    } = item;
    
    if(!uuid || !models) {
        throw('uuid and models are required');
    }

    return {
        uuid,
        coverImage,
        imgUrl,
        models,
        brand,
        time,
        description,
        isPreOrder,
        name,
        rating,
        sold,
        selectedModelUUID: item.selectedModelUUID || models[0].uuid,
        noModelsForSelect: item.noModelsForSelect || models.length <= 1, 
        isChecked: item.isChecked || true,
        amount: item.amount || 1
    };
};

export const Context = createContext<IContext>({} as any); // i dont want to set default value
export const useStore = () => useContext(Context);

export const Provider = (props: IProvider) => {

    const putItem = (prvState:ICartItem[], payload:{modelUUID:string, data:Partial<ICartItem>}) => {
        
        let newState:ICartItem[] = [];
        

        for (const item of prvState) {

            if(item.selectedModelUUID !== payload.modelUUID) {
                newState.push(item);
                continue;
            }
            
            // make sure amount under total stock
            const model = item.models.find(x => x.uuid === payload.data.selectedModelUUID);
            if(Number(payload.data?.amount) > Number(model?.totalStock)) {
                payload.data.amount = model?.totalStock;
            }

            newState.push({...item, ...payload.data}); 
        }

        return newState;

    };

    const postItem = (prvState:ICartItem[], payload:ICartItem) => {
        
        let newState:ICartItem[] = [];
        let exsistSameModel = false;

        for (const item of prvState) {
            if(item.selectedModelUUID !== payload.selectedModelUUID) {
                newState.push(item);
                continue;
            }

            // make sure amount under total stock
            const model = item.models.find(x => x.uuid === payload.selectedModelUUID);
            let amount = item.amount;
            if(model && (item.amount + 1 <= model.totalStock)) {
                amount += 1;
            }

            newState.push({...item, amount});
            exsistSameModel = true;
        }

        if(exsistSameModel) {
            return newState;
        }
        
        return [...prvState, payload];
    };

    const [cart, dispatchCart] = useReducer<React.Reducer<Array<ICartItem>, action>>(
        (state, action) => {
            switch(action.type) {
                case 'PUT_ITEM':
                    return putItem(state, action.payload);
                case 'POST_ITEM':
                    return postItem(state, buildACartItem(action.payload));
                case 'DELETE_ITEM':
                    return [...state.filter(x => x.selectedModelUUID !== action.payload.modelUUID)];
                case 'DELETE_ALL_ITEM':
                    return [];
                default:
                    return state;
            }
        },
        []
    );

    React.useEffect(() => {
        // for sync in router
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <Context.Provider
            value={{
                cart,
                dispatchCart
            }}
        >
            {props.children}
        </Context.Provider>
    );
};
