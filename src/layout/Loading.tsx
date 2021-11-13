import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useStore } from 'src/contexts/globalContext';

const Mask = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position:absolute;
    z-index:9;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background:rgba(0, 0, 0, 0.2);
    width:100%;
    height:100%;
    z-index: 999;
`;

const Loading = () => {
    const { isLoading } = useStore();
    return(
        <>
            {   isLoading &&
                <Mask>
                    <Spin style={{zIndex: 10}} tip="Loading..."></Spin> 
                </Mask>
            }
            
        </>

    );
    
};


export default Loading;