import React, {Component} from 'react';
import { Card,  CardBody, Button } from 'reactstrap';


const styles = (props) => ({
  
});


class RetailerCard extends Component {
  constructor(props){
    super(props);
  } 
    render() {
        return (
            <React.Fragment>                
                    <Card  className="retailerCards"  onClick={() => this.props.changeRetailerOpacity(this.props.data.id)}>
                        <CardBody className="d-flex flex-column">
                            <div style={{ fontSize: 8, marginBottom: 10 }}>
                                {this.props.data.name}
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 10 }}>
                                ${this.props.data.product_total}
                            </div>
                            <div>
                                {this.props.selection.name === 'Store Pickup' ? <p style={{ fontSize:this.props.selection.retailerAddressFontSize}}> {this.props.data.address}</p> : null}
                            </div>
                            <div>
                                {this.props.selection.name === 'Store Pickup' ? <p style={{ fontSize:this.props.selection.retailerDistanceFontSize}}> {this.props.data.distance}</p> : null}
                            </div>
                        </CardBody>
                    </Card>
            </React.Fragment>
        
        );
    }
}

export default RetailerCard;