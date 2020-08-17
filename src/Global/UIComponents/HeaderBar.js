import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { Button, Badge } from '@material-ui/core';
import Logo from '../../../src/assets/images/partycan-logo.png'
import { Container, Row, Col } from 'reactstrap';
import _get from "lodash/get";
import {logoutActionCreator} from '../../Redux/Actions/logoutAction';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
const styles = theme => ({

});

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserMenuOption: false
        }
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

    handleSearchAction = () => {
        this.props.history.push('/search')
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Container fluid={true} className="topHeader d-flex align-items-center">
                    <Container className="container-content-header">
                        <Row className="justify-content-between align-items-center flex-grow-1">
                            <Col className="d-none d-md-block" xs={'auto'}>
                                {/* <Button className="addCircleIcon icons mr-4">+</Button> */}
                                <Button onClick={() => this.props.history.push("/category/ALL")}
                                 className="homeIcons icons mr-4"></Button>
                                {/* <Button className="locationIcons icons "></Button> */}
                            </Col>
                            <Col sm={12} md={4} >
                                <a href="/splash" className="d-flex justify-content-center align-items-center"><img src={Logo} className="img-responsive logo-header"></img></a>
                            </Col>
                            <Col xs={'auto'} className="d-none d-md-flex">
                                <Button onClick={this.handleSearchAction} className="searchIcons icons"></Button>
                                <Badge badgeContent={this.props.total_items_count} color="primary">
                                    <Button onClick={() => this.props.history.push("/cart")} className="cartIcons icons ml-4"></Button>
                                </Badge>
                                <div className="position-relative">
                                <Button className="userIcons icons ml-4" onClick={this.showUserMenu}></Button>
                                {this.props.showUserMenuOption ? 
                                    <div className="drop-option">
                                        <span className="user">Hey , {this.props.userName ? this.props.userName : 'Guest'}</span>                                        
                                        {this.props.userName &&  
                                        <span className="settings" onClick={() =>this.handleSettingClick()}>Settings</span>}
                                         {!this.props.userName && 
                                            <span className="signIn" onClick={() =>this.handleSignInClick()}>Sign In</span>}
                                        {!this.props.userName && 
                                            <span className="addAccount" onClick={() =>this.handleCreateAccountClick()}>Create Account</span>}
                                   {this.props.userName && 
                                        <span className="logOut" onClick={()=>this.handleLogout()}>Logout</span> }
                                    </div>
                                     : null 
                                }
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let total_items_count = _get(state,"cart.lookUpData[0].total_items_count",0);
    let userName = _get(state,"userSignInInfo.lookUpData[0].result.cust_name",''); 
    return {
        total_items_count,
        userName
    };
};

export default connect(mapStateToProps)(withStyles(styles)(HeaderBar));