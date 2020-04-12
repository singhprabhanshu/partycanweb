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
import {isMobile} from 'react-device-detect';
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
            productPrice: _get(this.props, "productDetailsData.price", 0),
            showReviews: false,
            slideIndex: 0
        }
    }

    componentDidMount() {
        const categoryType = this.props.match.params.categoryType;
        const productID = this.props.match.params.productID;
        let index = _findIndex(this.props.categoriesList, { 'category_name': categoryType })
        if(index == -1){
            index=0
        }
        this.setState({ tabValue: index })
    }

    handleTabChange = (index) => {
        this.setState({ tabValue: index });
        let categoryName = _get(this.props, `categoriesList[${index}].category_name`, null)
        this.props.history.push(`/category/${categoryName}`)
    };

    fetchProductDetails = (ProductID) => {

        genericGetData({
            dispatch: this.props.dispatch,
            url: `/index.php/connect/index/product?prodid=${ProductID}`,
            constants: {
                init: "PRODUCT_DETAILS_LIST_INIT",
                success: "PRODUCT_DETAILS_LIST_SUCCESS",
                error: "PRODUCT_DETAILS_LIST_ERROR"
            },
            identifier: "PRODUCT_DETAILS_LIST",
            successCb: this.productDetailsFetchSuccess,
            errorCb: this.productDetailsFetchError
        })
    }

    productDetailsFetchSuccess = () => {

    }

    productDetailsFetchError = () => {

    }

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
            errorCb: this.addToCartFailure
        })
    }

    addToCartSuccess = () => {
        this.props.history.push('/cart')
    }

    addToCartFailure = () => {
    }

    handleIndicator = (event) => {
        this.setState({ slideIndex :  event});
    }

    renderContent = (productImages, averageRating, reviewsList, productDetailsData, Ingredients) => {
        if (isMobile) {
            return <div> This content is unavailable on mobile</div>
        }
        else{
        return <Container fluid={true} className="productDetails"> 
        <ProductTabs
                tabValue={this.state.tabValue}
                handleTabChange={(index, selectedTab)=>this.handleTabChange(index, selectedTab)}
                />                
            <Row className="no-gutters justify-content-lg-between secMinHeight">
                <Col lg={5} className="order-1 order-md-2">
                    <div className="productImgSection proDetailSec">
                    <Carousel showIndicators={false} >
                        {productImages}
                    </Carousel> 
                     
                        {/* <img src={_get(productDetailsData, 'images[0]', "")} className="imgProduct img-responsive" alt="Smiley face" /> */}
                    </div>
                </Col>

                <Col lg={7} className="p-5 order-2  d-flex order-md-1 ">
                    <Scrollbar  className="leftSecmaxHeight">
                        <div className="pr-lg-4" >                
                        <Row  className="mb-5 flex-column flex-md-row justify-content-md-between no-gutters" >
                            <Col className="prostarRatings order-md-2">
                                <div className="reviewsBox d-flex align-items-center" onClick={()=>this.handleReviews()}>
                                    <StarRatingComponent value={averageRating} starCount={5} editing={false} />
                                    <span >{this.props.productDetailsData.review_count}</span>
                                    <ExpandMoreOutlined  />
                                </div>
                                {this.state.showReviews ? 
                                <div className="d-flex flex-column">{reviewsList}</div>
                                : ""}
                                </Col>  
                           
                            <Col className="order-md-1" >                                      
                                <div className="proName text-uppercase mb-4 d-flex align-items-center" >
                                    <ArrowBackIcon className="mr-4" style={{fontSize:'20px', color:'rgba(255, 255, 255, .6)'}} />  {productDetailsData.name}
                                </div>
                                <div className="proDescription"  >
                                    {productDetailsData.description}
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
                            <Grid container>
                                <Grid container direction="column" item xs={3}>
                                    <span className="smallTitle">AMOUNT</span>
                                    <div className="addQty">
                                        <span><ClearOutlined onClick={() => this.handleQuantity("less")} /></span>
                                        <span className="qty">{this.state.defaultQuantity}</span>
                                        <span><AddOutlined style={{fontSize:"15px"}} onClick={() => this.handleQuantity("add")} /></span>
                                    </div>
                                </Grid>
                                <Grid container direction="column" item xs={3}>
                                    <span className="smallTitle">FROM</span>
                                    <span className="finalProprice">${this.state.productPrice}</span>
                                </Grid>
                                <Grid container direction="column"  item xs={3}>
                                    <span className="smallTitle">DELIVERED COLD IN - 1 HR</span>
                                    <div className="snowFlakes">
                                        <span></span> 
                                        <span></span> 
                                        <span></span> 
                                        <span></span>
                                     </div> 
                                </Grid>
                            </Grid>
                            
                        </div>
                        <div className="d-flex flex-column flex-md-row" style={{ marginTop: "50px" }}>                                                                 
                                <Button variant="contained" color="#0032A0" className="bottomActionbutton autoWidthbtn  bg-white" type="submit">
                                         SHARE
                                 </Button>                    
                                <Button onClick={()=>this.handleAddToCart()} variant="contained"  className="bottomActionbutton  cartActionBtn mx-4" type="submit">
                                    ADD TO CART
                                </Button>                    
                                <Button style={{ backgroundColor: 'rgba(255, 255, 255, .3)'}} variant="contained" color="#fff" className="bottomActionbutton autoWidthbtn transiBtn" type="submit">
                                        FIND IN STORES
                                </Button>
                        </div>
                        </div>
                        </Scrollbar>                  
                </Col>                        
                </Row>
                </Container>
        }
    }

    render() {
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
                <div className="d-flex flex-column">
                <StarRatingComponent value={Number(review.rating)} starCount={5} editing={false} />
                <span>{review.title}</span>
                <span>{review.detail}</span>
                <span>~{review.nickname}</span>
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
            {this.renderContent(productImages, averageRating, reviewsList, productDetailsData, Ingredients)}
            

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