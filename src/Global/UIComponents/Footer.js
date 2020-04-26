import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import {Container, Row, Col} from 'reactstrap'
import { Button, Badge } from '@material-ui/core';
const styles = theme => ({
   
});

class Footer extends React.Component { 

    showUserMenu = () => {
        this.props.history.push('/setting/user')
    }

    render() {
        const { classes, isLoginAndSignupScreen } = this.props;
        return (
            <React.Fragment>
                <Container fluid={true}  className="footerLayout d-flex align-items-center">              
                <Container className="container-content-header justify-content-center">
                        <Row>
                            <Col className="d-flex flex-column">
                                <span className="pb-2">&copy; to PartyCan</span>                     
                                <span>HandCrafted with <i className="fa fa-heart"></i> By PartCan Team</span>
                            </Col>
                        </Row>
                    </Container>
                </Container>
                { isLoginAndSignupScreen ? "" :
             <div className="mobile-bottom-bar d-block d-md-none">
                <Container fluid={true}  className="d-flex align-items-center h-100 justify-content-center">   
                        <Row className="justify-content-between align-items-center flex-grow-1 no-gutters">
                            <Col  className="justify-content-around align-items-center d-flex">                                
                                <Button onClick={() => this.props.history.push("/home")} className="homeIcons icons"></Button>
                                <Button className="locationIcons icons "></Button>                            
                                <Button className="addCircleIcon icons">+</Button>
                                <Badge badgeContent={this.props.total_items_count} color="primary">
                                    <Button onClick={() => this.props.history.push("/cart")} className="cartIcons icons"></Button>
                                </Badge>
                                <div className="position-relative">
                                <Button className="userIcons icons" onClick={this.showUserMenu}></Button>
                                {this.props.showUserMenuOption ? 
                                    <div className="drop-option">
                                    <span className="user">Hey, {this.props.userName ? this.props.userName : 'Guest'}</span>                                        
                                    <span className="settings" onClick={() =>this.handleSettingClick()}>Settings</span>
                                    {this.props.userName && <span className="logOut" onClick={()=>this.handleLogout()}>Logout</span> }
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

const mapStateToProps = (state) => {  
    return {
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Footer));