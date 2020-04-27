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
                    <Card className="retailerCardscontainer">
                        <CardBody className={this._getRootCardClass({ selectedId: this.props.selectedRetailer, id: this.props.data.id})}  onClick={() => this.props.changeRetailerOpacity(this.props.data.id)}>
                            <div style={{ marginBottom: 10 }} className="retailerTitle">
                                {this.props.data.name}
                            </div>                           
                            <div className="pb-2" style={{color:'#a6bcd0', textAlign:'center', fontSize:'1.7rem'}}>
                                {this.props.selection.name === 'Store Pickup' ? <span style={{ fontSize:this.props.selection.retailerAddressFontSize}}> {this.props.data.address}</span> : null}
                            </div>
                            <div className="pb-4" style={{color:'#a6bcd0', textAlign:'center', fontSize:'1.5rem', fontWeight:'bold'}}>
                                {this.props.selection.name === 'Store Pickup' ? <span style={{ fontSize:this.props.selection.retailerDistanceFontSize}}> {this.props.data.distance}</span> : null}
                            </div>
                            <div  style={{ fontSize: '2.9rem', fontFamily: 'Tungsten-Semibold', letterSpacing: '5.5px', }}>
                                ${this.props.data.product_total}
                            </div>
                        </CardBody>
                    </Card>
            </React.Fragment>
        
        );
    }
}

export default RetailerCard;