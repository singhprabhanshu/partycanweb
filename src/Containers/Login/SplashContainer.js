import { Button } from '@material-ui/core';
import React, { useState }  from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import {map} from 'lodash';
import { CarouselProvider, Slider, Slide, ButtonNext, Image, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import genericGetData from '../../Redux/Actions/genericGetData';
import {Container, Row, Col} from 'reactstrap'
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import IntroSlider from "react-intro-slider";
const styles = theme => ({
   
});

class SplashContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageData: [],
            sliderIsOpen: true,
            
        }
    }

     handleClose = () => { 
            this.setState({sliderIsOpen: false});
    };

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
        let imageData = [];
        data.filter((data,index) => {
            imageData.push(this.mapImageData(data));
        })
        this.setState({ imageData : imageData});
    }
    mapImageData = (data) => ({
        title: 'PARTY CAN',
        description: data.text,       
        image: data.imageurl,
        link: data.link
    })
    splashBannerFetchError = (data) => {

    }

    render() {      
   
        const { classes } = this.props;
        let renderImage = this.state.imageData.map((data, index)=> {
            return ( <Slide key={index} index= {index}>
                  <Container className="d-flex"  fluid={true}>
                    <Row>
                        <Col>
                            <Image src={data.imageurl}></Image> <br/>
                            <h4>{data.text}</h4>
                        </Col>
                    </Row>
                </Container>
            </Slide>)
        });

        return ( 
            <React.Fragment>
            <Container fluid={true}  className="WhiteCurveBg">
                     <CssBaseline />
                <Container className="container-content d-flex flex-column justify-content-center">
                <Row className="flex-grow-1">
                      <Col className="text-center d-flex justify-content-center align-items-center position-relative" >
                      <IntroSlider
                        sliderIsOpen={this.state.sliderIsOpen}
                        slides={this.state.imageData}
                        size="fullscreen"
                        skipButton
                        handleClose={this.handleClose}
                        slideStyle={{ borderRadius: "10px" }}
                        sliderStyle={{ borderRadius: "10px" }}
                        />
                    </Col>
                    </Row>  
                    </Container>
                </Container>
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