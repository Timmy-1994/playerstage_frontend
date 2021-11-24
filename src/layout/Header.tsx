import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
// reactstrap components
import {
    // NavbarBrand,
    Navbar,
    Container,
    Button as ReactstrapButton
} from 'reactstrap';
import styled from 'styled-components';
import {logo} from 'src/assets';

import { Button, Menu, Dropdown, Badge, Avatar, Space, Divider, Row, Col } from 'antd';
import { useStore as useGlobalStore } from 'src/contexts/globalContext';
import { useStore as useCartStore } from 'src/contexts/cartContext';
import { logout } from 'src/api';

const NavbarStyled = styled(Navbar)`
  & {
    position: absolute;
    background: rgba(0,0,0,${props => props.opacity});
    color: var(--color-text-primary);
    height: auto;
    padding: 1rem 0;
    .ant-btn {
        color: var(--color-text-primary);
    }
    .ant-badge-count{
        background:var(--color-error);
        box-shadow: none;
    }
    .ant-scroll-number-only-unit.current {
        color:var(--color-text-primary);
        font-weight: bolder;
    }
  }
`;

const MenuInCartStyled = styled(Menu)`
    background :var(--color-background-secondary);
    text-align: right;
    .ant-dropdown-menu-item {
        color:var(--color-text-primary);
        padding: 0.5rem;
        border-radius: 1rem;
        &:hover {
            background: var(--color-background-primary);
        }
    }
    padding: 0.5rem;
    border-radius: 1rem;
`;

export default function Header() {

    const history = useHistory();
    const location = useLocation();

    const {userInfo} = useGlobalStore();
    const {cart} = useCartStore();

    return (
        <NavbarStyled opacity={0.5}>
            <Container>
                <Link to="/" style={{display: 'flex', alignItems: 'center', color: 'var(--color-text-primary)'}}>
                    <img src={logo} alt="" style={{width: '1.8rem', height: '1.8rem', marginRight: '1rem' }}/>
                    玩家殿堂 | playerStage
                </Link>
                <Space style={{ float: 'right' }} split={<Divider style={{borderColor: 'white'}} type="vertical"/>}>
                    {
                        userInfo
                            ?
                            <Dropdown
                                overlay={
                                    <Menu>
                                        <Menu.Item
                                            key="dashboard"
                                            onClick={() => history.push('/dashboard')}
                                        >dashboard</Menu.Item>
                                        <Menu.Item
                                            key="logout"
                                            onClick={() => logout(userInfo.uuid)}
                                        >logout</Menu.Item>
                                    </Menu>
                                }
                            >
                                <Space>
                                Hi , {userInfo.username}
                                    <Avatar size="small" icon={<i className="fa fa-user" />} />
                                </Space>
                            </Dropdown>
                            :
                            <Button type='link' onClick={() => history.push('/signin')}>
                            Sign In
                            </Button>
                    }
                    {
                        (location.pathname !== '/cart') && (
                            <Dropdown
                                disabled={!cart.length}
                                trigger={['hover']}
                                overlay={
                                    <MenuInCartStyled>
                                        {
                                            cart.map(product => (
                                                <Menu.Item 
                                                    key={`${product.uuid}-${product.selectedModelUUID}`} 
                                                    style={{cursor: 'pointer'}}
                                                    onClick={() => history.push(`/product/${product.uuid}`)}
                                                >
                                                    <Row align={'middle'} justify={'space-between'}>
                                                        <Col>
                                                            <img src={product.coverImage} style={{height: '50px', width: '50px'}}/>
                                                            {product.name}
                                                        </Col>
                                                        <Col>
                                                            <strong style={{marginLeft: '1rem', color: 'var(--color-error)'}}>
                                                                {
                                                                    product.models.find(x => x.uuid === product.selectedModelUUID)?.price ?? '-'
                                                                }
                                                            </strong>
                                                            <span style={{marginLeft: '1rem'}}>X{product.amount}</span>
                                                        </Col>
                                                    </Row>
                                                </Menu.Item>
                                            ))
                                        }
                                        <Row justify={'end'}>
                                            <Col>
                                                <ReactstrapButton color="primary" size="sm" onClick={() => history.push('/cart')}>Checkout my Cart</ReactstrapButton>
                                            </Col>
                                        </Row>
                                    </MenuInCartStyled>
                                }
                            >
                                <Badge count={cart.length} size="small" offset={[-5, 4]}>
                                    <Button type='link' onClick={() => history.push('/cart')} title="cart">
                                        <i className="fas fa-shopping-cart"></i>
                                    </Button>
                                </Badge>
                            </Dropdown>
                        )
                    }
                </Space>
            </Container>
        </NavbarStyled>
    );
}
