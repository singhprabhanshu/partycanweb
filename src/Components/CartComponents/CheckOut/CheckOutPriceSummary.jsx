import React from "react";

class CartPriceSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <>
                <div className="PriceSummaryChild">
                    <span>TAXES</span>
        <span>{this.props.taxes}</span>
                </div>
                <div className="PriceSummaryChild">
                    <span>DRIVER TIP</span>
                  <span>{this.props.driverTipAmount}</span>
                </div>
                <div className="PriceSummaryChild">
                    <span>DELIVERY</span>
                    <span>{this.props.delivery_charges}</span>
                </div>
                <div className="PriceSummaryChild">
                    <span>Fee Amount</span>
                    <span>{this.props.feeAmount}</span>
                </div>
                <div className="PriceSummaryChild">
                    <span>TOTAL</span>
                    <span>{(Number(this.props.grandTotal)+Number(this.props.driverTipAmount)).toFixed(2)}</span>
                </div>
            </>
        )
    }
}

export default CartPriceSummary;