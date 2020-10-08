import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import {Container, Row, Col} from 'reactstrap'
import { Form, Field } from 'react-final-form';
import {TextInputField, SwitchInputField} from '../../Global/FormCompoents/wrapperComponent';
import { Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import validate from './Validate/holdupValidate';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import genericGetData from '../../Redux/Actions/genericGetData';
import showMessage from '../../Redux/Actions/toastAction';
import WithLoading from '../../Global/UIComponents/LoaderHoc';
import _get from 'lodash/get';
import { isEmpty as _isEmpty } from 'lodash';
import { commonActionCreater } from '../../Redux/Actions/commonAction';

//google analytics
import {PageView, Event} from '../../Global/helper/react-ga';

const styles = theme => ({
    main: {
    }
   
});

class HoldupContainer extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        PageView();
        if(this.props.zipCodeStatus && this.props.zipCodeStatus === "Zipcode validation success") {
            this.props.history.push('/splash');
        }
    };

    onSubmit  = async values => {
        Event("AGE GATE", "Age Gate Triggered", "Age Gate Page");
        genericGetData({
            dispatch:this.props.dispatch,
            url:`/connect/index/getlocation?zipcode=${values.zipcode}&store_id=1&store='drinkpartycan'`,
            constants:{
            init:"ZIPCODE_LOCATOR_INIT",
            success:"ZIPCODE_LOCATOR_SUCCESS",
            error:"ZIPCODE_LOCATOR_ERROR" 
            },
            identifier:"ZIPCODE_LOCATOR",
            successCb:this.zipcodeLocatorSuccess,
            errorCb:this.zipcodeLocatorFetchError,
            dontShowMessage: true })
      }

      zipcodeLocatorSuccess= (data) => {
            if(data.messgae === "Zipcode validation success") {
                this.props.history.push('/splash');
            } else {
               this.props.dispatch(
                   showMessage({ text: 'This is not valid Zipcode. Please try another zipcode.',
                                isSuccess: false }));
            }
      }
      zipcodeLocatorFetchError = (data) => { }

      useLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {console.log(position);
            const initialPosition = JSON.stringify(position);
            console.log(initialPosition);
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
    }

    signIn = () => {
        this.props.history.push('/signIn');
    }
      
    render() {
        const { classes } = this.props;
        return (           
               <React.Fragment>
                <div  className="WhiteCurveBg">
                     <CssBaseline />
                <Container className="container-custom d-flex flex-column justify-content-center">
                    <Row className="align-items-center mb-5" >
                        <Col  className="text-center" >
                        <h4 className="welcomeTxt">Welcome!</h4>
                        <p className="welcomeTxtdescription">Please Enter Your Shipping ZIP Code</p>
                        </Col>                        
                    </Row>  
                    <Form  onSubmit= {this.onSubmit} validate={validate}
                            render={({ handleSubmit }) => (
                        <form className="d-flex flex-column justify-content-around mb-4"  onSubmit={handleSubmit}>
                            <div className="py-3">
                            <Row>
                                <Col className="text-center mb-4" >
                                <Field name="zipcode" component={TextInputField} placeholder='Enter Destination Zip Code'
                                        autoFocus={false} type='text' />
                                </Col>                        
                            </Row>
                           
                            <Row className="text-center mb-5 mt-3 mpb-30 age-checker">
                                <Col className="text-center d-flex align-items-center justify-content-between" >
                                    <Field name="overAge" component={SwitchInputField} label='ARE YOU OVER 21 ?' />
                                </Col>                        
                            </Row>
                            </div> 
                            <Row >
                               <Col  className="text-center changelocation" >
                                    <p >Assortment Varies By Location</p>
                                    <p className="secondpara">You Can Update This ZIP Anytime</p>
                                    </Col>                      
                            </Row> 
                            <Row className="justify-content-center mt-5 align-items-center">
                            <Col xs={12} sm={'auto'} className="d-flex justify-content-center" >
                                    <Button variant="contained" color="primary" className="bottomActionbutton" type="submit">
                                        <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" /> LET'S PARTY</Button>
                                </Col>                        
                            </Row>  
                         </form>)}                           
                    />  
                </Container>
                </div>
                        <Container className="container-custom">
                            <Row>
                                <Col className="text-center" >
                                    <Button variant="text" color="secondary" className="txtButton" onClick={this.signIn} >SIGN IN</Button>
                                </Col>                        
                            </Row>
                        </Container>
            </React.Fragment>
          );
     }
}

const mapStateToProps = (state) => {
    let isLoading = _get(state, 'zipCodeLocator.isFetching')
    let zipCodeStatus = _get(state,'zipCodeLocator.lookUpData.messgae')
    return {
        isLoading,
        zipCodeStatus,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(WithLoading(HoldupContainer)));