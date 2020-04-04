import React, {Component} from 'react';
import { Card,  CardBody, Button } from 'reactstrap';


const styles = (props) => ({
    root: {
        height: 50,
        width: 100,
        // marginTop: 10,
        marginRight: "20px",
        // marginLeft: '20px',
        // marginBottom: '20px',
        borderRadius: 10,
        backgroundColor: (props.data.id === props.selectedShippingMethod) ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.38)',
        color: (props.data.id === props.selectedShippingMethod) ? props.selectedCardColor: 'white',
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});


class DateCard extends Component {
  constructor(props){
    super(props);
  } 
    render() {
        return (
            <React.Fragment>
                <a style={{ cursor: 'pointer' }} onClick={() => this.props.changeShippingMethodOpacity(this.props.data.id)} >
                    <Card style={styles(this.props).root}>
                        <CardBody style={styles(this.props).cardBody}>
                            
                            <div style={{ fontSize: 15 }}>
                                {this.props.date}
                            </div>
                            {/* <div style={{ fontSize: 8, marginBottom: 10 }}>
                                ${this.props.data.fee}
                            </div> */}
                            {/* <div>
                                {this.props.data.address}
                            </div> */}
                        </CardBody>
                    </Card>
                </a>
            </React.Fragment>
        
        );
    }
}

export default DateCard;