
import React from 'react';
import { connect } from 'react-redux';
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Form, Field } from 'react-final-form';
import { TextInputField} from '../../Global/FormCompoents/wrapperComponent';
import validate from './changePasswordValidate';
import {Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import genericPostData from '../../Redux/Actions/genericPostData';
import showMessage from '../../Redux/Actions/toastAction';
import _get from 'lodash/get';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    onSubmit = async values => {
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: { email: this.props.userEmail, old_password: values.old_password, 
                new_password: values.new_password, confirm_password: values.confirm_password},
            url: 'api/customer/reset',
            constants: {
                init: "CHANGE_PASSWORD_INIT",
                success: "CHANGE_PASSWORD_SUCCESS",
                error: "CHANGE_PASSWORD_ERROR"
            },
            identifier: "CHANGE_PASSWORD",
            successCb: this.userChangePasswordSuccess,
            errorCb: this.userChangePasswordError,
            dontShowMessage: true
        })
    }

    userChangePasswordSuccess = (data) => {
        const code = _get(data[0], 'code');
        const message = _get(data[0], 'message');
        if (code === 1 && message === 'Password Change Successful') {
            this.props.dispatch(showMessage({ text: message, isSuccess: true }));
            this.props.goBack();
        } else if (message) {
            this.props.dispatch(showMessage({ text: message, isSuccess: false }));
        } else {
            this.props.dispatch(showMessage({ text: 'Something Went wrong', isSuccess: false }));
        }
    }

    userChangePasswordError = (data) => {
        console.log('Error Data', data);
    }

    render() {

        return (
            <React.Fragment>
                <div onClick={() => this.props.goBack()} className="bread-crumb mb-4">
                    <KeyboardBackspaceIcon style={{ fontSize: 13, marginRight: 10 }} />
                    ACCOUNT SETTING
                </div>
                <div className="block-title mb-5">CHANGE PASSWORD</div>
                <Form onSubmit={this.onSubmit} validate={validate}
                    render={({ handleSubmit }) => (
                        <form className="d-flex flex-column justify-content-around mb-4" onSubmit={handleSubmit}>
                            <Row>
                                <Col className="text-center mb-5" >
                                    <Field name="old_password" component={TextInputField} placeholder='OLD PASSWORD'
                                        autoFocus={false} type='password' />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center mb-5" >
                                    <Field name="new_password" component={TextInputField} placeholder='NEW PASSWORD'
                                        autoFocus={false} type='password' />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center mb-5" >
                                    <Field name="confirm_password" component={TextInputField} placeholder='CONFIRM PASSWORD'
                                        autoFocus={false} type='password' />
                                </Col>
                            </Row>
                            <Row className="justify-content-center flex-column mt-4 align-items-center">
                                <Col xs={12} sm={'auto'} className="d-flex justify-content-center" >
                                    <Button variant="contained" color="primary" className="bottomActionbutton" type="submit">
                                        <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" />RESET PASSWORD</Button>
                                </Col>
                            </Row>

                        </form>)}
                />

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let userEmail = _get(state,"userSignInInfo.lookUpData[0].result.email",''); 
    return {userEmail};
};

export default connect(mapStateToProps)(ChangePassword);