import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Form, Field } from 'react-final-form';
import { TextInputField, SwitchInputField } from '../../../Global/FormCompoents/wrapperComponent';
import Scrollbar from "react-scrollbars-custom";

import validate from '../Addresses/validaor/billingAddressFormValidator';
import RFReactSelect from '../../../Global/FormCompoents/react-select-wrapper';
import { stateDropDown } from '../../../assets/data/dropdown';
import _map from "lodash/map";
import { cleanEntityData } from '../../../Global/helper/commonUtil';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    Elements,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';

import { logEvent, Result, ErrorResult } from './utils';
import { Form as ReactStrapFrom, Button } from 'reactstrap';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { commonActionCreater } from "../../../Redux/Actions/commonAction";
import { connect } from "react-redux";
import _get from "lodash/get";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { isMobile, isTablet } from 'react-device-detect';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Switch, InputLabel } from '@material-ui/core';
import genericPostData from "../../../Redux/Actions/genericPostData";



const Error = ({ name }) => (
    <Field
        name={name}
        subscription={{ touched: true, error: true }}
        render={({ meta: { touched, error } }) =>
            touched && error ? (
                <span style={{ color: "red" }}>{error}</span>
            ) : null
        }
    />
);

const ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '18px',
            width: "300px",
            color: '#fff',
            letterSpacing: '0.025em',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};
const options = _map(stateDropDown, s => cleanEntityData({
    value: _get(s, 'abbreviation'),
    label: _get(s, 'name')
}));

