import React, {Component} from 'react';
import { Card,  CardBody, Button } from 'reactstrap';


const styles = (props) => ({   
});


class ShippingMethodCard extends Component {
  constructor(props){
    super(props);
  } 
    render() {
        return (
            <React.Fragment>                
                    <Card  className="deliveryCards"  onClick={() => this.props.changeShippingMethodOpacity(this.props.data.id)}>
                        <CardBody className="d-flex flex-column">
                            <div style={{ fontSize: 8, marginBottom: 10 }}>
                                {this.props.data.method}
                            </div>
                            <div style={{ fontSize: 8, marginBottom: 10 }}>
                                Estimated ~{this.props.estimatedShippingTime} Days
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 10 }}>
                                ${this.props.data.amount}
                            </div>
                            {/* <div>
                                {this.props.data.address}
                            </div> */}
                        </CardBody>
                    </Card>               
            </React.Fragment>
        
        );
    }
}

export default ShippingMethodCard;