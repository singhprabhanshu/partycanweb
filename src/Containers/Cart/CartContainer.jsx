import React from "react";
import { connect } from "react-redux";
import CartItemsList from "../../Components/CartHomeComponents/CartItemList"
import CouponCode from "../../Components/CartHomeComponents/CouponCode";
import CartPriceSummary from "../../Components/CartHomeComponents/CartPriceSummary"
import genericPostData from "../../Redux/Actions/genericPostData";
import _get from "lodash/get";
import { Button } from 'reactstrap';
import LoaderButton from '../../Global/UIComponents/LoaderButton';

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
    render() {
        let { discount, subTotal, grandTotal, cartIsFetching, itemRemovedFetching, itemUpdatedFetching } = this.props;
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
        return (
            <div className="cartContainer">
                <div className="CartItemParent">
                    <CartItemsList
                        dispatch={this.props.dispatch}
                        width={cardWidth}
                        cartItems={this.props.cartItems} />
                </div>
                <div className="couponParent">
                    <CouponCode onChange={this.onChange} width={cardWidth} coupon_code={coupon_code} />
                </div>
                <div style={{ width: cardWidth }} className="PriceSummaryParent">
                    <CartPriceSummary cartIsFetching={(itemRemovedFetching || itemUpdatedFetching || cartIsFetching)} width={cardWidth} discount={discount} subTotal={subTotal} grandTotal={grandTotal} />
                </div>
                <div style={{ width: cardWidth }} className="CheckOutButtonParent">
                    <LoaderButton
                        isFetching={itemRemovedFetching || itemUpdatedFetching || cartIsFetching}
                        onClick={() => this.props.history.push("/cart/address")}
                        variant="contained"
                        color="primary"
                        className="CheckOutButton" color="primary">CheckOut</LoaderButton>
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
    let cartIsFetching = _get(state, "cart.isFetching", false);
    let itemRemovedFetching = _get(state, "removeCart.isFetching");
    let itemUpdatedFetching = _get(state, "updateCart.isFetching");

    return {
        cartItems,
        subTotal,
        discount,
        grandTotal,
        cartIsFetching,
        itemRemovedFetching,
        itemUpdatedFetching
    }
}


export default connect(mapStateToProps, null)(CartContainer);