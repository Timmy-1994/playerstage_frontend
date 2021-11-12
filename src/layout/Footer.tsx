import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'src/assets/logo.png';
import {
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col
} from 'reactstrap';

export default function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col md="5" style={{display: 'flex', alignItems: 'center'}}>
                        <img src={logo} alt="" style={{width: '5rem', height: '5rem', marginRight: '1rem' }}/>
                        <h3 className="title">玩家殿堂 | PlayerStage</h3>
                    </Col>
                    <Col md="4">
                        <h3 className="title">Contact us</h3>
                        <div className="btn-wrapper profile" style={{color: 'white'}}>
                            <p>10669 台北市大安區敦化南路二段180號9樓</p>             
                            <p>+886 936 072 919</p>
                            <p>THETEC888@GMAIL.COM</p>
                        </div>
                    </Col>
                    <Col md="3">
                        <Nav>
                            <NavItem>
                                <NavLink to="/" tag={Link}>
                  Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/Cart" tag={Link}>
                  Cart
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/Guide" tag={Link}>
                  Guide
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <small className="mt-5" style={{color: '#d7d7d7'}}>
            ※ 退換貨須知 : 商品到貨隔日享7天鑑賞(猶豫)期之權益【鑑賞(猶豫)期非試用期】，辦理退貨商品必須是全新狀態且包裝完整，否則將會影響退貨權限。3C相關商品，為一次性包裝商品，不可拆封或試用，請務必確認有購買需求後再拆封。
                        <br />
            ※ 為保障雙防權益，請您在開箱過程中務必全程錄影。以確保商品是否有 "遺漏、記錯、缺貨、瑕疵品＂等，請皆以「完整錄影檔」為依據，並跟我們連繫！
                        <br />
            ※ 以上說明，若有不符請通知我們，先以原廠官方網站為主，不便之處敬請見諒!
                    </small>
                </Row>
        
                <div className='mt-5' style={{display: 'flex', alignItems: 'center', color: 'white', justifyContent: 'space-between', width: '100%'}}>
                    <div style={{display: 'flex'}}>
                        <NavItem className="mr-4">
                            <NavLink
                                data-placement="bottom"
                                href="https://reurl.cc/ogVXlg"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <i className="fab fa-line mr-2"/>
                                <b>Line</b>
                            </NavLink>
                        </NavItem>
                        <NavItem className="mr-4">
                            <NavLink
                                data-placement="bottom"
                                href="https://www.facebook.com/thetec888"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <i className="fab fa-facebook-square mr-2"/>
                                <b>Facebook</b>
                            </NavLink>
                        </NavItem>
                        <NavItem className="mr-4">
                            <NavLink
                                data-placement="bottom"
                                href="https://www.instagram.com/thetec888"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <i className="fab fa-instagram mr-2"/>
                                <b>Instagram</b>
                            </NavLink>
                        </NavItem>
                    </div>
                    <small>司塔吉有限公司©{new Date().getFullYear()}</small>
                </div>

            </Container>
        </footer>
    );
}
