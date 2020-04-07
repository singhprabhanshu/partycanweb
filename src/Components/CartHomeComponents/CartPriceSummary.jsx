import React from "react";

class CartPriceSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
       let  {cartIsFetching} = this.props;
        return (
            <>
                <div className="PriceSummaryChild">
                    <span>TAXES</span>
                    <span></span>
                </div>
                <div className="PriceSummaryChild">
                    <span>DELIVERY</span>
                    <span></span>
                </div>
                <div className="PriceSummaryChild">
                    <span>TOTAL</span>
        {cartIsFetching?<span>Loading</span>:<span>{this.props.grandTotal}</span>}
                </div>
            </>
        )
    }
}

export default CartPriceSummary;