import React, {Component} from 'react';
import { Card,  CardBody, Button } from 'reactstrap';

const styles = (props) => ({  
});

class SpeedCard extends Component {
  constructor(props){
    super(props);
  } 
  _getRootCardClass = ({ selectedId, id }) => {
      if (id === selectedId) {
          return "speedCards active";
      }
      return "speedCards";
  };
    render() {
        return (
            <React.Fragment>                
                    <Card className={this._getRootCardClass({ selectedId: this.props.selectedTransportAddress, id: this.props.data.id})} onClick={() => this.props.changeOpactiy(this.props.data.id)} >
                        <CardBody className="d-flex flex-column">
                            <div style={{ fontSize: 12, marginBottom: 10 }}>
                                {this.props.data.description}
                            </div>
                            <div style={{ fontSize: 10, marginBottom: 10 }}>
                                {this.props.data.duration}
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

export default SpeedCard;