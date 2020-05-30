
import React from 'react';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import genericPostData from "../../Redux/Actions/genericPostData";
import {get as _get , isEmpty as _isEmpty} from 'lodash';
import WithLoading from '../../Global/UIComponents/LoaderHoc';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

class OrderSetting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orderData:[]
        }
    }
    
    componentDidMount() {
        window.scrollTo(0, 0);
        if(this.props.tabValue === 1) {
            this.getOrderSettingData();
        }
    }

    getOrderSettingData = () => {
        let reqData = {api_token: localStorage.getItem("Token")};
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: reqData,
            url: `api/account/myorders`,
            constants: {
                init: "GET_ORDER_SETTING_DATA_INIT",
                success: "GET_ORDER_SETTING_DATA_SUCCESS",
                error: "GET_ORDER_SETTING_DATA_ERROR"
            },
            identifier: "GET_ORDER_SETTING_DATA",
            successCb: this.orderSettingDataSuccess,
            errorCb: this.orderSettingDataFailure,
            dontShowMessage:true
        });
    }

    orderSettingDataSuccess = (apiData) => {
        if(apiData.code === 1) {
            this.setState({
                orderData: apiData.data
            })
        }
    }

    orderSettingDataFailure = () => {

    }
    convertToDecimal = (number) => {
        const convertedNumber = (Math.round(number * 100) / 100).toFixed(2);
        return convertedNumber;
    }

    render() {
        let renderItems= (items) => items && items.map((item,index)=> {
            return(<React.Fragment  key={index}>
                        <div className=" d-flex flex-wrap justify-content-between mb-3">
                            <div className="itemsname" >
                                {item.product_name}
                                </div>
                                <div className="pricingWrapper">
                                <span  className="orderDetaillabel">{item.product_qty}</span>
                                <span style={{ color: '#0033a0', }}>${ item && item.total ?
                                    this.convertToDecimal(item.total) : '0.00'}
                                </span>
                                </div>
                            
                        </div>
            </React.Fragment>)
        })

        let renderOrder = _get(this.state,'orderData',[]).map((data, index)=> {
            return (<React.Fragment key={index}> 
                        <ExpansionPanel 
                            defaultExpanded={index === 0 ? true : false}>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}                            
                            aria-controls="panel1a-content" id="panel1a-header">
                            <div className="d-flex flex-wrap title">
                                            ORDER #{data.increment_id }
                            </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div className = "d-flex no-gutters w-100">
                                    <div className="col-md-12">                                      
                                            <div>
                                                {renderItems(data.items)}
                                            </div>
                                      
                                        <div className="row pt-4 d-flex flex-wrap align-items-center">
                                            <div className="col-md-12 d-flex justify-content-between align-items-center">
                                        <div>
                                                <span className="orderStatusText" style={{color: '#00BFB2', fontSize: '1.6rem', fontWeight:'bold',}}>
                                                {data.status}</span>                                               
                                            </div>
                                            <div className="pricingWrapper flex-column">
                                            <div className="d-flex justify-content-between w-100" >
                                                 <span  className="orderDetaillabel">DELIVERY</span> 
                                                 <span  style={{ color: '#0033a0', fontWeight: 'bold',}}>
                                                 ${ data && data.delivery_fee ? this.convertToDecimal(data.delivery_fee) : '0.00' }</span>
                                            </div>

                                            <div className="d-flex justify-content-between w-100" >
                                            <span className="orderDetaillabel">TAX</span>
                                            <span  style={{ color: '#0033a0', fontWeight: 'bold',}}>
                                                ${ data && data.tax ? this.convertToDecimal(data.tax) : '0.00' }</span>                                            
                                            </div>

                                            <div className="d-flex justify-content-between w-100" >
                                            <span className="orderDetaillabel">TIP</span>
                                            <span  style={{ color: '#0033a0', fontWeight: 'bold',}}>
                                            ${ data && data.driver_tip ? this.convertToDecimal(data.driver_tip) : '0.00' }</span>                                            
                                            </div>

                                            <div className="d-flex justify-content-between w-100" >
                                            <span className="orderDetaillabel">DISCOUNT</span>
                                            <span  style={{ color: '#0033a0', fontWeight: 'bold',}}>
                                            ${ data && data.discount ? this.convertToDecimal(data.discount) : '0.00' }</span>                                            
                                            </div>
                                            
                                            <div className="d-flex justify-content-between w-100" style={{ color: '#0033a0', fontWeight: 'bold',}} >                                           
                                                <span className="orderDetaillabel" >TOTAL</span>
                                                <span className="ml-2" style={{ color: '#0033a0', fontWeight: 'bold',}} >
                                                ${ data && data.grand_total ? this.convertToDecimal(data.grand_total) : '0.00' }</span>
                                              </div>
                                                
                                            </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
            </React.Fragment> )
        });

        return (
            <React.Fragment>
                <div className="block-title mb-5">
                    {/* <KeyboardBackspaceIcon style={{fontSize:13, marginRight:10}} /> */}
                YOUR ORDERS</div> 

                   <div className="orderSummary">{this.state.orderData && renderOrder}</div> 
            </React.Fragment>
          );
     }
}

const mapStateToProps = (state) => {
    let isLoading = _get(state, 'orderSettings.isFetching')
    return {isLoading}
};

export default connect(mapStateToProps)(WithLoading(OrderSetting));