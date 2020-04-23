
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
    _getRootCardClass = ({ selectedId, id }) => {
      if (id === selectedId) {
          return "cardStyles addressCards active";
      }
      return "cardStyles addressCards";
    };
    
    render() {
        return (
            <React.Fragment>               
               <Card  >
                    <CardBody className={this._getRootCardClass({ selectedId: this.props.selectedAddress, id: this.props.data.id})} onClick={() => this.props.handleCardClick(this.props.data.id)}>
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