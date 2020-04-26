import { Form, Field } from 'react-final-form';
import {TextInputField, SwitchInputField} from '../../Global/FormCompoents/wrapperComponent';
import { Button } from '@material-ui/core';
import validate from './Validate/loginValidate';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import LoginComponent from '../../Components/LoginComponents/login';
import genericPostData from '../../Redux/Actions/genericPostData';
import showMessage from '../../Redux/Actions/toastAction';
import {Container, Row, Col} from 'reactstrap';
import WithLoading from '../../Global/UIComponents/LoaderHoc';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 +theme.spacing(3 * 2))]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
    letsPartyButton: {
        textAlign: 'center',
        marginTop: '12px'
    }
});

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // currentStep: 1
        }
    }

    componentDidMount(){
        
    }

    onSubmit  = async values => {
        genericPostData({
            dispatch:this.props.dispatch,
            reqObj: {email: values.email, password: values.password},
            url:`api/customer/login?email=${values.email}&password=${values.password}`,
            constants:{
            init:"USER_SIGNIN_INIT",
            success:"USER_SIGNIN_SUCCESS",
            error:"USER_SIGNIN_ERROR" 
            },
            identifier:"USER_SIGNIN",
            successCb:this.userSigninSuccess,
            errorCb:this.userSigninError,
            dontShowMessage: true })
      }
      userSigninSuccess= (data) => {
        const code = _get(data[0],'code');
        const message = _get(data[0],'message');
          if(code === 1 && message === 'success') {
            localStorage.setItem('Token', _get(data[0], 'result.api_token',''));
            this.props.history.push('/home');
        } else {
            this.props.dispatch(showMessage({ text: message, isSuccess: false }));
        }
    }
    userSigninError = (data) => {

        }
      createAccount = () => {
        this.props.history.push('/createAccount');
      }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className="WhiteCurveBg">
                     <CssBaseline />
                <Container className="container-custom d-flex flex-column justify-content-center">
                    <Row className="align-items-center  mb-5" style={{flex:2,  maxHeight:130, minHeight:130}}>
                        <Col  className="text-center" >
                        <h4 className="holduptext">SIGN IN</h4>
                        </Col>                        
                    </Row> 
                    
                  
                        <Form  onSubmit= {this.onSubmit} validate={validate}
                            render={({ handleSubmit }) => (
                        <form className="d-flex flex-column justify-content-around mb-4"  onSubmit={handleSubmit}>
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
                            
                            <Row >
                                <Col className="locationTxt" >
                                 FORGOT PASSWORD ?
                                </Col>                        
                            </Row>

                            <Row className="justify-content-center align-items-ceenter">
                                <Col xs={12} sm={'auto'} className="d-flex justify-content-center" >
                                    <Button variant="contained" color="primary" className="bottomActionbutton" type="submit">
                                        <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" />SIGN IN</Button>
                                </Col>                        
                            </Row>                             
                          
                         </form>)}
                        />
                     </Container>
                </div>
                        <Container className="container-custom">
                            <Row>
                                <Col  className="text-center" >
                                    <Button variant="text" color="secondary" className="txtButton" onClick={this.createAccount} >CREATE ACCOUNT</Button>
                                </Col>                        
                            </Row>
                        </Container>                  
            </React.Fragment>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
let isLoading = _get(state, 'userSignInInfo.isFetching')
return {isLoading}
}
export default connect(mapStateToProps)(withStyles(styles)(WithLoading(SignIn)));