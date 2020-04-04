import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import {Container, Row, Col} from 'reactstrap'
const styles = theme => ({
   
});

class Footer extends React.Component { 
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Container fluid={true}  className="footerLayout d-flex align-items-center">                   
                <Container className="container-content justify-content-center">
                        <Row>
                            <Col className="d-flex flex-column">
                                <span className="pb-2">&copy; to PartyCan</span>                     
                                <span>HandCrafted with <i className="fa fa-heart"></i> By PartCan Team</span>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </React.Fragment>
          );
     }
}

const mapStateToProps = (state) => {  
    return {
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Footer));