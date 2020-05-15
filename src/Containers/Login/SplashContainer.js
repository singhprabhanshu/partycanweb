import { Button } from '@material-ui/core';
import React, { useState }  from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import {map, set} from 'lodash';
import genericGetData from '../../Redux/Actions/genericGetData';
import {Container, Row, Col} from 'reactstrap'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactDOM from "react-dom";
import { Loader } from '../../Global/UIComponents/LoaderHoc';
import { isMobile, isTablet } from 'react-device-detect';

const styles = theme => ({   
});

class SplashContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageData: [],
            slideIndex: 0,
            isLoading : false
        }
    }

    componentDidMount() {
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
        this.setState({ imageData : isMobile ? data[1] : data[0], isLoading: false});
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

        let renderSlide = this.state.imageData.map((subdata,index) => {
            return(<React.Fragment key={index}>
                <div className={isMobile ? "d-flex justify-content-center flex-column align-items-center h-100" 
                : " d-flex justify-content-center align-items-center h-100 "}>
                  <img src={subdata.imageurl}  className="img-responsive d-none d-md-block"  />
                  <img src={subdata.imageurl}  className="img-responsive d-block d-md-none"  />
                    <p className="legend">{subdata.text}</p>
                </div>
            </React.Fragment>)
        })

        return ( 
            <React.Fragment>
             {this.state.isLoading && <Loader /> }
            {this.state.imageData.length > 0 && <div className="WhiteCurveBg">
                     <CssBaseline />
                <Container className="d-flex flex-column justify-content-center">
                <Row className="flex-grow-1">
                      <Col className="text-center d-flex justify-content-center IntroSlider  align-items-center position-relative" >
                        <Carousel showThumbs={false} dynamicHeight={false} showStatus={false} showArrows={false}
                            selectedItem= {this.state.slideIndex} onChange={this.handleIndicator}
                            >
                                {this.state.imageData.length > 0 && renderSlide}
                                {/* {isMobile && this.state.imageData.length > 0 &&renderMobileSlide} */}
                            {/* <div className=" d-flex justify-content-between flex-column align-items-center h-100 ">
                            <img src={slide1} className="img-responsive d-none d-lg-block"  />
                            <img src={slide2} className="img-responsive d-block d-lg-none" />
                                <p className="legend">THE PARTY CAN BRING CRAFT COCKTAIL GOODNESS TO YOUR GLASS IN SECONDS!</p>
                            </div>
                            */}
                           
                        </Carousel>  
                    </Col>
                    </Row>  
                    </Container>
                </div>}
                {this.state.imageData.length > 0 && <Container className="container-custom">
                    <Row>
                        <Col className="text-center" style={{height:70}} >
                            <Button variant="text" color="secondary" className="txtButton" 
                                onClick={this.state.slideIndex == 2 ? this.redirectToNext: this.handleSlideChange}>
                                         {this.state.slideIndex == 2 ? ' SHOP NOW !!' : 'NEXT' }
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