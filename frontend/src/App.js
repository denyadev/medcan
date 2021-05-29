import { Container } from 'react-bootstrap'
import { useState } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import AboutScreen from './screens/AboutScreen'
import ContactScreen from './screens/ContactScreen'
import MainScreen from './screens/MainScreen'
import { VerificationContext } from './components/verificationContext'
import AgeVerification from './components/AgeVerification'

function App() {

    const [verification, setVerification] = useState(localStorage.getItem('verification'))

    return (
    <Router>
        <VerificationContext.Provider value={{ verification, setVerification }}>
            { !verification ? (<AgeVerification/>) : (
                <div>
                    <Header/>
                    <main className="pt-4">
                        <div>
                            <Route exact path='/' component={MainScreen}/>
                            <Route path='/store' component={HomeScreen}/>
                            <Route path='/login' component={LoginScreen}/>
                            <Route path='/register' component={RegisterScreen}/>
                            <Route path='/about' component={AboutScreen}/>
                            <Route path='/contact' component={ContactScreen}/>
                            <Route path='/profile' component={ProfileScreen}/>
                            <Route path='/shipping' component={ShippingScreen}/>
                            <Route path='/payment' component={PaymentScreen}/>
                            <Route path='/placeorder' component={PlaceOrderScreen}/>
                            <Route path='/order/:id' component={OrderScreen}/>
                            <Route path='/product/:id' component={ProductScreen}/>
                            <Route path='/cart/:id?' component={CartScreen}/>

                            <Route path='/admin/userlist' component={UserListScreen}/>
                            <Route path='/admin/user/:id/edit' component={UserEditScreen}/>

                            <Route path='/admin/productlist' component={ProductListScreen}/>
                            <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>

                            <Route path='/admin/orderlist' component={OrderListScreen}/>
                        </div>
                    </main>
                    <Footer/>
                </div>
            )}
        
        </VerificationContext.Provider>
    </Router>
    );
}

export default App;
