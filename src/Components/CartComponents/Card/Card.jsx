import React from 'react'
import { render } from 'react-dom'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import CardChild from './CardChild'
import { Form as ReactStrapFrom, FormGroup, Button, Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, } from 'reactstrap';
import proImg from '../../../assets/images/party-can.png'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Scrollbar from "react-scrollbars-custom";
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from './cardUtils'
import { TextInputField } from "../../../Global/FormCompoents/wrapperComponent"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AddCard from "./AddCard";
import genericPostData from "../../../Redux/Actions/genericPostData"
import { connect } from "react-redux";
import _get from "lodash/get";
import { commonActionCreater } from "../../../Redux/Actions/commonAction";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
}

class CardComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { addCard: false };
    }
    addCardFunction = () => {
        this.setState({ addCard: true });
    }
    handleContinueFromExistingCard = () => {
        let cartFlow = this.props.cartFlow;
        let selectedCard = this.props.paymentMethods[this.state.selectedCard-1];
            let card_token = "";
            let card_id =  selectedCard.id;
            let customer_stripe_id =  selectedCard.customer_stripe_id;
            let card_info = selectedCard.card_info;
            let payment_method = this.props.payment_method;
            let data = {
                ...cartFlow,
                card_id,
                card_token,
                customer_stripe_id,
                card_info,
                payment_method
            }
        this.props.dispatch(commonActionCreater(data, 'CART_FLOW'));
        this.props.handleTabOnContinue('checkout');
    }
    handleContinueFromNewCard = ()=>{
        this.props.handleTabOnContinue('checkout');

    }

    componentDidMount() {
        let reqObj = {
            api_token: localStorage.getItem("Token"),
            cart_id: this.props.cartId
        };

        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: "/api/checkout/paymentmethods",
            identifier: "GET_PAYMENTMETHODS"
        })
    }
    render() {
        return (
            <React.Fragment>
                <Container fluid={true}>
                    <Row className="no-gutters justify-content-lg-between secMinHeight">
                        <Col lg={5} className="order-1 d-none d-lg-block order-md-2">
                            <div className="productImgSection">
                                <img src={proImg} className="imgProduct img-responsive"></img>
                            </div>
                        </Col>
                        <Col lg={7} className="p-5">
                            <Scrollbar className="leftSecmaxHeight">
                                <div className="pr-lg-4" >
                                    {!this.state.addCard ?
                                        <>
                                            <React.Fragment>
                                                <div className="block-title mb-4">SAVED CARDS</div>
                                                <div className="CardsWrapper d-flex align-items-center flex-wrap">
                                                    <Card className="addnewcard" onClick={this.addNewCard} onClick={this.addCardFunction}>
                                                        <CardBody className="p-3 d-flex align-items-center justify-content-center flex-column ">
                                                            <div className="mb-4"><AddCircleOutlineOutlinedIcon style={{ fontSize: 25 }} /> </div>
                                                            <div>  ADD NEW CARD</div>
                                                        </CardBody>
                                                    </Card>
                                                    {
                                                        this.props.paymentMethods.map((values, index) => (
                                                            <span className="ccCardsList" onClick={() => this.setState({ selectedCard: index + 1 })} style={this.state.selectedCard == index + 1 ? { opacity: "1" } : { opacity: ".3" }}>
                                                                <CardChild
                                                                    number={("************" + values.card_no) || ''}
                                                                    issuer={values.brand}
                                                                    preview={true}
                                                                    name={values.name || ''}
                                                                    expiry={Number(values.card_exp_month)<10?`0${values.card_exp_month}${values.card_exp_year}`:values.card_exp_month + values.card_exp_year || ''}
                                                                    cvc={values.cvc || ''}
                                                                    className="ccCard"

                                                                />
                                                            </span>)
                                                        )
                                                    }
                                                </div>
                                            </React.Fragment>

                                        </> : null}

                                    {this.state.addCard ? <AddCard handleContinueFromNewCard={this.handleContinueFromNewCard} /> : null}
                                    {!this.state.addCard ?
                                        <div className="text-left mt-4" >
                                            <Button variant="contained" onClick={this.handleContinueFromExistingCard} disabled={!this.state.selectedCard} color="primary" className="bottomActionbutton cartActionBtn" type="submit">
                                                <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" /> Continue
                        </Button>
                                        </div>
                                        : null}
                                </div>
                            </Scrollbar>
                        </Col>

                    </Row>
                </Container>

            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    let paymentMethods = _get(state, "paymentMethods.lookUpData.data", {});
    let payment_method = _get(paymentMethods,"payment_method")
    let cartId =  _get(state, "cart.lookUpData[0].cart_id",null);
    paymentMethods = Object.keys(paymentMethods).filter(key => !isNaN(key)).map(key => paymentMethods[key]);
    let cartFlow = _get(state, 'cartFlow.lookUpData', {});
    return {
        paymentMethods,
        cartId,
        cartFlow,
        payment_method
    }
}

export default connect(mapStateToProps)(CardComponent);
