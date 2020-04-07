
import React from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { SwitchInputField} from '../../Global/FormCompoents/wrapperComponent';
import { Form, Field } from 'react-final-form';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

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
               <div className="pb-4"> <div className=" d-flex flex-column flex-wrap">
                            {data.label}
                </div>
                <div style={{color: '#00BFB2', fontSize: '1.5rem'}}>{data.value}</div>  </div>
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
                <div className="row CardsWrapper  mb-5 ">
                 <Card className="paymentcard">
                        <CardBody className="p-3 d-flex align-items-center justify-content-center flex-column usercardadd">
                            <div className="mb-4"><AddCircleOutlineOutlinedIcon style={{ fontSize: 25 }} /> </div> 
                            <div>ADD CARD</div>                      
                        </CardBody>                          
                        </Card>
                        </div>
                <div className="block-sub-title">YOUR INFORMATION</div>    
                <div className="row CardsWrapper">               
                <Card className="userInfoSettingCards  mb-5 ">
                    <CardBody className="p-3 d-flex flex-column  w-100">
                    {this.props.userInfo && renderInfo}                
                    </CardBody>
                </Card>
                </div>

                <div className="block-sub-title">YOUR PREFRENCES</div> 
                <div className="row CardsWrapper">              
                <Card className="userPreferenceSetting  mb-5 ">
                    <CardBody className="p-3 d-flex flex-column w-100">
                    <Form onSubmit= {this.onSubmit}
                            render={({ handleSubmit }) => (
                        <form>
                            <div className=" d-flex flex-row flex-wrap justify-content-between align-items-center">
                                <Field name="notification" component={SwitchInputField} label='NOTIFICATIONS' />
                            </div>
                            <div className=" d-flex flex-row flex-wrap justify-content-between align-items-center">
                                <Field name="newsLetter" component={SwitchInputField} label='NEWSLETTER' />
                            </div>
                        </form>)}                           
                    />  
                    </CardBody>
                </Card>
                </div>
                <div className="block-sub-title">PAYMENT METHOD</div>               
                <div className="row CardsWrapper  mb-5 ">
                        <Card className="paymentcard active">
                            <CardBody className="p-3 d-flex flex-column  w-100">
                                {this.props.savedCards && renderCardInfo}                                   
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