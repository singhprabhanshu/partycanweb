import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {

    return(
        <React.Fragment>
            <div className="block-sub-title">YOUR INFORMATION</div>    
                <div className="row CardsWrapper">               
                    <Card className="userInfoSettingCards  mb-5 ">
                        <CardBody className="p-3 d-flex flex-column  w-100">
                            {this.props.userInfo && <React.Fragment>
                                <div className="pb-4"> 
                                <div className=" d-flex flex-column flex-wrap">
                                    FULL NAME
                                    </div>
                                    <div style={{color: '#00BFB2', fontSize: '1.5rem'}}>
                                        {this.props.userInfo.name}
                                    </div>
                                </div>
                                <div className="pb-4">
                                    <div className=" d-flex flex-column flex-wrap">
                                        PRIMARY ADDRESS
                                    </div>
                                    <div style={{color: '#00BFB2', fontSize: '1.5rem'}}>
                                        {this.props.userInfo.address}
                                    </div>
                                </div>
                                <div className="pb-4">
                                    <div className=" d-flex flex-column flex-wrap">
                                        EMAIL
                                    </div>
                                    <div style={{color: '#00BFB2', fontSize: '1.5rem'}}>
                                        {this.props.userInfo.email}
                                    </div>
                                </div>
                                <div className="pb-4">
                                    <div className=" d-flex flex-column flex-wrap">
                                        PASSWORD
                                    </div>
                                    <div style={{color: '#00BFB2', fontSize: '1.5rem'}}>
                                        **********
                                    </div>
                                </div>
                            </React.Fragment>}                
                        </CardBody>
                    </Card>
                </div>
        </React.Fragment>
        );
    }   
}