import { Form, Field } from 'react-final-form';
import {TextInputField, SwitchInputField} from '../../Global/FormCompoents/wrapperComponent';
import { Button } from '@material-ui/core';
import validate from './Validate/createAccountValidate';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import genericPostData from '../../Redux/Actions/genericPostData';
import showMessage from '../../Redux/Actions/toastAction';
import {Container, Row, Col} from 'reactstrap'
import { Loader } from '../../Global/UIComponents/LoaderHoc';
const styles = theme => ({
});

class CreateAccountContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    onSubmit  = async values => {
        this.setState({isLoading: true});
        genericPostData({
            dispatch:this.props.dispatch,
            reqObj: {email: values.email,
                 password: values.password,
                  confirm_password: values.confirm_password,
                  first_name:values.first_name,
                  last_name:values.last_name
                 },
            url:`api/customer/register?email=${values.email}&password=${values.password}&confirm_password=${values.confirm_password}&first_name=${values.first_name}&last_name=${values.last_name}`,
            constants:{
            init:"USER_REGISTER_INIT",
            success:"USER_REGISTER_SUCCESS",
            error:"USER_REGISTER_ERROR" 
            },
            identifier:"USER_REGISTER",
            successCb:this.userRegisterSuccess,
            errorCb:this.userRegisterError,
            dontShowMessage: true });
    }
      
    userRegisterSuccess= (data) => {
        this.setState({isLoading: false});
        const code = _get(data[0],'code');
        const message = _get(data[0],'message');
            if (code === 1) {
            //   this.props.dispatch(showMessage({ text: message, isSuccess: true }));
                this.signIn();
            } else if (code === 2) {
                this.props.dispatch(showMessage({ text: message, isSuccess: false }));
            } else {
                this.props.dispatch(showMessage({ text: message, isSuccess: false }));
            }
    }
    userRegisterError = (data) => {
        this.setState({isLoading: false});  
        this.props.dispatch(showMessage({ text: 'Something Went wrong', isSuccess: false }));
    }
        
    signIn = () => {    
            this.props.history.push('/signIn');
    }
    
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {this.state.isLoading && <Loader /> }
                <div className="WhiteCurveBg">
                     <CssBaseline />
                <Container className="container-custom d-flex flex-column justify-content-center">
                    <Row className="align-items-center mb-5" style={{flex:2, maxHeight:130, minHeight:130}}>
                        <Col  className="text-center" >
                            <h4 className="holduptext">CREATE ACCOUNT</h4>
                        </Col>                        
                    </Row>
                        <Form onSubmit= {this.onSubmit} validate={validate}
                            render={({ handleSubmit }) => (
                                <form className="d-flex flex-column justify-content-around mb-4 "  onSubmit={handleSubmit}>
                          <Row>
                                <Col className="text-center mb-5" >
                                <Field name="first_name" component={TextInputField} placeholder='FIRST NAME'
                                autoFocus={false} type='text' />
                              </Col>                        
                            </Row>
                            <Row>
                                <Col className="text-center mb-5" >
                                <Field name="last_name" component={TextInputField} placeholder='LAST NAME'
                                autoFocus={false} type='text' />
                               </Col>                        
                            </Row>
                            <Row>
                                <Col className="text-center mb-5" >
                                <Field name="email" component={TextInputField} placeholder='EMAIL'
                                autoFocus={false} type='text' />
                              </Col>                        
                            </Row>
                            <Row>
                                <Col className="text-center mb-5" >
                                <Field name="password" component={TextInputField} placeholder='PASSWORD'
                                autoFocus={false} type='password' />
                               </Col>                        
                            </Row>
                            <Row>
                                <Col className="text-center mb-5" >
                                <Field name="confirm_password" component={TextInputField} placeholder=' CONFIRM PASSWORD'
                                autoFocus={false} type='password' />
                               </Col>                        
                            </Row>
                            {/* <Row >
                                <Col className="locationTxt" >
                                FORGOT PASSWORD ?
                                </Col>                        
                            </Row> */}
                            <Row>
                                <Col className="text-center d-flex align-items-center justify-content-between" >
                                    <Field name="overAge" component={SwitchInputField} label='ARE YOU OVER 21 ?' />
                                </Col>                        
                            </Row> 
                            <Row className="justify-content-center mt-5 align-items-ceenter">
                            <Col xs={12} sm={'auto'} className="d-flex justify-content-center" >
                                    <Button variant="contained" color="primary" className="bottomActionbutton" type="submit">
                                        <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" />CREATE ACCOUNT</Button>
                                </Col>                        
                            </Row>                              
                         </form>)}
                        />
                          </Container>
                </div>
                        <Container className="container-custom">
                            <Row>
                                <Col className="text-center" >
                                    <Button variant="text" color="secondary" className="txtButton" onClick={this.signIn} >SIGN IN</Button>
                                </Col>                        
                            </Row>
                        </Container>
            </React.Fragment>
        );
    }
}

CreateAccountContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    return {}
}
export default connect(mapStateToProps)(withStyles(styles)(CreateAccountContainer));