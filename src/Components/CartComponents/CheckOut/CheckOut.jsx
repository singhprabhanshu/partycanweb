import React from "react";
import CartListItem from "../../CartHomeComponents/CartItemList";
import { connect } from "react-redux";
import _get from "lodash/get";
import { map as _map } from 'lodash';
import { cleanEntityData } from '../../../Global/helper/commonUtil';
import genericPostData from "../../../Redux/Actions/genericPostData";
import CouponCode from "../../../Components/CartHomeComponents/CouponCode";
import { Button, Label } from 'reactstrap';
import CheckOutPriceSummary from "./CheckOutPriceSummary";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MUIButton from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LoaderButton from '../../../Global/UIComponents/LoaderButton';
import { withRouter } from "react-router-dom";
import { isMobile, isTablet } from 'react-device-detect';
import Scrollbar from "react-scrollbars-custom";
import { Container, Row, Col } from 'reactstrap'
import proImg from '../../../assets/images/party-can.png'
import { createReqObjForCart } from "../../../Global/helper/commonUtil";
import CartEmptyComponent from "../../CartHomeComponents/CartEmptyComponent";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { commonActionCreater } from "../../../Redux/Actions/commonAction";

import { PageView, MakeTransaction } from '../../../Global/helper/react-ga';

class CheckOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = { driverTip: { id: 0, value: 0 }, driverTipAmount: 0 }
    }

    reactGACartItem = () => {
        const cart = _map(this.props.cartItems, c => cleanEntityData({
            productId: _get(c, 'product_id'),
            name: _get(c, 'name'),
            quantity: _get(c, 'qty'),
            price: _get(c, 'product_price') ? Number(_get(c, 'product_price')) : undefined,
            variant: _get(c, 'type')
    
        }));
        return cart;
    };

    componentDidMount() {
        window.scrollTo(0, 0);
        //this.fetchCart(this.cartFetchSuccess);
    };
    fetchCart = (successCB) => {
        let reqObj = createReqObjForCart();
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: "/api/cart/showcart",
            identifier: "CART_ITEMS",
            successCb: () => successCB(),
            errorCb: this.cartFetchError,
            dontShowMessage: true
        })
    }
    cartFetchSuccess = (data) => {
        let coupon_code = _get(data, "[0].coupon_code", "");
        this.setState({ coupon_code })
    };
    cartFetchError = (err) => {
        //TODO ERROR HANDLING REAMINING WHEN FETCHING THE CART
        console.log(err);
    };
    DriverTip = (DriverTipObj) => {
        let subtotal = this.props.subTotal.split(",").join("");
        let driverTipAmount = (Number(subtotal) * (DriverTipObj.value) / 100).toFixed(2)
        this.setState({ driverTip: DriverTipObj, driverTipAmount })
    }
    placeOrder = () => {
        let { cartFlow, taxes, cartId,giftMessage } = this.props;
        let reqObj = {
            "api_token": localStorage.getItem("Token"),
            "cart_id": cartId,
            "delivery_address_id": cartFlow.selectedAddress,
            "speed_id": cartFlow.selectedSpeedID,
            "retialer_id": cartFlow.selectedRetailerID,
            "ship_method_id": cartFlow.selectedShippingMethodID == -1 ? "" : cartFlow.selectedShippingMethodID,
            "delivery_date": cartFlow.deliveryDate,
            "ship_method": cartFlow.selectedShippingMethod == "none" ? "" : cartFlow.selectedShippingMethod,
            "ship_method_amount": cartFlow.shippingAmount,
            "card_id": cartFlow.card_id,
            "customer_stripe_id": cartFlow.customer_stripe_id,
            "card_info": cartFlow.card_info,
            "card_token": cartFlow.card_token,
            "taxes": taxes,
            "delivery_fee": cartFlow.deliveryFee,
            "driver_tip": this.state.driverTipAmount.toString(), //workhere
            "payment_method": cartFlow.payment_method,
            "gift_message":giftMessage
        }
        this.setState({ placeOrderLoading: true })
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: "/api/placeorder/placeorder",
            identifier: "PLACE_ORDER",
            successCb: this.placeOrderSuccess,
            errorCb: this.placeOrderError,
            dontShowMessage: true
        })
    }
    reactGAPurchase = ({ data }) => {
        
        const cart = this.reactGACartItem();
        const purchasePayload= cleanEntityData({
            id: _get(data, 'order_id'),
            revenue: this.props.subTotal ? Number(this.props.subTotal) : undefined,
            tax: this.props.taxes ? Number(this.props.taxes) : undefined,
            shipping: this.props.cartFlow.shippingAmount ? Number(this.props.cartFlow.shippingAmount) : undefined,
            coupon: this.state.coupon_code,

        });
        MakeTransaction({ cart, purchasePayload });
        
    };
    placeOrderSuccess = (data) => {
        if (data.code == 1) {
            this.reactGAPurchase({ data });
            PageView();
            localStorage.removeItem("cart_id"); //removing the cart_id when place order is done
            this.props.dispatch(commonActionCreater("", "GIFT_MESSAGE"));
            this.fetchCart(() => {
                this.setState({ placeOrderLoading: false });
                this.setState({ order_id: data.order_id, orderPlaced: true });
            });
        }
        else {
            this.setState({ placeOrderLoading: false })
            alert(_get(data, "message", "something went wrong while placing the order"));
        }
    }
    placeOrderError = () => {
        this.setState({ placeOrderLoading: false });
        alert("internal server error occured");
        //TODO ERROR HANDLING REAMINING WHEN FETCHING THE CART
    }


    onChange = (e) => {
        this.setState({ coupon_code: e.target.value })
    }


    trackOrder = () => {
        this.props.history.push("/setting/order")
    }

    renderContent = () => {
        let { discount, subTotal, grandTotal, taxes, feeAmount, delivery_charges, cartIsFetching, itemRemovedFetching, itemUpdatedFetching } = this.props;
        let { coupon_code } = this.state;
        // let windowWidth = window.innerWidth;
        // let cardWidth = windowWidth > 800 ? "60%" : "100%";
        let commonContent = <>
            <div className="cartContainer scrollerwrapper">
                <div className="CartItemParent">
                    <CartListItem
                        dispatch={this.props.dispatch}
                        cartIsFetching={(itemRemovedFetching || itemUpdatedFetching || cartIsFetching)}
                        //width={cardWidth}
                        isCheckOut = {true}
                        cartItems={this.props.cartItems} />
                </div>
                <div className="couponParent mt-5">
                    <CouponCode dispatch={this.props.dispatch} onChange={this.onChange} coupon_code={coupon_code} />
                </div>
                {_get(this.props, "cartFlow.selectedSpeedID") == 1 && <div className="driverTip">
                    <Label>TIP FOR DRIVER </Label>
                    <br />
                    <ButtonGroup color="secondary" aria-label="outlined primary button group">
                        <MUIButton style={this.state.driverTip.id == 0 ? { background: "white", color: '#000' } : null} onClick={() => this.DriverTip({ id: 0, value: 0 })}>0%</MUIButton>
                        <MUIButton style={this.state.driverTip.id == 0.5 ? { background: "white", color: '#000' } : null} onClick={() => this.DriverTip({ id: 0.5, value: 5 })}>5%</MUIButton>
                        <MUIButton style={this.state.driverTip.id == 1 ? { background: "white", color: '#000' } : null} onClick={() => this.DriverTip({ id: 1, value: 10 })}>10%</MUIButton>
                        <MUIButton style={this.state.driverTip.id == 2 ? { background: "white", color: '#000' } : null} onClick={() => this.DriverTip({ id: 2, value: 15 })}>15%</MUIButton>
                        <MUIButton style={this.state.driverTip.id == 3 ? { background: "white", color: '#000' } : null} onClick={() => this.DriverTip({ id: 3, value: 20 })}>20%</MUIButton>
                    </ButtonGroup>
                </div>}
                <div className="PriceSummaryParent">
                    <CheckOutPriceSummary
                        showDriverTip={_get(this.props, "cartFlow.selectedSpeedID") == 1}
                        delivery_charges={delivery_charges}
                        shippingAmount={this.props.cartFlow.shippingAmount}
                        taxes={taxes}
                        subTotal={subTotal}
                        grandTotal={grandTotal}
                        driverTipAmount={this.state.driverTipAmount || 0}
                        discount={discount}
                        cartIsFetching={(itemRemovedFetching || itemUpdatedFetching || cartIsFetching)}
                    />
                </div>
            </div>
        </>
         return <div>{commonContent}</div>
        // if (isMobile || isTablet) {
        //     return <div>{commonContent}</div>
        // }
        // else {
        //     return <Scrollbar className="leftSecmaxHeight">{commonContent}</Scrollbar>
        // }
    }

    render() {
        if (this.state.orderPlaced) {
            return (
                <React.Fragment>
                    <Container fluid={true}>
                        <Row className="no-gutters justify-content-lg-between secMinHeight">
                            <Col lg={6} className="p-xl-5 p-md-4 py-4 d-flex flex-column align-items-center justify-content-center orderPlaced">
                                <span>Order Placed.</span>
                                <span className="mt-0">Your Order id is <b class="orderNumber">#{this.state.order_id}</b></span>
                                <div className="mt-5" >

                                    <LoaderButton
                                        onClick={this.trackOrder}
                                        color="primary"
                                        variant="contained"
                                        type="submit" className="bottomActionbutton autoWidthbtn transiBtn btn btn-secondary">
                                        <LocationOnOutlinedIcon className="mr-3" /> Your Orders
                   </LoaderButton>
                                </div>
                            </Col>
                            <Col lg={5} className="d-none d-lg-block">
                                <div className="productImgSection">
                                    <img src={proImg} className="imgProduct img-responsive"></img>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </React.Fragment>
            )
        }

        let noCartItem = this.props.cartItems.length == 0 && !this.props.cartIsFetching;
        let { cartIsFetching, itemRemovedFetching, itemUpdatedFetching } = this.props;
        return (
            <React.Fragment>
                <Container fluid={true}>
                    <Row style={noCartItem ? { display: "none" } : null} className="no-gutters justify-content-lg-between secMinHeight">
                        <Col xs={12} lg={6} className="p-xl-5 p-md-4 py-4 flex-column d-flex">
                            <div className="block-title mb-5">Order Summary</div>
                            {this.renderContent()}
                            <div className="mt-4" >
                                <LoaderButton
                                    isFetching={
                                        itemRemovedFetching
                                        || itemUpdatedFetching
                                        || cartIsFetching
                                        || this.state.placeOrderLoading
                                    }
                                    variant="contained"
                                    color="primary"
                                    className="bottomActionbutton cartActionBtn"
                                    type="submit" onClick={this.placeOrder}>
                                    <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" /> PLACE ORDER
                            </LoaderButton>
                            </div>
                        </Col>
                        <Col lg={5} className="d-none d-lg-block">
                            <div className="productImgSection proDetailSec">
                                <img src={proImg} className="imgProduct img-responsive"></img>
                            </div>
                        </Col>
                    </Row>
                    {noCartItem && <CartEmptyComponent />}
                </Container>
            </React.Fragment>
        )
    }

}


