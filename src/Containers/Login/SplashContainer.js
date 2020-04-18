import { Button } from '@material-ui/core';
import React, { useState }  from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import {map, set} from 'lodash';
import genericGetData from '../../Redux/Actions/genericGetData';
import {Container, Row, Col} from 'reactstrap'
import slide1 from '../../assets/images/HOMEPAGE1.png'
import slide2 from '../../assets/images/HOMEPAGE2.png'
import slide3 from '../../assets/images/HOMEPAGE3.png'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactDOM from "react-dom";

const styles = theme => ({
   
});


  

class SplashContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageData: [],
            slideIndex: 0
        }
    }

    componentDidMount() {
        genericGetData({
            dispatch:this.props.dispatch,
            url:"index.php/connect/index/banners",
            constants:{
            init:"SPLASH_BANNER_INIT",
            success:"SPLASH_BANNER_SUCCESS",
            error:"SPLASH_BANNER_ERROR" 
            },
            identifier:"SPLASH_BANNER",
            successCb:this.splashBannerSuccess,
            errorCb:this.splashBannerFetchError,
            dontShowMessage: true
        });
    }

    splashBannerSuccess= (data) => {
        this.setState({ imageData : data});
    }
    splashBannerFetchError = (data) => {

    }
    handleSlideChange = () => {
        this.setState({ slideIndex :  this.state.slideIndex + 1});
    }
    redirectToNext = () => {
        this.props.history.push('/home');
    }
    handleIndicator = (event) => {
        this.setState({ slideIndex :  event});
    }

    render() {
        const { classes } = this.props;

        let renderSlide = this.state.imageData.map((subdata) => {
            return(<React.Fragment>
                <div className=" d-flex justify-content-between flex-column align-items-center h-100 ">
                  <img src={subdata.imageurl} className="img-responsive" />
                    <p className="legend">{subdata.text}</p>
                </div>
            </React.Fragment>)
        })
        return ( 
            <React.Fragment>
            {this.state.imageData.length > 0 && <Container fluid={true}  className="WhiteCurveBg">
                     <CssBaseline />
                <Container className="container-content d-flex flex-column justify-content-center">
                <Row className="flex-grow-1">
                      <Col className="text-center d-flex justify-content-center IntroSlider  align-items-center position-relative" >
                        <Carousel showThumbs={false} dynamicHeight={false} showStatus={false} showArrows={false}
                            selectedItem= {this.state.slideIndex} onChange={this.handleIndicator}
                            >
                                {renderSlide}
                            {/* <div className=" d-flex justify-content-between flex-column align-items-center h-100 ">
                            <img src={slide1} className="img-responsive" />
                                <p className="legend">MADE WITH 100% BLUE WEBER AGAVE TEQUILA, COMBIER LIQUEUR D'ORANGE TRIPLE SEC, AND FRESH LIME JUICE. 
                                    THE PARTY CAN BRING CRAFT COCKTAIL GOODNESS TO YOUR GLASS IN SECONDS!</p>
                            </div>
                            <div className=" d-flex justify-content-between  flex-column align-items-center h-100">
                            <img src={slide2} className="img-responsive" />
                                <p className="legend">Legend 2</p>
                            </div>
                            <div className=" d-flex justify-content-between flex-column align-items-center h-100">
                            <img src={slide3} className="img-responsive" />
                                <p className="legend">Legend 3</p>
                            </div> */}
                        </Carousel>  
                    </Col>
                    </Row>  
                    </Container>
                </Container>}
                {this.state.imageData.length > 0 && <Container className="container-custom">
                    <Row>
                        <Col className="text-center" style={{height:70}} >
                            <Button variant="text" color="secondary" className="txtButton" 
                                onClick={this.state.slideIndex == 2 ? this.redirectToNext: this.handleSlideChange}>
                                         {this.state.slideIndex == 2 ? ' COOL !!' : 'NEXT' }
                            </Button>
                        </Col>                        
                    </Row>
                        </Container>}       
         </React.Fragment>
        );
    }
}

SplashContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
return {}
}
export default connect(mapStateToProps)(withStyles(styles)(SplashContainer));