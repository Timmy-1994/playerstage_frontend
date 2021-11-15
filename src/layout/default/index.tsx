import React from 'react';
import styled from 'styled-components';
import Loading from 'src/layout/Loading';

import LayoutFooter from 'src/layout/Footer';
import LayoutHeader from 'src/layout/Header';
import {blkAssets} from 'src/assets';

const Wrapper = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;
const LayoutStyled = styled.div`
    display: flex;
    background-color: var(--color-background-primary);
    background-image: url('${blkAssets.dots}');
    background-size: contain;
    height: 100%;
    padding-top: 4rem;
    overflow-y: auto;
`;
const PanelStyled = styled.div`
    flex: 0 0 414px;
    overflow-y: auto;
`;
const Container = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;
const FooterStyled = styled.div`
    background-color: #2C303B;
    padding: 1.8rem 2.2rem;
    flex: 1;
`;

const Panel:React.ComponentType = () => null;
const Content:React.ComponentType = () => null;
const Footer:React.ComponentType = () => null;
const Layout = (props:{children: React.ReactElement|React.ReactElement[] }) => {
    
    const children = props.children instanceof Array ? props.children : [props.children];
    // const pathname = props.location.pathname;
    
    const panel = children.find(el => el.type === Panel);
    const content = children.find(el => el.type === Content);
    const footer = children.find(el => el.type === Footer);

    return (
        <Wrapper>
            <Loading />
            <LayoutHeader/>
            <LayoutStyled>
                {
                    panel
                        ?
                        <PanelStyled>{panel.props.children}</PanelStyled>
                        :
                        null
                }
                <Container>
                    <div>{content?.props.children}</div>
                    {
                        footer
                            ?
                            <FooterStyled>{footer.props.children}</FooterStyled>
                            :
                            <LayoutFooter/>
                    }
                </Container>
            </LayoutStyled>
        </Wrapper>
    );
};
Layout.Panel = Panel;
Layout.Content = Content;
Layout.Footer = Footer;
export default Layout;
