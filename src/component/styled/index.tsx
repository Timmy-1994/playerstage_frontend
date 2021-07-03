import { Button as antdButton } from 'antd';
import styled from 'styled-components';

export const Button = styled(antdButton)`
    border-radius: 0.4rem;
    
    &.primary-gradient{
        border: none;
        background: var(--color-background-primary-gradient);
        span {
            color: var(--color-text-primary);
        }
    }

    &.info {
        &.ghost{
            border: 1px solid var(--color-info);
            background: transparent;
            span {
                color: var(--color-info);
            }
        }
        &:not(.ghost){
            border: none;
            background: var(--color-info);
            span {
                color: var(--color-text-primary);
            }
        }
    }

    ${props => {
        if(props.shape === 'round') {
            return `
            border-radius: 0.8rem;
        `;
        }
    }}
    
    &:disabled {
        background: var(--color-disabled);
        color: var(--color-text-primary-contrast);
        :hover{
            background: var(--color-disabled);
            color: var(--color-text-primary-contrast);
        }
    }
    
`;