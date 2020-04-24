
import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody} from 'reactstrap';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import WithLoading from '../../Global/UIComponents/LoaderHoc';
import {get as _get , isEmpty as _isEmpty} from 'lodash';
import Switch from '@material-ui/core/Switch';
import genericPostData from "../../Redux/Actions/genericPostData";
import UserInfo from './UserInfo';

class UserSetting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userSettingData: {},
            newsLetter: false,
            notification: false
        }
    }
     
    componentDidMount() {
        if(this.props.tabValue === 0) {
            this.getSettingData();
        }
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
      
    getFormatExpireMonth = (month) => {
        return month < 10 ? '0' + month : month;
    }

    getFormatExpireYear = (year) => {
        return year.toString().substr(-2);
    }

    getFomatBrand = (brand) => {
        return brand.toUpperCase();
    }

    render() {
        let renderCardInfo = _get(this.state,'userSettingData.list_cards',[]).map((data, index)=> {
            return (<React.Fragment key={data+index}>
                <div className=" d-flex flex-column flex-wrap" 
                    style={{color: '#00BFB2', fontSize: '1.5rem', fontWeight: 'bold'}}>
                    {this.getFomatBrand(data.brand)}
                </div>
                <div style={{color: '#00BFB2', fontSize: '1.5rem', marginTop: '20px'}}>
                     **** **** **** **** {data.card_no} 
                </div>
                <div style={{color: '#00BFB2', fontSize: '1.5rem', marginTop: '22px'}}>
                    PARTYCAN 
                    <span style={{color: '#00BFB2', fontSize: '1.5rem', marginLeft: '56px'}}>
                        {this.getFormatExpireMonth(data.card_exp_month) + '/' + 
                        this.getFormatExpireYear(data.card_exp_year)}
                    </span>
                </div>  
            </React.Fragment>)
        });

    return (
        <React.Fragment>
            {this.state.userSettingData && <UserInfo userInfo={this.state.userSettingData} />}
            <div className="block-sub-title">YOUR PREFRENCES</div> 
            <div className="CardsWrapper">              
                <Card className=" mb-5 ">
                   <CardBody className="cardStyles userPreferenceSetting">
                      <div className=" d-flex  w-100 justify-content-between align-items-center">
                          <label>NOTIFICATION</label>
                            <Switch
                                checked={this.state.notification}
                                onChange={this.handleSwitchChange}
                                name="notification"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </div>
                        <div className=" d-flex  w-100 justify-content-between align-items-center">
                            <label>NEWSLETTER</label>
                            <Switch
                                checked={this.state.newsLetter}
                                onChange={this.handleSwitchChange}
                                name="newsLetter"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="block-sub-title">PAYMENT METHOD</div>               
            <div className="d-flex CardsWrapper flex-wrap  mb-5 ">
                <Card className="">
                    <CardBody className="cardStyles paymentcard align-items-start active w-100">
                         {this.state.userSettingData && this.state.userSettingData.list_cards && renderCardInfo}                                   
                    </CardBody>
                </Card>
                <Card className="">
                    <CardBody className="cardStyles paymentcard">
                        <div className="mb-4"><AddCircleOutlineOutlinedIcon style={{ fontSize: 25 }} /> </div> 
                        <div>ADD CARD</div>                      
                    </CardBody>                          
                </Card>                          
            </div>
        </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let isLoading = _get(state, 'userSettings.isFetching')
    return {isLoading}
};

export default connect(mapStateToProps)(WithLoading(UserSetting));