import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// reactstrap components
import {
    NavbarBrand,
    Navbar,
    Container
} from 'reactstrap';
import styled from 'styled-components';
import {logo} from 'src/assets';

import { Button, Menu, Dropdown, Badge, Avatar, Space, Divider } from 'antd';
import { useStore as useGlobalStore } from 'src/contexts/globalContext';
import { logout } from 'src/api';

const NavbarStyled = styled(Navbar)`  
  & {
    position: absolute;
    background: rgba(0,0,0,${props => props.opacity});
    color: var(--color-text-primary);
    height: 4rem;
  }
`;
const ButtonStyled = styled(Button)`
  & {
    color: var(--color-text-primary);
  }
`;
export default function Header() {

    const history = useHistory();
    const {userInfo} = useGlobalStore();

    return (
        <NavbarStyled opacity={0.5}>
            <Container>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={logo} alt="" style={{width: '1.8rem', height: '1.8rem', marginRight: '1rem' }}/>
                    <NavbarBrand to="/" tag={Link}>
            玩家殿堂 | playerStage
                    </NavbarBrand>
                </div>

                <Space style={{ float: 'right' }} split={<Divider style={{borderColor: 'white'}} type="vertical" />}>
                    <Badge count={1} size="small" showZero>
                        <ButtonStyled type='link'>
                            <i className="fas fa-shopping-cart"></i>
                        </ButtonStyled>
                    </Badge>

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
                            <ButtonStyled type='link' onClick={() => history.push('/signin')}>
                            Sign In
                            </ButtonStyled> 
                    }
          
                </Space>

            </Container>
        </NavbarStyled>
    );
}
