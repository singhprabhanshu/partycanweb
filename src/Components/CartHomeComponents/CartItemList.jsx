import React from "react";
import genericPostData from "../../Redux/Actions/genericPostData";
import { connect } from "react-redux";
import _ from "lodash";
import {Container, Row, Col} from 'reactstrap'
import proImg from '../../assets/images/party-can.png';


class CartItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cartItems:[]};
    }
    handleCartRemoveItem = (item) => {
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: {
                api_token: localStorage.getItem("Token"),
                cart_rid: item.cart_rid
            },
            url: "/api/cart/deleteitem",
            identifier: "CART_ITEM_REMOVE",
            successCb: this.fetchCartAgain,
            dontShowMessage: true
        })
    }
    fetchCartAgain = (data) => {
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
            successCb: this.cartFetchSuccess,
            errorCb: this.cartFetchError,
            dontShowMessage:true
        })
    }
    updateQty= (item,d,index)=>{
        let qty = item.qty;
        if(qty==0&&d==-1){
          return;
        }
        let newQty = qty+d;
        let reqObj = {
            "api_token":localStorage.getItem("Token"),
            cart_rid: item.cart_rid,
            qty:newQty,
            product_id:item.product_id
        }
        this.state.cartItems[index].qty = newQty;
        this.state.cartItems[index].row_total =  (parseFloat(this.state.cartItems[index].product_price)*parseInt(newQty)).toFixed(2);
        this.setState({cartItems:this.state.cartItems})
        
        if(newQty==0){
            this.handleCartRemoveItem(item);
            return;
        }
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: "/api/cart/updateitem",
            identifier: "CART_ITEM_UPDATE",
            successCb: this.fetchCartAgain,
            dontShowMessage: true
        })
    }
    CartItemsRenderer = () => {
        return this.state.cartItems.map((item, key) => {
            return (
                <React.Fragment>
                <Container fluid={true}>                
                    <Row className="no-gutters justify-content-lg-between secMinHeight">
                    <Col lg={5} className="order-1 d-none d-lg-block order-md-2">
                        <div className="productImgSection">
                                <img src={proImg} className="imgProduct img-responsive"></img>
                         </div>
                        </Col>
                        <Col lg={6} className="p-5  d-flex order-2 order-md-1">
                <div key={key} className="CarItemMain">
                    <div className="cartItemChild">
                        <div className="d-flex justify-content-lg-between align-items-center ">
                        <img height={50} width={50} src={item.image} alt="Product Image" />
                        <div>{item.name}</div>
                        </div>
                        <div>
                            <i onClick={()=>this.updateQty(item,-1,key)}  style={{cursor:"pointer"}} class="fa fa-minus-circle cart-minus-icon" aria-hidden="true"></i>
                             <span>{`   ${item.qty}   `}</span>
                              <i onClick={()=>this.updateQty(item,+1,key)} style={{cursor:"pointer"}} class="fa fa-plus-circle" aria-hidden="true"></i>
                        </div>
                        {this.props.cartIsFetching?<span>Loading</span>:<span>{item.row_total}</span>}
                    </div>
                    <div className="remove-cart-icon" onClick={() => this.handleCartRemoveItem(item)}>
                        <span>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </span>
                        <div>
                            Remove
                    </div>
                    </div>
                </div>
                 </Col>
                </Row>
                </Container>
               
            </React.Fragment>
            )
        })
    }
    static getDerivedStateFromProps(props, state) {
        let isArrayEqual = (x, y)=> {
            return _(x).xorWith(y, _.isEqual).isEmpty();
          };
        if (props.cartItems.length!=state.cartItems.length) {
          return {
            cartItems: props.cartItems
          };
        }
        return null;
      }
    render() {
        return (
            <>
                {this.CartItemsRenderer()}
            </>
        )
    }
}

export default CartItemList;