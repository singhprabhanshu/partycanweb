import { Button } from '@material-ui/core';
import React, { useState }  from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import {map, set} from 'lodash';
import genericGetData from '../../Redux/Actions/genericGetData';
import {Container, Row, Col} from 'reactstrap'
import ReactDOM from "react-dom";
import { Loader } from '../../Global/UIComponents/LoaderHoc';
import { isMobile, isTablet } from 'react-device-detect';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from '../../assets/images/HU_FANSIDED-LOGO.png';
import img2 from '../../assets/images/HU_POPSUGAR-LOGO.png';
import img3 from '../../assets/images/HU_THRILLIST-LOGO.png';
import img4 from '../../assets/images/HU_SOCIAL-1.png';
import img5 from '../../assets/images/HU_SOCIAL-2.png';
import img6 from '../../assets/images/HU_SOCIAL-3.png';
import img7 from '../../assets/images/HU_SOCIAL-4.png';
import img8 from '../../assets/images/HU_AGAVE-ICON.png';
import img9 from '../../assets/images/HU_LIME-ICON.png';
import img10 from '../../assets/images/HU_TRIPLE-SPICE-ICON.png';


const styles = theme => ({   
});

class SplashContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileImageData: [],
            deskTopImageData: [],
            slideIndex: 0,
            isLoading : false,
        
        responsive1: {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 1200 },
              items: 4
            },
            desktop: {
              breakpoint: { max: 1199, min: 768 },
              items: 3,
              slidesToSlide: 1
            },
            tablet: {
              breakpoint: { max: 767, min: 576 },
              items: 2,
              slidesToSlide: 1
              
            },
            mobile: {
              breakpoint: { max: 575, min: 320 },
              items: 2,
              slidesToSlide: 1
            }
          },

          responsive2: {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 1200 },
              items: 3
            },
            desktop: {
              breakpoint: { max: 1199, min: 768 },
              items: 3,
              slidesToSlide: 1
            },
            tablet: {
              breakpoint: { max: 767, min: 576 },
              items: 2,
              slidesToSlide: 1
              
            },
            mobile: {
              breakpoint: { max: 575, min: 320 },
              items: 1,
              slidesToSlide: 1
            }
          }
        
    }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState({ isLoading: true});
        genericGetData({
            dispatch:this.props.dispatch,
            url:"/connect/index/banners?store_id=1",
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
        this.setState({ mobileImageData: data[1] , deskTopImageData : data[0], isLoading: false});
    }
    splashBannerFetchError = (data) => {
        this.setState({ isLoading: false});
    }
    handleSlideChange = () => {
        this.setState({ slideIndex :  this.state.slideIndex + 1});
    }
    redirectToNext = () => {
        this.fetchCategories();
    }

    fetchCategories = () => {

        genericGetData({
            dispatch:this.props.dispatch,
            url:"/connect/index/categorylist?store_id=1",
            constants:{
            init:"CATEGORIES_LIST_INIT",
            success:"CATEGORIES_LIST_SUCCESS",
            error:"CATEGORIES_LIST_ERROR" 
            },
            identifier:"CATEGORIES_LIST",
            successCb:this.categoriesFetchSuccess,
            errorCb:this.categoriesFetchError,
            dontShowMessage: true
        })
    }
    
    categoriesFetchSuccess = (data) => {

        this.props.history.push('/category/ALL');
     }
    
    categoriesFetchError = () => { }

    handleIndicator = (event) => {
        this.setState({ slideIndex :  event});
    }

    render() {
        const { classes } = this.props; 
        return ( 
            <React.Fragment>
             {this.state.isLoading && <Loader /> }                        
                     <CssBaseline /> 
                     <div className="IntroSlider" >
                        <Row className="landing-section-01 backgroundSlides no-gutters" >
                        <Col xs={8} xl={7} md={8} className="captionTxt textBlue">
                            12 READY-TO-DRINK COCKTAILS WITH 100% NATURAL JUICE; CONVENIENTLY IN A RESEALABLE CAN.
                            <Button variant="contained"  onClick={this.redirectToNext} color="primary" className="bottomActionbutton mt-5" type="submit">
                                    <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2 d-none d-sm-block" />ORDER NOW</Button>
                            </Col>
                        </Row>
                <Row className="landing-section-02 no-gutters flex-wrap pb-0">
                    <Col xs={12} className="tBold">HERE’S WHAT PEOPLE ARE SAYING…</Col>
                    <Col  xs={12} >
                        <Carousel responsive={this.state.responsive2} arrows={true} itemClass="px-4">
                            <div className="d-flex flex-column justify-content-center align-items-center captionTxt">
                                “Great for hanging outdoors at beaches or parks, where mixing is a pain, but where you really don’t want to ruin your tomorrow with a gas station cocktail.”
                                <img src={img1}  alt="Card image cap" className="img-fluid" />
                                
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center captionTxt">
                                    “If you or your friends are looking for a tasty craft cocktail to sip on while sun bathing, make sure to order your own Party Can before they run out.”
                                    <img src={img2}  alt="Card image cap" className="img-fluid" />
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center captionTxt">
                                “Those who are worn out from at-home bartending over the last few months will love that the Party Can involves absolutely no prep time: simply chill, shake and serve.”
                                <img src={img3}  alt="Card image cap" className="img-fluid" />                               
                            </div> 
                                             
                        </Carousel>
                        </Col> 
                </Row>
                <Row className="landing-section-03 backgroundSlides justify-content-end no-gutters">
                    <Col  xs={7} xl={7} md={8} className="captionTxt">
                        BRING THE PARTY WITH YOU, WHEREVER YOU GO, WHETHER IT’S THE BOAT, THE PATIO, OR THE POOL.
                        <Button variant="contained"  onClick={this.redirectToNext} color="primary" className="bottomActionbutton mt-5" type="submit">
                                    <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2 d-none d-sm-block" />SEND A FRIEND A CAN</Button>
                    </Col> 
                </Row>
                <Row className="landing-section-04 no-gutters flex-wrap pb-0">
                    <Col xs={12} className="mb-5">
                        <Row className="no-gutters crafted-quality">
                        <Col xs={12} className="tBold">CRAFT COCKTAIL QUALITY, CANNED.</Col>
                         <Col  xs={12} ><Carousel responsive={this.state.responsive2} arrows={true} itemClass="px-4">
                            <div className="d-flex flex-column justify-content-center align-items-center captionTxt">
                                Made with blue weber agave tequila and orange liqueur, for the perfect balance of booze and sweetness.
                                <img src={img8}  alt="Card image cap" className="img-fluid" />
                               
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center captionTxt">
                                We squeezed the limes so you don’t have to. Every can includes fresh juice!
                                <img src={img9}  alt="Card image cap" className="img-fluid" />
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center captionTxt">
                            Ginger, cinnamon, and chili pepper combine to give this margarita just the right amount of spice.
                            <img src={img10}  alt="Card image cap" className="img-fluid" />                               
                            </div>                            
                        </Carousel>
                        </Col>
                        </Row>
                    </Col>               
                
                <Col xs={12}>
                    <Col xs={12} className="tBold">SEE MORE OF PARTY CAN IN THE WILD AT OUR INSTAGRAM @DRINKPARTYCAN</Col>
                    <Carousel responsive={this.state.responsive1} arrows={true} itemClass="px-2 px-md-3">
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <img src={img4}  alt="Card image cap" className="img-fluid" />                               
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                    <img src={img5}  alt="Card image cap" className="img-fluid" />
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <img src={img6}  alt="Card image cap" className="img-fluid" />                               
                            </div>   
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <img src={img7}  alt="Card image cap" className="img-fluid" />                               
                            </div> 
                                                  
                        </Carousel>
                        </Col> 
                </Row>
                </div>
                          
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