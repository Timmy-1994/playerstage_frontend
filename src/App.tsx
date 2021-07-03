import React from 'react';
import { Provider as GlobalProvider }  from 'src/contexts/globalContext';
import { routerConfig, GuardedRoutes } from 'src/router';
import { createGlobalStyle } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { twLang } from './assets/i18n/tw';
import { enLang } from './assets/i18n/en';

require('antd/dist/antd.css');

const AndtCssOverride = createGlobalStyle`
    .ant-tooltip {
        .ant-tooltip-content{
            color: var(--color-text-primary)
        }
        .ant-tooltip-inner,.ant-tooltip-arrow-content{
            background: #393D4A
        }
    }  

    .ant-select-dropdown {
        .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
            background: #D1ECFF;
        }
    }
    
    .ant-modal {
        .ant-modal-content {
            border-radius: .5rem;
        }
    }
`;

export default function App() {
    
    const lang = localStorage.getItem('lang') || navigator.language;
    const messages = lang === 'en-US' ? enLang : twLang;

    return (
        <IntlProvider locale={lang} key={lang} messages={messages} defaultLocale='tw'>
            <AndtCssOverride/>
            <GlobalProvider>
                <GuardedRoutes config={routerConfig}/>
            </GlobalProvider>
        </IntlProvider>
    );

}
