import React from 'react';
import { BrowserRouter, Route, RouteProps, Switch, useHistory, useLocation } from 'react-router-dom';
import Signin from 'src/page/Signin';
import Signup from 'src/page/Signup';
import Landing from 'src/page/Landing';
import { useStore as useGlobalStore } from 'src/contexts/globalContext';
import Cart from './page/Cart';
import Product from './page/Product';

export interface IRouterConfig extends RouteProps {
	component?:React.ComponentType<any>,
	auth?:boolean;
}
export const GuardedRoute = (props:RouteProps) => {
    const location = useLocation();
    const {setUserInfo, setCart} = useGlobalStore();
    const history = useHistory();

    console.log('[ GuardedRoute - props ]', props);

    React.useEffect(() => {

        // sync storage to state - user state
        const userInfo = localStorage.getItem('userInfo');
        userInfo !== null && setUserInfo(JSON.parse(userInfo));
        
        // sync storage to state - cart state
        const cart = sessionStorage.getItem('cart');
        cart !== null &&  setCart(JSON.parse(cart));


        // hasLogin -> redirect
        if(location.pathname === '/signin' && userInfo) {
            history.push('/');
        }

    }, []);

    return <Route {...props}/>;
};

export const GuardedRoutes = (props:{config:IRouterConfig[]}) => (
    <BrowserRouter>
        <Switch>
            {
                props.config.map((routeConfig, idx) => (
                    <GuardedRoute {...{
                        ...routeConfig,
                        key: idx
                    }}/>
                ))
            }
        </Switch>
    </BrowserRouter>
);

export const routerConfig:Array<IRouterConfig> = [
    {
        path: '/',
        exact: true,
        component: Landing
    },
    {
        path: '/signin',
        exact: true,
        component: Signin
    },
    {
        path: '/signup',
        exact: true,
        component: Signup
    },
    {
        path: '/cart',
        exact: true,
        component: Cart
    },
    {
        path: '/product/:uuid',
        exact: true,
        component: Product
    },
    {
        render: (routeProps) => <p style={{color: 'red'}}>{JSON.stringify(routeProps)} : 404</p>
    }
];