const AddCard = (props) => {
    const elements = useElements();
    const stripe = useStripe();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [sas, sasFun] = useState(false);

    const [postal, setPostal] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);

    let billingAddress = {};
    let cardData = {};
    let payload = {};

    const handleSubmit = async (values) => {
        // event.preventDefault();
        setLoading(true);
        let api_token = localStorage.getItem("Token");
        billingAddress = {
            api_token: api_token,
            first_name: values.firstName,
            last_name: values.lastName,
            street1: values.address,
            street2: values.address2,
            city: values.city,
            state: values.state,
            zipcode: values.zip,
            nickname: values.addressNickname,
            telephone: values.phone,
            billing_address: _get(values, 'address', '') + ' ' + _get(values, 'address2', ''),
            country: "USA",
            email:values.email,
            dob:values.dob
        };
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        //step 1 request the server to give the token used for payments

        // const { data: clientSecret } = await axios.post("/api/stripe", {
        //   amount: 1 * 100
        // });


        //step 2 get the Card Number Element (i think it will automatically get the card number from it)
        const cardElement = elements.getElement(CardNumberElement);


        //step 3 create the payment method it will return a payload that is used for charge the client
        payload = await stripe.createToken(cardElement);
        
        let stripeTokenId =  window.localStorage.getItem("stripeTokenId");
        if(stripeTokenId == _get(payload,"token.id")){
            payload = await stripe.createToken(cardElement);
          }
       localStorage.setItem("stripeTokenId",payload.token.id);

        if (payload.error) {
            console.log('[error]', payload.error);
            alert(payload.error.message);
            setErrorMessage(payload.error.message);
            setPaymentMethod(null);
            setLoading(false);
            return;
        } else {
            let card_token = payload.token.id;
            saveAndContinue({ api_token, card_token });

        }
    };

    const saveAndContinue = (reqObj) => {
        genericPostData({
            dispatch: props.dispatch,
            reqObj: reqObj,
            url: `api/account/mycards`,
            constants: {
                init: "ADD_PAYMENT_CARD_INIT",
                success: "ADD_PAYMENT_CARD_SUCCESS",
                error: "ADD_PAYMENT_CARD_ERROR"
            },
            identifier: "ADD_PAYMENT_CARD",
            successCb: addPayementCardSuccess,
            errorCb: addPayementCardError,
            dontShowMessage: true
        });
    }

    const addPayementCardSuccess = (data) => {
        if (data.code === 1) {
            cardData = data;
            saveBillingInfo(billingAddress)
        }
        else {
            setLoading(false);
            let errorMessage = _get(data,"data","something went wrong while processing card");
            setErrorMessage(errorMessage+" :BackendError");
            alert(errorMessage+" :BackendError");    
            return;
        }
    }

    const addPayementCardError = (data) => {
        setLoading(false);
        alert("Internal server error occured");
        console.log('ERROR', data);
    }

    const saveBillingInfo = (reqObj) => {
        genericPostData({
            dispatch: props.dispatch,
            reqObj: reqObj,
            url: `connect/customer/addaddress`,
            constants: {
                init: "ADD_BILLING_INFO_INIT",
                success: "ADD_BILLING_INFO_SUCCESS",
                error: "ADD_BILLING_INFO_ERROR"
            },
            identifier: "ADD_BILLING_INFO",
            successCb: addBillingInfoSuccess,
            errorCb: addBillingInfoError,
            dontShowMessage: true
        });
    }

    const addBillingInfoSuccess = (data) => {
        if (data.code === 1) {
            setLoading(false);
            let paymentMethods = props.paymentMethods;
            let cartFlow = props.cartFlow;
            let card_token = payload.token.id;
            let card_id = payload.token.card.id;
            let customer_stripe_id = cardData.data[0].customer; //paymentMethods && Array.isArray(paymentMethods) && paymentMethods.length > 0 ? paymentMethods[0].customer_stripe_id : "";
            let card_info = "";
            let payment_method = "stripe_payments";  //check here
            let data = {
                ...cartFlow,
                card_id,
                card_token,
                customer_stripe_id,
                card_info,
                payment_method
                //billingAddress: { ...values }
            }
            if(props.isUserSettingAddCard){
                props.handleContinueFromNewCard();
            }
            else{
                props.dispatch(commonActionCreater(data, 'CART_FLOW'));
                props.handleContinueFromNewCard();
            }

            //props.loadCardDataAndBack();
        }
        else {
            setLoading(false);
            setErrorMessage("something went wrong while saving billing address")
            return;
        }
    }

    const addBillingInfoError = (data) => {
        setLoading(false);
        alert("Internal server error occured");
        console.log('ERROR', data);
    }
    const sasChange = (val, mutators) => {
        sasFun(val);
        if (val == false) {
            return;
        }
        let selectedAddress = props.userAddress.find(add => add.address_id == props.cartFlow.selectedAddress);
        if (selectedAddress) {
            let state = stateDropDown.find(s => s.name == selectedAddress.state);
            if (state)
                selectedAddress.state = state.abbreviation;
            mutators.setShippingAddress(selectedAddress);
        }
    }
    const creditCardDetailsSubmit = () => {
        debugger;
        document
            .getElementById('###creditcardform###')
            .dispatchEvent(new Event('submit', { cancelable: true }))
    }

    let content = <React.Fragment>
        <div className="scrollerwrapper" >
            <div className="">
                <Form onSubmit={handleSubmit} validate={validate}

                    mutators={{
                        setShippingAddress: (args, state, utils) => {

                            utils.changeValue(state, 'addressNickname', () => _get(args[0], "address_nickname"));
                            utils.changeValue(state, 'city', () => _get(args[0], "city"));
                            utils.changeValue(state, 'firstName', () => _get(args[0], "name").split(" ")[0]);
                            utils.changeValue(state, 'lastName', () => _get(args[0], "name").split(" ")[1]);
                            utils.changeValue(state, 'country', () => _get(args[0], "country"));
                            utils.changeValue(state, 'state', () => _get(args[0], "state"));
                            utils.changeValue(state, 'address', () => _get(args[0], "street1"));
                            utils.changeValue(state, 'address2', () => _get(args[0], "street2"));
                            utils.changeValue(state, 'phone', () => _get(args[0], "telephone"));
                            utils.changeValue(state, 'zip', () => _get(args[0], "zipcode"));
                        }
                    }}

                    render={({ handleSubmit, form }) => (
                        <ReactStrapFrom id="###creditcardform###" onSubmit={handleSubmit}>
                            <div className="StripeCard">
                                <div className="addNewCC no-gutters d-flex flex-wrap">
                                    <div className="col-12 w-100 mb-4">
                                        <label>CARD HOLDER</label>
                                        <input
                                            id="name"
                                            style={{ color: "black !important" }}
                                            required
                                            placeholder="Jenny Rosen"
                                            className="cardHolderName"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 w-100 mb-4">
                                        <label htmlFor="cardNumber">CARD NUMBER</label>
                                        <CardNumberElement
                                            id="cardNumber"
                                            onBlur={logEvent('blur')}
                                            onChange={logEvent('change')}
                                            onFocus={logEvent('focus')}
                                            onReady={logEvent('ready')}
                                            options={ELEMENT_OPTIONS}
                                        />
                                    </div>
                                    <div className="col-8 w-100 mb-4">
                                        <label htmlFor="expiry">EXPIRATION DATE</label>
                                        <CardExpiryElement
                                            id="expiry"
                                            onBlur={logEvent('blur')}
                                            onChange={logEvent('change')}
                                            onFocus={logEvent('focus')}
                                            onReady={logEvent('ready')}
                                            options={ELEMENT_OPTIONS}
                                        />
                                    </div>
                                    <div className="col-4  pl-5 w-100 mb-4">
                                        <label htmlFor="cvc">CVC</label>
                                        <CardCvcElement
                                            id="cvc"
                                            onBlur={logEvent('blur')}
                                            onChange={logEvent('change')}
                                            onFocus={logEvent('focus')}
                                            onReady={logEvent('ready')}
                                            options={ELEMENT_OPTIONS}
                                            className="CCCC"
                                        />
                                    </div>
                                    {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
                                    {paymentMethod && <Result>Got PaymentMethod: {paymentMethod.id}</Result>}
                                    {/* <div className="block-title d-flex justify-content-between align-items-center mb-4">
                            <span className="d-flex align-items-center">
                                <Field name="defaultAddress" component={SwitchInputField} label='Same as Billing Address' />
                            </span>
                        </div> */}
                                </div>

                            </div>

                            <React.Fragment>
                                <div className="d-flex no-gutters flex-wrap justify-content-between align-items-center">
                                    <h4 className="col-12 col-md-auto block-title ">Billing Address</h4>
                                   { !props.isUserSettingAddCard&&<div className="d-flex justify-content-between align-items-center col-12 col-md-auto">
                                        <InputLabel className="label-txt fs-11 mb-0 ">Same As Shipping Address</InputLabel>
                                        <Switch
                                            color="primary"
                                            checked={sas}
                                            onClick={() => sasChange(!sas, form.mutators)}
                                            className="custom-switch"
                                        />
                                    </div>}
                                </div>
                            </React.Fragment>
                            <div className="d-flex mt-4">
                                <div style={{ width: '50%', paddingRight: 50 }}>
                                    <Field name="firstName" component={TextInputField} placeholder='FIRST NAME'
                                        autoFocus={false} type='text' />
                                </div>
                                <div style={{ width: '50%', paddingRight: 50 }}>
                                    <Field name="lastName" component={TextInputField} placeholder='LAST NAME'
                                        autoFocus={false} type='text' />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div>
                                    <Field name="address" component={TextInputField} placeholder='ADDRESS'
                                        autoFocus={false} type='text' />
                                </div>
                            </div>

                            {/* <div className="mt-4">
                                <Field name="address2" component={TextInputField} placeholder='ADDRESS 2'
                                    autoFocus={false} type='text' />
                            </div> */}
                            <div className="mt-4">
                                <Field name="city" component={TextInputField} placeholder='CITY'
                                    autoFocus={false} type='text' />

                            </div>
                            <div className="d-flex mt-4">
                                {/* <Field name="state" component={TextInputField} placeholder='STATE'
                                    autoFocus={false} type='text' />
                                    <Field name="zip" component={TextInputField} placeholder='ZIP'
                                    autoFocus={false} type='text' />         */}
                                <div style={{ width: '55%', paddingRight: 50 }}>
                                    <Field name="state" component={RFReactSelect} placeholder='STATE'
                                        search={true} autoFocus={false} type='text' options={options} />


                                </div>
                                <div style={{ width: '45%' }}>
                                    <Field name="zip" component={TextInputField} placeholder='ZIP'
                                        autoFocus={false} type='text' />


                                </div>

                            </div>
                            <div className="mt-4">
                                <Field name="addressNickname" component={TextInputField} placeholder='ADDRESS NICKNAME'
                                    autoFocus={false} type='text' />


                            </div>
                            <div className="mt-4">
                                <Field name="phone" component={TextInputField} placeholder='PHONE'
                                    autoFocus={false} type='text' />


                            </div>
                            {/* <h3>Contact For Order Confirmation</h3>
                        <div className="mt-4">
                            <Field name="email" component={TextInputField} placeholder='EMAIL'
                                autoFocus={false} type='text' />
                           
                        </div>
                        <h3>Date of Birth</h3>
                        <div className="mt-4">
                            <Field name="dob" component={TextInputField} placeholder='MM/DD/YYYY'
                                autoFocus={false} type='text' />

                        </div> */}
                        </ReactStrapFrom>)}
                />
            </div>
        </div>
    </React.Fragment>
    let commonContent = null;  
    commonContent =  <div>{content}</div>
    // if(isMobile || isTablet){
    //     commonContent =  <div>{content}</div>
    // }
    // else{
    //     commonContent =  <Scrollbar  className="leftSecmaxHeight">{content}</Scrollbar>
    // }    

    return (
        <>
            <div onClick={() => props.goBack()} className="bread-crumb mb-4"><KeyboardBackspaceIcon style={{ fontSize: 13, marginRight: 10 }} />CARDS</div>
            <div className="block-title mb-5">Add New Card</div>
            {commonContent}
            <div className="text-left mt-4" >
                <Button
                    variant="contained"
                    disabled={!stripe || loading}
                    color="primary"
                    onClick={creditCardDetailsSubmit}
                    className="bottomActionbutton cartActionBtn"
                >
                    {loading ? <CircularProgress /> :
                        <><ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" />
                Save and Continue</>}
                </Button>
            </div>
        </>

    );
};

function mapStateToProps(state) {
    let paymentMethods = _get(state, "paymentMethods.lookUpData.data", {});
    let userAddress = _get(state, "userAddress.lookUpData.data", {});

    paymentMethods = Object.keys(paymentMethods).filter(key => !isNaN(key)).map(key => paymentMethods[key]);

    let cartFlow = _get(state, 'cartFlow.lookUpData', {});

    return { cartFlow, paymentMethods, userAddress }
}

export default connect(mapStateToProps)(AddCard);