import React from 'react';
import styled from 'styled-components';
// import useAxios from 'src/hooks/useAxios';
// import { useIntl } from 'react-intl';
import Layout from 'src/layout/default';
import { Container } from 'reactstrap';
import { 
    // Rate, 
    Space 
} from 'antd';

const {
    // Panel,
    // Footer,
    Content
} = Layout;


const Page = styled.div`

    .content-center {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        -ms-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
        color: var(--color-text-primary);
        padding: 0 15px;
        width: 100%;
        max-width: 880px;

        &.brand {
            width: 47%;
            > * {
                color: var(--color-text-primary);
            }
            h1 {
                font-size: 5em;
                text-transform: uppercase;
                font-weight: 300;
            }
        }
    }
    & {
        height: 100vh;
        overflow: hidden;
        position: relative;

        .squares{
            animation: move-left-right 1s infinite;
            background: var(--color-background-primary-gradient);
            position: absolute;
            transition: 0.5s ease-out;
            overflow: hidden;
            border-radius: 20%;
            &.square1{
                animation: move-left-right 4s infinite;
                height: 300px;
                width: 300px;
                opacity: 0.5;
                left: 3%;
                top: -21%;
            }

            &.square2{
                animation: move-left-right 6s infinite;
                height: 400px;
                width: 400px;
                opacity: 0.4;
                right: -5%;
                top: -12%;
            }

            &.square3{
                animation: move-left-right 5s infinite;
                height: 200px;
                width: 200px;
                opacity: 0.1;
                left: -5%;
                bottom: 0%;
            }

            &.square4{
                animation: move-left-right 10s infinite;
                height: 100px;
                width: 100px;
                opacity: 0.8;
                right: 27%;
                top: 70%;
            }

            &.square5{
                animation: move-left-right 6s infinite;
                height: 250px;
                width: 250px;
                opacity: 0.1;
                left: 32%;
                bottom: 29%;
            }

            &.square6{
                animation: move-left-right 9s infinite;
                left: 10%;
                top: 35%;
                height: 80px;
                width: 80px;
                opacity: 0.7;
            }

            &.square7{
                animation: move-left-right 3s infinite;
                width: 300px;
                height: 300px;
                right: -5%;
                bottom: 0%;
                opacity: 0.1;
            }
        }
    }
`;
export default function Landing() {

    return (
        <Layout>
            <Content>
                <Page>
                    <div className="squares square1" />
                    <div className="squares square2" />
                    <div className="squares square3" />
                    <div className="squares square4" />
                    <div className="squares square5" />
                    <div className="squares square6" />
                    <div className="squares square7" />
                    <Container>
                        <div className="content-center brand">
                            <h1>Comming Soon</h1>
                            <h3>
                                Hello World ! We offer the articles according to your own specifications.
                                You can visite our shopee market first.
                            </h3>
                            <Space className='mt-5'>
                                <a href="https://shopee.tw/az310007">
                                    <img src="https://cfshopeesg-a.akamaihd.net/file/f0bfbe61296cce0f59ec3d0ca279eeb5"/> 
                                </a>
                            </Space>
                            {/* <Rate allowHalf defaultValue={2.5} />*/}
                        </div>
                    </Container>
                </Page>
            </Content>
        </Layout>
    );
}
