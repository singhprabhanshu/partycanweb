import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
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
import { Container, Row, Col } from 'reactstrap'
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
// import { Carousel } from 'react-responsive-carousel';
import { isMobile, isTablet } from 'react-device-detect';
import { Loader } from '../../Global/UIComponents/LoaderHoc';
// import AliceCarousel from 'react-alice-carousel'
// import 'react-alice-carousel/lib/alice-carousel.css'
import proImg from '../../assets/images/party-can-product.png'
import Carousel from 'react-multi-carousel';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-multi-carousel/lib/styles.css';
import {commonActionCreater} from "../../Redux/Actions/commonAction";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";

// google analytics
import { ProductView, PageView, ProductAddedtoCart } from '../../Global/helper/react-ga';
import { cleanEntityData } from '../../Global/helper/commonUtil';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11f issue.
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
            isLoading: true,
            // responsive: {
            //     0: { items: 3 },

            // }
            responsive: {
                superLargeDesktop: {
                  // the naming can be any, depends on you.
                  breakpoint: { max: 4000, min: 1200 },
                  items: 5
                },
                desktop: {
                  breakpoint: { max: 1199, min: 768 },
                  items: 4
                },
                tablet: {
                  breakpoint: { max: 767, min: 464 },
                  items: 3,
                  slidesToSlide: 3
                },
                mobile: {
                  breakpoint: { max: 575, min: 320 },
                  items: 2,
                  slidesToSlide: 2
                }
            },
            pdpImageResponsive: {
                superLargeDesktop: {
                    // the naming can be any, depends on you.
                    breakpoint: { max: 4000, min: 1200 },
                    items: 1,
                    // slidesToSlide: 1
                  },
                  desktop: {
                    breakpoint: { max: 1199, min: 768 },
                    items: 1,
                    // slidesToSlide: 1
                  },
                  tablet: {
                    breakpoint: { max: 767, min: 464 },
                    items: 1,
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
        const productID = this.props.match.params.productID;
        genericGetData({
            dispatch: this.props.dispatch,
            url: `/connect/index/product?prodid=${productID}&store_id=1`,
            constants: {
                init: "PRODUCT_DETAILS_LIST_INIT",
                success: "PRODUCT_DETAILS_LIST_SUCCESS",
                error: "PRODUCT_DETAILS_LIST_ERROR"
            },
            identifier: "PRODUCT_DETAILS_LIST",
            successCb: this.productDetailsFetchSuccess,
            errorCb: this.productDetailsFetchError,
            dontShowMessage: true
        })
        const categoryType = this.props.match.params.categoryType;

        let index = _findIndex(this.props.categoriesList, { 'category_name': categoryType })
        if (index == -1) {
            index = 0
        }
        this.setState({ tabValue: index })
        this.FooterAddButtonFunction()
    }

    FooterAddButtonFunction = () => {
        let data = {
            product_id: this.props.match.params.productID,
            qty: this.state.defaultQuantity,
            api_token: localStorage.getItem("Token"),
            cart_id:localStorage.getItem("cart_id")
        };
        this.props.dispatch(commonActionCreater(data, "PRODUCT_DETAILS_FOOTER"));
    }

    productDetailsFetchSuccess = (data) => {
        const productId = this.props.match.params.productID;
        const payload = cleanEntityData({
            productId,
            name: _get(data, 'name'),
            price:  _get(data, 'price') ? Number( _get(data, 'price')) : undefined
        })
        ProductView(payload);

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
        this.setState({ defaultQuantity: quantity, productPrice }, ()=>{
            let data = {
                product_id: this.props.match.params.productID,
                qty: this.state.defaultQuantity,
                api_token: localStorage.getItem("Token"),
                cart_id:localStorage.getItem("cart_id")
            };
            this.props.dispatch(commonActionCreater(data, "PRODUCT_DETAILS_FOOTER"));
        })

    }

    handleReviews = (reviewsList) => {
        if(!_isEmpty(reviewsList)){
        this.setState({ showReviews: !this.state.showReviews })
        }
    }

    handleAddToCart = () => {
        let reqObj = {
            product_id: this.props.match.params.productID,
            qty: this.state.defaultQuantity,
            api_token: localStorage.getItem("Token"),
            cart_id:localStorage.getItem("cart_id")
        };
        this.setState({addToCartLoading:true});
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
            dontShowMessage: true,
        })
    }

    thumbItem = (item, i) => (
        <span key={item} onClick={() => this.Carousel.slideTo(i)}>
            *{' '}
        </span>
    )

    addToCartSuccess = (data) => {
        if(data[0].code==1){
            this.setState({addToCartLoading:false})
            localStorage.setItem("cart_id",data[0].cart_id);
            // checking guest login
            if (_isEmpty(_get(this.props.userSignInInfo, '[0].result.api_token', ''))){
                this.props.history.push('/guest/register')
    
            } else {
                this.props.history.push('/cart')
            };
        }
        else{
            this.setState({addToCartLoading:false})
            alert(data[0].message);
        }
        
    }

    addToCartFailure = () => {
        this.setState({addToCartLoading:false})
    }

    handleIndicator = (event) => {
        this.setState({ slideIndex: event });
    }

    handleBackAction = () => {
        let categoryName = _get(this.props, `categoriesList[${this.state.tabValue}].category_name`, null)
        this.props.history.push(`/category/${categoryName}`)
    }

    reactGAAddToCartEvent = () => {
        const p = this.props.productDetailsData;
        const productId = this.props.match.params.productID;
        const payload = cleanEntityData({
            productId,
            name: _get(p, 'name'),
            price: _get(p, 'price') ? Number(_get(p, 'price')) : undefined,
            quantity: this.state.defaultQuantity,
        });
        ProductAddedtoCart(payload);
    };

    renderContent = (averageRating, reviewsList, productDetailsData, Ingredients, descriptionContent) => {
        let commonContent = <>
            <div className="scrollerwrapper" >
                <Row className="mb-5 flex-column flex-md-row justify-content-md-between no-gutters" >
                    <Col xs={'auto'} className="prostarRatings order-md-2 ">
                        <div className="reviewsBox d-flex align-items-center mb-3">
                            <StarRatingComponent value={averageRating} starCount={5} editing={false} />
                            <span style={{ fontSize: '1.2rem' }} >{this.props.productDetailsData.review_count}</span>
                            {!this.state.showReviews ? <ExpandMoreOutlined style={{ cursor: "pointer" }} onClick={() => this.handleReviews(reviewsList)} /> : <ClearOutlined style={{ cursor: "pointer" }} onClick={() => this.handleReviews(reviewsList)} />}
                        </div>
                        {this.state.showReviews ?
                            <Scrollbar className="productReviewHolder">
                                <div className="d-flex flex-column">{reviewsList}</div>
                            </Scrollbar>
                            : ""}
                    </Col>

                    <Col  className="order-md-1" >
                        <div className="proName text-uppercase mb-4 d-flex align-items-center" >
                            <ArrowBackIcon onClick={this.handleBackAction} className="mr-4 d-none d-lg-block" style={{ fontSize: '20px', color: 'rgba(255, 255, 255, .6)' }} />  {_get(productDetailsData, "name", "")}
                        </div>                       
                    </Col>

                </Row>

               
                    <Row>
                        <Col className="d-flex flex-column mb-5" xs={5} sm={4} xl={3}>
                            <span className="smallTitle">AMOUNT</span>
                            <div className="addQty">
                                <span onClick={() => this.handleQuantity("less")} ><RemoveOutlinedIcon  /></span>
                                <span className="qty">{this.state.defaultQuantity}</span>
                                <span onClick={() => this.handleQuantity("add")} ><AddOutlined style={{ fontSize: "15px" }} /></span>
                            </div>
                        </Col>
                        <Col className="d-flex  flex-column mb-4" xs={7} sm={4} xl={4}>
                            <span className="smallTitle">FROM</span>
                            <span className="finalProprice">${!_isEmpty(this.state.productPrice) ? this.state.productPrice : _get(productDetailsData, "price", "")}</span>
                        </Col>
                        {/* <Col className="d-flex  flex-column" xs={12} sm={4} xl={4}>
                            <span className="smallTitle">DELIVERED COLD IN - 1 HR</span>
                            <div className="snowFlakes">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Col> */}
                    </Row>
               

                <div className="d-flex flex-wrap justify-content-between justify-content-md-start flex-md-row mt-3" >
                    {/* <Button variant="contained" style={{ color: '#0032A0' }} className="bottomActionbutton autoWidthbtn col-4 col-md-auto order-2 order-md-1 bg-white" type="submit">
                        <span className="icons shareIcons d-inline-block mr-2"></span>SHARE
                 </Button> */}
                    <Button onClick={() => {this.handleAddToCart(); this.reactGAAddToCartEvent()}} variant="contained" className="bottomActionbutton order-1 col-12 col-md-auto order-md-2 cartActionBtn" type="submit">
                        {this.state.addToCartLoading?<CircularProgress/> :<> <span className="icons cartIcons d-inline-block mr-2"></span>ADD TO CART</>}
                </Button>
                    {/* <Button style={{ backgroundColor: 'rgba(255, 255, 255, .3)' }} variant="contained" className="bottomActionbutton order-3 col-7 col-md-auto order-md-3 autoWidthbtn transiBtn" type="submit">
                        <span className="icons locationIcons d-inline-block mr-2"></span>FIND IN STORES
                </Button> */}
                </div>
                
                <div className="proDescription pt-5 mt-5"  >
                           <ul>{descriptionContent}</ul> 
                </div>

                {!_isEmpty(Ingredients) ?
                    <div className="proItems d-flex flex-column mb-md-4 pt-5 mt-5 mb-8" >
                        <div className="mb-3 title-2">CONTAINS</div>

                        <div>
                            {/* <Carousel responsive={this.state.responsive} showDots={true} itemClass="px-4"> */}
                           <ul className="contains-sec">{Ingredients}</ul>    
                            {/* </Carousel> */}
                    {/* <AliceCarousel mouseTrackingEnabled
                                items={Ingredients}
                                responsive={this.state.responsive}
                                buttonsDisabled={false}
                                dotsDisabled={true}
                                infinite={false}
                            /> */}
                        </div>


                    </div>
                    : ""}
               
               
            </div>
        </>
         return <div className="flex-grow-1">{commonContent}</div>
        // if (isMobile || isTablet) {
        //     return <div style={{overflow:'hidden'}}>{commonContent}</div>
        // }
        // else {
        //     return <Scrollbar className="leftSecmaxHeight">{commonContent}</Scrollbar>
        // }
    }

    render() {
        const { isLoading } = this.state;
        console.log("product details", this.props.productDetailsData)
        let Ingredients = []
        const { productDetailsData } = this.props;
        Ingredients = !_isEmpty(productDetailsData.ingredients) && productDetailsData.ingredients.map((ingredient, index) =>          
              
                <li className="ingredientLabel">{ingredient.title}</li>
           )
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

        let decriptionArray = [];
        let descriptionSplit = _get(productDetailsData, "description", "").split('\r\n');
        !_isEmpty(descriptionSplit) && descriptionSplit.map((review, index) => { 
            if(review !== null && review !== undefined && review !== "") {
                decriptionArray.push(review);
            }
        })

        let descriptionContent = decriptionArray.map((data, index) => (<React.Fragment>            
                <li>{data}</li>          
        </React.Fragment>));
        
        const pdpImages = _map(_get(this.props, 'productDetailsData.images', []), s => cleanEntityData({
            
            original: s,
            thumbnail: s
        }));
        
        return (

            <React.Fragment>
                <Container fluid={true} className="productDetails">
                    <ProductTabs
                        {...this.props}
                        tabValue={this.state.tabValue}
                        handleTabChange={(index, selectedTab) => this.handleTabChange(index, selectedTab)}
                    />
                
                    {isLoading ? <Loader /> :
                        <Row className="no-gutters justify-content-lg-between secMinHeight">
                            <Col xs={12} lg={5} className="order-1 order-lg-2">
                                {/* <div className="productImgSection proDetailSec"> */}
                                    {/* <Carousel  showStatus={false} >
                        {productImages}
                    </Carousel>  */}
                                    {/* <img src={_get(this.props, "productDetailsData.images[0]", "")} className="imgProduct"></img> */}
                                    {/* <Carousel
                                    responsive={this.state.pdpImageResponsive}  
                                    showDots={true} >
                                        {pdpImages}
                                    </Carousel> */}
                                {/* </div> */}
                                {/* <Carousel
                                    responsive={this.state.pdpImageResponsive}  
                                    showDots={true} >
                                        {pdpImages}
                                </Carousel> */}

                                <ImageGallery items={pdpImages} thumbnailPosition="left"  showNav ={true} 
                                                    showFullscreenButton = {false} 
                                                    showPlayButton = {false}/>
                            </Col>

                            <Col xs={12} lg={7} className="p-xl-5 p-md-4 py-4 order-2  d-flex order-lg-1 ">
                                {this.renderContent(averageRating, reviewsList, productDetailsData, Ingredients, descriptionContent)}
                            </Col>
                        </Row>}
                </Container>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    let productDetailsData = _get(state, 'productDetails.lookUpData');
    let categoriesList = _get(state, 'categoriesList.lookUpData.data');
    let userSignInInfo = _get(state, 'userSignInInfo.lookUpData', []);
    return { productDetailsData, categoriesList, userSignInInfo }
}
export default connect(mapStateToProps)(withStyles(styles)(ProductDetails));