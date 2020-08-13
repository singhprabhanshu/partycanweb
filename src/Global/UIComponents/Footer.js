import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { Container, Row, Col } from 'reactstrap'
import { Button, Badge } from '@material-ui/core';
import { get as _get, isEmpty as _isEmpty } from "lodash";
import { commonActionCreater } from "../../Redux/Actions/commonAction";
import genericPostData from "../../Redux/Actions/genericPostData";
import { logoutActionCreator } from '../../Redux/Actions/logoutAction';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { getData } from '../../Redux/Actions/getAction';
import showMessage from '../../Redux/Actions/toastAction';
import axios from "axios";
import { postData } from '../../Redux/Actions/postAction';

const mailChimpUrl = "https://gmail.us17.list-manage.com/subscribe/post-json?u=a7f5d45e81d3bb46cfbd97ec9&amp;id=dae71db860&EMAIL=";

const styles = theme => ({

});

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // showUserMenuOption: false
            email: ""
        }
    }

    // showUserMenu = () => {
    //     this.setState({ showUserMenuOption: true })
    //     // this.props.history.push('/setting/user')
    // }

    handleAddProductToCart = () => {
        if (this.props.history.location.pathname.includes("product")) {
            genericPostData({
                dispatch: this.props.dispatch,
                reqObj: this.props.addProductToCartByFooter,
                url: `api/cart/addtocart`,
                constants: {
                    init: "ADD_TO_CART_INIT",
                    success: "ADD_TO_CART_SUCCESS",
                    error: "ADD_TO_CART_ERROR"
                },
                identifier: "ADD_TO_CART",
                successCb: this.addToCartSuccess,
                errorCb: this.addToCartFailure,
                dontShowMessage: true,
            })
        }
    }

    addToCartSuccess = (data) => {
        localStorage.setItem("cart_id", data[0].cart_id);
        this.props.history.push('/cart');
    }

    showUserMenu = () => {
        this.props.showUserMenu();
    }
    handleSettingClick = () => {
        this.props.history.push("/setting/user");
    }
    handleSignInClick = () => {
        this.props.history.push("/signIn");
    }
    handleCreateAccountClick = () => {
        this.props.history.push("/createAccount");
    }
    handleLogout = () => {
        this.props.dispatch(logoutActionCreator());
        this.props.history.push("");
        window.location.reload();

    }

    handleSubscribeSuccess = (data) => {
        if (data.code === -1) {
            this.props.dispatch(showMessage({ text: data.message, isSuccess: false }));
            this.setState({ email: "" });
        } else {
            this.props.dispatch(showMessage({ text: data.message, isSuccess: true }));
            this.setState({ email: "" });
        }
    }

    handleSubscribe = async () => {
        try {
            genericPostData({
                dispatch: this.props.dispatch,
                reqObj: { email: this.state.email },
                url: 'api/mailchimpnewsletter/index',
                constants: {
                    init: "MAILCHIMP_SUBSCRIBE_INIT",
                    success: "MAILCHIMP_SUBSCRIBE_SUCCESS",
                    error: "MAILCHIMP_SUBSCRIBE_ERROR"
                },
                identifier: "MAILCHIMP_SUBSCRIBE",
                successCb: this.handleSubscribeSuccess,
                errorCb: this.handleSubscribeError,
                dontShowMessage: true
            })
        } catch (err) {
            console.log("========err in mailchimp subscribe", err);
            this.props.dispatch(showMessage({ text: err.message, isSuccess: false }));
        }
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    render() {
        const { classes, isLoginAndSignupScreen } = this.props;
        return (
            <React.Fragment>
                <Container fluid={true} className="footerLayout d-flex align-items-center py-5 ">
                    <Container className="container-content-header justify-content-center ">
                        <Row className="w-100 align-items-start justify-content-center justify-content-md-start  no-gutters ">
                            <Col xs={'12'} md={'3'} className="mb-5 mb-md-0 footerLink d-flex flex-column">

                                <h3 className="text-white">INFO</h3>
                                <a href="/contact-us" className="pb-2">Contact Us</a>
                                <a href="/privacy-policy" className="pb-2">Privacy & Cookie Policy</a>
                                <a href="/terms-conditions" className="pb-2">Terms & Conditions</a>
                                <a href="/terms-conditions">FAQ</a>
                            </Col>
                            {/* <MailchimpSubscribe url={url} /> */}
                            <Col xs={'12'} md={'4'} className="drinkText" >
                                <h3 className="text-white">SUBSCRIBE</h3>
                                <span className="pb-2">Sign up to receive a special discount and early access to new product releases.</span>
                                <div className="d-flex signUpbox">
                                    <Input onChange={this.onEmailChange} value={this.state.email}
                                        className="signUpinput" placeholder="EMAIL" />
                                    <Button variant="contained" color="primary" className="signUpbtn "
                                        type="submit" onClick={this.handleSubscribe} > SIGN UP</Button>
                                </div>
                                <span className="mt-3 poweredLine">Powered by 3TS by Cocktail Courier</span>
                            </Col>
                        </Row>
                    </Container>
                </Container>
                {isLoginAndSignupScreen ? "" :
                    <div className="mobile-bottom-bar d-block d-md-none" onClick={this.props.hideUserMenu}>
                        <Container fluid={true} className="d-flex align-items-center h-100 justify-content-center">
                            <Row className="justify-content-between align-items-center flex-grow-1 no-gutters">
                                <Col className="justify-content-around align-items-center d-flex">
                                    <Button onClick={() => this.props.history.push("/category/ALL")}
                                        className="homeIcons icons"></Button>
                                    {/* <Button className="locationIcons icons "></Button>                            
                                <Button onClick={this.handleAddProductToCart} className="addCircleIcon icons">+</Button> */}
                                    <Badge badgeContent={this.props.total_items_count} color="primary">
                                        <Button onClick={() =>
                                            this.props.history.push("/cart")} className="cartIcons icons"></Button>
                                    </Badge>
                                    <div className="position-relative">
                                        <Button className="userIcons icons" onClick={this.showUserMenu}></Button>
                                        {this.props.showUserMenuOption ?
                                            <div className="drop-option">
                                                <span className="user">Hey, {this.props.userName ? this.props.userName :
                                                    'Guest'}</span>
                                                {this.props.userName &&
                                                    <span className="settings" onClick={() =>
                                                        this.handleSettingClick()}>Settings</span>}
                                                {!this.props.userName &&
                                                    <span className="signIn" onClick={() =>
                                                        this.handleSignInClick()}>Sign In</span>}
                                                {!this.props.userName &&
                                                    <span className="addAccount" onClick={() =>
                                                        this.handleCreateAccountClick()}>Create Account</span>}
                                                {this.props.userName &&
                                                    <span className="logOut" onClick={() =>
                                                        this.handleLogout()}>Logout</span>}
                                            </div>
                                            : null}
                                    </div>

                                </Col>
                            </Row>
                        </Container>
                    </div>
                }
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    let total_items_count = _get(state, "cart.lookUpData[0].total_items_count", 0);
    let addProductToCartByFooter = _get(state, 'addProductToCartByFooter.lookUpData');
    let userName = _get(state, "userSignInInfo.lookUpData[0].result.cust_name", '');
    return { addProductToCartByFooter, userName, total_items_count }
}

export default connect(mapStateToProps)(withStyles(styles)(Footer));