import React, {Component} from 'react';
import { Card,  CardBody, Button } from 'reactstrap';


const styles = (props) => ({
   
});


class ErrorCard extends Component {
  constructor(props){
    super(props);
  } 
    // _getRootCardClass = () => 'active';
    render() {
        return (
            <React.Fragment>              
                    <Card >
                        <CardBody >                            
                            <div style={{ color: 'red'}}>{this.props.errorMessage}</div>
                        </CardBody>
                    </Card>
               
            </React.Fragment>
        
        );
    }
}

export default ErrorCard;