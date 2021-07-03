import React from 'react';
import { BrowserRouter, Redirect, Route, RouteProps, Switch, useLocation } from 'react-router-dom';
import Login from 'src/page/Login';
import Landing from 'src/page/Landing';

export interface IRouterConfig extends RouteProps {
	component?:React.ComponentType<any>,
	auth?:boolean;
}
export const GuardedRoute = (props:RouteProps) => {
    const location = useLocation();
	
    console.log('[ GuardedRoute - props ]', props);

    // if(location.pathname === '/') {
    //     return <Redirect to='/login'/>;
    // }

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
        path: '/login',
        exact: true,
        component: Login
    },
    {
        render: (routeProps) => <p>{String(routeProps)} : 404</p>
    }
];