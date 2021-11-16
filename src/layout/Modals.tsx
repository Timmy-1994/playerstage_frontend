import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { WarningOutlined,
    InfoCircleOutlined,
    CheckCircleOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import { ModalFuncProps } from 'antd/lib/modal';
import modal from 'antd/lib/modal';
import { Prompt, useHistory } from 'react-router-dom';
import { Button } from 'src/component/styled';
import { Space } from 'antd';

const RoutePrompt = (props: { when: boolean }) => {
    const { when } = props;

    const history = useHistory();

    const [isShowPrompt, setIsShowPrompt] = useState(when);
    useEffect(() => {
        setIsShowPrompt(when);
    }, [when]);
    const [nextLocation, setNextLocation] = useState<string>('');

    useEffect(() => {
        if (nextLocation) {
            history.push(nextLocation);
        }
    }, [nextLocation]);

    return <Prompt
        message={(loc) => {
            Modal.confirm({
                title: '確定要離開？',
                onOk: () => {
                    setIsShowPrompt(false);
                    setNextLocation(loc.pathname);
                }
            });
            return false;
        }}
        when={isShowPrompt}
    />;
};

const Footer = styled.div`
    & {
        margin-top: 2rem;
        display: flex;
        justify-content: flex-end;
        >* {
            margin-left: 1rem;
        }
    }
`;

const GlobalStyle = createGlobalStyle<{color:string}>`
    .ant-modal-confirm-btns {
        display: none;
    }

    .ant-modal-confirm-body {
        .anticon{
            * {
                color: var(--color-${props => props.color});
            }
            font-size: 2rem;
        }
        .ant-modal-confirm-content{
            margin: 1rem 0;
            white-space: pre-wrap;
            color:var(--color-${props => props.color});
        }
    }
`;

interface directModalProps extends Omit<ModalFuncProps, 'direction'|'type'>{
    type?:'info'|'success'|'error'|'warning'|'confirm'
    footer?:React.ReactNode,
    direction?:'vertical'|'horizontal'
    duration?:number
}

const directModal = (props: directModalProps) => {

    const typeIcon = {
        info: <InfoCircleOutlined />,
        success: <CheckCircleOutlined />,
        error: <WarningOutlined/>,
        warning: <WarningOutlined/>,
        confirm: <QuestionCircleOutlined />
    };

    const {
        type = 'confirm',
        footer = undefined,
        okText = 'ok',
        onOk = () => console.error('onOk no op'),
        cancelText,
        onCancel = () => console.error('onCancel no op'),
        content = 'no message',
        direction = 'horizontal',
        style = {},
        duration,
        ...rest
    } = props;
    
    if(direction === 'vertical') {
        style.textAlign = 'center';
    }

    const config = {
        ...rest,
        style: {top: '35%', ...style},
        icon: null,
        content: <>
            <GlobalStyle color={type === 'confirm' ? 'primary' : type}/>

            <Space direction={direction} align={'center'}>
                {typeIcon[type]}
                {content}
            </Space>
            
            {
                footer !== undefined 
                    ? 
                    footer 
                    : 
                    (
                        <Footer>
                            {
                                cancelText && <Button
                                    onClick={() => {
                                        onCancel();
                                        _modal.destroy();
                                    }}
                                >{cancelText}</Button>
                            }
                            <Button
                                onClick={() => {
                                    onOk();
                                    _modal.destroy();
                                }}
                            >{okText}</Button>
                        </Footer>
                    )
            }
        </>
    };

    const _modal = modal[type](config);
    
    if(duration !== undefined) {
        setTimeout(_modal.destroy, duration);
    }

    return _modal;
};

const Modal = {
    info: (props: directModalProps) => directModal({...props, type: 'info'}),
    success: (props: directModalProps) => directModal({...props, type: 'success'}),
    error: (props: directModalProps) => directModal({...props, type: 'error'}),
    warning: (props: directModalProps) => directModal({...props, type: 'warning'}),
    confirm: (props: directModalProps) => directModal({...props, type: 'confirm'})
};

export {Modal, RoutePrompt};