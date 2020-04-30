import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ReorderIcon from '@material-ui/icons/Reorder';
import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { white } from 'color-name';
import {Container, Row, Col} from 'reactstrap'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from 'react-router';
import { get as _get } from 'lodash';


const styles = theme => ({
   });

class CartTabs extends React.Component {
    constructor(props){
        super(props);
      } 
    // state = {
    //     value: 0,
    // } 
    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
      };
    handleHeaderTitle = ({ tabValue }) => {
      switch ( tabValue ) {
        case "address":
          return "address";
        case "speed":
          return "Delivery Options";
        case "card":
          return "Card";
        case "checkout":
          return "Summary";

      }
    }

    handleMobileBack = () => {
      this.setState({
        mobileBack: true
      });
      
    };
    render() {
        if (_get(this.state, 'mobileBack', false)) {
          return <Redirect to='/cart'/>;
        }
        const { classes } = this.props;
        const headerTitle = this.props.tabValue ? this.handleHeaderTitle({ tabValue: this.props.tabValue }) : '';
        return (
          <Container fluid={true}> 
           <div className="mobile-tabs-title d-block d-md-none">
                    <Container fluid={true}  className="d-flex align-items-center h-100 justify-content-center">   
                        <Row className=" align-items-center flex-grow-1 pt-4 no-gutters px-3">
                        <Col xs={'auto'}  className=""> 
                            <KeyboardBackspaceIcon style={{fontSize:'3rem'}} onClick={this.handleMobileBack}/>
                        </Col>
                        <Col  className="title"> 
                                 {headerTitle}
                        </Col>
                        <Col xs={'auto'}  className=""> 
                            <SearchIcon style={{fontSize:'3rem'}}/>
                        </Col>
                        </Row>
                        </Container>
                        </div>  
            <Row className="no-gutters">
              <Col>
              <Tabs
                  value={this.props.tabValue}
                  onChange={this.props.handleTabChange}
                  variant="standard"
                  indicatorColor=""
                  textColor="white"
                  aria-label="icon tabs example"
                  className="product-tabs"
                  >
                    <Tab icon={<LocationOnOutlinedIcon />} aria-label="location" value='address'  />
                    <Tab icon={<LocalShippingOutlinedIcon />} aria-label="speed" value='speed'  />
                    <Tab icon={<CreditCardIcon />} aria-label="payment" value="card" />
                    <Tab icon={<ReorderIcon />} aria-label="summary" value="checkout" />
                </Tabs>
              </Col>
              </Row>           
                    
         </Container>
          );
     }
}

const mapStateToProps = (state) => {
  return {};
  
};

export default connect(mapStateToProps)(withStyles(styles)(CartTabs));