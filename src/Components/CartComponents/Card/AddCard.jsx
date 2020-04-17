import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    Elements,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';

import { logEvent, Result, ErrorResult } from './utils';
import axios from "axios";
import { Form as ReactStrapFrom, FormGroup, Button, Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, } from 'reactstrap';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { commonActionCreater } from "../../../Redux/Actions/commonAction";
import { connect } from "react-redux";
import _get from "lodash/get";

const ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '18px',
            width: "300px",
            color: '#424770',
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

const AddCard = (props) => {
    const elements = useElements();
    const stripe = useStripe();
    const [name, setName] = useState('');
    const [postal, setPostal] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

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
        const payload = await stripe.createToken(cardElement);

        if (payload.error) {
            console.log('[error]', payload.error);
            setErrorMessage(payload.error.message);
            setPaymentMethod(null);
        } else {
            let paymentMethods = props.paymentMethods;
            let cartFlow = props.cartFlow;
            let card_token = payload.token.id;
            let card_id =  payload.token.card.id;
            let customer_stripe_id =  paymentMethods&&Array.isArray(paymentMethods)&&paymentMethods.length>0?paymentMethods[0].customer_stripe_id:"";
            let card_info = "";
            let payment_method = "stripe_payments";  //check here
            let data = {
                ...cartFlow,
                card_id,
                card_token,
                customer_stripe_id,
                card_info,
                payment_method
            }

            props.dispatch(commonActionCreater(data, 'CART_FLOW'));
            props.handleContinueFromNewCard();
        }
    };

    return (
        <div className="StripeCard">

            <ReactStrapFrom onSubmit={handleSubmit}>
                <div className="d-flex mt-4">
                    <div style={{ width: '50%', marginRight: 50 }}>
                        <label>Name</label>
                        <input
                            id="name"
                            style={{ color: "black !important" }}
                            required
                            placeholder="Jenny Rosen"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <div style={{ width: '50%', marginRight: 50 }}>
                        <label htmlFor="cardNumber">Card Number</label>
                        <CardNumberElement
                            id="cardNumber"
                            onBlur={logEvent('blur')}
                            onChange={logEvent('change')}
                            onFocus={logEvent('focus')}
                            onReady={logEvent('ready')}
                            options={ELEMENT_OPTIONS}
                        />
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <div style={{ width: '50%', marginRight: 50 }}>
                        <label htmlFor="expiry">Card Expiration</label>
                        <CardExpiryElement
                            id="expiry"
                            onBlur={logEvent('blur')}
                            onChange={logEvent('change')}
                            onFocus={logEvent('focus')}
                            onReady={logEvent('ready')}
                            options={ELEMENT_OPTIONS}
                        />
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <div style={{ width: '50%', marginRight: 50 }}>
                        <label htmlFor="cvc">CVC</label>
                        <CardCvcElement
                            id="cvc"
                            onBlur={logEvent('blur')}
                            onChange={logEvent('change')}
                            onFocus={logEvent('focus')}
                            onReady={logEvent('ready')}
                            options={ELEMENT_OPTIONS}
                        />
                    </div>
                </div>
                {/* <div className="d-flex mt-4">
                <div style={{ width: '50%', marginRight: 50 }}>
                <label htmlFor="postal">Postal Code</label>
                <input
                    id="postal"
                    required
                    placeholder="12345"
                    value={postal}
                    onChange={(e) => {
                        setPostal(e.target.value);
                    }}
                />
                </div>
                </div> */}
                {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
                {paymentMethod && <Result>Got PaymentMethod: {paymentMethod.id}</Result>}
                <Button
                    variant="contained"
                    disabled={!stripe}
                    color="primary"
                    onClick={handleSubmit}
                    className="bottomActionbutton cartActionBtn"
                    >
                    <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" />
                    Save and Continue
                </Button>
            </ReactStrapFrom>
        </div>
    );
};

function mapStateToProps(state) {
    let paymentMethods = _get(state, "paymentMethods.lookUpData.data", {});
    paymentMethods = Object.keys(paymentMethods).filter(key => !isNaN(key)).map(key => paymentMethods[key]);

    let cartFlow = _get(state, 'cartFlow.lookUpData', {});

    return { cartFlow,paymentMethods }
}

export default connect(mapStateToProps)(AddCard);