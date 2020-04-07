import React from 'react'
import { render } from 'react-dom'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import CardChild from './CardChild'
import { Form as ReactStrapFrom, FormGroup, Button, Container, Row, Col } from 'reactstrap';
import proImg from '../../../assets/images/party-can.png'

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from './cardUtils'
import { TextInputField } from "../../../Global/FormCompoents/wrapperComponent"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


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
    handleContinueFromExistingCard=()=>{
        this.props.handleTabOnContinue('checkout');
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
                <Col lg={6} className="p-5 order-2 order-md-1">            
                <div className="row cardwrapper">
                    {!this.state.addCard ?
                        <div className="col-sm-6" onClick={this.addNewCard} style={{ height: "200px", marginTop: "10px", cursor: "pointer", background: "white", color: "red", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={this.addCardFunction}>
                            <div>
                                ADD NEW CARD
            </div>
                        </div> : <span onClick={() => this.setState({ addCard: false })}>==Back Button</span>}
                    {!this.state.addCard ?
                        <>
                            {
                                this.savedCards.map((values, index) => (
                                    <div onClick={() => this.setState({ selectedCard: index + 1 })} className="col-sm-6" style={{ marginTop: "10px" }} style={this.state.selectedCard == index + 1 ? { border: "5px solid white", marginTop: "10px" } : { marginTop: "10px" }}>
                                        <CardChild
                                            number={values.number || ''}
                                            name={values.name || ''}
                                            expiry={values.expiry || ''}
                                            cvc={values.cvc || ''}
                                        />
                                    </div>)
                                )
                            }
                        </> : null}
                </div>
                {this.state.addCard ?
                    <Form
                        onSubmit={onSubmit}
                        render={({
                            handleSubmit,
                            form,
                            submitting,
                            pristine,
                            values,
                            active
                        }) => {
                            return (
                                <form style={{ marginTop: "10px" }} onSubmit={handleSubmit} className="container">
                                    <div>
                                        <div className="col-sm-4">
                                            <CardChild
                                                number={values.number || ''}
                                                name={values.name || ''}
                                                expiry={values.expiry || ''}
                                                cvc={values.cvc || ''}
                                                focused={active}
                                            />
                                        </div>
                                    </div>
                                    <ReactStrapFrom className="row">
                                        <FormGroup className="col-sm-12 col-md-10">
                                            <Field
                                                style={{ color: "black !important" }}
                                                name="number"
                                                component={TextInputField}
                                                type="text"
                                                pattern="[\d| ]{16,22}"
                                                placeholder="CARD NUMBER"
                                                format={formatCreditCardNumber}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-sm-12 col-md-10">
                                            <Field
                                                name="name"
                                                component={TextInputField}
                                                type="text"
                                                placeholder="NAME"
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-md-5 col-sm-5">
                                            <Field
                                                name="expiry"
                                                component={TextInputField}
                                                type="text"
                                                pattern="\d\d/\d\d"
                                                placeholder="EXPIRATION DATE"
                                                format={formatExpirationDate}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-md-5">
                                            <Field
                                                name="cvc"
                                                component={TextInputField}
                                                type="text"
                                                pattern="\d{3,4}"
                                                placeholder="SECURITY CODE"
                                                format={formatCVC}
                                            />
                                        </FormGroup>
                                    </ReactStrapFrom>

                                    <div className="text-left mt-4" >
                                        <Button variant="contained" disabled={submitting} color="primary" className="bottomActionbutton cartActionBtn" type="submit">
                                            <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" /> Save and Continue
                                        </Button>
                                    </div> 
                                </form>
                            )
                        }}
                    /> : null}
                {!this.state.addCard ?
                    <div className="text-left mt-4" >
                        <Button variant="contained" onClick={this.handleContinueFromExistingCard} disabled={!this.state.selectedCard} color="primary" className="bottomActionbutton cartActionBtn" type="submit">
                            <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" /> Continue
                        </Button>
                    </div> 
                : null}           
          
            </Col>
                        
                </Row>
            </Container>
            
        </React.Fragment>
        )
    }
}

export default App;
