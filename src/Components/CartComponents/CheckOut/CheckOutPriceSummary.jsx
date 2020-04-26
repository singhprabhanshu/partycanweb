import React from "react";

class CartPriceSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let { cartIsFetching } = this.props;
        let grandTotal = this.props.grandTotal.split(",").join("");
        return (
            <>
                <div className="PriceSummaryChild pb-2">
                    <span>TAXES</span>
                    {cartIsFetching ? <span>Loading..</span> : <span>{this.props.taxes}</span>}
                </div>
                <div className="PriceSummaryChild pb-2">
                    <span>DRIVER TIP</span>
                    {cartIsFetching ? <span>Loading..</span> : <span>{this.props.driverTipAmount}</span>}
                </div>
                <div className="PriceSummaryChild pb-2">
                    <span>DELIVERY</span>
                    {cartIsFetching ? <span>Loading..</span> : <span>{this.props.delivery_charges}</span>}
                </div>
                <div className="PriceSummaryChild pb-2">
                    <span>Discount</span>
                    {cartIsFetching ? <span>Loading..</span> : <span>{this.props.discount}</span>}
                </div>
                <div className="PriceSummaryChild pb-2">
                    <span>TOTAL</span>
                    {cartIsFetching ? <span>Loading..</span> : <span>{(Number(grandTotal) + Number(this.props.driverTipAmount)).toFixed(2)}</span>}
                </div>
            </>
        )
    }
}

export default CartPriceSummary;