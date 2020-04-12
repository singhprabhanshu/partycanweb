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


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.savedCards = [{
            "number": 4111111111111111,
            "name": "My Visa Card",
            "CVC": "729",
            "expiry": "0233"

        },
        {
            "number": 5500000000000004,
            "name": "MY MasterCard",
            "CVC": "729",
            "expiry": "0233"

        },
        {
            "number": 340000000000009,
            "name": "American ExpressS",
            "CVC": "729",
            "expiry": "0233"

        }]
        this.state = { addCard: false };
    }
    addCardFunction = () => {
        debugger;
        this.setState({ addCard: true });
    }
    handleContinueFromExistingCard = () => {
        this.props.handleTabOnContinue('checkout');
    }
    componentDidMount() {
        let reqObj = {
            api_token: "1c779ca336234ffc6a98807a6d36140e",
            cart_id: 26239
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
                                                <div className="block-title mb-4">SAVED ADDRESSES</div>
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
                                                                    expiry={values.card_exp_month + values.card_exp_year || ''}
                                                                    cvc={values.cvc || ''}
                                                                    className="ccCard"

                                                                />
                                                            </span>)
                                                        )
                                                    }
                                                </div>
                                            </React.Fragment>

                                        </> : null}

                                    {this.state.addCard ? <AddCard /> : null}
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
    paymentMethods = Object.keys(paymentMethods).filter(key => !isNaN(key)).map(key => paymentMethods[key]);

    return {
        paymentMethods
    }
}

export default connect(mapStateToProps)(App);
