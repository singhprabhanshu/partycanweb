
import React from 'react';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import genericPostData from "../../Redux/Actions/genericPostData";
import {get as _get , isEmpty as _isEmpty} from 'lodash';
import WithLoading from '../../Global/UIComponents/LoaderHoc';

class OrderSetting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orderData:[]
        }
    }
    
    componentDidMount() {
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

    render() {
        let renderItems= (items) => items && items.map((item,index)=> {
            return(<React.Fragment  key={index}>
                        <div className=" d-flex flex-column flex-wrap" 
                        style={{fontSize: '1.5rem', marginLeft: '18px'}}>
                            <div>
                                <span style={{ color: 'blue'}}>{item.product_name}</span>
                                <span style={{color: 'cadetblue', marginLeft: '55px'}}>{item.product_qty}</span>
                                <span style={{ color: 'blue', marginLeft: '153px'}}>{item.product_price}</span>
                            </div>
                        </div><br/>
            </React.Fragment>)
        })

        let renderOrder = _get(this.state,'orderData',[]).map((data, index)=> {
            return (<React.Fragment key={index}> 
                        <ExpansionPanel 
                            defaultExpanded={index === 0 ? true : false}>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <div className="d-flex flex-wrap title" style={{color: '#00BFB2', fontSize: '2.5rem'}}>
                                            ORDER #{data.entity_id}
                            </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div className="row" style={{width: '550px'}}>
                                    {renderItems(data.items)}
                                </div>
                                <div className="row">
                                    { data.delivery_fee && <span style={{color: 'cadetblue', fontSize: '1.5rem'}}>
                                        DELIVERY {data.delivery_fee}</span> 
                                    }
                                    { data.tax && <span style={{color: 'cadetblue', fontSize: '1.5rem'}}>
                                        TAX {data.tax}</span> 
                                    }
                                </div>
                                <div className="row" style={{color: '#00BFB2', fontSize: '1.5rem'}}>
                                        <span>{data.status}</span>
                                        <span style={{color: 'cadetblue'}}>TOTAL</span>
                                        <span style={{ color: 'blue'}}>{data.grand_total}</span>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
            </React.Fragment> )
        });

        return (
            <React.Fragment>
                <h5 style={{marginLeft: '21px', marginTop: '13px'}}>YOUR ORDERS</h5>               
                    {this.state.orderData && renderOrder}
            </React.Fragment>
          );
     }
}

const mapStateToProps = (state) => {
    let isLoading = _get(state, 'orderSettings.isFetching')
    return {isLoading}
};

export default connect(mapStateToProps)(WithLoading(OrderSetting));