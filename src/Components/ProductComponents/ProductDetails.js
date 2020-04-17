import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';

import ClearOutlined from '@material-ui/icons/ClearOutlined';
import AddOutlined from '@material-ui/icons/AddOutlined'
import ExpandMoreOutlined from '@material-ui/icons/ExpandMoreOutlined'
import PlaceOutlined from '@material-ui/icons/PlaceOutlined'
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { map as _map, findIndex as _findIndex, get as _get, isEmpty as _isEmpty } from 'lodash';
import genericGetData from "../../Redux/Actions/genericGetData";
import genericPostData from "../../Redux/Actions/genericPostData";
import ShoppingBasketOutlined from "@material-ui/icons/ShoppingBasketOutlined";
import Scrollbar from "react-scrollbars-custom";
import {Container, Row, Col} from 'reactstrap'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import StarRatingComponent from 'react-star-rating-component';
import { ListGroup, ListGroupItem } from 'reactstrap';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ProductTabs from './ProductTabs';
import {
    FacebookIcon,
  } from "react-share";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {isMobile, isTablet} from 'react-device-detect';
import { Loader } from '../../Global/UIComponents/LoaderHoc';
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },

});

class ProductDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultQuantity: 1,
            productPrice: "",
            showReviews: false,
            slideIndex: 0,
            isLoading: true
        }
    }

    componentDidMount() {
        const productID = this.props.match.params.productID;
        genericGetData({
            dispatch:this.props.dispatch,
            url:`/index.php/connect/index/product?prodid=${productID}`,
            constants:{
            init:"PRODUCT_DETAILS_LIST_INIT",
            success:"PRODUCT_DETAILS_LIST_SUCCESS",
            error:"PRODUCT_DETAILS_LIST_ERROR" 
            },
            identifier:"PRODUCT_DETAILS_LIST",
            successCb:this.productDetailsFetchSuccess,
            errorCb:this.productDetailsFetchError
        })
        const categoryType = this.props.match.params.categoryType;
        
        let index = _findIndex(this.props.categoriesList, { 'category_name': categoryType })
        if(index == -1){
            index=0
        }
        this.setState({ tabValue: index})
    }

    productDetailsFetchSuccess = (data) => {

        this.setState({ isLoading: false })
    }

    handleTabChange = (index) => {
        this.setState({ tabValue: index });
        let categoryName = _get(this.props, `categoriesList[${index}].category_name`, null)
        this.props.history.push(`/category/${categoryName}`)
    };

    handleQuantity = (value) => {
        let quantity = this.state.defaultQuantity;
        if (value == "add") {
            quantity += 1
        }
        else if (value == "less" && this.state.defaultQuantity > 1) {
            quantity -= 1
        }
        let productPrice = (quantity * this.props.productDetailsData.price).toFixed(2)
        this.setState({ defaultQuantity: quantity, productPrice })

    }

    handleReviews = () => {
        this.setState({ showReviews : !this.state.showReviews })
    }

    handleAddToCart = () => {
        let reqObj = {
            product_id: this.props.match.params.productID,
            qty: this.state.defaultQuantity,
            api_token: localStorage.getItem("Token")
        };
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: reqObj,
            url: `api/cart/addtocart`,
            constants: {
                init: "ADD_TO_CART_INIT",
                success: "ADD_TO_CART_SUCCESS",
                error: "ADD_TO_CART_ERROR"
            },
            identifier: "ADD_TO_CART",
            successCb: this.addToCartSuccess,
            errorCb: this.addToCartFailure,
            dontShowMessage:true
        })
    }

    fetchCartAgain = (data) => {
        let reqObj = {
            "api_token": localStorage.getItem("Token")
        };
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: "/api/cart/showcart",
            constants: {
                init: "CART_ITEMS_INIT",
                success: "CART_ITEMS_SUCCESS",
                error: "CART_ITEMS_ERROR"
            },
            identifier: "CART_ITEMS",
            successCb: ()=>console.log("added succesfully"),
            errorCb: this.cartFetchError,
            successText:"Item added to cart succesfully"
        })
    }

    addToCartSuccess = () => {
        this.fetchCartAgain();
        //this.props.history.push('/cart')
    }

    addToCartFailure = () => {
    }

    handleIndicator = (event) => {
        this.setState({ slideIndex :  event});
    }

    handleBackAction = () => {
        let categoryName = _get(this.props, `categoriesList[${this.state.tabValue}].category_name`, null)
        this.props.history.push(`/category/${categoryName}`)
    }

    renderContent = (averageRating, reviewsList, productDetailsData, Ingredients) => {
        let commonContent = <>
        <div className="pr-lg-4" >                
        <Row  className="mb-5 flex-column flex-md-row justify-content-md-between no-gutters" >
            <Col className="prostarRatings order-md-2 ">
                <div className="reviewsBox d-flex align-items-center mb-3">
                    <StarRatingComponent value={averageRating} starCount={5} editing={false} />
                    <span style={{fontSize:'1.2rem'}} >{this.props.productDetailsData.review_count}</span>
                    {!this.state.showReviews ? <ExpandMoreOutlined style={{ cursor: "pointer" }} onClick={()=>this.handleReviews()}  /> : <ClearOutlined style={{ cursor: "pointer" }} onClick={()=>this.handleReviews()} />}
                </div>
                {this.state.showReviews ? 
                 <Scrollbar  style={{maxHeight:150, overflowY:'auto'}}>
                <div className="d-flex flex-column">{reviewsList}</div>
                </Scrollbar>
                : ""}
                </Col>  
           
            <Col className="order-md-1" >                                      
                <div className="proName text-uppercase mb-4 d-flex align-items-center" >
                    <ArrowBackIcon onClick={this.handleBackAction} className="mr-4 d-none d-lg-block" style={{fontSize:'20px', color:'rgba(255, 255, 255, .6)'}} />  {_get(productDetailsData, "name", "")}
                </div>
                <div className="proDescription"  >
                    {_get(productDetailsData, "description", "")}
                </div>                                     
             </Col>
            
        </Row>
            { !_isEmpty(Ingredients) ? 
                <div className="proItems d-flex flex-column mb-4">
                    <div  className="mb-3 title-2">INGREDIENTS</div>
                    <div className="ingredientsList">
                        {Ingredients}
                    </div>
                </div>
            : ""}
        <div style={{ marginTop: "50px" }}>
            <Row>
                <Col  className="d-flex flex-column mb-5" xs={6} sm={4} xl={3}>
                    <span className="smallTitle">AMOUNT</span>
                    <div className="addQty">
                        <span><ClearOutlined onClick={() => this.handleQuantity("less")} /></span>
                        <span className="qty">{this.state.defaultQuantity}</span>
                        <span><AddOutlined style={{fontSize:"15px"}} onClick={() => this.handleQuantity("add")} /></span>
                    </div>
                </Col>
                <Col  className="d-flex  flex-column mb-4"  xs={6}  sm={4} xl={3}>
                    <span className="smallTitle">FROM</span>
                    <span className="finalProprice">${!_isEmpty(this.state.productPrice) ? this.state.productPrice : _get(productDetailsData, "price", "")}</span>
                </Col>
                <Col  className="d-flex  flex-column"  xs={12} sm={4} xl={3}>
                    <span className="smallTitle">DELIVERED COLD IN - 1 HR</span>
                    <div className="snowFlakes">
                        <span></span> 
                        <span></span> 
                        <span></span> 
                        <span></span>
                     </div> 
                </Col>
            </Row>
            
        </div>
        <div className="d-flex flex-wrap justify-content-between justify-content-md-start flex-md-row" style={{ marginTop: "50px" }}>                                                                 
                <Button variant="contained"  style={{ color:'#0032A0'}}  className="bottomActionbutton autoWidthbtn col-4 col-md-auto order-2 order-md-1 bg-white" type="submit">
                <span className="icons shareIcons d-inline-block mr-2"></span>SHARE
                 </Button>                    
                <Button onClick={()=>this.handleAddToCart()} variant="contained"  className="bottomActionbutton order-1 col-12 col-md-auto order-md-2 cartActionBtn mx-md-4" type="submit">
                   <span className="icons cartIcons d-inline-block mr-2"></span>ADD TO CART
                </Button>                    
                <Button style={{ backgroundColor: 'rgba(255, 255, 255, .3)'}} variant="contained"  className="bottomActionbutton order-3 col-7 col-md-auto order-md-3 autoWidthbtn transiBtn" type="submit">
                <span className="icons locationIcons d-inline-block mr-2"></span>FIND IN STORES
                </Button>
        </div>
        </div>
        </>
        if(isMobile || isTablet){
            return <div>{commonContent}</div>
        }
        else{
        return <Scrollbar  className="leftSecmaxHeight">{commonContent}</Scrollbar>
        }
    }

    render() {
        const { isLoading } = this.state;
        console.log("product details", this.props.productDetailsData)
        let Ingredients = []
        const { productDetailsData } = this.props;
        !_isEmpty(productDetailsData.ingredients) && productDetailsData.ingredients.map((ingredient, index) => {
            Ingredients.push(
                <Card>
                    <CardImg src={ingredient.image} alt="Card image cap" />
                    <CardBody>
                        <CardTitle className="ingredientLabel">{ingredient.title}</CardTitle>
                    </CardBody>
                </Card>
            )
        })
        let totalRating = 0;
        !_isEmpty(productDetailsData.reviews) && productDetailsData.reviews.map((review, index) => {
            totalRating += Number(review.rating)
        })
        let averageRating = totalRating / (_get(this.props, 'productDetailsData.reviews.length', 0))
        let reviewsList = []
        !_isEmpty(productDetailsData.reviews) && productDetailsData.reviews.map((review, index) => {
            reviewsList.push(
                <div className="d-flex flex-column pb-4 listedRating">
                    <span className="d-flex"><StarRatingComponent value={Number(review.rating)} starCount={5} editing={false} /></span>
                    <span className="title">{review.title}</span>
                    <span className="reviewContent pb-2">{review.detail}</span>
                    <span className="ReviewedBy ">- {review.nickname}</span>
                </div>
            )
        })
        let productImages = [];
        !_isEmpty(productDetailsData.images) && productDetailsData.images.map((image, index) => {
            productImages.push(
                <div className=" d-flex justify-content-between flex-column align-items-center h-100 ">
                <img src={image} className="img-responsive" />
                </div>
            )
        })
        return (
            
            <React.Fragment>
            <Container fluid={true} className="productDetails"> 
                <ProductTabs
                tabValue={this.state.tabValue}
                handleTabChange={(index, selectedTab)=>this.handleTabChange(index, selectedTab)}
                />       
                {isLoading ? <Loader /> :       
            <Row className="no-gutters justify-content-lg-between secMinHeight">
                <Col xs={12} lg={5} className="order-1 order-lg-2">
                    <div className="productImgSection proDetailSec">
                    <Carousel  showStatus={false} >
                        {productImages}
                    </Carousel> 
                    </div>
                </Col>

                <Col xs={12} lg={7} className="p-xl-5 p-4 order-2  d-flex order-lg-1 ">
                    {this.renderContent(averageRating, reviewsList, productDetailsData, Ingredients)}                  
                </Col>                        
                </Row>}
                </Container>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    let productDetailsData = _get(state, 'productDetails.lookUpData');
    let categoriesList = _get(state,'categoriesList.lookUpData.data');
    return { productDetailsData, categoriesList }
}
export default connect(mapStateToProps)(withStyles(styles)(ProductDetails));