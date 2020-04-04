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
                    <span></span>
                </div>
                <div className="PriceSummaryChild">
                    <span>DELIVERY</span>
                    <span>{this.props.delivery_charges}</span>
                </div>
                <div className="PriceSummaryChild">
                    <span>TOTAL</span>
                    <span>{this.props.grandTotal}</span>
                </div>
            </>
        )
    }
}

export default CartPriceSummary;