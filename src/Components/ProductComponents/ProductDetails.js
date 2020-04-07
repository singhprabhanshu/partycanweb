import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import KeyboardBackspaceOutlined from '@material-ui/icons/KeyboardBackspaceOutlined';
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
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import StarRatingComponent from 'react-star-rating-component';
import { ListGroup, ListGroupItem } from 'reactstrap';

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

class ProductsListing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultQuantity: 1,
            productPrice: _get(this.props, "productDetailsData.price", 0),
            showReviews: false
        }
    }

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
            product_id: this.props.ProductID,
            qty: this.state.defaultQuantity
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
    }

    addToCartFailure = () => {
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
                        <CardTitle className=" text-white text-uppercase">{ingredient.title}</CardTitle>
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
        return (
            <React.Fragment>
                <CssBaseline />
                <Grid container>
                    <Grid container item xs={8}>
                        <div style={{ padding: "35px", marginLeft: "50px" }}>
                            <Grid container spacing={1}>
                                <Grid container item xs={8}>
                                    <KeyboardBackspaceOutlined />  {productDetailsData.name}
                                    <div style={{ marginTop: "25px" }}>
                                        {productDetailsData.description}
                                    </div>
                                </Grid>
                                <Grid container item xs={4}>
                                    <StarRatingComponent value={averageRating} starCount={5} editing={false} />
                                    <span>{this.props.productDetailsData.review_count}</span>
                                    <ExpandMoreOutlined onClick={()=>this.handleReviews()} />
                                    {this.state.showReviews ? 
                                    <div className="d-flex flex-column">{reviewsList}</div>
                                     : ""}
                                </Grid>
                                

                            </Grid>
                            <div style={{ marginTop: "25px" }}>
                                <span>INGREDIENTS</span>
                                <div className="ingredientsList">
                                    {Ingredients}
                                </div>
                            </div>
                            <div style={{ marginTop: "50px" }}>
                                <Grid container>
                                    <Grid container item xs={4}>
                                        <span style={{ marginRight: "400px" }}>AMOUNT</span>
                                        <ClearOutlined onClick={() => this.handleQuantity("less")} />
                                        <span>{this.state.defaultQuantity}</span>
                                        <AddOutlined onClick={() => this.handleQuantity("add")} />
                                    </Grid>
                                    <Grid container item xs={4}>
                                        <span style={{ marginRight: "400px" }}>FROM</span>
                                        <span>${this.state.productPrice}</span>
                                    </Grid>
                                    <Grid container item xs={4}>
                                        <span>DELIVERED COLD IN - 1 HR</span>
                                    </Grid>
                                </Grid>
                            </div>
                            <div style={{ marginTop: "50px" }}>
                                <Grid container>
                                    <Grid container item xs={4}>
                                        <Button style={{ backgroundColor: '#00BFB2', height: 50, width: 250, borderRadius: 27, fontSize: 15 }}> SHARE</Button>
                                    </Grid>
                                    <Grid container item xs={4}>
                                        <Button onClick={()=>this.handleAddToCart()} style={{ backgroundColor: '#00BFB2', height: 50, width: 250, borderRadius: 27, fontSize: 15 }}><ShoppingBasketOutlined /> ADD TO CART</Button>
                                    </Grid>
                                    <Grid container item xs={4}>
                                        <Button style={{ backgroundColor: '#00BFB2', height: 50, width: 250, borderRadius: 27, fontSize: 15 }}><PlaceOutlined /> FIND IN STORES</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                    <Grid container item xs={4}>
                        <img src={_get(productDetailsData, 'images[0]', "")} alt="Smiley face" height="522" width="202" />
                    </Grid>
                </Grid>


            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    let productDetailsData = _get(state, 'productDetails.lookUpData');
    return { productDetailsData }
}
export default connect(mapStateToProps)(withStyles(styles)(ProductsListing));