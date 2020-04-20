import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import ProductTabs from '../../Components/ProductComponents/ProductTabs';
import { map as _map, findIndex as _findIndex, get as _get, set as _set  } from 'lodash';
import genericGetData from "../../Redux/Actions/genericGetData";
import {Container, Row, Col} from 'reactstrap';
import SettingTabs from '../../Components/SettingComponents/SettingTabs';
import UserSetting from '../../Components/SettingComponents/UserSetting';
import OrderSetting from '../../Components/SettingComponents/OrderSetting';
import LivechatSetting from '../../Components/SettingComponents/LivechatSetting';
import Scrollbar from "react-scrollbars-custom";
import {isMobile, isTablet} from 'react-device-detect';
import genericPostData from "../../Redux/Actions/genericPostData";

class SettingContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0,
            selectedTab: "",
    
            orders: [{
                orderNumber: 12224,
                items: [{
                    name: 'Triple Spice Magr',
                    quatity: '1 CAN',
                    price: 29.99
                },
                {
                    name: "I'm Cold Sweater",
                    quatity: '1',
                    price: 36.99
                }],
                delivery: 4.99,
                total: 47.99,
                shipped: true
            },{
                orderNumber: 70224,
                items: [{
                    name: 'Beach Towel',
                    quatity: '1 CAN',
                    price: 29.99
                },
                {
                    name: "I'm Cold Marg",
                    quatity: '1',
                    price: 36.99
                }],
                delivery: 4.99,
                total: 47.99,
                shipped: true
            }],

            userSettingData: {},
            newsLetter: false,
            notification: false
        }
    }

    componentDidMount() {
        this.getSettingData();
        const settingParam =  this.props.match.params.settingParam; 
        this.setState({ tabValue : settingParam === 'user' ? 0 :
        settingParam === 'order' ? 1 : settingParam === 'chat' ? 2 : null})
    }

    handleTabChange = (index, selectedTab) => {
        this.setState({ selectedTab: selectedTab, tabValue: index });
        this.props.history.push(`/setting/${this.findTabRoute(index)}`);
    };

    findTabRoute = (tabValue) => {
        return tabValue === 0 ? 'user' : tabValue === 1 ? 'order' : tabValue === 2 ? 'chat' : null
    }

    getSettingData = () => {
        let reqData = {api_token: localStorage.getItem("Token")};
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: reqData,
            url: `api/account/mydashboard`,
            constants: {
                init: "GET_SETTING_DATA_INIT",
                success: "GET_SETTING_DATA_SUCCESS",
                error: "GET_SETTING_DATA_ERROR"
            },
            identifier: "GET_SETTING_DATA",
            successCb: this.settingDataSuccess,
            errorCb: this.settingDataFailure,
            dontShowMessage:true
        })
    }

    settingDataSuccess = (apiData) => {
        if(apiData.code === 1) {
            this.setState({
                userSettingData: apiData.data,
                newsLetter: apiData.data.newsletter_subscription === 1 ? true : false,
                notification: apiData.data.notification === 1 ? true : false
            })
        }
    }

    settingDataFailure = () => {

    }

    handleSwitchChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    renderContent = (addresses) => {
        let commonContent = <>
         <div className="pr-lg-4" >
            {this.state.tabValue === 0 && 
                <UserSetting  userInfo={this.state.userSettingData} 
                    newsLetter= {this.newsLetter}
                    handleChange= {(event) =>this.handleSwitchChange(event)}
                />
            } 
            {this.state.tabValue === 1 && 
                <OrderSetting  ordersInfo={this.state.orders}/> }
            {this.state.tabValue === 2 &&  <LivechatSetting /> }   
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
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />  
                <Container fluid={true} >    
                    <SettingTabs
                        tabValue={this.state.tabValue}
                        handleTabChange={(index, selectedTab)=>this.handleTabChange(index, selectedTab)}
                    /> 
                       
                <Row className="no-gutters justify-content-lg-between secMinHeight">
                    <Col xs={12} lg={7} className="p-xl-5 p-4" >
                    {this.renderContent()}  
                    </Col>
                </Row >   
                </Container>
            </React.Fragment>
            
        );
    }
}

function mapStateToProps(state) {
    return {}
}
export default connect(mapStateToProps)(SettingContainer);