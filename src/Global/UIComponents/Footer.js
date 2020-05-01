import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import {Container, Row, Col} from 'reactstrap'
import { Button, Badge } from '@material-ui/core';
import { get as _get, isEmpty as _isEmpty } from "lodash";
import {commonActionCreater} from "../../Redux/Actions/commonAction";
import genericPostData from "../../Redux/Actions/genericPostData";
import {logoutActionCreator} from '../../Redux/Actions/logoutAction';
import cLogo from '../../../src/assets/images/cocktail-courier-logo.png';
const styles = theme => ({
   
});

class Footer extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            // showUserMenuOption: false
        }
    }

    // showUserMenu = () => {
    //     this.setState({ showUserMenuOption: true })
    //     // this.props.history.push('/setting/user')
    // }

    handleAddProductToCart = () => {
        if(this.props.history.location.pathname.includes("product")){
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
        localStorage.setItem("cart_id",data[0].cart_id);
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


    render() {
        const { classes, isLoginAndSignupScreen } = this.props;
        return (
            <React.Fragment>
                <Container fluid={true}  className="footerLayout d-flex align-items-center p-3">              
                <Container className="container-content-header justify-content-center ">
                        <Row className="w-100 align-items-center justify-content-sm-between justify-content-center ">
                        <Col xs={'auto'} md={'3'} >
                            <div className="text-left d-flex flex-column footerLink">
                                    {/* <a href="" className="pb-2">Privacy Policy</a>
                                    <a href="">Terms & Conditions</a> */}
                            </div>
                            </Col>
                            <Col xs={'auto'} className="d-flex align-items-center justify-content-center">                                
                                <div className="d-flex align-items-center pt-xs-0">
                                <span className="mt-3 mr-4 poweredLine">Powered by<br></br> Three-Tire Solution<br></br> From</span>                   
                                <img src={cLogo} className="img-responsive cLogo"></img>
                                </div>
                            </Col>
                            <Col xs={'auto'} md={'3'} className="mNone" >
                           
                            </Col>
                        </Row>
                    </Container>
                </Container>
                { isLoginAndSignupScreen ? "" :
             <div className="mobile-bottom-bar d-block d-md-none" onClick={this.props.hideUserMenu}>
                <Container fluid={true}  className="d-flex align-items-center h-100 justify-content-center">   
                        <Row className="justify-content-between align-items-center flex-grow-1 no-gutters">
                            <Col  className="justify-content-around align-items-center d-flex">                                
                                <Button onClick={() => this.props.history.push("/category/Cans")} className="homeIcons icons"></Button>
                                <Button className="locationIcons icons "></Button>                            
                                <Button onClick={this.handleAddProductToCart} className="addCircleIcon icons">+</Button>
                                <Badge badgeContent={this.props.total_items_count} color="primary">
                                    <Button onClick={() => this.props.history.push("/cart")} className="cartIcons icons"></Button>
                                </Badge>
                                <div className="position-relative">
                                <Button className="userIcons icons" onClick={this.showUserMenu}></Button>
                                {this.props.showUserMenuOption ? 
                                    <div className="drop-option">
                                        <span className="user">Hey, {this.props.userName ? this.props.userName : 'Guest'}</span>                                        
                                        {this.props.userName && 
                                        <span className="settings" onClick={() =>this.handleSettingClick()}>Settings</span>}
                                        {!this.props.userName && 
                                            <span className="settings" onClick={() =>this.handleSignInClick()}>Sign In</span>}
                                        {!this.props.userName && 
                                            <span className="settings" onClick={() =>this.handleCreateAccountClick()}>Create Account</span>}
                                        {this.props.userName && 
                                        <span className="logOut" onClick={()=>this.handleLogout()}>Logout</span> }
                                     </div>
                                     : null }
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
    let total_items_count = _get(state,"cart.lookUpData[0].total_items_count",0);
    let addProductToCartByFooter = _get(state, 'addProductToCartByFooter.lookUpData');
    let userName = _get(state,"userSignInInfo.lookUpData[0].result.cust_name",''); 
    return { addProductToCartByFooter, userName, total_items_count }
}

export default connect(mapStateToProps)(withStyles(styles)(Footer));