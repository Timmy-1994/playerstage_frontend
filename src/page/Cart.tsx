import React from 'react';
import Layout from 'src/layout/default';
import {Modal} from 'src/layout/Modals';
import styled from 'styled-components';
import {
    Button,
    Container
} from 'reactstrap';
import { Empty, Affix, Row, Col, Checkbox, Select, Input, Space, Typography, Divider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { ICartItem, useStore as useCartStore } from 'src/contexts/cartContext';
import { useHistory } from 'react-router';
import { GiftFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons/lib/icons';

const AffixStyled = styled(Affix)`
    & > * {
        padding: 1rem;
        background: var(--color-background-fourth);
        margin: 0 auto;
        width: 100% !important;
        box-shadow: 1px 1px 12px rgb(0 0 0 / 50%);
    }
`;

const InputAsNumberInputStyled = styled(Input)`
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

export const geSelectModelFromCartItem = (i:ICartItem) => {
    const ptr = i.models.find(x => x.uuid === i.selectedModelUUID);
    if(!ptr) {
        throw(new Error(`unexpect : cannot find selected model by modelId ${i.selectedModelUUID}`));
    }
    return ptr;
};

export default function Cart() {
    const history = useHistory();
    const { cart, dispatchCart } = useCartStore();
    
    const isAllChecked = cart.every(x => x.isChecked);
    const isPartialChecked = !isAllChecked && cart.some(x => x.isChecked);

    const onCartItemDelete = (modelUUID:string) => {
        Modal.warning({
            content: 'are u sure to delete ?',
            onOk: () => {
                dispatchCart({type: 'DELETE_ITEM', payload: {modelUUID}});
            },
            okText: 'yes, delete it',
            cancelText: 'cancel'
        });
    };

    const onCartItemAmountPlus = (i:ICartItem) => {

        const {totalStock} = geSelectModelFromCartItem(i);

        if(i.amount + 1 > totalStock) {
            Modal.error({content: 'out of stock'});
            return;
        }

        const ptr = cart.find(x => x === i);
        ptr && dispatchCart({type: 'PUT_ITEM', payload: {
            modelUUID: ptr.selectedModelUUID,
            data: {...ptr, amount: ptr.amount + 1}
        } });

    
    };
    const onCartItemAmountMinus = (i:ICartItem) => {
        // console.log("before onCartItemAmountMinus" , i.amount)
        if(i.amount - 1 === 0) {
            onCartItemDelete(i.selectedModelUUID);
            return;
        }
        
        const ptr = cart.find(x => x === i);
        ptr && dispatchCart({type: 'PUT_ITEM', payload: {
            modelUUID: ptr.selectedModelUUID,
            data: {...ptr, amount: ptr.amount - 1}
        } });


    };
    // const onCartItemAmountChange = (e:React.ChangeEvent<HTMLInputElement>)=>{}

    const renderCartItem = (item:ICartItem) => {

        const {price} = geSelectModelFromCartItem(item);
        const priceAfterSelectModel = `NT ${price * item.amount}`;

        // console.log("[renderCartItem - isMutiModel]", isMutiModel)
        // console.log("[renderCartItem - item.models]", item.models)

        return (
            <Row key={`${item.uuid}-${item.selectedModelUUID}`} gutter={[16, 16]} align={'middle'} justify={'space-between'} style={{color: 'var(--color-text-primary)', padding: '1rem 0'}}>
                <Col span={1}>
                    <Checkbox
                        checked={item.isChecked}
                        onClick={() => {
                            const ptr = cart.find(x => x === item);
                            ptr && dispatchCart({type: 'PUT_ITEM', payload: {
                                modelUUID: ptr.selectedModelUUID,
                                data: {...ptr, isChecked: !ptr.isChecked}
                            } });
                        }}
                    />
                </Col>
                <Col span={12}>
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
                <Col span={4} style={{textAlign: 'center'}}>
                    {
                        !item.noModelsForSelect && 
                        (
                            <Select 
                                value={item.selectedModelUUID} 
                                style={{width: '100%'}} 
                                onSelect={selectedModelUUID => {
                                    dispatchCart({type: 'PUT_ITEM', payload: {
                                        modelUUID: item.selectedModelUUID,
                                        data: {...item, selectedModelUUID}
                                    }});
                                }}
                            >
                                {
                                    item.models.map(m => (
                                        <Select.Option
                                            key={m.uuid}
                                            value={m.uuid}
                                            disabled={m.totalStock === 0 || Boolean(cart.find(x => x.selectedModelUUID === m.uuid))}
                                        >{m.name}</Select.Option>
                                    ))
                                }
                            </Select>
                        )
                    }
                </Col>
                <Col span={3} style={{textAlign: 'center'}}>
                    <InputAsNumberInputStyled
                        style={{textAlign: 'center', fontWeight: 'bolder'}}
                        addonBefore={<MinusOutlined onClick={onCartItemAmountMinus.bind(null, item)}/>}
                        addonAfter={<PlusOutlined onClick={onCartItemAmountPlus.bind(null, item)}/>}
                        value={item.amount}
                        // onChange={onCartItemAmountChange.bind(null)}
                    />
                </Col>
                <Col span={2} style={{textAlign: 'center'}}>
                    <big style={{fontWeight: 'bolder', color: 'var(--color-error)', textAlign: 'right'}}>
                        {priceAfterSelectModel}
                    </big>
                </Col>
                <Col span={2} style={{textAlign: 'center'}}>
                    <a onClick={() => onCartItemDelete(item.selectedModelUUID)}>
                        <DeleteOutlined/> delete
                    </a>
                </Col>
            </Row>
        );
    };

    return (
        <Layout>
            <Layout.Content>
                <Container className="pt-5 pb-5">
                    { cart.map(i => renderCartItem(i)) }
                    { !cart.length && <Empty style={{color: 'var(--color-text-primary)'}} description={'no produc in your cart'}/> }
                </Container>
            </Layout.Content>
            <Layout.Footer>
                <AffixStyled offsetBottom={0}>
                    <Container>
                        <Row align={'middle'} gutter={[24, 24]} justify={'space-between'} style={{color: 'var(--color-text-primary)'}}>
                            <Col span={2}>
                                <Checkbox 
                                    style={{color: 'var(--color-text-primary)'}}
                                    indeterminate={isPartialChecked}
                                    checked={isAllChecked}
                                    onClick={() => {
                                        cart.forEach((item) => {
                                            dispatchCart({type: 'PUT_ITEM', payload: {
                                                modelUUID: item.uuid,
                                                data: {...item, isChecked: !isAllChecked}
                                            }});
                                        });
                                    }}
                                >
                                    {isAllChecked ? 'unSelectAll' : 'SelectAll'}
                                </Checkbox>
                            </Col>
                            <Col span={16} offset={6} style={{textAlign: 'right'}}>
                                <Space align={'end'}>
                                    {
                                        (() => {
                                            let totalPrcie = 0;
                                            let toatlAmount = 0;
                                            for (const item of cart) {
                                                if(!item.isChecked) {
                                                    continue;
                                                }
                                                toatlAmount += 1;
                                                const {price} = geSelectModelFromCartItem(item);
                                                totalPrcie += item.amount * price;
                                            }

                                            return (
                                                <Space align={'baseline'} split={<Divider style={{borderColor: 'white'}} type="vertical"/>}>
                                                    {/* <Typography.Link>
                                                        
                                                    </Typography.Link> */}
                                                    <Typography.Paragraph
                                                        style={{color: 'var(--color-text-primary)'}}
                                                        editable={{
                                                            tooltip: false,
                                                            icon: <GiftFilled style={{fontSize: '1.2rem'}}/>

                                                        }}
                                                    >
                                                        Do you have coupon code ?
                                                    </Typography.Paragraph>

                                                    <span>
                                                        Total <big>{toatlAmount}</big> pieces
                                                    </span>
                                                    
                                                    <strong 
                                                        style={{
                                                            margin: '0 1rem',
                                                            fontWeight: 'bolder', 
                                                            color: 'var(--color-error)',
                                                            fontSize: '2rem'
                                                        }}
                                                    >NT {totalPrcie}</strong>
                                                </Space>
                                            );
                                        })()
                                    }
                                    <Button
                                        disabled={!isPartialChecked && !isAllChecked}
                                        className="btn-round"
                                        color="primary"
                                        size="lg"
                                        onClick={() => history.push('/checkout')}
                                    >
                                        Checkout
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                    </Container>
                </AffixStyled>
            </Layout.Footer>
        </Layout>
    );
}
