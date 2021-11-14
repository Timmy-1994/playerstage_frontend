import React from 'react';
import { BrowserRouter, Route, RouteProps, Switch, useHistory, useLocation } from 'react-router-dom';
import Signin from 'src/page/Signin';
import Signup from 'src/page/Signup';
import Landing from 'src/page/Landing';
import { useStore as useGlobalStore } from 'src/contexts/globalContext';

export interface IRouterConfig extends RouteProps {
	component?:React.ComponentType<any>,
	auth?:boolean;
}
export const GuardedRoute = (props:RouteProps) => {
    const location = useLocation();
    const {setUserInfo} = useGlobalStore();
    const history = useHistory();

    console.log('[ GuardedRoute - props ]', props);

    React.useEffect(() => {

        const userInfo = localStorage.getItem('userInfo') || undefined;   
        setUserInfo(userInfo && JSON.parse(userInfo as string));

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
        render: (routeProps) => <p style={{color: 'red'}}>{JSON.stringify(routeProps)} : 404</p>
    }
];