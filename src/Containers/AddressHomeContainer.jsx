import { commonActionCreater } from '../Redux/Actions/commonAction';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import CartTabs from '../Components/CartComponents/cartTabs';
import Address from '../Components/CartComponents/Addresses/address';
import Card from "../Components/CartComponents/Card/Card"
import Speed from '../Components/CartComponents/Speed/speed';
import CheckOut from '../Components/CartComponents/CheckOut/CheckOut';
import {Container, Row, Col} from 'reactstrap';
import { get as _get } from 'lodash';
import { Redirect } from 'react-router';

const styles = theme => ({
  
});

class AddressHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // selectedAddress: 0,
            // userAddress: [],
            tabValue: this.props.match.params.cartflow,
            // isAddAddressHidden: true,
        }
    }



    handleTabChange = (event, newValue) => {
        let cartTabValidation = this.props.cartTabValidation;
        if (newValue === 'speed') {
            if(_get(cartTabValidation, 'isSpeedTab') === true) {
                this.setState({ tabValue: newValue });
                localStorage.setItem("nextTab", newValue);
                this.props.history.push(`/cart/${newValue}`);
            }
        } else if (newValue === 'card') {
            if(_get(cartTabValidation, 'isCardTab') === true) {
                this.setState({ tabValue: newValue });
                localStorage.setItem("nextTab", newValue);
                this.props.history.push(`/cart/${newValue}`);
            }
        } else if (newValue === 'checkout') {
            if(_get(cartTabValidation, 'isSummaryTab') === true) {
                this.setState({ tabValue: newValue });
                localStorage.setItem("nextTab", newValue);
                this.props.history.push(`/cart/${newValue}`);
            }
        }
        else {
            this.setState({ tabValue: newValue });
            localStorage.setItem("nextTab", newValue);
            this.props.history.push(`/cart/${newValue}`);
        }
        // this.setState({ tabValue: newValue });
        // this.props.history.push(`/cart/${newValue}`);
    };

    handleTabOnContinue = (value) => {
        this.setState({ tabValue: value });
        localStorage.setItem("nextTab", value);
        this.props.history.push(`/cart/${value}`);
    };
    componentDidMount () {
        window.scrollTo(0, 0);
        const isCheckout = localStorage.getItem("isCheckout");
        // if (isCheckout === 'false'){
        //     this.props.history.push(`/cart`);

        // } 

    }

    componentWillUnmount () {
        localStorage.setItem("isCheckout", false);
        localStorage.removeItem("nextTab");
    }


    // handleStepChange = (currentStep) => {
    //     if(currentStep==4){
    //       this.props.history.push('/');
    //     }
    //     this.setState({ currentStep })
    // }



    render() {
        const nextTab = localStorage.getItem("nextTab");
        const tabs = [{
            link: 'address',
            component: <Address
                handleTabOnContinue={this.handleTabOnContinue}
            />
        }, {
            link: 'speed',
            component: <Speed 
                handleTabOnContinue={this.handleTabOnContinue}
            />
        },
        {
            link: 'card',
            component: <Card
                handleTabOnContinue={this.handleTabOnContinue}
            />
        },
        {
            link: "checkout",
            component: <CheckOut />
        }
        ];
        const currentTab = this.props.match.params.cartflow;
        const selectedTab = tabs.find(tab => currentTab === tab.link);

        if (currentTab === 'speed') {
            if(nextTab !== 'speed') {
                return <Redirect to={`/cart/${this.state.tabValue}`}/>;
            }
        } else if (currentTab === 'card') {
            if(nextTab !== 'card') {
                return <Redirect to={`/cart/${this.state.tabValue}`}/>;
            }
        } else if (currentTab === 'checkout') {
            if(nextTab !== 'checkout') {
                return <Redirect to={`/cart/${this.state.tabValue}`}/>;
            }
        }
        return (
            <React.Fragment>
                <CssBaseline />                 
                    <CartTabs
                        tabValue={this.state.tabValue}
                        handleTabChange={this.handleTabChange}
                        tabs={this.tabs}
                    />
                    <div>
                        {selectedTab && selectedTab.component}
                    </div>                    
            </React.Fragment>
        );
    }
}



function mapStateToProps(state) {
    // let sessionRedirectToLogin = _get(state,'sessionRedirectToLogin.lookUpData');
    // return {sessionRedirectToLogin}
    let cartTabValidation = _get(state, 'cartTabValidation.lookUpData', {});
    return {
        cartTabValidation,
    };
}
export default connect(mapStateToProps)(withStyles(styles)(AddressHome));