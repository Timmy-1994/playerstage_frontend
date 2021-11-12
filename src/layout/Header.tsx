import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import {
    NavbarBrand,
    Navbar,
    Container
} from 'reactstrap';
import styled from 'styled-components';
import logo from 'src/assets/logo.png';

import { Button, Menu, Dropdown, Badge, Avatar, Space, Divider } from 'antd';

const NavbarStyled = styled(Navbar)`  
  & {
    position: absolute;
    background: rgba(0,0,0,${props => props.opacity});
    color: var(--color-text-primary);
  }
`;
const ButtonStyled = styled(Button)`
  & {
    color: var(--color-text-primary);
  }
`;
export default function Header() {

    const usermenu = (
        <Menu>
            <Menu.Item key="1">manage 1</Menu.Item>
            <Menu.Item key="2">manage 2</Menu.Item>
            <Menu.Item key="3">manage 3</Menu.Item>
        </Menu>
    );

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

                    <Dropdown overlay={usermenu}>
                        <Space>
              Hi , Player
                            <Avatar size="small" icon={<i className="fa fa-user" />} />
                        </Space>
                    </Dropdown>

          
                </Space>

            </Container>
        </NavbarStyled>
    );
}
