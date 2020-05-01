import React from "react";

class CartPriceSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let { cartIsFetching } = this.props;
        let grandTotal = this.props.grandTotal.split(",").join("");
        let driverTipAmount = this.props.driverTipAmount.toString().split(",").join("");
        let shippingAmount = this.props.shippingAmount.split(",").join("");
        return (
            <>
                <div className="PriceSummaryChild pb-2">
                    <span>TAXES</span>
                    {cartIsFetching ? <span>Loading..</span> : <span>{this.props.taxes}</span>}
                </div>
               {this.props.showDriverTip&& <div className="PriceSummaryChild pb-2">
                    <span>DRIVER TIP</span>
                    {cartIsFetching ? <span>Loading..</span> : <span>{this.props.driverTipAmount}</span>}
                </div>}
                <div className="PriceSummaryChild pb-2">
                    <span>DELIVERY</span>
                    {cartIsFetching ? <span>Loading..</span> : <span>{this.props.shippingAmount}</span>}
                </div>
                <div className="PriceSummaryChild pb-2">
                    <span>DISCOUNT</span>
                    {cartIsFetching ? <span>Loading..</span> : <span>{this.props.discount}</span>}
                </div>
                <div className="PriceSummaryChild pb-2">
                    <span>TOTAL</span>
                    {cartIsFetching ? <span>Loading..</span> : <span>{(Number(shippingAmount)+Number(grandTotal) + Number(driverTipAmount)).toFixed(2)}</span>}
                </div>
            </>
        )
    }
}

export default CartPriceSummary;