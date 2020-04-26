import React from "react";
import { withRouter } from "react-router-dom"
import { Container, Row, Col } from 'reactstrap'
import { Button } from 'reactstrap';

const CartEmptyComponent = (props) => {
    return (

        <Container fluid={true} >
            <Row className="no-gutters  secMinHeightwt">
                <Col xs={12} className="d-flex p-xl-5 p-md-4 py-4 flex-column justify-content-center align-items-center">
                    <div>Hey fill me, i am Empty <i class="fa fa-frown-o" aria-hidden="true"></i></div>
                    <Button variant="contained" color="primary" className="mt-4 bottomActionbutton cartActionBtn" onClick={() => props.history.push("/category")}>
                        Start Shopping
                    </Button>

                </Col>
            </Row>
        </Container>
    )
}

export default withRouter(CartEmptyComponent);