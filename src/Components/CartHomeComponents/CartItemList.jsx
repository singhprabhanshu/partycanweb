import React from "react";
import genericPostData from "../../Redux/Actions/genericPostData";
import { connect } from "react-redux";
import _ from "lodash";
import {Container, Row, Col} from 'reactstrap'
import proImg from '../../assets/images/party-can.png';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';



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
                    <Row className="no-gutters">
                        <Col className="d-flex order-2 order-md-1 align-self-start">
                            <div key={key} className="CarItemMain align-items-center justify-content-between no-gutters row" >
                                <div className="col-md-11 col-12 p-4 p-xl-5 cartItemChild">
                                    <div className="d-flex align-items-center cart-pro-img ">
                                        <img height={50} width={50} src={item.image} alt="Product Image" />
                                        <div className="d-none d-sm-block">{item.name}</div>
                                    </div>
                                    <div className="additems">
                                    <div className="d-block d-sm-none itemName">{item.name}</div>
                                    <div className="d-flex align-items-center justify-content-between addQty ">
                                       <span onClick={()=>this.updateQty(item,-1,key)}  style={{cursor:"pointer"}}><RemoveOutlinedIcon style={{ fontSize: 15 }} /></span>
                                        <span class="Qty">{`   ${item.qty}   `}</span>
                                        <span onClick={()=>this.updateQty(item,+1,key)} style={{cursor:"pointer"}} ><AddOutlinedIcon style={{ fontSize: 15 }} /></span>
                                    </div>
                                    {this.props.cartIsFetching?<span>Loading</span>:<span className="cartItemPrice">{item.row_total}</span>}
                                    </div>
                                    <div className="col-auto ml-3 d-block d-sm-none remove-cart-icon" onClick={() => this.handleCartRemoveItem(item)}>
                                        <div className="mb-2"><CloseOutlinedIcon style={{ fontSize: 25 }} /> </div> 
                                    </div>

                                </div>
                                <div className="col-auto ml-3 text-center d-none d-sm-block remove-cart-icon" onClick={() => this.handleCartRemoveItem(item)}>
                                    <div className="mb-2"><CloseOutlinedIcon style={{ fontSize: 25 }} /> </div> 
                                    <div>Remove</div>
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