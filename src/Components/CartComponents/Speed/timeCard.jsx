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
        backgroundColor: 'rgba(255,255,255,1)',
        color: props.selectedCardColor,
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});


class TimeCard extends Component {
  constructor(props){
    super(props);
  } 
    render() {
        return (
            <React.Fragment>
                {/* <a style={{ cursor: 'pointer' }} onClick={() => this.props.changeTimeOpacity(this.props.data.id)} > */}
                    <Card style={styles(this.props).root}>
                        <CardBody style={styles(this.props).cardBody}>
                            
                            <div style={{ fontSize: 15  }}>
                                {this.props.availableTime}
                            </div>
                            <div style={{ fontSize: 12 }}>
                                ${this.props.fee}
                            </div>
                        </CardBody>
                    </Card>
                {/* </a> */}
            </React.Fragment>
        
        );
    }
}

export default TimeCard;