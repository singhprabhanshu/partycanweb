
import React from 'react';
import { connect } from 'react-redux';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

  const styles = {
       
  };

class AddAddressCard extends React.Component {
    constructor(props){
        super(props);
      }     
    
    render() {
        return (
            <React.Fragment>               
               <Card className="addressCards" onClick={this.props.handleAddAddress}>
                    <CardBody className="p-3 d-flex align-items-center justify-content-center flex-column">
                        <div className="mb-4"><AddCircleOutlineOutlinedIcon style={{ fontSize: 25 }} /> </div> 
                        <div>ADD NEW ADDRESSES</div>                      
                    </CardBody>
                </Card>
            </React.Fragment>
          );
     }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(AddAddressCard);