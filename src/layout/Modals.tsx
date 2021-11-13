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
    .ant-modal {
        .ant-modal-confirm-btns {
            display: none;
        }
        .ant-modal-confirm-title{
            font-weight: normal;
            font-size: 1rem;
            color:var(--color-${props => props.color});
        }
        .ant-modal-confirm-content{
            margin: 1rem 0;
            white-space: pre-wrap;
            color:var(--color-${props => props.color});
        }
        .anticon{
            * {
                color: var(--color-${props => props.color});
            }
            font-size: 2rem;
        }
    }
`;

const directModal = (
    props: ModalFuncProps,
    type:'info'|'success'|'error'|'warning'|'confirm'
) => {

    const {
        okText = 'ok',
        cancelText = 'cancel'
    } = props;

    // const typesStyle = {}

    const typeIcon = {
        info: <InfoCircleOutlined />,
        success: <CheckCircleOutlined />,
        error: <WarningOutlined/>,
        warning: <WarningOutlined/>,
        confirm: <QuestionCircleOutlined />
    };

    const config = {
        icon: typeIcon[type],
        style: {top: '35%'},
        ...props,
        content: <>
            <GlobalStyle color={type === 'confirm' ? 'primary' : type}/>
            {props.content || 'no message'}
            <Footer>
                {
                    (type === 'confirm') && <Button
                        onClick={() => {
                            _modal.destroy();
                        }}
                    >{cancelText}</Button>
                }
                <Button
                    onClick={() => {
                        props.onOk && props.onOk();
                        _modal.destroy();
                    }}
                >{okText}</Button>
            </Footer>
        </>
    };

    const _modal = modal[type](config);
};

const Modal = {
    info: (props: ModalFuncProps) => directModal(props, 'info'),
    success: (props: ModalFuncProps) => directModal(props, 'success'),
    error: (props: ModalFuncProps) => directModal(props, 'error'),
    warning: (props: ModalFuncProps) => directModal(props, 'warning'),
    confirm: (props: ModalFuncProps) => directModal(props, 'confirm')
};

export {Modal, RoutePrompt};