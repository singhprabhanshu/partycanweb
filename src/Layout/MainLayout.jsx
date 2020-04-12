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
import Scrollbar from "react-scrollbars-custom";
const stripePromise = loadStripe("pk_test_RkUSbyxxcn4xFQ0ttE6QsIDh00bGPMtJdc");

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

  render() {
    let { classes } = this.props;
    return (
      <>
    
      <Scrollbar className="mainLayout">
       <div className="d-none d-md-block"><HeaderBar history={this.props.history} /></div>
       <div className="container-content-section">
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
        <Footer />
      </Scrollbar>
     
      </>
    );
  }


}
function mapStateToProps(state) {
  let message = _get(state, 'ShowToast.message', '');
  return { message }
}
export default connect(mapStateToProps)(withStyles(styles)(MainLayout));