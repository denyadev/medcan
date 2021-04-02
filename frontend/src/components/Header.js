import React from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Image, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import logo from '../images/medcan.png'

function Header() {

    const location = useLocation()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header className={`${location.pathname === '/' ? "header__main" : ""}`}>
            <div>
                <p className="text-center info__text" style={{color: 'white', backgroundColor: '#0053A9', padding: '10px'}}>Due to COVID 19 restrictions we are currently open for curbside pickup only.</p>
            </div>
            <Container>
                <Navbar bg="" variant="light" expand="lg" className="navbar__nav">
                <LinkContainer exact to='/'>
                    <Navbar.Brand><Image className="header__logo" src={logo}/></Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="collapse__color">
                    <Nav className="m-auto">
                        <LinkContainer exact to='/'>
                            <Nav.Link className="nav__text">Home</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/about'>
                            <Nav.Link className="nav__text">About</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/store'>
                            <Nav.Link className="nav__text">Store</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/contact'>
                            <Nav.Link className="nav__text">Contact</Nav.Link>
                        </LinkContainer>
                    
                    </Nav>
                    {userInfo ? (
                                    <NavDropdown className="nav__text__right" title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ): (
                                    <LinkContainer to='/login'>
                                        <Nav.Link className="nav__text__right"><i className="fas fa-user"></i> Login</Nav.Link>
                                    </LinkContainer>
                                )}

                                <LinkContainer to='/cart'>
                                    <Nav.Link className="nav__text__right"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                                </LinkContainer>

                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown className="nav__text__right" title='Admin' id='adminmenu'>
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/productlist'>
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )}
                </Navbar.Collapse>
                </Navbar>
            </Container>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <SearchBox/>
            </div>
        </header>

    )
}

export default Header
