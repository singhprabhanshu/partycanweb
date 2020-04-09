
import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
// import genericGetData from "../../../Redux/Actions/genericGetData";
import genericPostData from '../../../Redux/Actions/genericPostData';
import { Button } from 'reactstrap';
import { get as _get, map as _map, find as _find, findIndex as _findIndex, isEmpty as _isEmpty } from 'lodash';
import { cleanEntityData } from '../../../Global/helper/commonUtil';
import SpeedCard from './speedCard';
import RetailerCard from './retailerCard';
import ShippingMethodCard from './shippingMethodCard';
import DateCard from './dateCard';
import TimeCard from './timeCard';
import moment from 'moment';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { commonActionCreater } from '../../../Redux/Actions/commonAction';
import { blue } from '@material-ui/core/colors';
import {Container, Row, Col} from 'reactstrap'
import proImg from '../../../assets/images/party-can.png'
import { Loader } from '../../../Global/UIComponents/LoaderHoc';
import Scrollbar from "react-scrollbars-custom";
const styles = theme => ({
  root: {    
    background: '#00BFB2',
    // background: 'White',
    height: '50px',
    'border-bottom': '1px solid white',
    'border-radius': '0px 0px 25px 25px',
    // opacity: 0.38
  },

});

class Speed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryList: [],
      // selectedSpeed: {},
      selectedCardColor: '#00BFB2',
      isLoading: false,
    }
  }
  selection = {
    name: '1 Hour Delivery',
    retailerCardHeight: 75,
    retailerCardWidth: 150,
    retailerNameFontSize: 12,
    retailerDeliveryRateFontSize: 10,
    retailerPriceFontSize: 16,
    retialerAddressFontSize: 10
  };

  selectRetailer ({ selectedSpeedDelivery }) {
    let selectedRetailer = selectedSpeedDelivery &&  selectedSpeedDelivery.retailers.find(del => {
      if (del.isPrimary === true) {
        return del;
      }
    });
    this.setState({
      // ...this.state,
      selectedRetailer,
      selectedRetailerId: selectedRetailer.id
    });
    return selectedRetailer;
  };

  selectDeliverySpeed ({ deliveryList }) {
    let selectedSpeedDelivery = deliveryList && deliveryList.speed.find(del => {
      if (del.isPrimary === true) {
        return del;
      }
    });
    this.setState({
      // ...this.state,
      selectedSpeed: selectedSpeedDelivery,
      selectedSpeedDeliveryId: selectedSpeedDelivery.id
    });
    this.selection['name'] = selectedSpeedDelivery.name;
    return selectedSpeedDelivery;
  }

  selectShipping ({ selectedRetailer, selectedSpeedDelivery }) {
    let selectedShippingMethod = selectedRetailer && selectedSpeedDelivery && selectedSpeedDelivery.ship_methods && selectedSpeedDelivery.ship_methods[selectedRetailer.index].find(del => {
      if (del.isPrimary === true) {
        return del;
      }
    });

    if (!_isEmpty(selectedShippingMethod)) {
      this.setState({
        // ...this.state,
        selectedShippingMethod: selectedShippingMethod,
        selectedShippingMethodId: selectedShippingMethod.id,
        // selectedTime: _get(selectedSpeedDelivery, 'name') === '1 Hour Delivery' ? selectedShippingMethod.id : undefined, // just shipping time is taken as time selection
      });
      return selectedShippingMethod;
    }
    return null;
    
  }

  componentDidMount() {

    const mapRetailers = ({ data }) => _map(data, (d,index) => cleanEntityData({
      id: _get(d, 'id'),
      name: _get(d, 'name'),
      phone: _get(d, 'phone'),
      address: _get(d, 'address'),
      product_total: _get(d, 'product_total'),
      desc: _get(d, 'desc'),
      distance: _get(d, 'distance'),
      ready_time: _get(d, 'ready_time'),
      isPrimary: (index === 0) ? true : false,
      index

    }));

    const mapShipMethods = ({ data }) => _map(data, (d, index) => cleanEntityData({
      method: _get(d, 'method'),
      amount: _get(d, 'amount'),
      delivery_date: _get(d, 'delivery_date'),
      id: _get(d, 'id')? _get(d, 'id') :  index,
      fee: _get(d, 'fee'),
      duration: _get(d, 'duration'),
      dropoff_eta: _get(d, 'dropoff_eta'),
      isPrimary: (index === 0) ? true : false,
      index
    }));

    const deliveryOptionsMetaData = {
      'Courier Delivery': '2 ~ 3 DAYS',
      '1 Hour Delivery': '~ 1 HOUR',
      'Store Pickup': 'READY IN 1 HOUR'
    };

    const deliveryOptionsFetchSuccess = (data) => {
      
      let deliveryList = {
        speed: _map(_get(data, 'speed'), (d, index) => cleanEntityData({
          id: _get(d, 'speed_id'),
          description: _get(d, 'description'),
          duration: _get(deliveryOptionsMetaData, _get(d, 'name')), 
          name: _get(d, 'name'),
          retailers: mapRetailers({ data: _get(d, 'retailers')}),
          ship_methods: _map(_get(d, 'ship_methods'), s => mapShipMethods({ data: s})),
          isPrimary: (index === 0) ? true : false
        })),
        
        // retailer: _map(_get(data, 'data.retailer'), (d, index) => ({
        //   id: _get(d, 'id'),
        //   description: _get(d, 'description'),
        //   name: _get(d, 'name'),
        //   address: _get(d, 'address'),
        //   price: _get(d, 'price'),
        //   delivery_rate: _get(d, 'delivery_rate'),
        //   distance: _get(d, 'distance'),
        //   isPrimary: (index === 0) ? true : false
        // })),
        // date: _map(_get(data, 'data.date'), (d, index) => ({
        //   id: _get(d, 'id'),
        //   date: _get(d, 'date'),
        //   description: _get(d, 'description'),
        //   isPrimary: (index === 0) ? true : false
        // })),
        // time: _map(_get(data, 'data.time'), (d, index) => ({
        //   id: _get(d, 'id'),
        //   time: _get(d, 'time'),
        //   description: _get(d, 'description'),
        //   isPrimary: (index === 0) ? true : false
        // })),
        // shipping_method: _map(_get(data, 'data.shipping_method'), (d, index) => ({
        //   id: _get(d, 'id'),
        //   name: _get(d, 'name'),
        //   rate: _get(d, 'rate'),
        //   description: _get(d, 'description'),
        //   isPrimary: (index === 0) ? true : false
        // }))
      };

      

      
      this.setState({
        // ...this.state,
        deliveryList: deliveryList
      });
      const selectedSpeed = this.selectDeliverySpeed({ deliveryList });
      
      const selectedRetailer = this.selectRetailer({ selectedSpeedDelivery: selectedSpeed });
      // console.log(selectedRetailer, 'retailer selected');
      // let selectedDate = this.deliveryList && this.deliveryList.date.find(del => {
      //   if (del.isPrimary === true) {
      //     return del;
      //   }
      // });

      // let selectedTime = this.deliveryList && this.deliveryList.time.find(del => {
      //   if (del.isPrimary === true) {
      //     return del;
      //   }
      // });
      // debugger;
      this.selectShipping({ selectedRetailer, selectedSpeedDelivery: selectedSpeed});
      this.setState({
        isLoading: false
      });
      // this.setState({
      //   ...this.state,
      //   deliveryList: deliveryList,
      //   // selectedSpeed: selectedSpeedDelivery,
      //   // selectedRetailer: selectedRetailer,
      //   // selectedShippingMethod: selectedShippingMethod,
      //   // selectedSpeedDeliveryId: selectedSpeedDelivery.id,
      //   // selectedRetailerId: selectedRetailer.id,
      //   // selectedShippingMethodId: selectedShippingMethod.id,
      //   // selectedDate: selectedDate.id,
      //   // selectedTime: selectedTime.id
      // });

    };



    const deliveryOptionsFetchError = (err) => {
      console.log(err);
      this.setState({
        isLoading: false
      });
    };

    let body = {
      api_token: "1c779ca336234ffc6a98807a6d36140e",
      cart_id:"26234",
      delivery_address_id: "2517"
    }
    this.setState({
      isLoading: true,
    });
    genericPostData({
      dispatch: this.props.dispatch,
      reqObj: body,
      url: '/api/shipping',
      constants: {
          init: 'FETCH_DELIVERY_OPTIONS_INIT',
          success: 'FETCH_DELIVERY_OPTIONS_SUCCESS',
          error: 'FETCH_DELIVERY_OPTIONS_ERROR'
      },
      identifier: 'FETCH_DELIVERY_OPTIONS',
      successCb: deliveryOptionsFetchSuccess,
      errorCb: deliveryOptionsFetchError,
  });
  }

  _changeOpacity = async (selectedId) => {
    const selectedSpeed = _find(_get(this.state.deliveryList, 'speed', []), ['id', selectedId]);
    this.setState({
      selectedSpeedDeliveryId: selectedId,
      selectedSpeed: selectedSpeed,
    });
    const selectedRetailer = this.selectRetailer({ selectedSpeedDelivery: selectedSpeed });
    this.selectShipping({ selectedRetailer: selectedRetailer, selectedSpeedDelivery: selectedSpeed});
    
    if (_get(selectedSpeed, 'name') === '1 Hour Delivery') {
      this.selection = {
        name: '1 Hour Delivery',
        retailerCardHeight: 75,
        retailerCardWidth: 150,
        retailerNameFontSize: 12,
        retailerDeliveryRateFontSize: 10,
        retailerPriceFontSize: 16,
        retialerAddressFontSize: 10
      };
    } else if (_get(selectedSpeed, 'name') === 'Courier Delivery') {
      this.selection = {
        name: 'Courier Delivery',
        retailerCardHeight: 75,
        retailerCardWidth: 150,
        retailerNameFontSize: 12,
        retailerPriceFontSize: 16,
      };
    } else if (_get(selectedSpeed, 'name') === 'Store Pickup') {
      this.selection = {
        name: 'Store Pickup',
        retailerCardHeight: 200,
        retailerCardWidth: 150,
        retailerNameFontSize: 16,
        retailerPriceFontSize: 16,
        retailerAddressFontSize: 10,
        retailerDistanceFontSize: 8 
      }
    }
  };

  _changeRetailerOpacity = (selectedId) => {
    
    const newSelectedRetailer = _find(_get(this.state.selectedSpeed, 'retailers', []), ['id', selectedId]);
    this.setState({
      selectedRetailerId: selectedId,
      selectedRetailer: newSelectedRetailer
    });
  };

  _changeShippingMethodOpacity = (selectedId) => {
    this.setState({
      selectedShippingMethodId: selectedId
    })
  };

  _changeTimeOpacity = (selectedId) => {
    this.setState({
      selectedTime: selectedId
    });
  };

  handleDeliverySelect = async () => {
    const deliveryOptions = cleanEntityData({
      selectedSpeedID: _get(this.state, 'selectedSpeedDeliveryId'),
      selectedRetailerID: _get(this.state, 'selectedRetailerId'),
      selectedShippingMethodID: _get(this.state, 'selectedShippingMethodId'),
    });

    let cartFlow = this.props.cartFlow;
    let data = {
        ...cartFlow,
        ...deliveryOptions,
    };
    this.props.dispatch(commonActionCreater(data,'CART_FLOW'));
    this.props.handleTabOnContinue('card');

    // const selectedSpeedId = _get(this.state, 'selectedSpeedDelivery');
    // const selectedSpeed = _find(_get(this.deliveryList, 'speed', []), ['id', selectedSpeedId]);
    // if (_get(selectedSpeed, 'name') === 'cold_now') {
    //   deliveryOptions = cleanEntityData({
    //     selectedSpeed: _get(this.state, 'selectedSpeedDelivery'),
    //     selectedRetailer: _get(this.state, 'selectedRetailer'),
    //     selectedDate: _get(this.state, 'selectedDate'),
    //     selectedTime: _get(this.state, 'selectedTime')
    //   });
    // } else if (_get(selectedSpeed, 'name') === 'shipped') {
    //   deliveryOptions = cleanEntityData({
    //     selectedSpeed: _get(this.state, 'selectedSpeedDelivery'),
    //     selectedRetailer: _get(this.state, 'selectedRetailer'),
    //     selectedShippingMethod: _get(this.state, 'selectedShippingMethod')
    //   })
    // } else if (_get(selectedSpeed, 'name') === 'pickup') {
    //   deliveryOptions = cleanEntityData({
    //     selectedSpeed: _get(this.state, 'selectedSpeedDelivery'),
    //     selectedRetailer: _get(this.state, 'selectedRetailer')
    //   })
    // }
  
    // let constants = {
    //   init: 'CART_FLOW_CUSTOM_INIT',
    // };
    // let identifier = 'CART_FLOW';
    // let key = 'cartFlow';
    // let cartFlow = this.props.cartFlow;
    // let data = {
    //   ...cartFlow,
    //   ...deliveryOptions,
    // };
    // this.props.dispatch(setCustomKeyData(data, constants, identifier, key))
    // this.props.navigation.navigate('Card', {isPaymentCard: true});
  }

  render() {
    // loader
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loader />
    }


    let speed = this.state.deliveryList && this.state.deliveryList.speed && this.state.deliveryList.speed.map(a => {
      return (
        <React.Fragment key={a.id}>
          <SpeedCard
            data={a}
            changeOpactiy={this._changeOpacity}
            selectedCardColor={this.state.selectedCardColor}
            selectedTransportAddress={this.state.selectedSpeedDeliveryId}
          />
        </React.Fragment>


      );
    });
    let retailer = this.state.selectedSpeed && this.state.selectedSpeed.retailers.map(r => {
      return (
        <React.Fragment key={r.id}>
          <RetailerCard
            data={r}
            selection={this.selection}
            changeRetailerOpacity={this._changeRetailerOpacity}
            selectedRetailer={this.state.selectedRetailerId}
            selectedCardColor={this.state.selectedCardColor}
          />
        </React.Fragment> 
      )
    });

    let selectDate = this.state.selectedRetailer && this.state.selectedSpeed && this.state.selectedSpeed.ship_methods && this.state.selectedSpeed.ship_methods[this.state.selectedRetailer.index].map(sm => {
      let date;
      if (_get(sm, 'dropoff_eta')) {
        date = moment(_get(sm, 'dropoff_eta')).format("D MMM");
      }
      return (
        <React.Fragment>
          <DateCard
          data={sm}
          date={date}
          selectedShippingMethod={this.state.selectedShippingMethodId}
          // selectedDate={this.state.selectedDate}
          selectedCardColor={this.state.selectedCardColor}
          changeShippingMethodOpacity={this._changeShippingMethodOpacity}
        />
        </React.Fragment>
        
      )
    });
    let availableTime;
    if (_get(this.state, 'selectedSpeed.name', '') === '1 Hour Delivery') {
        availableTime = '1 PM';
      // availableTime = moment(_get(this.state, 'selectedShippingMethod.dropoff_eta').format("H A"));   
    }

    // let selectTime = this.state.deliveryList && this.state.deliveryList.time.map(st => {
    //   return (
    //     <TimeCard
    //       data={st}
    //       changeTimeOpacity={this._changeTimeOpacity}
    //       selectedTime={this.state.selectedTime}
    //     />
      // )
    // });


    let shippingMethod = this.state.selectedRetailer && this.state.selectedSpeed && this.state.selectedSpeed.ship_methods && this.state.selectedSpeed.ship_methods[this.state.selectedRetailer.index].map(sm => {
      // console.log('============deliveryDate', sm);
      // const deliveryDate = sm.delivery_date.toString();
      const date1 = new Date();
      const date2 = new Date(sm.delivery_date);
      
      const differenceInTime = date2.getTime() - date1.getTime();
      const differenceInDays = differenceInTime/(1000 * 3600 * 24);
      const ceiledDays = Math.ceil(differenceInDays);
      return (
        <React.Fragment key={sm.id}>
            <ShippingMethodCard
            data={sm}
            changeShippingMethodOpacity={this._changeShippingMethodOpacity}
            selectedShippingMethod={this.state.selectedShippingMethodId}
            selectedCardColor={this.state.selectedCardColor}
            estimatedShippingTime={ceiledDays}
          />
        </React.Fragment>
        
      )
    });


    // const { classes } = this.props;
    return (    
      <Container fluid={true}>                
      <Row className="no-gutters justify-content-lg-between secMinHeight">
                    <Col lg={5} className="order-1 d-none d-lg-block order-md-2">
                          <div className="productImgSection">
                                  <img src={proImg} className="imgProduct img-responsive"></img>
                          </div>
                     </Col>
                    <Col lg={6}  className="p-5 d-flex order-2 order-md-1">                         
                    <div className="block-title mb-5">Delivery Options</div>
                    <Scrollbar className="leftSecmaxHeight">
                            <div className="pr-lg-4" > 
                    <div className="d-flex flex-column">

                        <div className="d-flex flex-column mb-5 ">
                          <div className="block-sub-title">Select Speed</div>
                          <div className="d-flex flex-lg-wrap CardsWrapper">{speed}</div>
                        </div>
                   

                       <div className="d-flex flex-column mb-5 ">
                          <div className="block-sub-title">Select Retailer</div>
                          <div className="d-flex flex-lg-wrap CardsWrapper">{retailer}</div>
                      </div>

                      { this.selection.name === 'Courier Delivery' ?
                        <div className="d-flex flex-column mb-5 ">
                            <div className="block-sub-title ">Select Delivery Options</div>
                            <div className="d-flex flex-lg-wrap CardsWrapper">{shippingMethod}</div>
                      </div>
                      : null}

                      { this.selection.name === '1 Hour Delivery' ?
                       <div className="d-flex flex-column mb-5 ">
                        <div className="block-sub-title">Select Date</div>
                        <div className="d-flex flex-lg-wrap CardsWrapper">{selectDate}</div>
                       </div>
                      : null}

                      {  (!_isEmpty(availableTime)) ?
                         <div className="d-flex flex-column mb-5 ">
                          <div className="block-sub-title">Select Time</div>
                          <div className="d-flex flex-lg-wrap CardsWrapper">
                            <TimeCard
                              availableTime={availableTime}
                              fee={_get(this.state, 'selectedShippingMethod.fee', '')}
                              // changeTimeOpacity={this._changeTimeOpacity}
                              selectedTime={this.state.selectedTime}
                              selectedCardColor={this.state.selectedCardColor}
                            />
                         </div>
                         </div>
                      : null}  
                   </div> 
                        </div>
                        </Scrollbar>
                  <div className="text-left mt-4" >
                      <Button variant="contained" color="primary" className="bottomActionbutton cartActionBtn" onClick={this.handleDeliverySelect}>
                          <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" /> CONTINUE
                      </Button>
                
                  </div>
        </Col>                        
      </Row>
  </Container>     
    );
  }
}





// _changeDateOpacity = (selectedId) => {
//   this.setState({
//     selectedDate: selectedId
//   });
// };





// _moveToAddAddressScreen = async () => {
//   this.props.navigation.navigate('AddAddress');
// };



const mapStateToProps = (state) => {
  let cartFlow = _get(state, 'cartFlow.lookUpData', {});
    return {
        cartFlow,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Speed));