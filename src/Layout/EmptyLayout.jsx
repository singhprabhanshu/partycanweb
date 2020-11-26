import React from 'react';
// import HeaderLayout from './components/common/HeaderNav.jsx';

import Snackbar from '@material-ui/core/Snackbar';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Footer from '../Global/UIComponents/Footer';
import Logo from '../assets/images/partycan-logo.png'
import {Container, Row, Col} from 'reactstrap'

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

class EmptyLayout extends React.Component {

  render() {
    let { classes } = this.props;
    return (
      <div className="emptyLayout">
        <div className="d-none d-md-block">
        <div className="topHeader d-flex justify-content-center align-items-center ">
           <Col xs={4} className="d-flex justify-content-center"><a href="/splash" className="d-flex justify-content-center align-items-center"><img src={Logo} className="img-responsive"></img></a></Col>      
        </div>
        </div>
        <div className="container-content-section">
          {this.props.children}
        </div>
        <Footer isLoginAndSignupScreen={true} {...this.props} />
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
    );
  }


}
function mapStateToProps(state) {
  let message = _get(state, 'ShowToast.message', '');
  return { message }
}
export default connect(mapStateToProps)(withStyles(styles)(EmptyLayout));