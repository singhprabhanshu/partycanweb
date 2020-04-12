import React from "react";
import CartListItem from "../../CartHomeComponents/CartItemList";
import { connect } from "react-redux";
import _get from "lodash/get";
import genericPostData from "../../../Redux/Actions/genericPostData";
import CouponCode from "../../../Components/CartHomeComponents/CouponCode";
import { Button, Label } from 'reactstrap';
import CheckOutPriceSummary from "./CheckOutPriceSummary";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MUIButton from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LoaderButton from '../../../Global/UIComponents/LoaderButton';
import {withRouter} from "react-router-dom";

class CheckOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = { driverTip: { id: 0, value: 0 } }
    }
    componentDidMount() {
        this.fetchCart(this.cartFetchSuccess);
    };
    fetchCart = (successCB) => {
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
            successCb: successCB,
            errorCb: this.cartFetchError
        })
    }
    cartFetchSuccess = (data) => {
        let coupon_code = _get(data, "[0].coupon_code", "");
        this.setState({ coupon_code })
        console.log(data, "data")
    };
    cartFetchError = (err) => {
        console.log(err);
    };
    DriverTip = (DriverTipObj) => {
        this.setState({ driverTip: DriverTipObj })
    }
    placeOrder = () => {
        let { cartFlow, taxes, cartId } = this.props;
        let reqObj = {
            "api_token": localStorage.getItem("Token"),
            "cart_id": cartId,
            "delivery_address_id": cartFlow.selectedAddress,
            "speed_id": cartFlow.selectedSpeedID,
            "retialer_id": cartFlow.selectedRetailerID,
            "ship_method_id": cartFlow.selectedShippingMethodID,
            "delivery_date": "",
            "ship_method": "",
            "ship_method_amount": "",
            "card_id": cartFlow.card_id,
            "customer_stripe_id": cartFlow.customer_stripe_id,
            "card_info": cartFlow.card_info,
            "card_token": cartFlow.card_token,
            "taxes": taxes,
            "delivery_fee": "",
            "delivery_tip": "", //workhere
            "payment_method": cartFlow.payment_method
        }
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: "/api/placeorder/placeorder",
            identifier: "PLACE_ORDER",
            successCb: this.placeOrderSuccess,
            errorCb: (err) => console.log("err", err),
            dontShowMessage: true
        })
    }
    placeOrderSuccess = (data) => {
        if (data.code == 1) {
            this.fetchCart(() => {
                this.setState({ order_id: data.order_id, orderPlaced: true })
            });
        }
        else
            alert("something went wrong while placing the order");
    }
    onChange = (e) => {
        this.setState({ coupon_code: e.target.value })
    }
    trackOrder = () => {

    }
    render() {
        let { discount, subTotal, grandTotal, taxes, delivery_charges, cartIsFetching, itemRemovedFetching, itemUpdatedFetching } = this.props;
        let { coupon_code } = this.state;

        let windowWidth = window.innerWidth;
        let cardWidth = windowWidth > 800 ? "60%" : "100%";
        if (this.props.cartItems.length == 0) {
            return (
                <div className="NoItemCart">
                    <div>Hey fill me, i am Empty <i class="fa fa-frown-o" aria-hidden="true"></i></div>
                    <Button onClick={() => this.props.history.push("/category")} color="primary">Start Shopping</Button>
                </div>
            )
        }
        if (this.state.orderPlaced) {
            return <div className="NoItemCart"><span>Cheers!!Order Placed Succesfully</span>
                <br />
                <span>Your Order id is {this.state.order_id}</span>
                <br />
                <LoaderButton
                    onClick={this.trackOrder}
                    color="primary"
                    variant="contained"
                    style={{ backgroundColor: '#00BFB2', height: 50, width: 250, borderRadius: 27, fontSize: 15, marginTop: "10px" }}
                    type="submit">
                    <ArrowForwardIcon /> Track Order
              </LoaderButton>            </div>
        }
        return (
            <div className="cartContainer">
                <div className="CartItemParent">
                    <CartListItem
                        dispatch={this.props.dispatch}
                        cartIsFetching={(itemRemovedFetching || itemUpdatedFetching || cartIsFetching)}
                        width={cardWidth}
                        cartItems={this.props.cartItems} />
                </div>
                <div className="couponParent">
                    <CouponCode onChange={this.onChange} width={cardWidth} coupon_code={coupon_code} />
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <Label>Driver Tip</Label>
                    <br />
                    <ButtonGroup color="secondary" aria-label="outlined primary button group">
                        <MUIButton style={this.state.driverTip.id == 1 ? { background: "white" } : null} onClick={() => this.DriverTip({ id: 1, value: 10 })}>10%</MUIButton>
                        <MUIButton style={this.state.driverTip.id == 2 ? { background: "white" } : null} onClick={() => this.DriverTip({ id: 2, value: 10 })}>15%</MUIButton>
                        <MUIButton style={this.state.driverTip.id == 3 ? { background: "white" } : null} onClick={() => this.DriverTip({ id: 3, value: 10 })}>20%</MUIButton>
                    </ButtonGroup>                    </div>
                <div style={{ width: cardWidth }} className="PriceSummaryParent">
                    <CheckOutPriceSummary delivery_charges={delivery_charges} width={cardWidth} taxes={taxes} discount={discount} subTotal={subTotal} grandTotal={grandTotal} />
                </div>
                <div style={{ width: cardWidth }} className="CheckOutButtonParent">
                    <LoaderButton
                        onClick={this.placeOrder}
                        color="primary"
                        variant="contained"
                        style={{ backgroundColor: '#00BFB2', height: 50, width: 250, borderRadius: 27, fontSize: 15, marginTop: "10px" }}
                        type="submit">
                        <ArrowForwardIcon /> Place Order
              </LoaderButton>
                    {/* <Button onClick={() => this.props.history.push("/cart/address")} className="CheckOutButton" color="primary">Place Order</Button> */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let cartId = _get(state, "cart.lookUpData[0].cart_id", '');
    let cartItems = _get(state, "cart.lookUpData[0].result", []);
    let subTotal = _get(state, "cart.lookUpData[0].subtotal", 0);
    let discount = _get(state, "cart.lookUpData[0].discount", 0);
    let grandTotal = _get(state, "cart.lookUpData[0].grandtotal", 0);
    let taxes = _get(state, "cart.lookUpData[0].taxes", 0);
    let delivery_charges = _get(state, "cart.lookUpData[0].delivery_charges", 0)
    let coupon_code = _get(state, "cart.lookUpData[0].coupon_code", 0);
    let cartIsFetching = _get(state, "cart.isFetching", false);
    let itemRemovedFetching = _get(state, "removeCart.isFetching");
    let itemUpdatedFetching = _get(state, "updateCart.isFetching");
    let cartFlow = _get(state, "cartFlow.lookUpData");
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
        cartId
    }
}

export default connect(mapStateToProps, null)(withRouter(CheckOut));