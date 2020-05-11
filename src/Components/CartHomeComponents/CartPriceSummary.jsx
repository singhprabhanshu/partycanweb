import React from "react";

class CartPriceSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let { cartIsFetching, discount, subTotal, taxes, grandTotal } = this.props;
        return (
            <>
                <div className="PriceSummaryChild">
                    <span>SUBTOTAL</span>
                    {cartIsFetching ? <span>Loading..</span> :<span>{subTotal}</span>}
                </div>
                {/* <div className="PriceSummaryChild">
                    <span>TAXES</span>
                    {cartIsFetching ? <span>Loading..</span> :<span>{taxes}</span>}
                </div> */}
                <div className="PriceSummaryChild">
                    <span>DISCOUNT</span>
                    {cartIsFetching ? <span>Loading..</span> :<span>{discount}</span>}
                </div>
                <div className="PriceSummaryChild">
                    <span>TOTAL</span>
                    {cartIsFetching ? <span>Loading..</span> : <span>{grandTotal}</span>}
                </div>
            </>
        )
    }
}

export default CartPriceSummary;