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
    onSubmit  = async values => {
        genericGetData({
            dispatch:this.props.dispatch,
            url:`index.php/connect/index/getlocation?zipcode=${values.zipcode}`,
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
                <Container fluid={true}  className="WhiteCurveBg">
                     <CssBaseline />
                <Container className="container-custom d-flex flex-column justify-content-center">
                    <Row className="align-items-center" style={{flex:2, maxHeight:200}}>
                        <Col  className="text-center" >
                        <h4 className="holduptext">HOLD UP!</h4>
                        </Col>                        
                    </Row>  
                    <Form  onSubmit= {this.onSubmit} validate={validate}
                            render={({ handleSubmit }) => (
                        <form className="d-flex flex-column justify-content-around mb-4" style={{flex:3, maxHeight:350}} onSubmit={handleSubmit}>
                            <Row>
                                <Col className="text-center" >
                                <Field name="zipcode" component={TextInputField} placeholder='ZIPCODE'
                                        autoFocus={false} type='text' />
                                </Col>                        
                            </Row>
                            <Row >
                                <Col className="locationTxt" >
                                <RoomOutlinedIcon style={{ fontSize: 23 }} /> USE MY LOCATION
                                </Col>                        
                            </Row>
                            <Row>
                                <Col className="text-center d-flex align-items-center justify-content-between" >
                                    <Field name="overAge" component={SwitchInputField} label='ARE YOU OVER 21 ?' />
                                </Col>                        
                            </Row> 
                            <Row className="justify-content-center align-items-ceenter">
                            <Col xs={12} sm={'auto'} className="d-flex justify-content-center" >
                                    <Button variant="contained" color="primary" className="bottomActionbutton" type="submit">
                                        <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" /> LET'S PARTY</Button>
                                </Col>                        
                            </Row>  
                         </form>)}                           
                    />  
                </Container>
                </Container>
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
    return {
        isLoading
    };
};

export default connect(mapStateToProps)(withStyles(styles)(WithLoading(HoldupContainer)));