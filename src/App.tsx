import React from 'react';
import { Provider as GlobalProvider }  from 'src/contexts/globalContext';
import { routerConfig, GuardedRoutes } from 'src/router';
import { IntlProvider } from 'react-intl';
import { twLang } from './assets/i18n/tw';
import { enLang } from './assets/i18n/en';
import { Provider as CartProvider }  from 'src/contexts/cartContext';
export default function App() {
    
    const lang = localStorage.getItem('lang') || navigator.language;
    const messages = lang === 'en-US' ? enLang : twLang;

    return (
        <IntlProvider locale={lang} key={lang} messages={messages} defaultLocale='tw'>
            <GlobalProvider>
                <CartProvider>
                    <GuardedRoutes config={routerConfig}/>
                </CartProvider>
            </GlobalProvider>
        </IntlProvider>
    );

}
