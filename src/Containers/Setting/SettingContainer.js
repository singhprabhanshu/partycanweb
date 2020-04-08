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
const styles = theme => ({
    
});

class SettingContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0,
            selectedTab: "",
            userInfo: [{'value': 'AMAN KHANDELWAL', 'label': 'FULL NAME'},
            {'label': 'PRIMARY ADDRESS','value': '1765 N Eston Avenue'},
            {'label': 'EMAIL', 'value': 'partyCan@gmail.com'},
            {'label': 'PASSWORD','value': '********'}],
            savedCards : [{
                "cardType": 'DEBIT',
                "number": 1111,
                "name": "PARTY CAN",
                "CVC": "729",
                "expiry": "02/22"
            }],
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
            }]
        }
    }

    componentDidMount() {
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

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />   
                <Container fluid={true}  className="">            
                    <SettingTabs
                        tabValue={this.state.tabValue}
                        handleTabChange={(index, selectedTab)=>this.handleTabChange(index, selectedTab)}
                    /> 
                </Container>
                 
            <Container fluid={true} className="productDetails">                
                <Row className="no-gutters justify-content-lg-between secMinHeight">
                    <Col lg={7} className="p-5" >
                    <Scrollbar className="leftSecmaxHeight">
                            <div className="pr-lg-4" >
                             {this.state.tabValue === 0 && 
                            <UserSetting  userInfo={this.state.userInfo} savedCards={this.state.savedCards}/> } 
                            {this.state.tabValue === 1 && 
                            <OrderSetting  ordersInfo={this.state.orders}/> }
                            {this.state.tabValue === 2 &&  <LivechatSetting /> }   
                        </div>
                        </Scrollbar> 
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
export default connect(mapStateToProps)(withStyles(styles)(SettingContainer));