import React from "react";
import _get from "lodash";

class CartPriceSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let driverTipAmount = _get(this.props,"driverTip.driverTipAmount",0)
        return (
            <>
                <div className="PriceSummaryChild">
                    <span>TAXES</span>
        <span>{this.props.taxes}</span>
                </div>
                <div className="PriceSummaryChild">
                    <span>DRIVER TIP</span>
                    <span></span>
                </div>
                <div className="PriceSummaryChild">
                    <span>DELIVERY</span>
                    <span>{this.props.delivery_charges}</span>
                </div>
                <div className="PriceSummaryChild">
                    <span>TOTAL</span>
                    <span>{ (this.props.grandTotal+Number(driverTipAmount)).toFixed(2)}</span>
                </div>
            </>
        )
    }
}

export default CartPriceSummary;