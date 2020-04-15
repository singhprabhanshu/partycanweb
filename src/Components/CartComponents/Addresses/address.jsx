
import React from 'react';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import { Button } from 'reactstrap';

import Scrollbar from "react-scrollbars-custom";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
// import AddressCard from './addressCard';
import AddressCard from './addressCardNew';
import AddAddressCard from './addAddressCard';
import { map as _map, findIndex as _findIndex, get as _get, isEmpty as _isEmpty } from 'lodash';
import genericGetData from "../../../Redux/Actions/genericGetData";
import genericPostData from '../../../Redux/Actions/genericPostData';
import { Form, Field } from 'react-final-form';
import {TextInputField, SwitchInputField} from '../../../Global/FormCompoents/wrapperComponent';
import RFReactSelect from '../../../Global/FormCompoents/react-select-wrapper';
import { Button as MaterialButtom } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import validate from './validaor/addAddressFormValidator';
import { commonActionCreater } from '../../../Redux/Actions/commonAction';
import {Container, Row, Col} from 'reactstrap'
import proImg from '../../../assets/images/party-can.png'
import { stateDropDown } from '../../../assets/data/dropdown';
import { Loader } from '../../../Global/UIComponents/LoaderHoc';
import { cleanEntityData } from '../../../Global/helper/commonUtil';
const styles = (state) => ({
    
    addressFormShow: {
        display: state.isAddressFormShown ? 'block' : 'none',
        width: 'auto',      
       
    },
    addressFormHide: {
        display: state.isAddressFormShown ? 'none' : 'block'
    },   

});

const options = _map(stateDropDown, s => cleanEntityData({
    value: _get(s, 'abbreviation'),
    label: _get(s, 'name')
}));

