import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from 'src/layout/default';
import * as apiType from 'src/types/api';
import * as api from 'src/api';
import {
    Rate,
    Card,
    Empty, 
    Skeleton
} from 'antd';
import { useStore } from 'src/contexts/globalContext';
import { Button, Container } from 'reactstrap';

const {
    // Panel,
    // Footer,
    Content
} = Layout;


const SqGroup = styled.div`
    & {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;

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

const ContainerStyled = styled(Container)`
    & {
        padding-top:3rem;
        padding-bottom:3rem;
    }
`;
const CardWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    gap:1rem;
    align-items: center;
    height: 100%;
    & > * {
        flex: 0 1 250px;
        :last-child {
            flex-grow: 0;
        }
    }
`;
const CardStyled = styled(Card)`
    background-color: var(--color-background-secondary-alpha-80);
    border: none;
    border-radius: 1rem;
    color: var(--color-primary);
    cursor: pointer;
    overflow: hidden;
    .ant-card-body {
        padding: 1rem;
        display: flex;
        flex-direction: column;
    }
`;

const RateStyled = styled(Rate)`
    & {
        .ant-rate-star {
            margin:0;
            transform:scale(0.8);
        }
    }
`;

const ImageStyled = styled.div<{src:string}>`
    margin: -1rem -1rem 1rem -1rem;
    width: calc(100% + 2rem);
    height: 200px;
    background: url("${props => props.src}");
    background-size: 150%;
    background-position: center;
`;

const getPriceRangeFromProductModel = (models:apiType.IProductResponse['models']) => {
    const prices = models.map(x => x.price);
    const [max, min] = [Math.max(...prices), Math.min(...prices)];
    return `NT ${max === min ? max : `${min}~${max}`}`;
};

export default function Landing() {
    const [ productList, setProductList ] = useState<Array<apiType.IProductResponse>>([]);
    const [ page, setPage ] = useState(0);
    const [ isOutOfProduct, setIsOutOfProduct ] = useState(false);
    const [ isScrolledEnd, setIsScrolledEnd ] = useState(false);
    const { setIsLoading, isLoading } = useStore();
    
    const getProductList = async (_page:number = 0) => {
        try{
            setIsLoading(true);
            const {data} = await api.product.get({page: _page});
            
            if(!data.length) {
                setIsOutOfProduct(true);
                throw('out of data');
            }
    
            setProductList(prv => [...prv, ...data]);
            setPage(p => p + 1);
        }catch(e) {
            console.error('getProductList', e);
        }finally{
            setIsLoading(false);
        } 
    };
  
    const scrollToEndHandler = async (evt:Event) => {
        // console.log("[scroll evt]", evt)
        const { scrollTop, clientHeight, scrollHeight, offsetHeight } = evt.target as HTMLDivElement;       
        // console.log({scrollTop ,clientHeight,scrollHeight, offsetHeight})
        setIsScrolledEnd(scrollTop + clientHeight >= scrollHeight - offsetHeight);
    };


    React.useEffect(() => {
        // console.log(" useEffect dep" , {isLoading,page,isScrolledEnd,isOutOfProduct})
        if(isLoading || isOutOfProduct) {
            return;
        }
        if(page === 0 || isScrolledEnd) {
            getProductList(page);
        }
    }, [page, isScrolledEnd, isLoading, isOutOfProduct]);

    React.useEffect(() => {
        window.addEventListener('scroll', scrollToEndHandler, true);
        return () => {
            window.removeEventListener('scroll', scrollToEndHandler);
        };
    }, []);

    return (
        <Layout>
            <Content>
                <SqGroup>
                    <div className="squares square1" />
                    <div className="squares square2" />
                    <div className="squares square3" />
                    <div className="squares square4" />
                    <div className="squares square5" />
                    <div className="squares square6" />
                    <div className="squares square7" />
                </SqGroup>
                <ContainerStyled>
                    <CardWrapper>
                        {
                            productList.map(product =>
                                <CardStyled key={product.uuid} onClick={() => {
                                    console.log('driect to detail page');
                                }}>
                                    <ImageStyled src={product.coverImage}/>
                                    <strong>{product.name}</strong>
                                    <RateStyled disabled allowHalf defaultValue={product.rating}/>
                                    <big style={{fontWeight: 'bolder', color: 'var(--color-error)', textAlign: 'right'}}>
                                        {getPriceRangeFromProductModel(product.models)}
                                    </big>
                                    <Button size="sm" onClick={e => {
                                        e.stopPropagation();
                                        console.log('add to cart');
                                    }}> Add to cart </Button>
                                </CardStyled>
                            )
                        }
                        { !productList.length && <Empty style={{color: 'var(--color-text-primary', margin: '0 auto'}}/> }
                    </CardWrapper>
                    { isLoading && <Skeleton/> }
                </ContainerStyled>
            </Content>
        </Layout>
    );
}
