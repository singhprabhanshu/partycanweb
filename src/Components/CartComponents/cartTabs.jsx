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

import { Link } from 'react-router-dom'


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
    render() {
        const { classes } = this.props;
        return (
          <Container fluid={true}>   
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
  
};

export default connect(mapStateToProps)(withStyles(styles)(CartTabs));