function mapStateToProps(state) {
    let cartId = _get(state, "cart.lookUpData[0].cart_id", '');
    let cartItems = _get(state, "cart.lookUpData[0].result", []);
    let subTotal = _get(state, "cart.lookUpData[0].subtotal", "");
    let discount = _get(state, "cart.lookUpData[0].discount", "");
    let grandTotal = _get(state, "cart.lookUpData[0].grandtotal", "");
    let feeAmount = _get(state, "cart.lookUpData[0].fee_amount", "");
    let taxes = _get(state, "cart.lookUpData[0].taxes", "");
    let delivery_charges = _get(state, "cart.lookUpData[0].delivery_charges", "")
    let coupon_code = _get(state, "cart.lookUpData[0].coupon_code", "");
    let cartIsFetching = _get(state, "cart.isFetching", false);
    let itemRemovedFetching = _get(state, "removeCart.isFetching");
    let itemUpdatedFetching = _get(state, "updateCart.isFetching");
    let cartFlow = _get(state, "cartFlow.lookUpData");
    let giftMessage = _get(state, "giftMessage.lookUpData","");
    return {
        cartItems,
        subTotal,
        discount,
        coupon_code,
        grandTotal,
        taxes,
        delivery_charges,
        coupon_code,
        cartIsFetching,
        itemRemovedFetching,
        itemUpdatedFetching,
        cartFlow,
        cartId,
        feeAmount,
        giftMessage
    }
}

export default connect(mapStateToProps, null)(withRouter(CheckOut));