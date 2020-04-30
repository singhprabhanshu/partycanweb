import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText,Col } from 'reactstrap';
import { connect} from 'react-redux';
import genericPostData from "../../Redux/Actions/genericPostData";
import { createReqObjForCart } from "../../Global/helper/commonUtil";
import _get from "lodash/get";
import CircularProgress from '@material-ui/core/CircularProgress';


class CouponCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = { coupon_code:props.coupon_code }
    }
    handleAppply = () => {
        this.showCart({ ...createReqObjForCart(), coupon_code: this.state.coupon_code })
    }
    showCart = (reqObj) => {
        this.setState({applyCouponLoading:true})
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: "/api/cart/showcart",
            identifier: "CART_ITEMS",
            successCb: this.applyCouponCodeSuccess,
            errorCb: this.applyCouponCodeError
        })
    }
    applyCouponCodeSuccess = ()=>{
        this.setState({applyCouponLoading:false})
    }
    applyCouponCodeError = ()=>{
        this.setState({applyCouponLoading:false})
        //TODO ERROR HANDLING REAMING
    }
    componentDidUpdate(prevProps)
    {
        if (prevProps.coupon_code != this.props.coupon_code)  //TODO CHECK WITH NARESH CASE SENSTIVITY OF COUPON CODE
        {
            this.setState({coupon_code:this.props.coupon_code})
        }
    }
    onChangeCouponCode = (e) => {
        this.setState({ coupon_code: e.target.value })
    }

    render() {
        return (
            <div className="d-flex no-gutters">
                    <Form className="d-flex w-100">                    
                            <Input onChange={this.onChangeCouponCode} value={this.state.coupon_code} type="email" name="email" id="exampleEmail" placeholder="Coupon Code" className="col" />
        <Button disabled={this.state.applyCouponLoading} style={{ marginLeft: "10px", marginBottom: "2px" }} className="applyBtn" onClick={this.handleAppply}>{this.state.applyCouponLoading?<CircularProgress/>:"Apply"}</Button>
                      </Form>
            
            </div>
        )
    }
}

function mapStateToProps(state) {
    let coupon_code = _get(state, "cart.lookUpData[0].coupon_code", "");

    return {
        coupon_code
    }
}

export default connect(mapStateToProps)(CouponCode);