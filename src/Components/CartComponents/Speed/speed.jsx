
import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import genericPostData from '../../../Redux/Actions/genericPostData';
import { Button } from 'reactstrap';
import { get as _get, map as _map, find as _find, findIndex as _findIndex, isEmpty as _isEmpty, sortBy as _sortBy } from 'lodash';
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
import {isMobile, isTablet} from 'react-device-detect';
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

const speedIdFromService = {
  coldNow: 1,
  shipping: 2, 
  pickup: 3
};

class Speed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryList: [],
      // selectedSpeed: {},
      selectedCardColor: '#00BFB2',
      isLoading: false,
      primarySelected: false,
      pickupDuration: null,
      coldNowTime: null,
    }
  }
  selection = {
    name: '1 Hour Delivery',
    speed_id: 1,
    retailerCardHeight: 75,
    retailerCardWidth: 150,
    retailerNameFontSize: 12,
    retailerDeliveryRateFontSize: 10,
    retailerPriceFontSize: 16,
    retialerAddressFontSize: 10
  };

  selectRetailer ({ selectedSpeedDelivery }) {
    let selectedRetailer = selectedSpeedDelivery && selectedSpeedDelivery.retailers &&  selectedSpeedDelivery.retailers.find(del => {
      if (del.isPrimary === true) {
        return del;
      }
    });
    if (!_isEmpty(selectedRetailer)) {
      this.setState({
        // ...this.state,
        selectedRetailer,
        selectedRetailerId: selectedRetailer.id
      });
    }

    if (!_isEmpty(selectedRetailer) && (_get(selectedSpeedDelivery, 'id') === speedIdFromService.pickup)) {
      this.setState({
        pickupDuration: _get(selectedRetailer, 'ready_time', null)
      });
    }
    
    return selectedRetailer;
  };

  selectDeliverySpeed ({ deliveryList }) {
    let selectedSpeedDelivery = deliveryList && deliveryList.speed && deliveryList.speed.find(del => {
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

      // coldNow time
      if ( !_isEmpty(selectedSpeedDelivery) && _get(selectedSpeedDelivery, 'id', -1) === speedIdFromService.coldNow && !_isEmpty(selectedShippingMethod)) {
    
        if (_get(selectedShippingMethod, 'dropoff_eta')) {
          const marker = moment.parseZone(_get(selectedShippingMethod, 'dropoff_eta')).format("A");
          const hourMin = moment.parseZone(_get(selectedShippingMethod, 'dropoff_eta')).format("h:m");
          let [hour, min] = hourMin.split(':');
          if (min > 0) {
            hour = hour && Number(hour) + 1;
          };
          let availableTime =  `${hour} ${marker}`;
          this.setState({
            coldNowTime: availableTime
          })
        }
        
      }
      return selectedShippingMethod;
    }
    return null;
    
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let cartTabValidation = this.props.cartTabValidation;

    let data = {
      ...cartTabValidation,
      isSpeedTab: true,
      isCardTab: false,
      isSummaryTab: false
  };
  this.props.dispatch(commonActionCreater(data,'CART_TAB_VALIDATION'));

    const mapRetailers = ({ data }) => _map(data, (d,index) => cleanEntityData({
      id: _get(d, 'id'),
      name: _get(d, 'name'),
      phone: _get(d, 'phone'),
      address: _get(d, 'address'),
      product_total: _get(d, 'product_total'),
      desc: _get(d, 'desc'),
      distance: _get(d, 'distance'),
      ready_time: _get(d, 'ready_time'),
      delivery_fee: _get(d, 'delivery_fee'),
      isPrimary: (index === 0) ? true : false,
      index

    }));

    const mapShipMethods = ({ data }) => {
      let shortedShipMethods = _sortBy(data, [function(o)
        {
          if(_get(o, 'amount')){
            let amount = _get(o, 'amount', 0);
            let intAmount = parseInt(amount, 10);
            return intAmount;
          }
          
      }]);
      let response = _map(shortedShipMethods, (d, index) => cleanEntityData({
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
      return response;
    };

    const findPrimarySpeed = ({ data, index }) => {
      const ship_methods = _map(_get(data, 'ship_methods', []), s => mapShipMethods({ data: s}));
      const retailers =  mapRetailers({ data: _get(data, 'retailers', [])});
      const cleanedShipMethods = cleanEntityData({ ship: ship_methods });
      if (index !== 2 && !_isEmpty(cleanedShipMethods)) {
        this.setState({
          primarySelected: true,
        });
        return true;
      } else if ( index === 2 && !_isEmpty(retailers)) {
        this.setState({
          primarySelected: true,
        });
        return true;
      } else {
        return false;
      }
    };

    const findPointerEnable = ({ data, index }) => {
      const ship_methods = _map(_get(data, 'ship_methods', []), s => mapShipMethods({ data: s}));
      const retailers =  mapRetailers({ data: _get(data, 'retailers', [])});
      const cleanedShipMethods = cleanEntityData({ ship: ship_methods });
      if (!_isEmpty(cleanedShipMethods) && index !== 2) {
        return true;
      } else if (!_isEmpty(retailers) && index === 2) {
        return true;
      } else {
        return false;
      }
    }
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
          isPrimary: _get(this.state, 'primarySelected') ?  false : findPrimarySpeed({ data: d, index}),
          enablePointer: findPointerEnable({ data: d, index })
        })),
      };

      
      // pickup durations
      const pickupSpeed = _find(_get(deliveryList, 'speed'), ['id', _get(speedIdFromService, 'pickup')]);
      if (!_isEmpty(pickupSpeed)) {
        const duration = !_isEmpty(_get(pickupSpeed, 'retailers')) ? _get(pickupSpeed, 'retailers.0.ready_time', null): null; 
        this.setState({
          pickupDuration: duration
        });
      }

      
      this.setState({
        // ...this.state,
        deliveryList: deliveryList
      });
      const selectedSpeed = this.selectDeliverySpeed({ deliveryList });
      
      const selectedRetailer = this.selectRetailer({ selectedSpeedDelivery: selectedSpeed });
      
      this.selectShipping({ selectedRetailer, selectedSpeedDelivery: selectedSpeed});
      this.setState({
        isLoading: false
      });
      

    };



    const deliveryOptionsFetchError = (err) => {
      console.log(err);
      this.setState({
        isLoading: false
      });
    };

    let body = {
      // api_token: "1c779ca336234ffc6a98807a6d36140e",
      // cart_id:"26234",
      // delivery_address_id: "2517"
      api_token: _get(this.props, 'userDetails.api_token', ''),
      cart_id: localStorage.getItem("cart_id"),
      delivery_address_id: _get(this.props, 'cartFlow.selectedAddress', '0')
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
      dontShowMessage: true
   });
  }

  _changeOpacity = async (selectedId) => {
    const selectedSpeed = _find(_get(this.state.deliveryList, 'speed', []), ['id', selectedId]);
    this.setState({
      selectedSpeedDeliveryId: selectedId,
      selectedSpeed: selectedSpeed,
      primarySelected: true
    });
    const selectedRetailer = this.selectRetailer({ selectedSpeedDelivery: selectedSpeed });
    this.selectShipping({ selectedRetailer: selectedRetailer, selectedSpeedDelivery: selectedSpeed});
    
    if (_get(selectedSpeed, 'name') === '1 Hour Delivery') {
      this.selection = {
        name: '1 Hour Delivery',
        id: 1,
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
        id: 2,
        retailerCardHeight: 75,
        retailerCardWidth: 150,
        retailerNameFontSize: 12,
        retailerPriceFontSize: 16,
      };
    } else if (_get(selectedSpeed, 'name') === 'Store Pickup') {
      this.selection = {
        name: 'Store Pickup',
        id: 3,
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
    if (!_isEmpty(newSelectedRetailer)) {
      this.setState({
        selectedRetailerId: selectedId,
        selectedRetailer: newSelectedRetailer
      });
    }
    if (!_isEmpty(newSelectedRetailer) && (_get(this.state.selectedSpeed, 'id') === speedIdFromService.pickup)) {
      this.setState({
        pickupDuration: _get(newSelectedRetailer, 'ready_time', null)
      });
    }
    
  };

  _changeShippingMethodOpacity = (selectedId) => {
    let selectedShippingMethod = this.state.selectedRetailer && this.state.selectedSpeed && this.state.selectedSpeed.ship_methods && this.state.selectedSpeed.ship_methods[this.state.selectedRetailer.index].find(del => {
      if (del.id === selectedId) {
        return del;
      }
    });
    this.setState({
      selectedShippingMethodId: selectedId,
      selectedShippingMethod: selectedShippingMethod
      
    });
    // coldNow time
    if (  _get(this.state, 'selectedSpeed.id', -1) === speedIdFromService.coldNow && !_isEmpty(selectedShippingMethod)) {
    
      if (_get(selectedShippingMethod, 'dropoff_eta')) {
        const marker = moment.parseZone(_get(selectedShippingMethod, 'dropoff_eta')).format("A");
        const hourMin = moment.parseZone(_get(selectedShippingMethod, 'dropoff_eta')).format("h:m");
        let [hour, min] = hourMin.split(':');
        if (min > 0) {
          hour = hour && Number(hour) + 1;
        };
        let availableTime =  `${hour} ${marker}`;
        this.setState({
          coldNowTime: availableTime
        })
      }
      
    }
    
  };

  _changeTimeOpacity = (selectedId) => {
    this.setState({
      selectedTime: selectedId
    });
  };

  handleDeliverySelect = async () => {
    const findShippingId = () => {
      if (_get(this.state, 'selectedSpeedDeliveryId') === 2 || _get(this.state, 'selectedSpeedDeliveryId') === 3) {
        return -1;
      } else {
        return _get(this.state, 'selectedShippingMethodId');
      }
    };
    const findShippingMethod = () => {
      if (_get(this.state, 'selectedSpeedDeliveryId') === 2) {
        return _get(this.state, 'selectedShippingMethod.method');
      } else {
        return 'none';
      }
    }
    const findShippingAmount = () => {
      if (_get(this.state, 'selectedSpeedDeliveryId') === 2) {
        return _get(this.state, 'selectedShippingMethod.amount');
      } else if (_get(this.state, 'selectedSpeedDeliveryId') === 1) {
        return _get(this.state, 'selectedShippingMethod.fee');
      }
      else {
        return '0.00';
      }
    };

    const findDeliveryDate = () => {
      if (_get(this.state, 'selectedSpeedDeliveryId') === 2) {
        let delivery_date = _get(this.state, 'selectedShippingMethod.delivery_date', '');
        delivery_date = !_isEmpty(delivery_date) ? moment(delivery_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
        return delivery_date;
      } else if (_get(this.state, 'selectedSpeedDeliveryId') === 1) {
        let delivery_date = _get(this.state, 'selectedShippingMethod.dropoff_eta', '');
        delivery_date = !_isEmpty(delivery_date) ? moment(delivery_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
        return delivery_date;
      }
      else {
        return moment().format('YYYY-MM-DD');
      };
    };

    const deliveryOptions = cleanEntityData({
      selectedSpeedID: _get(this.state, 'selectedSpeedDeliveryId'),
      selectedRetailerID: _get(this.state, 'selectedRetailerId'),
      // selectedShippingMethodID:  _get(this.state, 'selectedSpeedDeliveryId') === 2 ? _get(this.state, 'selectedShippingMethodId') : null,
      selectedShippingMethodID: findShippingId(),
      selectedShippingMethod: findShippingMethod(),
      shippingAmount: findShippingAmount(),
      deliveryFee: _get(this.state, 'selectedRetailer.delivery_fee', '0.00'),
      deliveryDate: findDeliveryDate()
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

  renderContent = (speed,retailer,shippingMethod,selectDate,availableTime) => {
    let commonContent = <>
    <div className="scrollerwrapper" > 
                    <div className="d-flex flex-column">

                        <div className="d-flex flex-column mb-5 ">
                          <div className="block-sub-title">Select Speed</div>
                          <div className="d-flex flex-lg-wrap CardsWrapper">{speed}</div>
                        </div>
                   
                        { (!_isEmpty(_get(this.state, 'selectedSpeed.ship_methods', [])) && ( _get(this.state, 'selectedSpeed.id', -1) === 1 || _get(this.state, 'selectedSpeed.id', -1) === 2)) ? 
                        
                            <div className="d-flex flex-column mb-5 ">
                                <div className="block-sub-title">Select Retailer</div>
                                <div className="d-flex flex-lg-wrap CardsWrapper">{retailer}</div>
                            </div>
                            : _get(this.state, 'selectedSpeed.id', -1) === 3 ?
                              <div className="d-flex flex-column mb-5 ">
                                  <div className="block-sub-title">Select Retailer</div>
                                  <div className="d-flex flex-lg-wrap CardsWrapper">{retailer}</div>
                              </div>
                            : null }

                      { (_get(this.state, 'selectedSpeed.id', -1) === 2 && !_isEmpty(_get(this.state, 'selectedSpeed.ship_methods', []))) ?
                        <div className="d-flex flex-column mb-5 ">
                            <div className="block-sub-title ">Select Delivery Option</div>
                            <div className="d-flex flex-lg-wrap CardsWrapper">{shippingMethod}</div>
                      </div>
                      : null}

                      { (_get(this.state, 'selectedSpeed.id', -1) === 1 && !_isEmpty(_get(this.state, 'selectedSpeed.ship_methods', []))) ?
                       <div className="d-flex flex-column mb-5 ">
                        <div className="block-sub-title">Select Date</div>
                        <div className="d-flex flex-lg-wrap CardsWrapper">{selectDate}</div>
                       </div>
                      : null}

                      {  _get(this.state, 'selectedSpeed.id', -1) === speedIdFromService.coldNow ?
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
     </>
      return <div>{commonContent}</div>
    // if(isMobile || isTablet){
    //     return <div>{commonContent}</div>
    // }
    // else{
    // return <Scrollbar  className="leftSecmaxHeight">{commonContent}</Scrollbar>
    // }
  }

  render() {
    // loader
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loader />
    }

    // let availableTime;
    // if (_get(this.state, 'selectedSpeed.id', -1) === 1 && !_isEmpty(_get(this.state, 'selectedSpeed.ship_methods', []))) {
    //     // availableTime = '1 PM';
    //   if (_get(this.state, 'selectedShippingMethod.dropoff_eta')) {
    //     availableTime = moment.parseZone(_get(this.state, 'selectedShippingMethod.dropoff_eta')).format("h A"); 
    //   }
      
    // }

    let availableTime = this.state.coldNowTime;

    let retailer = this.state.selectedSpeed && this.state.selectedSpeed.retailers && this.state.selectedSpeed.retailers.map(r => {
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

    let speed = this.state.deliveryList && this.state.deliveryList.speed && this.state.deliveryList.speed.map(a => {
      return (
        <React.Fragment key={a.id}>
          <SpeedCard
            data={a}
            changeOpactiy={this._changeOpacity}
            selectedCardColor={this.state.selectedCardColor}
            selectedTransportAddress={this.state.selectedSpeedDeliveryId}
            availableTime={availableTime}
            speedIdFromService={speedIdFromService}
            pickupDuration={this.state.pickupDuration}
          />
        </React.Fragment>


      );
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

      // const date1 = new Date();
      // const date2 = new Date(sm.delivery_date);
      
      // const differenceInTime = date2.getTime() - date1.getTime();
      // const differenceInDays = differenceInTime/(1000 * 3600 * 24);
      // const ceiledDays = Math.floor(differenceInDays);

      const date = new Date(sm.delivery_date);
      const ceiledDays = _get(sm, 'delivery_date') ? moment.parseZone(date).format("DD-MMM") : '';
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
    const buttonDisable = !_get(this.state, 'primarySelected');
    return (    
      <Container fluid={true}>                
      <Row className="no-gutters justify-content-lg-between secMinHeight">
                    <Col lg={5} className="order-1 d-none d-lg-block order-md-2">
                          <div className="productImgSection">
                                  <img src={proImg} className="imgProduct img-responsive"></img>
                          </div>
                     </Col>
                    <Col lg={6}  className="p-xl-5 p-md-4 py-4 order-2 d-flex flex-column order-md-1">                                           
                    <div className="block-title mb-5">Choose a Delivery Options</div>
                    {this.renderContent(speed,retailer,shippingMethod,selectDate,availableTime)}                       
                    <div style={{ marginBottom: 10 }}>**Orders received by 3 PM CT will be processed same day</div>
                    <div className="text-left mt-4" >
                        <Button variant="contained" color="primary" className="bottomActionbutton cartActionBtn" onClick={this.handleDeliverySelect} disabled={buttonDisable}>
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
  let userInfo = _get(state, 'userSignInInfo.lookUpData', []);
  let userDetails = _get(userInfo, '[0].result', {});
  let cartTabValidation = _get(state, 'cartTabValidation.lookUpData', {});
    return {
        cartFlow,
        userDetails,
        cartTabValidation
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Speed));