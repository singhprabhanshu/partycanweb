

import React from 'react';
import { get as _get, isEmpty as _isEmpty } from 'lodash';
import { Redirect } from 'react-router';

import {Container, Row, Col} from 'reactstrap'

import { connect } from 'react-redux';
import GuestWithoutLoginComponent from '../../Components/GuestRegisterComponents/GuestWithoutLoginComponent';
import GuestSignInComponent from '../../Components/GuestRegisterComponents/GuestSignInComponent';
import GuestSignUpComponent from '../../Components/GuestRegisterComponents/GuestSignUpComponent';
import GuestForgetPasswordComponent from '../../Components/GuestRegisterComponents/GuestForgetPasswordComponent';
// import PartyLocatorMapComponent from '../../Components/PartyLocator/GoogleMapComponent';
// import MapStoreComponent from '../../Components/PartyLocator/MapStoreComponent';



class GuestRegisterContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            handleSignUp: false,
            handleSignIn: true,
            handleForgetPassword: false,
            forgotPasswordMessage: null
        }
    }


    handleSignUpReq = () => {
        this.props.history.push('/createAccount');
        // this.setState({
        //     handleSignUp: true,
        //     handleSignIn: false,
        //     handleForgetPassword: false
        // });
    }

    handleSignInReq = ({ forgotMessage }) => {
        if (!_isEmpty(forgotMessage)) {
            this.setState({
                handleSignIn: true,
                handleSignUp: false,
                handleForgetPassword: false,
                forgotPasswordMessage: forgotMessage,
            }); 
        } else {
            this.setState({ forgotPasswordMessage: null }, () => {
                this.setState({
                    handleSignIn: true,
                    handleSignUp: false,
                    handleForgetPassword: false
                });
                
            });
        }
        
    }

    handleForgetPasswordReq = () => {
        this.setState({
            handleSignIn: false,
            handleForgetPassword: true,
            handleSignUp: false
        });
    }

    

    

    render() {
        if (!_isEmpty(_get(this.props.userSignInInfo, '[0].result.api_token', ''))){
            return <Redirect to='/category/ALL'/>;

        };

        
        return (
            <React.Fragment>
                    {/* <div >
                            <GuestWithoutLoginComponent 
                                {...this.props} 
                            />
                    </div> */}


                <Row className="justify-content-center pt-50 mb-50 secMinHeight">
                    <Col xs={12} lg={5} className="d-flex justify-content-center order-2 col-md-1 mb-5 mb-md-0 mpb-30 ">
                        {this.state.handleSignUp ? 
                            <GuestSignUpComponent
                                {...this.props}
                                handleSignInReq={this.handleSignInReq}
                            /> : this.state.handleSignIn ? 
                            <GuestSignInComponent
                                {...this.props}
                                forgotMessage={this.state.forgotPasswordMessage}
                                handleSignUpReq={this.handleSignUpReq}
                                handleForgetPasswordReq={this.handleForgetPasswordReq}
                            /> : this.state.handleForgetPassword ?
                            <GuestForgetPasswordComponent
                                {...this.props}
                                handleSignInReq={this.handleSignInReq}
                            /> : null
                            }
                    </Col>
                    <Col lg={'auto'} className="my-5 my-lg-0 my-xl-0 order-2">
                            <div className="divider"></div>
                    </Col>
                    <Col  xs={12} lg={5} className="d-flex justify-content-center mb-5 mb-md-0  order-1 col-md-2">
                        <GuestWithoutLoginComponent 
                            {...this.props} 
                        />
                    </Col>
                </Row>
                    
                    
                
                
                
                
            </React.Fragment>


        );
    }
}



function mapStateToProps(state) {
    let userSignInInfo = _get(state, 'userSignInInfo.lookUpData', []);
    return {
        userSignInInfo
    };
}
export default connect(mapStateToProps)(GuestRegisterContainer);