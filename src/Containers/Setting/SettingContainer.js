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
import { Button } from 'reactstrap';

class SettingContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0,
            selectedTab: ""
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

    renderContent = (addresses) => {
        let commonContent = <>
         <div className="pr-lg-4" >
            {this.state.tabValue === 0 && 
                <UserSetting  tabValue = {this.state.tabValue}/>
            } 
            {this.state.tabValue === 1 && 
                <OrderSetting  tabValue = {this.state.tabValue}/> }
            {/* {this.state.tabValue === 2 &&  <LivechatSetting /> }    */}
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
                    {this.props.userName ? this.renderContent() : 
                    <Container fluid={true} > 
                    <Row className="no-gutters  secMinHeightwt">
                        <Col xs={12}  className="d-flex p-xl-5 p-md-4 py-4 flex-column justify-content-center align-items-center">                           
                            <div>Hey you are not SignIn for this feature. Please Sign In 
                                <i class="fa fa-frown-o" aria-hidden="true"></i></div>
                            <Button  variant="contained" color="primary" className="mt-4 bottomActionbutton cartActionBtn"
                                onClick={() => this.props.history.push("/signIn")}>SignIn
                            </Button>    
                        </Col>                        
                    </Row>
                </Container>
                    }
                    </Col>
                </Row >   
                </Container>
            </React.Fragment>
            
        );
    }
}

function mapStateToProps(state) {
    let userName = _get(state,"userSignInInfo.lookUpData[0].result.cust_name",''); 
    return {userName}
}
export default connect(mapStateToProps)(SettingContainer);