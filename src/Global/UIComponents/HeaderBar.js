import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { Button, Badge } from '@material-ui/core';
import Logo from '../../../src/assets/images/partycan-logo.png'
import { Container, Row, Col } from 'reactstrap';
import _get from "lodash/get";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
        this.setState({
            showUserMenuOption: !this.state.showUserMenuOption
        })
    }
    handleLogout = () => {
        localStorage.clear();
        this.props.history.push("");
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Container fluid={true} className="topHeader d-flex align-items-center">
                    <Container className="container-content">
                        <Row className="justify-content-between align-items-center flex-grow-1">
                            <Col xs={'auto'}>
                                <Button className="addCircleIcon icons mr-4">+</Button>
                                <Button onClick={() => this.props.history.push("/categories")}
                                 className="homeIcons icons mr-3"></Button>
                                <Button className="locationIcons icons "></Button>
                            </Col>
                            <Col sm={4} className="d-flex justify-content-center" >
                                <img src={Logo} className="img-responsive"></img>
                            </Col>
                            <Col xs={'auto'}>
                                {this.props.userName && <div class="dropdown">
                                    <AccountCircleIcon fontSize="large" onClick={this.showUserMenu}/>
                                    {this.state.showUserMenuOption ? <div class="dropdown-content">
                                        <span>Hey, {this.props.userName}</span>
                                        <span onClick={this.handleLogout}>Logout</span>
                                    </div> : null }
                                </div>}
                                <Button className="searchIcons icons"></Button>
                                <Badge badgeContent={this.props.total_items_count} color="primary">
                                    <Button onClick={() => this.props.history.push("/cart")} className="cartIcons icons ml-3"></Button>
                                </Badge>
                                <Button onClick={() => this.props.history.push("/setting/user")} className="settingIcons icons ml-3"></Button>
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