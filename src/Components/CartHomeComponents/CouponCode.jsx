import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class CouponCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {textBoxValue:""}
    }
    render() {
        return (
            <>
                <Form style={{width:this.props.width}}>
                    <FormGroup>
                        <Input onChange={(e)=>this.props.onChange(e)} style={{background:"none"}} value={this.props.coupon_code} type="email" name="email" id="exampleEmail" placeholder="Coupon Code" />
                    </FormGroup>
                </Form>
            </>
        )
    }
}

export default CouponCode;