
import React from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { SwitchInputField} from '../../Global/FormCompoents/wrapperComponent';
import { Form, Field } from 'react-final-form';

class UserSetting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
      } 
      onSubmit() {

      }
    render() {
        let renderInfo = this.props.userInfo.map((data, index)=> {
            return (<React.Fragment key={data+index}>
                <div className=" d-flex flex-column flex-wrap">
                            {data.label}
                </div>
                <div style={{color: '#00BFB2', fontSize: '1.5rem'}}>{data.value}</div>  
            </React.Fragment> )
        });

        let renderCardInfo = this.props.savedCards.map((data, index)=> {
            return (<React.Fragment key={data+index}>
                <div className=" d-flex flex-column flex-wrap" 
                style={{color: '#00BFB2', fontSize: '1.5rem', fontWeight: 'bold'}}>{data.cardType}</div>
                <div style={{color: '#00BFB2', fontSize: '1.5rem', marginTop: '20px'}}> **** **** **** **** {data.number} </div>
                <div style={{color: '#00BFB2', fontSize: '1.5rem', marginTop: '22px'}}>{data.name} 
                <span style={{color: '#00BFB2', fontSize: '1.5rem', marginLeft: '56px'}}>{data.expiry}</span></div>  
            </React.Fragment> )
        });
        return (
            <React.Fragment>
                <h5 style={{marginLeft: '21px', marginTop: '13px'}}>YOUR INFORMATION</h5>               
                <Card className="userInfoSettingCards">
                    <CardBody className="p-3 d-flex flex-column">
                    {this.props.userInfo && renderInfo}                
                    </CardBody>
                </Card>

                <h5 style={{marginLeft: '21px', marginTop: '13px'}}>YOUR PREFRENCES</h5>               
                <Card className="userPreferenceSetting">
                    <CardBody className="p-3 d-flex flex-column">
                    <Form onSubmit= {this.onSubmit}
                            render={({ handleSubmit }) => (
                        <form>
                            <div className=" d-flex flex-column flex-wrap">
                                <Field name="notification" component={SwitchInputField} label='NOTIFICATIONS' />
                            </div>
                            <div className=" d-flex flex-column flex-wrap">
                                <Field name="newsLetter" component={SwitchInputField} label='NEWSLETTER' />
                            </div>
                        </form>)}                           
                    />  
                    </CardBody>
                </Card>
                <h5 style={{marginLeft: '21px', marginTop: '13px'}}>PAYMENT METHOD</h5>               
                <div className="row">
                        <Card className="userpayment-setting">
                            <CardBody className="p-3 d-flex flex-column">
                                {this.props.savedCards && renderCardInfo}                                   
                            </CardBody>
                        </Card>
                        <Card className="user-card-add">
                            <CardBody className="p-3 d-flex flex-column">
                                    <div style={{textAlign: 'center', marginTop: '44px'}}> ADD CARD</div>                               
                            </CardBody>
                        </Card>
                </div>
            </React.Fragment>
          );
     }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(UserSetting);