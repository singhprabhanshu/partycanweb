import React from "react";
import { connect } from "react-redux";
import CartItemsList from "../../Components/CartHomeComponents/CartItemList"
import CouponCode from "../../Components/CartHomeComponents/CouponCode";
import CartPriceSummary from "../../Components/CartHomeComponents/CartPriceSummary"
import genericPostData from "../../Redux/Actions/genericPostData";
import _get from "lodash/get";
import { Button } from 'reactstrap';
import LoaderButton from '../../Global/UIComponents/LoaderButton';
import {isMobile, isTablet} from 'react-device-detect';
import Scrollbar from "react-scrollbars-custom";
import proImg from '../../assets/images/party-can.png'
import {Container, Row, Col} from 'reactstrap'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
class CartContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
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
            successCb: this.cartFetchSuccess,
            errorCb: this.cartFetchError
        })
    };
    cartFetchSuccess = (data) => {
        let coupon_code = _get(data, "[0].coupon_code", "");
        this.setState({ coupon_code })
        console.log(data, "data")
    };
    cartFetchError = (err) => {
        console.log(err);
    };
    onChange = (e) => {
        this.setState({ coupon_code: e.target.value })
    }

    renderContent = (cardWidth,coupon_code,itemRemovedFetching,itemUpdatedFetching,cartIsFetching,discount,subTotal,grandTotal,feeAmount  ) => {
        let commonContent = <>
        <div className="cartContainer pr-lg-4">
                <div className="CartItemParent mb-3">
                    <CartItemsList
                        dispatch={this.props.dispatch}
                        width={cardWidth}
                        cartItems={this.props.cartItems} />
                </div>
                <div className="couponParent">
                    <CouponCode onChange={this.onChange} width={cardWidth} coupon_code={coupon_code} />
                </div>
                <div style={{ width: cardWidth }} className="PriceSummaryParent">
                    <CartPriceSummary 
                    cartIsFetching={(itemRemovedFetching || itemUpdatedFetching || cartIsFetching)} 
                    width={cardWidth}
                     discount={discount}
                      subTotal={subTotal} 
                      grandTotal={grandTotal}
                      feeAmount={feeAmount}
                      />
                </div>                
            </div>
         </>
        if(isMobile || isTablet){
            return <div>{commonContent}</div>
        }
        else{
        return <Scrollbar className="leftSecmaxHeight">{commonContent}</Scrollbar>
        }
      }

    render() {
        let { discount, subTotal, grandTotal,feeAmount, cartIsFetching, itemRemovedFetching, itemUpdatedFetching } = this.props;
        let { coupon_code } = this.state;
        let windowWidth = window.innerWidth;
        let cardWidth = windowWidth > 800 ? "60%" : "100%";
        if (this.props.cartItems.length == 0) {
            return (
                <Container fluid={true} > 
                    <Row className="no-gutters  secMinHeightwt">
                        <Col xs={12}  className="d-flex p-xl-5 p-md-4 py-4 flex-column justify-content-center align-items-center">                           
                                <div>Hey fill me, i am Empty <i class="fa fa-frown-o" aria-hidden="true"></i></div>
                               
                                    <Button  variant="contained" color="primary" className="mt-4 bottomActionbutton cartActionBtn" onClick={() => this.props.history.push("/category")}>
                                       Start Shopping
                                    </Button>                
                               
                        </Col>                        
                    </Row>
                </Container>
            )
        }
        return (
            <React.Fragment>
            <Container fluid={true} >                    
                <Row className="no-gutters justify-content-lg-between secMinHeightwt">
                    <Col xs={12} lg={7} className="p-xl-5 p-md-4 py-4 d-flex flex-column">
                    <div className="block-title mb-5">CART</div>
                        {this.renderContent()}  
                        <div className="text-left mt-4" >
                        <LoaderButton  isFetching={itemRemovedFetching || itemUpdatedFetching || cartIsFetching} variant="contained" color="primary" className="bottomActionbutton cartActionBtn" onClick={() => this.props.history.push("/cart/address")}>
                            <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" /> CHECKOUT
                        </LoaderButton>                
                    </div>  
                    </Col>     
                    <Col xs={12} lg={5} className="d-none d-lg-block" >
                        <div className="productImgSection ImgSectionwt">
                            <img src={proImg} className="imgProduct"></img>
                        </div>
                    </Col>                                    
                    </Row>
                </Container>
            </React.Fragment>
            )
       
       
        











      
        
       
    }
}

function mapStateToProps(state) {
    let cartItems = _get(state, "cart.lookUpData[0].result", []);
    let subTotal = _get(state, "cart.lookUpData[0].subtotal", 0);
    let discount = _get(state, "cart.lookUpData[0].discount", 0);
    let grandTotal = _get(state, "cart.lookUpData[0].grandtotal", 0);
    let cartIsFetching = _get(state, "cart.isFetching", false);
    let itemRemovedFetching = _get(state, "removeCart.isFetching");
    let itemUpdatedFetching = _get(state, "updateCart.isFetching");
    let feeAmount = _get(state, "cart.lookUpData[0].fee_amount", 0);

    return {
        cartItems,
        subTotal,
        discount,
        grandTotal,
        cartIsFetching,
        itemRemovedFetching,
        itemUpdatedFetching,
        feeAmount
    }
}


export default connect(mapStateToProps, null)(CartContainer);