import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Container, Row, Col} from 'reactstrap'
class CouponCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {textBoxValue:""}
    }
    render() {
        return (
           <div className="d-flex no-gutters">
               <Col xs={12} lg={11}>
                <Form >
                    <FormGroup>
                        <Input onChange={(e)=>this.props.onChange(e)} value={this.props.coupon_code} type="email" name="email" id="exampleEmail" placeholder="Coupon Code" />
                    </FormGroup>
                </Form>
                </Col>
           </div>
        )
    }
}

export default CouponCode;