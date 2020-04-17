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
import {withRouter} from "react-router-dom";
import {isMobile, isTablet} from 'react-device-detect';
import Scrollbar from "react-scrollbars-custom";
import {Container, Row, Col} from 'reactstrap'
import proImg from '../../../assets/images/party-can.png'
class CheckOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = { driverTip: { id: 0, value: 0 } ,driverTipAmount:0}
    }
    componentDidMount() {
        this.fetchCart(this.cartFetchSuccess);
    };
    fetchCart = (successCB) => {
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
            successCb: successCB,
            errorCb: this.cartFetchError
        })
    }
    cartFetchSuccess = (data) => {
        let coupon_code = _get(data, "[0].coupon_code", "");
        this.setState({ coupon_code })
        console.log(data, "data")
    };
    cartFetchError = (err) => {
        console.log(err);
    };
    DriverTip = (DriverTipObj) => {
        let driverTipAmount = (Number(this.props.subTotal)*(DriverTipObj.value)/100).toFixed(2)
        this.setState({ driverTip: DriverTipObj,driverTipAmount })
    }
    placeOrder = () => {
        let { cartFlow, taxes, cartId } = this.props;
        let reqObj = {
            "api_token": localStorage.getItem("Token"),
            "cart_id": cartId,
            "delivery_address_id": cartFlow.selectedAddress,
            "speed_id": cartFlow.selectedSpeedID,
            "retialer_id": cartFlow.selectedRetailerID,
            "ship_method_id": cartFlow.selectedShippingMethodID==-1?"":cartFlow.selectedShippingMethodID,
            "delivery_date": cartFlow.deliveryDate,
            "ship_method": cartFlow.selectedShippingMethod=="none"?"":cartFlow.selectedShippingMethod,
            "ship_method_amount": cartFlow.shippingAmount,
            "card_id": cartFlow.card_id,
            "customer_stripe_id": cartFlow.customer_stripe_id,
            "card_info": cartFlow.card_info,
            "card_token": cartFlow.card_token,
            "taxes": taxes,
            "delivery_fee": cartFlow.deliveryFee,
            "driver_tip":this.state.driverTipAmount.toString(), //workhere
            "payment_method": cartFlow.payment_method
        }
        this.setState({placeOrderLoading:true})
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: "/api/placeorder/placeorder",
            identifier: "PLACE_ORDER",
            successCb: this.placeOrderSuccess,
            errorCb: (err) => console.log("err", err),
            dontShowMessage: true
        })
    }
    placeOrderSuccess = (data) => {
        if (data.code == 1) {
            this.fetchCart(() => {
                this.setState({placeOrderLoading:false})
                this.setState({ order_id: data.order_id, orderPlaced: true })
            });
        }
        else
            alert("something went wrong while placing the order");
    }
    onChange = (e) => {
        this.setState({ coupon_code: e.target.value })
    }
    trackOrder = () => {

    }

    renderContent = (itemRemovedFetching,itemUpdatedFetching,cartIsFetching,cardWidth,coupon_code,delivery_charges,taxes,discount,subTotal,grandTotal,feeAmount) => {
        let commonContent = <>
        <div className="cartContainer">
                <div className="CartItemParent">
                    <CartListItem
                    dispatch={this.props.dispatch}
                    cartIsFetching={(itemRemovedFetching || itemUpdatedFetching || cartIsFetching)}
                    width={cardWidth}
                    cartItems={this.props.cartItems} />
                </div>
                <div className="couponParent">
                    <CouponCode onChange={this.onChange} width={cardWidth} coupon_code={coupon_code} />
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <Label>Driver Tip</Label>
                    <br />
                    <ButtonGroup color="secondary" aria-label="outlined primary button group">
                    <MUIButton style={this.state.driverTip.id == 0 ? { background: "white" } : null} onClick={() => this.DriverTip({ id: 0, value: 0 })}>0%</MUIButton>
                        <MUIButton style={this.state.driverTip.id == 0.5 ? { background: "white" } : null} onClick={() => this.DriverTip({ id: 0.5, value: 5 })}>5%</MUIButton>
                        <MUIButton style={this.state.driverTip.id == 1 ? { background: "white" } : null} onClick={() => this.DriverTip({ id: 1, value: 10 })}>10%</MUIButton>
                        <MUIButton style={this.state.driverTip.id == 2 ? { background: "white" } : null} onClick={() => this.DriverTip({ id: 2, value: 15 })}>15%</MUIButton>
                        <MUIButton style={this.state.driverTip.id == 3 ? { background: "white" } : null} onClick={() => this.DriverTip({ id: 3, value: 20 })}>20%</MUIButton>
                    </ButtonGroup>                    </div>
                <div style={{ width: cardWidth }} className="PriceSummaryParent">
                    <CheckOutPriceSummary 
                    delivery_charges={delivery_charges} 
                    width={cardWidth} taxes={taxes}
                    discount={discount} subTotal={subTotal} 
                    grandTotal={grandTotal}
                    driverTipAmount={this.state.driverTipAmount||0}
                    feeAmount={feeAmount}
                    />
                </div>               
            </div>
         </>
        if(isMobile || isTablet){
            return <div>{commonContent}</div>
        }
        else{
        return <Scrollbar  className="leftSecmaxHeight">{commonContent}</Scrollbar>
        }
      }

    render() {
        let { discount, subTotal, grandTotal, taxes,feeAmount, delivery_charges, cartIsFetching, itemRemovedFetching, itemUpdatedFetching } = this.props;
        let { coupon_code } = this.state;

        let windowWidth = window.innerWidth;
        let cardWidth = windowWidth > 800 ? "60%" : "100%";
        if (this.state.orderPlaced) {
            return (
            <React.Fragment>
             <Container fluid={true}>            
                 <Row className="no-gutters justify-content-lg-between secMinHeight">                   
                    <Col lg={6}  className="p-xl-5 p-4 d-flex flex-column">
                        <div className="mb-4"><span>Cheers!!Order Placed Succesfully</span>                           
                            <span>Your Order id is {this.state.order_id}</span>
                            <div className="text-left mt-4" >
                                <LoaderButton
                                    onClick={this.trackOrder}
                                    color="primary"
                                    variant="contained"                               
                                    type="submit">
                                    <ArrowForwardIcon /> Track Order
                                </LoaderButton>   
                            </div>         
                        </div>
                     </Col>
                     <Col lg={5} className="d-none d-lg-block">
                        <div className="productImgSection">
                                <img src={proImg} className="imgProduct img-responsive"></img>
                        </div>
                     </Col>
                </Row>
                </Container>
            </React.Fragment>  
            )        
        }
        if (this.props.cartItems.length == 0) {
            return (
                <React.Fragment>
                <Container fluid={true}>            
                    <Row className="no-gutters secMinHeightwt">
                        <Col xs={12}  className="d-flex flex-column justify-content-center align-items-center">                           
                                <div>Hey fill me, i am Empty <i class="fa fa-frown-o" aria-hidden="true"></i></div>
                                <div className="text-left mt-4" >
                                <Button  variant="contained" color="primary" className="bottomActionbutton cartActionBtn" onClick={() => this.props.history.push("/category")}>
                                    Start Shopping
                                </Button>
                                </div>
                            </Col>
                    </Row>
                </Container>
            </React.Fragment>          
                
            )
        }
        return (
            <React.Fragment>
            <Container fluid={true}>            
                <Row className="no-gutters justify-content-lg-between secMinHeight">
                    <Col xs={12} lg={7} className="p-xl-5 p-4 flex-column d-flex">
                        <div className="block-title mb-5">Order Summary</div>
                        {this.renderContent()}                  
                        <div className="text-left mt-4" >
                            <LoaderButton  isFetching={this.state.placeOrderLoading} variant="contained" color="primary" className="bottomActionbutton cartActionBtn" type="submit"  onClick={this.placeOrder}>
                                <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" /> PLACE ORDER
                            </LoaderButton>                
                        </div>
                    </Col>       
                    <Col  lg={5} className="d-none d-lg-block">
                        <div className="productImgSection proDetailSec">
                                <img src={proImg} className="imgProduct img-responsive"></img>
                        </div>
                    </Col>                                
                    </Row>
                </Container>
            </React.Fragment>            
        )
    }
}

function mapStateToProps(state) {
    let cartId = _get(state, "cart.lookUpData[0].cart_id", '');
    let cartItems = _get(state, "cart.lookUpData[0].result", []);
    let subTotal = _get(state, "cart.lookUpData[0].subtotal", 0);
    let discount = _get(state, "cart.lookUpData[0].discount", 0);
    let grandTotal = _get(state, "cart.lookUpData[0].grandtotal", 0);
    let feeAmount = _get(state, "cart.lookUpData[0].fee_amount", 0);
    let taxes = _get(state, "cart.lookUpData[0].taxes", 0);
    let delivery_charges = _get(state, "cart.lookUpData[0].delivery_charges", 0)
    let coupon_code = _get(state, "cart.lookUpData[0].coupon_code", 0);
    let cartIsFetching = _get(state, "cart.isFetching", false);
    let itemRemovedFetching = _get(state, "removeCart.isFetching");
    let itemUpdatedFetching = _get(state, "updateCart.isFetching");
    let cartFlow = _get(state, "cartFlow.lookUpData");
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
        itemUpdatedFetching,
        cartFlow,
        cartId,
        feeAmount
    }
}

export default connect(mapStateToProps, null)(withRouter(CheckOut));