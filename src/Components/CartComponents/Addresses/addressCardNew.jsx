
import React from 'react';
import { connect } from 'react-redux';

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';



class AddressCard extends React.Component {
    constructor(props){
        super(props);
      } 
    
    
    render() {
        return (
            <React.Fragment>               
               <Card className="addressCards" onClick={() => this.props.handleCardClick(this.props.data.id)} >
                    <CardBody className="d-flex flex-column">
                        <div className="d-flex flex-wrap title">
                            {this.props.data.type}
                        </div>
                        <div className=" d-flex flex-column flex-wrap">
                            {this.props.data.name}
                            {this.props.data.address}
                        </div>                      
                    </CardBody>
                </Card>
            </React.Fragment>
          );
     }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(AddressCard);