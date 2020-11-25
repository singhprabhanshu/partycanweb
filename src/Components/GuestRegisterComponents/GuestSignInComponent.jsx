
import React from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { Button } from 'reactstrap';
import validate from './validator/guestSigninFormValidator';
import {TextInputField } from '../../Global/FormCompoents/wrapperComponent';
import { cleanEntityData } from '../../Global/helper/commonUtil';
import { get as _get, isEmpty as _isEmpty, find as _find } from 'lodash';
import genericPostData from '../../Redux/Actions/genericPostData';
import { commonActionCreater } from '../../Redux/Actions/commonAction';
import showMessage from '../../Redux/Actions/toastAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Container, Row, Col} from 'reactstrap'








class GuestSignInComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
        
        
    }

    userSigninSuccess = (data) => {
        this.setState({ isLoading: false });
        const code = _get(data[0], 'code');
        const total_items_count = _get(data[0], 'result.total_product_in_cart', 0);
        const message = _get(data[0], 'message');
        if (code === 1 && message === 'success') {
            let cartObj = [{ total_items_count }];
            this.props.dispatch(commonActionCreater(cartObj, 'CART_ITEMS_SUCCESS'));
            localStorage.setItem('Token', _get(data[0], 'result.api_token', ''));
            localStorage.setItem('cart_id', _get(data[0], 'result.cart_id', ''));
            this.props.history.push('/cart');
        } else {
            this.props.dispatch(showMessage({ text: message, isSuccess: false }));
        }
    };
    userSigninError = (err) => {
        this.setState({ isLoading: false });
        console.log('signin error', err);
    };
     
    onSubmit = async values => {
        this.setState({ isLoading: true });
        let cartId = localStorage.getItem("cart_id");
        let body = cleanEntityData({
            email: _get(values, 'email'),
            password: _get(values, 'password'),
            cart_id: cartId
        });
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: body,
            url: `api/customer/login?email=${values.email}&password=${values.password}`,
            constants: {
                init: "USER_SIGNIN_INIT",
                success: "USER_SIGNIN_SUCCESS",
                error: "USER_SIGNIN_ERROR"
            },
            identifier: "USER_SIGNIN",
            successCb: this.userSigninSuccess,
            errorCb: this.userSigninError,
            dontShowMessage: true
        })
    };

    responseGoogle = (response) => {
        // console.log(response);
        const accessToken = _get(response, 'tokenObj.access_token');
        axios({
            method: 'get',
            url: 'https://people.googleapis.com/v1/people/me?personFields=birthdays',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((data) => {
            // console.log('working', data);
            const birthDateObj = _find(_get(data, 'data.birthdays'), ['metadata.primary', true]);
            // console.log(birthDateObj);
            let month = _get(birthDateObj.date, 'month');
            let day = _get(birthDateObj.date, 'day');
            if (_get(birthDateObj.date, 'month').toString().length === 1) {
                month = `0${_get(birthDateObj.date, 'month')}`;
            }

            if (_get(birthDateObj.date, 'day').toString().length === 1) {
                day = `0${_get(birthDateObj.date, 'day')}`;
            }
            const body = {
                email: _get(response, 'profileObj.email'),
                first_name: _get(response, 'profileObj.givenName'),
                last_name: _get(response, 'profileObj.familyName'),
                dob: `${_get(birthDateObj.date, 'year')}-${month}-${day}`
            };
            genericPostData({
                dispatch: this.props.dispatch,
                reqObj: body,
                url: `/api/customer/sociallogin`,
                constants: {
                    init: "USER_SIGNIN_INIT",
                    success: "USER_SIGNIN_SUCCESS",
                    error: "USER_SIGNIN_ERROR"
                },
                identifier: "USER_SIGNIN",
                successCb: this.userSocialSigninSuccess,
                errorCb: this.userSocialSigninError,
                dontShowMessage: true
            });



        }).catch( (err) => {
            alert('Something Went Wrong');
        })
        
    }

    failedResponseGoogle = (err) => {
        console.log('google signin error', err);
        // alert('Something Went Wrong');
    }

    userSocialSigninSuccess = (data) => {
        this.setState({ isLoading: false });
        const code = _get(data, 'code');
        const total_items_count = _get(data, 'total_product_in_cart', 0);
        const message = _get(data[0], 'message');
        if (code === 1 ) {
            let cartObj = [{ total_items_count }];
            this.props.dispatch(commonActionCreater(cartObj, 'CART_ITEMS_SUCCESS'));
            localStorage.setItem('Token', _get(data, 'api_token', ''));
            localStorage.setItem('cart_id', _get(data, 'cart_id', ''));
            this.props.history.push('/cart');
        } else {
            this.props.dispatch(showMessage({ text: message, isSuccess: false }));
        }
        // console.log('signin success data', data);
        // const code = _get(data, 'code');
        // const total_items_count = _get(data, 'result.total_product_in_cart', 0);
        // const message = _get(data, 'message');
        // if (code === 1) {
        //     let cartObj = [{ total_items_count }];
        //     this.props.dispatch(commonActionCreater(cartObj, 'CART_ITEMS_SUCCESS'));
        //     localStorage.setItem('Token', _get(data, 'api_token', ''));
        //     localStorage.setItem('cart_id', _get(data, 'cart_id', ''));
        //     this.fetchCategories();
        // } else if (message) {
        //     this.props.dispatch(showMessage({ text: message, isSuccess: false }));
        // } else {
        //     this.props.dispatch(showMessage({ text: 'Something Went wrong', isSuccess: false }));
        // }
    };

    userSocialSigninError = (err) => {
        console.log('error', err);
    };

    render() {
        

        
        return (
            <React.Fragment>
                 <div className="sectionWrapper">                
                    <Row className="align-items-center pb-5" >
                        <Col  className="text-center" >
                            <h4 className="holduptext">ARE YOU REGISTERED?</h4>
                            <div className="pt-4 pb-5">
                            <h5>COMPLETE YOUR ORDER FASTER - SIGN IN WITH YOUR E-MAIL ADDRESS</h5>
                            {/* Please use your DrinkPartycan login, which is different than your Bacardi.com login */}
                            </div>  
                        </Col>             
                    </Row>
                    
                    <Row className="align-items-center d-flex justify-content-center">
                    <Col  xs={12}>
                    <GoogleLogin
                            clientId="184173755807-ugj572pvfqn1c8fmlnvgk8lq61keercg.apps.googleusercontent.com"
                            buttonText="Login With Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.failedResponseGoogle}
                            scope={'https://www.googleapis.com/auth/user.birthday.read'}
                            cookiePolicy={'single_host_origin'}
                        />
                    <Form onSubmit= {this.onSubmit} validate={validate}
                                render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} >  
                                    <div style={{ marginBottom: 20}}>
                                        <Field name="email" component={TextInputField} placeholder='EMAIL'
                                        autoFocus={false} type='text' />
                                    </div>
                                    <div style={{ marginBottom: 20}}>
                                        <Field name="password" component={TextInputField} placeholder='PASSWORD'
                                        autoFocus={false} type='password' />
                                    </div>
                                    { !_isEmpty(this.props.forgotMessage) ?
                                        <div style={{ marginTop: 20, marginBottom: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <text style={{ textAlign: 'center'}}>{this.props.forgotMessage}</text>
                                        </div>
                                    : null }
                                <div className="justify-content-center flex-column mt-5 align-items-center">
                                <Col xs={12} sm={'auto'} className="d-flex justify-content-center" >
                                    <Button color="primary" type="submit" className="bottomActionbutton">
                                        {this.state.isLoading?<CircularProgress size={24} style={{ color: 'white'}}/> : <>LOGIN</> }
                                    </Button>
                                    </Col>
                                    <Col xs={12} sm={'auto'} className="d-flex justify-content-center" >                                     
                                        <a href="javascript:void(0)" onClick={this.props.handleForgetPasswordReq} className="forgotPassword">Forgot Password?</a>
                                    </Col>
                                </div>                               
                                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center'}}>
                                    <p><span>NEW CUSTOMER? </span><a href="javascript:void(0)" onClick={this.props.handleSignUpReq} className="forgotPassword underlineTxt" >Start here</a></p>
                                </div>
                            </form>)}
                            />
                            </Col>
                    </Row>
                    
                    
                </div>
                             
            </React.Fragment>
        );
    }
}



function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps)(GuestSignInComponent);