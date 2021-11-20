import React from 'react';
import styled from 'styled-components';
import { Input, InputProps } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons/lib/icons';

const InputStyled = styled(Input)`
    & {
        .ant-input-group-addon{
            padding: 0;
        }
        .anticon {
            padding: 8px;
            font-size: 0.8rem;
            font-weight: bolder
        }
    }
`;

interface IInputNumberProps extends InputProps{
    value:number,
    onNumberChange:(val:number)=>void
}

export default function InputNumber(props:IInputNumberProps) {
    
    const {value, max, min, onNumberChange, ...rest} = props;

    return <InputStyled {...{
        ...rest,
        value,
        style: {textAlign: 'center', fontWeight: 'bolder', ...rest?.style ?? {}},
        addonBefore: <MinusOutlined onClick={() => {
            if(min && value - 1 < min) {
                return;
            }
            onNumberChange(props.value - 1);
        }}/>,
        addonAfter: <PlusOutlined onClick={() => {
            if(max && value + 1 > max) {
                return;
            }
            onNumberChange(value + 1);
        }}/>
    }}/>;
}
