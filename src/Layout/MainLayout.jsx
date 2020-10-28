import React from 'react';
// import { render } from "react-dom";
// import HeaderLayout from './components/common/HeaderNav.jsx';

import Snackbar from '@material-ui/core/Snackbar';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import HeaderBar from '../Global/UIComponents/HeaderBar';
import Footer from '../Global/UIComponents/Footer';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {isMobile, isTablet} from 'react-device-detect';
import Scrollbar from "react-scrollbars-custom";
//const stripePromise = loadStripe("pk_test_RkUSbyxxcn4xFQ0ttE6QsIDh00bGPMtJdc");
const stripePromise = loadStripe("pk_live_YWHAuQZ9QVoqDq3bOdRRz8Rg006Mq0WrB9");

const styles = theme => ({
  failure: {
    background: 'red',
    fontSize: '1.2rem'
  },
  success: {
    background: 'green',
    fontSize: '1.2rem'
  },

});

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showUserMenuOption: false
    }
}

  showUserMenu = () => {
    this.setState({
        showUserMenuOption: !this.state.showUserMenuOption
    });
  }
  
  hideUserMenu = () => {
    if(this.state.showUserMenuOption === true) {
      this.setState({
        showUserMenuOption: false
      }); 
    }   
  }

  handleRoute() {
    let currentRoute = this.props.match.path;
    switch (currentRoute) {
      case "/splash":
        return <Footer isLoginAndSignupScreen={true} {...this.props} showUserMenu={this.showUserMenu}
        hideUserMenu={this.hideUserMenu} howUserMenuOption={this.state.showUserMenuOption} />;
      case "/cart/:cartflow":
        return <Footer isLoginAndSignupScreen={true} {...this.props} showUserMenu={this.showUserMenu}
        hideUserMenu={this.hideUserMenu}
        showUserMenuOption={this.state.showUserMenuOption}/>;
      default:
        return <Footer isLoginAndSignupScreen={false} {...this.props} showUserMenu={this.showUserMenu}
        hideUserMenu={this.hideUserMenu}
        showUserMenuOption={this.state.showUserMenuOption} />;
    }
  }

  renderContent = (classes) => {
    let commonContent =  <>
    <div  onClick={this.hideUserMenu}>
      <HeaderBar history={this.props.history} showUserMenu={this.showUserMenu}
       showUserMenuOption={this.state.showUserMenuOption}/></div>
    <div className="container-content-section" onClick={this.hideUserMenu}>
    <Elements stripe={stripePromise}>{this.props.children}</Elements>
     <div>{this.props.message.text && <Snackbar
       anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'right',
       }}
       open={true}
       autoHideDuration={6000}
       onClose={() => { }}
       ContentProps={{
         'aria-describedby': 'message-id',
         classes: {
           root: this.props.message.isSuccess ? classes.success : classes.failure
         }
       }}
       message={<span id="message-id">{this.props.message.text}</span>}
     />}
     </div>
     </div>
     {
     this.handleRoute()
  }
     
   </>
   if(isMobile || isTablet){
   return <div className="mainLayout">{commonContent}</div>
   }
   else{
   return <Scrollbar className="mainLayout">{commonContent}</Scrollbar>
   }
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    let { classes } = this.props;
    return (
      <>
      {this.renderContent(classes)}
      </>
    );
  }


}
function mapStateToProps(state) {
  let message = _get(state, 'ShowToast.message', '');
  return { message }
}
export default connect(mapStateToProps)(withStyles(styles)(MainLayout));