class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAddress: 0,
            userAddress: [],
            isAddressFormShown: false,
            selectedCardColor: 'green',
            isLoading: false,
        }
    }

    

    fetchAddressModify = (data) => {
        let addressList = [];
        if (_get(data, 'code') === 1) {
            addressList = _map(_get(data, 'data', []), (d, index) => ({
                type: _get(d, 'address_nickname'),
                name: _get(d, 'name'),
                id: _get(d, 'address_id'),
                street_1: _get(d, 'street1'),
                street_2: _get(d, 'street2'),
                city: _get(d, 'city'),
                state: _get(d, 'state'),
                country: _get(d, 'country'),
                zipcode: _get(d, 'zipcode'),
                phone: _get(d, 'telephone'),
                defaultAddress: _get(d, 'default_address'),
                isPrimary: (_get(d, 'default_address') === "1") ? true : false,
                address: `${_get(d, 'street1')}, ${_get(d, 'street2')},${_get(d, 'city')}, ${_get(d, 'state')}, ${_get(d, 'zipcode')}`
            }));
        }
        
    
        const primaryAddressIndex = _findIndex(addressList, ['isPrimary', true]);
        const splicedData = (primaryAddressIndex !== -1) ? addressList.splice(primaryAddressIndex, 1) : undefined;
        if(splicedData) {
            addressList.unshift(splicedData[0]);
        }
    
        const selectedAddress = addressList.find(add => {
            if (add.isPrimary === true) {
                return add;
            }
        })
    
        this.setState({
            selectedAddress: selectedAddress.id,
            userAddress: addressList,
            isLoading: false,
        });
    };

    fetchAddress = () => {
        this.setState({
            isLoading: true,
        });
        const userAddressFetchSuccess=(data)=>{
            this.fetchAddressModify(data);
        };
        const userAddressFetchError=(err)=>{
            console.log(err);
            this.setState({
                isLoading: false,
            });
        };
        let body = {
            api_token: _get(this.props, 'userDetails.api_token', ''),
            customerid: parseInt(_get(this.props, 'userDetails.customer_id', 0), 10)
        };
        genericPostData({
            dispatch:this.props.dispatch,
            reqObj: body,
            url:`/connect/customer/getaddresses?customerid=${_get(this.props, 'userDetails.customer_id', 0)}`,
            // url: '/card/new',
            constants:{
                init:"USER_ADDRESS_INIT",
                success:"USER_ADDRESS_SUCCESS",
                error:"USER_ADDRESS_ERROR" 
            },
            identifier:"USER_ADDRESS",
            successCb:userAddressFetchSuccess,
            errorCb:userAddressFetchError
        });
    };

    handleCardClick = (selectedId) => {
        this.setState({
            selectedAddress: selectedId
          });
    };

    handleAddAddress = () => {
        this.setState({
            isAddressFormShown: this.state.isAddressFormShown ? false : true
        });
    };

    componentDidMount(){
        if (!_isEmpty(this.props.userDetails)) {
            this.fetchAddress();
        }
        
        

        
        // if(this.props.sessionRedirectToLogin){
        //     this.setState({currentStep:3});
        //     this.props.dispatch(commonActionCreater(false,'SESSION_START_REDIRECT_TO_LOGIN'));
        // }
    };

    addUserAddressSuccess = (data) => {
        this.setState({
            isAddressFormShown: this.state.isAddressFormShown ? false : true
        });
        this.fetchAddress(); 
    };

    addUserAddressError = (err) => {
        console.log(err)
    };

    onSubmit  = async values => {
        let body = {
            'first_name': _get(values, 'firstName'),
            'last_name': _get(values, 'lastName'),
            'street1': _get(values, 'address'),
            'street2': _get(values, 'address2'),
            'city': _get(values, 'city'),
            'state': _get(values, 'state'),
            'zipcode': _get(values, 'zip'),
            'nickname': _get(values, 'addressNickname'),
            'telephone': _get(values, 'phone'),
            'default_address': _get(values, 'defaultAddress') ? '1' : '0',
            'country': 'USA',
      
        };
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: body,
            url: `/connect/customer/addaddress?customerid=${_get(this.props, 'userDetails.customer_id', 0)}`,
            constants: {
                init: 'POST_USER_ADDRESSES_INIT',
                success: 'POST_USER_ADDRESSES_SUCCESS',
                error: 'POST_USER_ADDRESSES_ERROR'
            },
            identifier: 'POST_USER_ADDRESSES',
            successCb: this.addUserAddressSuccess,
            errorCb: this.addUserAddressError,
        });
            
          
    };

    handleCardSelect = () => {
        let cartFlow = this.props.cartFlow;
        let data = {
            ...cartFlow,
            selectedAddress: this.state.selectedAddress,
        };
        this.props.dispatch(commonActionCreater(data,'CART_FLOW'));
        this.props.handleTabOnContinue('speed');
    }


    
    render() {
        const { isLoading } = this.state;
        if (isLoading) {
        return <Loader />
        }
        const { classes } = this.props;
        let addresses = this.state.userAddress.map(a => {
            return (
                <React.Fragment key={a.id}>
                        <AddressCard
                    data={a}
                    handleCardClick={this.handleCardClick}
                    selectedAddress={this.state.selectedAddress}
                    selectedCardColor={this.state.selectedCardColor} 
                />
                </React.Fragment>
                
            );
        });
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
                        <Scrollbar className="leftSecmaxHeight">
                            <div className="pr-lg-4" > 
                                <div style={styles(this.state).addressFormHide}>                                
                                        <div className="block-title mb-4">SAVED ADDRESSES</div>
                                        <div className="d-flex flex-wrap CardsWrapper">
                                            <AddAddressCard handleAddAddress={this.handleAddAddress} />
                                            {addresses}
                                        </div> 
                                        <div className="text-left mt-4" >
                                            <Button variant="contained" color="primary" className="bottomActionbutton cartActionBtn" onClick={this.handleCardSelect}>
                                                <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" /> SAVE & CONTINUE
                                            </Button>
                                        </div> 
                                </div>
                                <div style={styles(this.state).addressFormShow}> 
                            <div className="bread-crumb mb-4"><KeyboardBackspaceIcon style={{fontSize:13, marginRight:10}} />ADDRESS</div>
                            
                            <Form onSubmit= {this.onSubmit} validate={validate}
                                    render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                <div className="block-title d-flex justify-content-between align-items-center mb-4">                            
                                ADD NEW ADDRESSES
                                <span className="d-flex align-items-center">
                                    <Field name="defaultAddress" component={SwitchInputField} label='DEFAULT ADDRESS' />
                                </span>
                                </div>
                                    <div className="d-flex mt-4">
                                        <div style={{ width: '50%', marginRight: 50}}>
                                            <Field name="firstName" component={TextInputField} placeholder='FIRST NAME'
                                            autoFocus={false} type='text' />
                                        </div>
                                        <div style={{ width: '50%'}}>
                                            <Field name="lastName" component={TextInputField} placeholder='LAST NAME'
                                            autoFocus={false} type='text' />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Field name="address" component={TextInputField} placeholder='ADDRESS'
                                        autoFocus={false} type='text' />
                                    </div>
                                    <div className="mt-4">
                                        <Field name="address2" component={TextInputField} placeholder='ADDRESS 2'
                                        autoFocus={false} type='text' />
                                    </div>
                                    <div className="mt-4">
                                        <Field name="city" component={TextInputField} placeholder='CITY'
                                        autoFocus={false} type='text' />
                                    </div>
                                    <div className="d-flex mt-4">
                                            {/* <Field name="state" component={TextInputField} placeholder='STATE'
                                            autoFocus={false} type='text' />
                                            <Field name="zip" component={TextInputField} placeholder='ZIP'
                                            autoFocus={false} type='text' />         */}
                                        <div style={{ width: '50%', marginRight: 50}}>
                                            <Field name="state" component={RFReactSelect} placeholder='STATE'
                                            autoFocus={false} type='text' options={options} />
                                        </div>
                                        <div style={{ width: '50%'}}>
                                            <Field name="zip" component={TextInputField} placeholder='ZIP'
                                            autoFocus={false} type='text' />
                                        </div>
                                        
                                    </div>
                                    <div className="mt-4">
                                        <Field name="addressNickname" component={TextInputField} placeholder='ADDRESS NICKNAME'
                                        autoFocus={false} type='text' />
                                    </div>
                                    <div className="mt-4">
                                        <Field name="phone" component={TextInputField} placeholder='phone'
                                        autoFocus={false} type='text' />
                                    </div>
                                    
                                                                

                                    <div className="text-left mt-4" >
                                        <Button variant="contained" color="primary" className="bottomActionbutton cartActionBtn" type="submit">
                                            <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" /> SAVE ADDRESS
                                        </Button>
                                    </div> 
                                </form>)}
                                />
                        </div>
                            </div>
                            </Scrollbar>
                        </Col>
                        
                    </Row>
                </Container>
               
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let cartFlow = _get(state, 'cartFlow.lookUpData', {});
    let userInfo = _get(state, 'userSignInInfo.lookUpData', []);
    let userDetails = _get(userInfo, '[0].result', {});
    return {
        cartFlow,
        userDetails,
    };
};

export default connect(mapStateToProps)(Address);