import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from 'src/layout/default';
import * as apiType from 'src/types/api';
import * as api from 'src/api';
import {
    Rate,
    Card,
    Empty,
    Skeleton,
    Row,
    Col,
    Image
} from 'antd';
import {  useStore as useCartStore} from 'src/contexts/cartContext';
import { Button, Container } from 'reactstrap';
import { Modal } from 'src/layout/Modals';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useHistory } from 'react-router-dom';
import { getPriceRangeFromModels } from 'src/utility';

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

export const RateStyled = styled(Rate)`
    & {
        .ant-rate-star {
            margin:0;
            transform:scale(0.8);
        }
    }
`;


export default function Landing() {
    const [ productList, setProductList ] = useState<Array<apiType.IProductResponse>>([]);
    const [ page, setPage ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isOutOfProduct, setIsOutOfProduct ] = useState(false);
    const [ isScrolledEnd, setIsScrolledEnd ] = useState(false);
    const { dispatchCart } = useCartStore();
    const history = useHistory();
    
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
        // console.log(" [useEffect dep] " , {isLoading,page,isScrolledEnd,isOutOfProduct})
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

    const onAddToCart = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, {product}:{product:apiType.IProductResponse}) => {
        e.stopPropagation();
        dispatchCart({type: 'POST_ITEM', payload: product});

        Modal.success({
            content: 'Added to cart',
            maskClosable: true,
            width: '200px',
            direction: 'vertical',
            footer: null,
            duration: 1000
        });
        
    };

    const renderCard = (product:apiType.IProductResponse) => (
        <CardStyled
            onClick={() => history.push(`/product/${product.uuid}`)}
        >
            <div style={{margin: '-1rem -1rem 1rem -1rem'}}>
                <Image
                    src={product.coverImage}
                    preview={false}
                    width={'100%'}
                    height={'200px'}
                    style={{
                        objectFit: 'cover',
                        backgroundImage: 'url(data:image/png;base64,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)',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center'
                    }}
                />
            </div>
            <Paragraph style={{color: 'var(--color-primary)'}} ellipsis={{ rows: 2, expandable: false }}>
                {product.name}
            </Paragraph>
            <RateStyled disabled allowHalf defaultValue={product.rating}/>
            <big style={{fontWeight: 'bolder', color: 'var(--color-error)', textAlign: 'right'}}>
                {getPriceRangeFromModels(product.models)}
            </big>
            <Button size="sm" onClick={e => onAddToCart(e, {product})}> Add to cart </Button>
        </CardStyled>
    );

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
                <Container className="pt-5 pb-5">
                    <Row gutter={[16, 8]}>
                        {
                            productList.map(product =>
                                <Col
                                    key={product.uuid}
                                    xs={{ span: 12 }}
                                    md={{ span: 8 }}
                                    lg={{ span: 6 }}
                                >
                                    {renderCard(product)}
                                </Col>
                            )
                        }
                        { !productList.length && <Empty style={{color: 'var(--color-text-primary', margin: '0 auto'}}/> }
                    </Row>
                    { isLoading && <Skeleton loading/> }
                </Container>
            </Content>
        </Layout>
    );
}
