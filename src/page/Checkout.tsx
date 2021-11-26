import React, { useState } from 'react';
import Layout from 'src/layout/default';
// import {Modal} from 'src/layout/Modals';
import styled from 'styled-components';
import {
    Button,
    Container
} from 'reactstrap';
import { Row, Col, Input, Typography } from 'antd';

import { ICartItem, useStore as useCartStore } from 'src/contexts/cartContext';
import { useHistory } from 'react-router';
import { geSelectModelFromCartItem } from './Cart';
import { useLocation } from 'react-router-dom';
import { useStore } from 'src/contexts/globalContext';
import * as api from 'src/api';


const [ImgNameColSpan, ModelColSpan, SinglePriceColSpan, amountColSpan, TotalPriceColSpan] = [12, 4, 3, 2, 3];

const TypographyStyled = styled(Typography)`
    && .ant-typography{
        color:var(--color-text-primary-contrast);
    }
    white-space: break-spaces;
`;

export default function Checkout() {
    const history = useHistory();
    const { cart } = useCartStore();
    const { setIsLoading } = useStore();
    const [checkoutItems, setCheckoutItems] = useState<Array<ICartItem>>([]);
    
    const {search} = useLocation();
    React.useEffect(() => {
        
        const qs = new URLSearchParams(search);
        
        const productID = qs.get('p');
        const amount = qs.get('a');
        const selectModelID = qs.get('s');

        console.log('[ loc ]', {productID, amount, selectModelID});
        if(productID === null || amount === null || selectModelID === null) {
            setCheckoutItems(cart.filter(x => x.isChecked)); 
            return;
        }

        (async () => {
            try{
                setIsLoading(true);
                const {data} = await api.product.get(productID);
                setCheckoutItems([{...data,
                    amount: Number(amount),
                    selectedModelUUID: selectModelID,
                    noModelsForSelect: false, 
                    isChecked: false
                }]);
            }catch(e) {
                console.error(e);
                history.goBack();
            }finally{
                setIsLoading(false);
            }
        })();

    }, [search]);

    const renderCheckoutCartItem = (item:ICartItem) => {

        const {price, name: modelName} = geSelectModelFromCartItem(item);

        return (
            <Row key={`${item.uuid}-${item.selectedModelUUID}`} gutter={[16, 16]} align={'middle'} justify={'space-between'} style={{color: 'var(--color-text-primary)', padding: '1rem 0'}}>
                <Col span={ImgNameColSpan}>
                    <Row 
                        wrap={false} 
                        align={'middle'} 
                        gutter={[15, 0]} 
                        style={{cursor: 'pointer'}}
                        onClick={() => history.push(`/product/${item.uuid}`)}
                    >
                        <Col flex={'0 0 95px'}><img src={item.coverImage}/></Col>
                        <Col>{item.name}</Col>
                    </Row>
                </Col>
                <Col span={ModelColSpan} style={{textAlign: 'center'}}>
                    {modelName}
                </Col>
                <Col span={SinglePriceColSpan} style={{textAlign: 'center'}}>
                    <big style={{fontWeight: 'bolder', color: 'var(--color-error)', textAlign: 'right'}}>
                        NT {price}
                    </big>
                </Col>
                <Col span={amountColSpan} style={{textAlign: 'center'}}>
                    {item.amount}
                </Col>
                <Col span={TotalPriceColSpan} style={{textAlign: 'center'}}>
                    <big style={{fontWeight: 'bolder', color: 'var(--color-error)', textAlign: 'right'}}>
                        NT {price * item.amount}
                    </big>
                </Col>
            </Row>
        );
    };

    const renderForm = () => {
        return  <>
            <Input.TextArea 
                autoSize={{minRows: 1}} 
                placeholder="shippment time etc..." 
                allowClear 
                onChange={() => {}} 
            />
        </>;
    };

    return (
        <Layout>
            <Layout.Content>
                <Container className="pt-5 pb-5">
                    <TypographyStyled>
                        <Typography.Title>Order</Typography.Title>                       
                        <Row>
                            <Col style={{textAlign: 'center'}} span={ImgNameColSpan}>title</Col>
                            <Col style={{textAlign: 'center'}} span={ModelColSpan}>spec</Col>
                            <Col style={{textAlign: 'center'}} span={SinglePriceColSpan}>single price</Col>
                            <Col style={{textAlign: 'center'}} span={amountColSpan}>amount</Col>
                            <Col style={{textAlign: 'center'}} span={TotalPriceColSpan}>total price</Col>
                        </Row>

                        { checkoutItems.map(i => renderCheckoutCartItem(i)) }

                        <Row className="mt-5" gutter={24} >
                            <Col span={12}>
                                <Typography.Title level={3}>Info</Typography.Title>
                                { renderForm() }
                            </Col>
                            <Col span={12}>
                                <Typography.Title level={3}>Shipment</Typography.Title>
                            </Col>
                        </Row>

                        <Row className="mt-5" gutter={24} >
                            <Col span={24}>
                                <Typography.Title level={3}>Payment</Typography.Title>
                            </Col>
                        </Row>

                        <Row justify={'end'}>
                            <Col>
                                <Row justify={'space-between'} align={'middle'} className="mb-3">
                                    <span>Total of product</span>
                                    <big style={{fontWeight: 'bolder', color: 'var(--color-error)', textAlign: 'right'}}>
                                    NT {0}
                                    </big>
                                </Row>
                                <Row justify={'space-between'} align={'middle'} className="mb-3">
                                    <span>Total of shipment</span>
                                    <big style={{fontWeight: 'bolder', color: 'var(--color-error)', textAlign: 'right'}}>
                                    NT {0}
                                    </big>
                                </Row>
                                <Row justify={'space-between'} align={'middle'} className="mb-3">
                                    <span>Total of pay</span>
                                    <big style={{fontSize: '2rem', fontWeight: 'bolder', color: 'var(--color-error)', textAlign: 'right'}}>
                                    NT {0}
                                    </big>
                                </Row>
                                <Button
                                    className="btn-round"
                                    color="primary"
                                    size="lg"
                                    onClick={() => {/*history.push('/order')*/}}
                                >
                                OK, Submit the order
                                </Button>
                            </Col>
                        </Row>
                    </TypographyStyled>
                </Container>
            </Layout.Content>
        </Layout>
    );
}
