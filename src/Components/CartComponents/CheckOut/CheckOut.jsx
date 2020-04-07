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


class CheckOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = { driverTip: { id: 0, value: 0 } }
    }
    componentDidMount() {
        let reqObj = {
            "api_token": "1c779ca336234ffc6a98807a6d36140e"
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
    DriverTip = (DriverTipObj) => {
        this.setState({ driverTip: DriverTipObj })
    }
    placeOrder = () => {
        this.setState({ orderPlaced: true })
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
        if (this.state.orderPlaced) {
            return <div className="NoItemCart"><span>Cheers!!Order Placed Succesfully</span>
                <br />
                <span>Your Order id is #566654</span>
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
                    <CartListItem cartIsFetching={(itemRemovedFetching||itemUpdatedFetching||cartIsFetching)} width={cardWidth} cartItems={this.props.cartItems} />
                </div>
                <div className="couponParent">
                    <CouponCode onChange={this.onChange} width={cardWidth} coupon_code={coupon_code} />
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <Label>Driver Tip</Label>
                    <br/>
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
        itemUpdatedFetching
    }
}

export default connect(mapStateToProps, null)(CheckOut);