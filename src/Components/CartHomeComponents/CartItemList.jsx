import React from "react";
import genericPostData from "../../Redux/Actions/genericPostData";
import { connect } from "react-redux";
import _ from "lodash";
import { Container, Row, Col } from 'reactstrap'
import proImg from '../../assets/images/party-can.png';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import { createReqObjForCart } from "../../Global/helper/commonUtil";
import _get from "lodash/get";
import CartEmptyComponent from "./CartEmptyComponent";
import { Loader } from "../../Global/UIComponents/LoaderHoc";


//THIS COMPONENT IS COMMON FOR CHECKOUT CONTAINER AND CART CONTAINER
class CartItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cartItems: [] };
    }
    componentDidMount() {
        this.setState({cartIsFetching:true})
        this.fetchCartAgain(this.sb, this.eb);
    }
    sb = (data) => {
        this.setState({ cartItems: _get(data, "[0].result",[]) });
        this.setState({cartIsFetching:false})
        if (!_.isEmpty(_get(data, "[0].result",[]))) {
            if (_.isEmpty(_get(this.props.userSignInInfo, '[0].result.api_token', ''))) {
                this.props.history.push('/guest/register');
            }
        }

    }
    eb = (err) => {
        this.setState({cartIsFetching:false})

        //TODO HANDLE FETCH ERROR HANDLING REMAIMNING
    }
    handleCartRemoveItem = (item) => {
        this.setState({itemRemovedFetching: true });
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: {
                api_token: localStorage.getItem("Token"),
                cart_rid: item.cart_rid,
                cart_id:localStorage.getItem("cart_id")
            },
            url: "/api/cart/deleteitem",
            identifier: "CART_ITEM_REMOVE",
            successCb: ()=>{
                this.setState({itemRemovedFetching:false,cartIsFetching:true});
                this.fetchCartAgain(this.sb,this.eb);
            },
            errorCb: this.handleCartItemRemoveError,
            dontShowMessage: true
        })
    }
    handleCartItemRemoveError = (err) => {
        this.setState({itemRemovedFetching:false});
        ////TODO: ERROR CASE NEED TO BE HANDLED
    }
    fetchCartAgain = (sb, eb) => {
        let reqObj = createReqObjForCart();
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
            successCb: sb,
            errorCb: eb, //TODO: ERROR CASE NEED TO BE HANDLED 
            dontShowMessage: true
        })
    }
callUpdateQuantityApi=(item,newQty)=>{
    let reqObj = {
        "api_token": localStorage.getItem("Token"),
        cart_rid: item.cart_rid,
        cart_id:localStorage.getItem("cart_id"),
        qty: newQty,
        product_id: item.product_id
    }
    if (newQty == 0) {
        this.handleCartRemoveItem(item);
        return;
    }
    genericPostData({
        dispatch: this.props.dispatch,
        reqObj,
        url: "/api/cart/updateitem",
        identifier: "CART_ITEM_UPDATE",
        successCb: this.fetchCartAgain,
        errorCb: this.errorUpdateQuantity,
        dontShowMessage: true
    })
}

    updateQty = (item, d, index) => {
        let qty = item.qty;
        if (qty == 0 && d == -1) {
            return;
        }
        let newQty = qty + d;
        this.state.cartItems[index].qty = newQty;
        this.state.cartItems[index].row_total = (parseFloat(this.state.cartItems[index].product_price) * parseInt(newQty)).toFixed(2);
        if (this.timeOutId) {
            console.log(this.timeOutId,"timeoutid outside");
            if(this.item.product_id!=item.product_id){  //This is the case when diffrent product qunatity is clicked
               this.callUpdateQuantityApi(this.item,this.newQty);   // we are doing immediate api call in this case
            }        
            clearTimeout(this.timeOutId)
        }

        this.newQty = newQty; //saving to global variable that would be execute after one second
        this.item = item; //saving to global variable that would be execute after one second

        //logic that settles down the event for one second than make api calls
        this.timeOutId = setTimeout(() => {
            this.callUpdateQuantityApi(this.item,this.newQty);
           this.timeOutId = null //clearing the last timeout id
        }, 800);
        this.setState({ cartItems: this.state.cartItems })
    }
    errorUpdateQuantity = (err) => {
        //HIGH IMPORTANCE TODO: ERROR CASE NEED TO BE HANDLED 
    }
    CartItemsRenderer = () => {
        return this.state.cartItems.map((item, key) => {
            return (
                <React.Fragment>

                    <Row className="no-gutters mb-4">
                        <Col className="d-flex order-2 order-md-1 align-self-start">
                            <div key={key} className="CarItemMain align-items-center justify-content-between no-gutters row" >
                                <div className="col-md-11 col-12 p-3 p-xl-3 cartItemChild">
                                    <div className="d-flex align-items-center cart-pro-img ">
                                        <img height={50} width={50} src={item.image} alt="Product Image" />
                                        <div className="d-none d-sm-block">{item.name}</div>
                                    </div>
                                    <div className="additems">
                                        <div className="d-block d-sm-none itemName">{item.name}</div>
                                        <div className="d-flex align-items-center justify-content-between addQty ">
                                        {!this.props.isCheckOut?<span onClick={() => this.updateQty(item, -1, key)} style={{ cursor: "pointer" }}><RemoveOutlinedIcon style={{ fontSize: 15 }} /></span>:null}
                                            <span class="Qty">{`   ${item.qty}   `}</span>
                                           {!this.props.isCheckOut?<span onClick={() => this.updateQty(item, +1, key)} style={{ cursor: "pointer" }} ><AddOutlinedIcon style={{ fontSize: 15 }} /></span>:null}
                                        </div>
                                        {this.props.cartIsFetching ? <span>Loading</span> : <span className="cartItemPrice">{item.row_total}</span>}
                                    </div>
                                    <div className="col-auto ml-3 d-block d-sm-none remove-cart-icon" onClick={() => this.handleCartRemoveItem(item)}>
                                        <div className="mb-2"><CloseOutlinedIcon style={{ fontSize: 25 }} /> </div>
                                    </div>

                                </div>
                               {!this.props.isCheckOut? <div className="col-auto ml-3 text-center d-none d-sm-block remove-cart-icon" onClick={() => this.handleCartRemoveItem(item)}>
                                    <div className="mb-2"><CloseOutlinedIcon style={{ fontSize: 25 }} /> </div>
                                    <div>Remove</div>
                                </div>:null}
                            </div>
                        </Col>
                    </Row>

                </React.Fragment>
            )
        })
    }
    render() {

        if(this.state.cartIsFetching||this.state.itemRemovedFetching){
            return <Loader/>
        }
        return (
            <>
                {this.CartItemsRenderer()}
            </>
        )
    }
}

function mapStateToProps(state) {
    let userSignInInfo = _get(state, 'userSignInInfo.lookUpData', []);

    return {
        userSignInInfo,
    }
}

export default connect(mapStateToProps, null)(CartItemList);
// export default CartItemList;