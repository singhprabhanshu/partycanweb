

import React from 'react';

import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { Button } from 'reactstrap';
import { get as _get, isEmpty as _isEmpty } from 'lodash';
import validate from './validator/guestWithoutLoginValidator';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Redirect } from 'react-router';
import genericPostData from '../../Redux/Actions/genericPostData';
import { commonActionCreater } from '../../Redux/Actions/commonAction';

import { TextInputField } from '../../Global/FormCompoents/wrapperComponent';



class GuestWithoutLoginContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        
    }
    addGuestEmailSuccess = (data) => {
        if (_get(data, 'code', -1) === 1) {
            let cartId = localStorage.getItem("cart_id");
            let lookupData = _get(this.props.userSignInInfo, '[0]', {});
            let userSignInInfo = [
                {
                    ...lookupData,
                    result: {
                        ...lookupData.result,
                        customer_id: _get(data, 'data.customer_id'),
                        api_token: _get(data, 'data.api_token'),
                        cart_id: cartId,
                    }
                }
            ];
            localStorage.setItem('Token', _get(data, 'data.api_token', ''));
            this.props.dispatch(commonActionCreater(userSignInInfo, 'USER_SIGNIN_SUCCESS'));
            this.props.history.push('/cart');
        }
        
    };

    addGuestEmailError = (err) => {
        console.log('error in guest email proceed', err);
    };

    onSubmit = async values => {
        let cartId = localStorage.getItem("cart_id");

        let body = {
            customer_email: _get(values, 'email'),
            store_id: 1,
            cart_id: cartId
        }

        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: body,
            url: '/api/cart/guestcart',
            constants: {
                init: 'POST_USER_ADDRESSES_INIT',
                success: 'POST_USER_ADDRESSES_SUCCESS',
                error: 'POST_USER_ADDRESSES_ERROR'
            },
            identifier: 'POST_GUEST_EMAIL',
            successCb: this.addGuestEmailSuccess,
            errorCb: this.addGuestEmailError,
            dontShowMessage: true
        });
        
    }

    render() {
        if (!_isEmpty(_get(this.props.userSignInInfo, '[0].result.api_token', ''))){
            return <Redirect to='/category/Cans'/>;

        };

        return (
            <React.Fragment>

                <div >
                    CHECKOUT AS GUEST
                </div>
                <div >
                    ENTER YOUR EMAIL ADDRESS TO PROCEED WITH YOUR ORDER.
                </div>
                    <Form onSubmit={this.onSubmit} validate={validate}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} style={{ width: "30%", marginTop: 20 }}>


                                <div style={{ marginBottom: 20 }}>
                                    <Field name="email" component={TextInputField} placeholder='EMAIL'
                                        autoFocus={false} type='text' />
                                </div>


                                <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button variant="contained" color="primary" className="bottomActionbutton cartActionBtn" type="submit">
                                    <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" /> PROCEED</Button>
                                </div>
                            </form>)}
                    />
                
            </React.Fragment>


        );
    }
}



function mapStateToProps(state) {
    let userSignInInfo = _get(state, 'userSignInInfo.lookUpData', []);
    let cartData = _get(state, 'cart.lookUpData', []);
    return {
        userSignInInfo,
        cartData,
    };
}
export default connect(mapStateToProps)(GuestWithoutLoginContainer);