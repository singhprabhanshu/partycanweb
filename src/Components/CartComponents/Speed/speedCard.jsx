import React, {Component} from 'react';
import { Card,  CardBody, Button } from 'reactstrap';
import { mergeClasses } from '@material-ui/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = theme => ({  

    speedCardTitle:{
        fontSize: 18,
        textTransform: 'uppercase',
        color:'#0033A0',
        fontWeight: 'bold',

    }
});

class SpeedCard extends Component {
  constructor(props){
    super(props);
  } 
  _getRootCardClass = ({ selectedId, id, enablePointer }) => {
      if (id === selectedId) {
          return "speedCards active";
      } else if (enablePointer) {
        return "speedCards";
      } else {
        return "speedCards disable";
      }
      
  };
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>                
                    <Card className={this._getRootCardClass({ selectedId: this.props.selectedTransportAddress, id: this.props.data.id, enablePointer: this.props.data.enablePointer})} onClick={() => this.props.changeOpactiy(this.props.data.id)} >
                        <CardBody className="d-flex flex-column align-items-center">
                        <div className="mb-4"><LocalShippingOutlinedIcon style={{ fontSize: 25, opacity:0.6 }} /> </div> 
                            <div className={classes.speedCardTitle}>
                                {this.props.data.description}
                            </div>
                            <div style={{ fontSize: 10, marginBottom: 10 }}>
                                {this.props.data.duration}
                            </div>
                            {/* <div>
                                {this.props.data.address}
                            </div> */}
                             <div className="mb-4"><CheckCircleIcon style={{ fontSize: 25 }} /> </div>
                        </CardBody>
                    </Card>
            </React.Fragment>
        
        );
    }
}

export default (withStyles(styles)(SpeedCard));
