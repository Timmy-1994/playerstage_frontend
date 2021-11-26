import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from 'src/layout/default';
import * as apiType from 'src/types/api';
import * as api from 'src/api';
import {
    Row,
    Col,
    Image,
    Typography,
    Space,
    Radio
} from 'antd';
import { useStore } from 'src/contexts/globalContext';
import { useStore as useCartStore } from 'src/contexts/cartContext';
import { Button, Container } from 'reactstrap';
import { Modal } from 'src/layout/Modals';
import { useHistory, useParams } from 'react-router-dom';
import { RateStyled } from './Landing';
import InputNumber from 'src/component/InputNumber';
import { getPriceRangeFromModels } from 'src/utility';

const {
    // Panel,
    // Footer,
    Content
} = Layout;

const TypographyStyled = styled(Typography)`
    && *{
        color:var(--color-text-primary-contrast);
    }
    white-space: break-spaces;
`;

const RadioGroupStyled = styled(Radio.Group)`
    & {
        .ant-radio-button-wrapper {
            background: transparent;
            &.ant-radio-button-wrapper-checked {
                background: var(--color-primary);
                color: var(--color-text-primary);
            }
            &:not(.ant-radio-button-wrapper-checked){
                color: var(--color-text-primary-contrast);
                border-color: var(--color-text-primary-contrast);
                :before {
                    background-color: var(--color-text-primary-contrast);
                }
            }
        }
    }
`;

const ImageWrapper = styled.div`
    .ant-image {
        width: 100%;
    }

    .gallery {
        display: flex;
        width: 100%;
        overflow: auto;
        gap: 0.5rem;
        padding: 1rem 0;
        cursor: pointer
    }

    .preview {
        display:none
    }
`;

export default function Product() {
    const history = useHistory();
    const { setIsLoading } = useStore();
    
    const { dispatchCart } = useCartStore();

    const { uuid } = useParams<{uuid:string}>();
    const [ detail, setDetailState ] = React.useState<apiType.IProductResponse|undefined>();
    const [ thumbnailVisible, setThumbnailVisible ] = useState(false);

    const [ selectedModel, setSelectedModel ] = useState<apiType.IProductModel|undefined>();
    const [ amount, setAmount ] = useState(1);
    
    React.useEffect(() => {
        (async () => {
            try{
                setIsLoading(true);
                const {data} = await api.product.get(uuid);
                setDetailState(data);
            }catch(e) {
                console.error(e);
                history.push('/');
            }finally{
                setIsLoading(false);
            }
        })();
    }, [uuid]);

    React.useEffect(() => {
        if(!detail) {
            return;
        }
        // defautl select first one
        setSelectedModel(detail.models[0]);
    }, [detail]);

    return (
        <Layout>
            <Content>
                <Container className="pt-5 pb-5">

                    <Row>
                        <Col span={10}>
                            <ImageWrapper>
                                <Image
                                    src={detail?.coverImage}
                                    preview={{visible: false}}
                                    onClick={() => setThumbnailVisible(!thumbnailVisible)}
                                />

                                <div
                                    className="gallery"
                                    onClick={() => setThumbnailVisible(!thumbnailVisible)}
                                >
                                    {
                                        detail?.imgUrl.map(url => (
                                            <img key={url} src={url} width={80} height={80} style={{}} />
                                        )) ?? null
                                    }
                                </div>

                                <div className="preview">
                                    <Image.PreviewGroup  preview={{ visible: thumbnailVisible, onVisibleChange: vis => setThumbnailVisible(vis) }}>
                                        {
                                            detail?.imgUrl.map(url => <Image key={url} src={url} />) ?? null
                                        }
                                    </Image.PreviewGroup>
                                </div>
                            </ImageWrapper>
                        </Col>
                        <Col span={13} offset={1}>
                            <TypographyStyled>
                                <Typography.Title level={2}>{detail?.name}</Typography.Title>
                            </TypographyStyled>

                            <Row align={'middle'} justify={'space-between'}>
                                <Space>
                                    <RateStyled disabled allowHalf defaultValue={detail?.rating}/>
                                    <Typography.Text strong> Sold {detail?.sold}</Typography.Text>
                                </Space>

                                <Typography.Title style={{color: 'var(--color-error)'}}>
                                    {
                                        selectedModel ? getPriceRangeFromModels([selectedModel]) : (detail?.models.length && getPriceRangeFromModels(detail?.models))
                                    }
                                </Typography.Title>

                            </Row>
                            
                            {
                                detail?.models && detail.models.length > 1 && (
                                    <Row className="mt-5" align={'middle'} justify={'end'}>
                                        <RadioGroupStyled
                                            onChange={e => setSelectedModel(detail?.models.find(x => x.uuid === e.target.value))}
                                            value={selectedModel?.uuid}
                                        >
                                            {
                                                detail?.models.map(m => <Radio.Button key={m.uuid} value={m.uuid}>{m.name}</Radio.Button>)
                                            }
                                        </RadioGroupStyled>
                                    </Row>
                                )
                            }

                            <Row className="mt-5" align={'middle'} justify={'end'}>
                                <Space align={'end'}>
                                    {
                                        selectedModel && (
                                            <Typography.Text strong>remaining stock {selectedModel.totalStock}</Typography.Text>
                                        )
                                    }
                                    <InputNumber
                                        style={{width: '150px'}}
                                        value={amount}
                                        min={1}
                                        max={selectedModel && selectedModel.totalStock}
                                        onNumberChange={val => {
                                            console.log('[onNumberChange val]', val);
                                            setAmount(val);
                                        }}
                                    />
                                </Space>
                            </Row>

                            <Row className="mt-5" align={'middle'} justify={'end'}>
                                <Space>
                                    <Button
                                        className="btn-round"
                                        color="info"
                                        size="lg"
                                        disabled={!selectedModel || !amount}
                                        onClick={() => {
                                            if(!detail || !selectedModel) {
                                                throw(new Error('detail & selectedModel are required'));
                                            }
                                            dispatchCart({
                                                type: 'POST_ITEM',
                                                payload: {...detail, selectedModelUUID: selectedModel.uuid}
                                            });
                                            
                                            Modal.success({
                                                content: 'Added to cart',
                                                maskClosable: true,
                                                width: '200px',
                                                direction: 'vertical',
                                                footer: null,
                                                duration: 1000
                                            });
                                        }}
                                    >Add to my cart</Button>
                                    <Button
                                        className="btn-round"
                                        color="primary"
                                        size="lg"
                                        onClick={() => history.push(`/checkout?p=${detail?.uuid}&a=${amount}&s=${selectedModel?.uuid}`)}
                                    >Chekout Right Now</Button>
                                </Space>
                            </Row>
                        </Col>
                    </Row>

                    <TypographyStyled style={{marginTop: '2rem'}}>
                        <Typography.Paragraph>{detail?.description}</Typography.Paragraph>
                    </TypographyStyled>

                </Container>
            </Content>
        </Layout>
    );
}