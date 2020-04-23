import React, {Component} from 'react';
import { Card,  CardBody, Button } from 'reactstrap';


const styles = (props) => ({
  
});


class RetailerCard extends Component {
  constructor(props){
    super(props);
  } 

    _getRootCardClass = ({ selectedId, id }) => {
        if (id === selectedId) {
            return "cardStyles retailerCards active";
        }
        return "cardStyles retailerCards";
    };
    render() {
        return (
            <React.Fragment>                
                    <Card >
                        <CardBody className={this._getRootCardClass({ selectedId: this.props.selectedRetailer, id: this.props.data.id})}  onClick={() => this.props.changeRetailerOpacity(this.props.data.id)}>
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