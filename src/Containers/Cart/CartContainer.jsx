import React from "react";
import { connect } from "react-redux";
import CartItemsList from "../../Components/CartHomeComponents/CartItemList"
import CouponCode from "../../Components/CartHomeComponents/CouponCode";
import CartPriceSummary from "../../Components/CartHomeComponents/CartPriceSummary"
import genericPostData from "../../Redux/Actions/genericPostData";
import _get from "lodash/get";
import {isEmpty as _isEmpty} from 'lodash';
import LoaderButton from '../../Global/UIComponents/LoaderButton';
import { isMobile, isTablet } from 'react-device-detect';
import Scrollbar from "react-scrollbars-custom";
import proImg from '../../assets/images/party-can.png'
import { Container, Row, Col } from 'reactstrap'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Loader } from "../../Global/UIComponents/LoaderHoc";
import CartEmptyComponent from "../../Components/CartHomeComponents/CartEmptyComponent";
import GiftCard from "../../Components/CartHomeComponents/GiftCard";


class CartContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    cartFetchSuccess = (data) => {
        let coupon_code = _get(data, "[0].coupon_code", "");
        this.setState({ coupon_code })
        console.log(data, "data")
    };
    cartFetchError = (err) => {
        console.log(err);  //TODO: ERROR CASE NEED TO BE HANDLED 
    };

    componentDidMount() {
        
        window.scrollTo(0, 0);

    }

    renderContent = () => {
        let { discount, subTotal, grandTotal, cartIsFetching, itemRemovedFetching, itemUpdatedFetching } = this.props;
        let { coupon_code } = this.state;
        // let windowWidth = window.innerWidth;
        // let cardWidth = windowWidth > 800 ? "60%" : "100%";
        let commonContent = <>
            <div className="cartContainer scrollerwrapper">
                <div className="CartItemParent mb-3">
                    <CartItemsList
                        {...this.props}
                        dispatch={this.props.dispatch}
                        //width={cardWidth}
                        cartItems={this.props.cartItems} />
                </div>
                <div className="couponParent">
                    <CouponCode
                        dispatch={this.props.dispatch}
                        onChange={this.onChangeCouponCode}
                        applyCouponLoading={(applyCouponLoading) => this.setState({ applyCouponLoading })}
                        //width={cardWidth}
                        coupon_code={coupon_code} />
                </div>
                <div style={{marginTop:"3rem"}} className="couponParent">
                <GiftCard/>
                </div>
                <div
                    //style={{ width: cardWidth }}
                    className="PriceSummaryParent">
                    <CartPriceSummary
                        cartIsFetching={(itemRemovedFetching || itemUpdatedFetching || cartIsFetching)}
                        //width={cardWidth}
                        discount={discount}
                        subTotal={subTotal}
                        taxes={this.props.taxes}
                        grandTotal={grandTotal}
                    />
                </div>
            </div>
        </>
          return <div>{commonContent}</div>
        // if (isMobile || isTablet) {
        //     return <div>{commonContent}</div>
        // }
        // else {
        //     return <Scrollbar className="leftSecmaxHeight">{commonContent}</Scrollbar>
        // }
    }
    render() {
        // if (this.props.itemRemovedFetching) {
        //     return <Loader />
        // }
        let noCartItem = this.props.cartItems.length == 0 && !this.props.cartIsFetching;
        let { cartIsFetching, itemRemovedFetching, itemUpdatedFetching } = this.props;
        return (
            <React.Fragment>
                <Container fluid={true} >
                    <Row style={noCartItem ? { display: "none" } : null} className="no-gutters justify-content-lg-between secMinHeightwt">
                        <Col xs={12} lg={6} className="p-xl-5 p-md-4 py-4 d-flex flex-column">
                            <div className="block-title mb-5" style={{}}>CART</div>
                            {this.renderContent()}
                            <div className="text-left mt-4" >
                                <LoaderButton
                                    isFetching={itemRemovedFetching || itemUpdatedFetching || cartIsFetching}
                                    variant="contained"
                                    color="primary"
                                    disabled={itemRemovedFetching || itemUpdatedFetching || cartIsFetching}
                                    className="bottomActionbutton cartActionBtn"
                                    onClick={() => this.props.history.push("/cart/address")}>
                                    <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" /> CHECKOUT
                                  </LoaderButton>
                            </div>
                        </Col>
                        <Col xs={12} lg={5} className="d-none d-lg-block" >
                            <div className="productImgSection ImgSectionwt">
                                <img src={proImg} className="imgProduct"></img>
                            </div>
                        </Col>
                    </Row>
                    {noCartItem && <CartEmptyComponent />}
                </Container>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    let cartItems = _get(state, "cart.lookUpData[0].result", []);
    let subTotal = _get(state, "cart.lookUpData[0].subtotal", 0);
    let discount = _get(state, "cart.lookUpData[0].discount", 0);
    //let grandTotal = _get(state, "cart.lookUpData[0].grandtotal", 0);
    let grandTotal = _get(state, "cart.lookUpData[0].subtotal_discount", 0); //for cart it is the subtotal_discount
    let cartIsFetching = _get(state, "cart.isFetching", false);
    let itemRemovedFetching = _get(state, "removeCart.isFetching");
    let itemUpdatedFetching = _get(state, "updateCart.isFetching");
    let feeAmount = _get(state, "cart.lookUpData[0].fee_amount", 0);
    let taxes = _get(state, "cart.lookUpData[0].taxes", 0);
    let userSignInInfo = _get(state, 'userSignInInfo.lookUpData', []);

    return {
        cartItems,
        subTotal,
        discount,
        grandTotal,
        cartIsFetching,
        itemRemovedFetching,
        itemUpdatedFetching,
        feeAmount,
        taxes,
        userSignInInfo,
    }
}


export default connect(mapStateToProps, null)(CartContainer);