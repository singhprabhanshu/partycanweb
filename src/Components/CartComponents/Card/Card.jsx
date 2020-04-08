import React from 'react'
import { render } from 'react-dom'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import CardChild from './CardChild'
import { Form as ReactStrapFrom, FormGroup, Button, Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, } from 'reactstrap';
import proImg from '../../../assets/images/party-can.png'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from './cardUtils'
import { TextInputField } from "../../../Global/FormCompoents/wrapperComponent"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';


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
                <Col lg={6} className="p-5">            
                
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
                                this.savedCards.map((values, index) => (
                                    <span  className="ccCardsList"  onClick={() => this.setState({ selectedCard: index + 1 })} style={this.state.selectedCard == index + 1 ? { opacity: "1" } : { opacity: ".3" }}>
                                        <CardChild
                                            number={values.number || ''}
                                            name={values.name || ''}
                                            expiry={values.expiry || ''}
                                            cvc={values.cvc || ''}
                                            className="ccCard"
                                           
                                        />
                                    </span>)
                                )
                            }
                            </div>  
                     </React.Fragment> 

                        </> : null}
                      
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
                                <form style={{ marginTop: "10px" }} onSubmit={handleSubmit} className="container  px-0">
                                    <div className="bread-crumb mb-4" onClick={() => this.setState({ addCard: false })}><KeyboardBackspaceIcon style={{fontSize:13, marginRight:10}} /> Back Button</div>
                                    <div className="block-title d-flex justify-content-between align-items-center mb-4">ADD NEW CARD</div>
                                   <div className="mt-4 mb-5" style={{  display:'inline-flex' }}>
                                            <CardChild
                                                number={values.number || ''}
                                                name={values.name || ''}
                                                expiry={values.expiry || ''}
                                                cvc={values.cvc || ''}
                                                focused={active}
                                            />
                                   </div>
                                    <ReactStrapFrom >
                                        <div className="d-flex mt-4">
                                            <div style={{ width: '50%', marginRight: 50}}>
                                                <Field  name="number" component={TextInputField} placeholder="CARD NUMBER" pattern="[\d| ]{16,22}" 
                                                autoFocus={false} type='text' format={formatCreditCardNumber} />
                                            </div>
                                            <div style={{ width: '50%'}}>
                                                <Field  name="name" component={TextInputField} placeholder="NAME"
                                                autoFocus={false} type='text' />
                                            </div>
                                        </div>

                                        <div className="d-flex mt-4">
                                            <div style={{ width: '50%', marginRight: 50}}>
                                                <Field  name="expiry" component={TextInputField} placeholder="EXPIRATION DATE" pattern="\d\d/\d\d" 
                                                autoFocus={false} type='text' format={formatExpirationDate} />
                                            </div>
                                            <div style={{ width: '50%'}}>
                                                <Field  name="cvc" component={TextInputField} placeholder="SECURITY CODE" pattern="\d{3,4}"
                                                autoFocus={false} type='text' format={formatCVC} />
                                            </div>
                                        </div>
                                        
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
