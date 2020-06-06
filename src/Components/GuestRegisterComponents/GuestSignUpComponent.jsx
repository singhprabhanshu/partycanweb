
import React from 'react';

import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { Button } from 'reactstrap';
import validate from './validator/guestSignupFormValidator';
import {TextInputField, CheckBoxInputField, DateTimePicker, RadioBtnInput } from '../../Global/FormCompoents/wrapperComponent';
import genericPostData from '../../Redux/Actions/genericPostData';
import { cleanEntityData } from '../../Global/helper/commonUtil';
import { get as _get, map as _map } from 'lodash';
import showMessage from '../../Redux/Actions/toastAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import { countryDropdown } from '../../assets/data/dropdown';
import RFReactSelect from '../../Global/FormCompoents/react-select-wrapper';
import moment from 'moment';
import {Container, Row, Col} from 'reactstrap'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CalenderIcon from '@material-ui/icons/CalendarTodayOutlined';
const countryOptions = _map(countryDropdown, s => cleanEntityData({
    value: _get(s, 'code'),
    label: _get(s, 'name')
}));

let dateBefore21Year = moment().subtract(21, 'years');
let valid = function (current) {
    return current.isBefore(dateBefore21Year);
}
function normalizeDate(value, prevValue,b,c) {
    debugger;
    if (!value) return value;
    if(value._isAMomentObject){
        return value
    }
  
    const valueOnlyNumbers = value.replace(/[^\d]/g, '');
    const prevValueOnlyNumbers = prevValue && prevValue.replace(/[^\d]/g, '');
  
    // Enable backspacing:
    // if the user is backspacing and they backspace a forward slash, the date's
    // numbers won't be affected so just return the value.
    if (valueOnlyNumbers === prevValueOnlyNumbers) return value;
  
    const month = valueOnlyNumbers.slice(0, 2);
    const day = valueOnlyNumbers.slice(2, 4);
    const year = valueOnlyNumbers.slice(4, 8);

    if (valueOnlyNumbers.length < 2) return `${month}`;
    if (valueOnlyNumbers.length === 2) return `${month}/`;
    if (valueOnlyNumbers.length < 4) return `${month}/${day}`;
    if (valueOnlyNumbers.length === 4) return `${month}/${day}/`;
    if (valueOnlyNumbers.length > 4) return `${month}/${day}/${year}`;
}







class GuestSignUpComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
        
        
    }
     
    onSubmit = async values => {
        this.setState({isLoading: true});
        let cartId = localStorage.getItem("cart_id");
        const dob =  values.dob ? moment(_get(values, 'dob')).format('MM/DD/YYYY') : ''
        let body = cleanEntityData({
            email: _get(values, 'email'),
            password: _get(values, 'password'),
            confirm_password: _get(values, 'confirmPassword'),
            first_name: _get(values, 'firstName'),
            last_name: _get(values, 'lastName'),
            cart_id: cartId,
            dob,
            gender: _get(values, 'gender'),
            country: _get(values, 'country'),
            newsletter_subscription: _get(values, 'newsletter_subscription'),
        });
        
        genericPostData({
            dispatch:this.props.dispatch,
            reqObj: body,
            url:`api/customer/register?email=${values.email}&password=${values.password}&confirm_password=${values.confirmPassword}&first_name=${values.firstName}&last_name=${values.lastName}&dob=${dob}&gender=${values.gender}&country=${values.country}&newsletter_subscription=${values.newsletter_subscription}`,
            constants:{
            init:"USER_REGISTER_INIT",
            success:"USER_REGISTER_SUCCESS",
            error:"USER_REGISTER_ERROR" 
            },
            identifier:"USER_REGISTER",
            successCb:this.userRegisterSuccess,
            errorCb:this.userRegisterError,
            dontShowMessage: true
        });
    }

    userRegisterSuccess= (data) => {
        this.setState({isLoading: false});
        const code = _get(data[0],'code');
        const message = _get(data[0],'message');
            if (code === 1) {
                this.props.handleSignInReq();
            } else {
                 
                this.props.dispatch(showMessage({ text: message, isSuccess: false }));
            }
    }
    userRegisterError = (err) => {
        this.setState({isLoading: false});  
        this.props.dispatch(showMessage({ text: 'Something Went wrong', isSuccess: false }));
    }

    render() {
        

        
        return (
            <React.Fragment>
                <div className="sectionWrapper">                  
                    <Row className="align-items-center pb-5" >
                        <Col  className="text-center" >
                            <h4 className="holduptext"> CREATE ACCOUNT</h4>
                        </Col>             
                    </Row>
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <Form onSubmit= {this.onSubmit} validate={validate} initialValues={{country : 'US'}}
                                render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} >                                  
                                    <Row className="no-gutters ">
                                        <Col xs={12} md={6} className="pr-md-5 mb-5" >
                                        <Field name="firstName" component={TextInputField} placeholder='FIRST NAME'
                                        autoFocus={false} type='text' />
                                        </Col>
                                        <Col xs={12} md={6} className="mb-5" >
                                        <Field name="lastName" component={TextInputField} placeholder='LAST NAME'
                                        autoFocus={false} type='text' />                   
                                    </Col>                        
                                    </Row>

                                     <Row className="no-gutters">
                                        <Col className="mb-5" >
                                        <Field name="email" component={TextInputField} placeholder='EMAIL ADDRESS'
                                                autoFocus={false} type='text' />
                                    </Col>                        
                                    </Row>       
                                    <Row className="no-gutters">
                                        <Col xs={12} md={6} className="pr-md-5 mb-5" >
                                        <Field name="password" component={TextInputField} placeholder='PASSWORD'
                                        autoFocus={false} type='password' />
                                    </Col> 
                                        <Col className=" mb-5" >
                                        <Field name="confirmPassword" component={TextInputField} placeholder='CONFIRM PASSWORD'
                                        autoFocus={false} type='password' />
                                    </Col>                        
                                    </Row>
                                    <Row className="no-gutters datetime-placeholder">
                                        <Col className="mb-5 datePicker" >
                                        <CalenderIcon className="calenderIcon" />
                                        <Field name="dob" component={DateTimePicker} 
                                        parse={normalizeDate}
                                        isValidDate={valid}
                                        viewDate={dateBefore21Year}
                                        dateFormat="MM/DD/YYYY" 
                                        placeholder='DATE OF BIRTH(MM/DD/YYYY)'
                                        autoFocus={false} />
                                    </Col>                        
                                    </Row>
                                    <Row className="no-gutters">
                                        <Col className="mb-5" >
                                        <Field name="country" component={RFReactSelect} placeholder='COUNTRY'
                                        search={true} autoFocus={false} type='text' options={countryOptions} />
                                    </Col>                        
                                    </Row>
                                    <Row className="no-gutters">
                                        <Col className="mb-4 genderSelection" >
                                        <Field name="gender" component={RadioBtnInput} placeholder='GENDER' label='GENDER'
                                            classes={{root: { display: 'flex'}}} 
                                            radioBtnOptions={[{label: 'MALE', value: 'M'}, {label: 'FEMALE', value: 'F'}]} />
                                    </Col>                        
                                    </Row>

                                     <Row className="no-gutters newsOffers">
                                        <Col className="d-flex align-items-center justify-content-center mb-4 " >
                                            <Field name="newsletter_subscription" component={CheckBoxInputField} 
                                            label='KEEP ME UP TO DATE ON NEWS AND EXCLUSIVE OFFERS' />
                                        </Col>                        
                                    </Row>                                    
                                                                
                                    <Row className="justify-content-center align-items-ceenter mb-5">
                                        <Col xs={12} sm={'auto'} className="d-flex justify-content-center" >
                                                <Button variant="contained" color="primary" className="bottomActionbutton" type="submit">
                                                    <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" />CREATE ACCOUNT</Button>
                                        </Col>                        
                                    </Row>
                                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center'}}>
                                    <p><span>ALREADY HAVE AN ACCOUNT? </span><a href="javascript:void(0)" onClick={this.props.handleSignInReq} className="forgotPassword underlineTxt" >Sign in</a></p>
                                </div>
                            </form>)}
                            />
                    </div>
                    
                    
                </div>
                             
            </React.Fragment>
        );
    }
}



function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps)(GuestSignUpComponent);