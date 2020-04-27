

import React from 'react';

import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { Button } from 'reactstrap';
import { get as _get, isEmpty as _isEmpty } from 'lodash';
import validate from './validator/guestWithoutLoginValidator';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Redirect } from 'react-router'
import { TextInputField, SwitchInputField } from '../../Global/FormCompoents/wrapperComponent';



class GuestWithoutLoginContainer extends React.Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        
    }
    onSubmit = async values => {
        console.log(values);
    }

    render() {
        if (!_get(this.props.userSignInInfo, '[0].isGuestLogin', false)){
            return <Redirect to='/home'/>;

        };

        return (
            <React.Fragment>

                <div >
                    CHECKOUT AS GUEST
                </div>
                <div >
                    ENTER YOUR EMAIL ADDRESS TO PROCEED WITH YOUR ORDER.
                </div>
                    <Form onSubmit={this.onSubmit} validate={validate}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} style={{ width: "30%", marginTop: 20 }}>


                                <div style={{ marginBottom: 20 }}>
                                    <Field name="email" component={TextInputField} placeholder='EMAIL'
                                        autoFocus={false} type='text' />
                                </div>


                                <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button variant="contained" color="primary" className="bottomActionbutton cartActionBtn" type="submit">
                                    <ArrowForwardIcon style={{ fontSize: 16 }} className="mr-2" /> PROCEED</Button>
                                </div>
                            </form>)}
                    />
                
            </React.Fragment>


        );
    }
}



function mapStateToProps(state) {
    let userSignInInfo = _get(state, 'userSignInInfo.lookUpData', []);
    return {
        userSignInInfo
    };
}
export default connect(mapStateToProps)(GuestWithoutLoginContainer);