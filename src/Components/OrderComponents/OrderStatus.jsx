import React from "react";
import { connect } from "react-redux";
import CartItemsList from "../CartHomeComponents/CartItemList"
import CouponCode from "../CartHomeComponents/CouponCode";
import CartPriceSummary from "../CartHomeComponents/CartPriceSummary"
import genericPostData from "../../Redux/Actions/genericPostData";
import _get from "lodash/get";
// import { Button } from 'reactstrap';
import LoaderButton from '../../Global/UIComponents/LoaderButton';
import { Card,  CardBody } from 'reactstrap';


import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';


import socketIOClient from "socket.io-client";

import { socket } from '../../index';

const useStyles = (theme) => ({
    root: {
      width: '50%',
      backgroundColor: 'rgba(255,255,255,0)',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  });



class OrderStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0
        }
    }
    getSteps() {
        return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
    }

    getStepContent(step) {
        switch (step) {
          case 0:
            return `For each ad campaign that you create, you can control how much
                    you're willing to spend on clicks and conversions, which networks
                    and geographical locations you want your ads to show on, and more.`;
          case 1:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
          case 2:
            return `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`;
          default:
            return 'Unknown step';
        }
    }

    // const steps = getSteps();

    handleNext = (prevActiveStep) => {
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        this.setState({
            activeStep: prevActiveStep + 1,
        })
    };

    handleBack = (prevActiveStep) => {
        // setActiveStep((prevActiveStep) => prevActiveStep - 1);
        this.setState({
            activeStep: prevActiveStep - 1,
        })
    };

    handleReset = () => {
        // setActiveStep(0);
        this.setState({
            activeStep: 0,
        })
    };
    componentDidMount() {


      // socket work

      // const endpoint = 'http://127.0.0.1:8000';
      // const socket = socketIOClient(endpoint);
      socket.on("orderStatus", data => {
        console.log(JSON.stringify(data));
        this.setState({ activeStep: _get(data, 'status') });
        socket.disconnect();
      });

      // socket.on('userdetail', data => {
      //   socket.emit('adduser', { data: { id: 123, username: 'prabhanshu'}});
      // });
      
        // let reqObj = {
        //     "api_token": "1c779ca336234ffc6a98807a6d36140e"
        // };

        // genericPostData({
        //     dispatch: this.props.dispatch,
        //     reqObj,
        //     url: "/api/cart/showcart",
        //     constants: {
        //         init: "CART_ITEMS_INIT",
        //         success: "CART_ITEMS_SUCCESS",
        //         error: "CART_ITEMS_ERROR"
        //     },
        //     identifier: "CART_ITEMS",
        //     successCb: this.cartFetchSuccess,
        //     errorCb: this.cartFetchError
        // })
    };
    // cartFetchSuccess = (data) => {
    //     let coupon_code = _get(data, "[0].coupon_code", "");
    //     this.setState({ coupon_code })
    //     console.log(data, "data")
    // };
    // cartFetchError = (err) => {
    //     console.log(err);
    // };
    
    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        const finalSteps = steps.map((label, index) => (
            <Step key={label} >
              <StepLabel icon={ index + 2 }><span style={{ color: 'white'}}>{label}</span></StepLabel>
              {/* <StepContent >
                <Typography style={{ color: 'white'}}>{this.getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={this.state.activeStep === 0}
                      onClick={() => this.handleBack(this.state.activeStep)}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.handleNext(this.state.activeStep)}
                      className={classes.button}
                    >
                      {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent> */}
            </Step>
          ))
        return (
            <React.Fragment>

                <div>
                    working
                </div>

                <div className={classes.root}>
                    <Stepper activeStep={this.state.activeStep} orientation="vertical" style={{ backgroundColor: 'rgba(255,255,255,0)'}} connector={false}>
                        {finalSteps}
                    </Stepper>
                </div>

            </React.Fragment>
            
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}


export default connect(mapStateToProps, null)(withStyles(useStyles)(OrderStatus));