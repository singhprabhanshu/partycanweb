import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import genericGetData from "../../Redux/Actions/genericGetData";
import {Container, Row, Col} from 'reactstrap'
import SearchIcon from '@material-ui/icons/Search';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
const styles = theme => ({
   
    
});

class ProductTabs extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab: "",
            renderTabs: []
        }
      }

    componentDidMount(){
        this.fetchTabs();
        this.categoriesFetchSuccess();
    }

    fetchTabs = () => {
    
        genericGetData({
            dispatch:this.props.dispatch,
            url:"/connect/index/categorylist",
            constants:{
            init:"CATEGORIES_LIST_INIT",
            success:"CATEGORIES_LIST_SUCCESS",
            error:"CATEGORIES_LIST_ERROR" 
            },
            identifier:"CATEGORIES_LIST",
            successCb:this.categoriesFetchSuccess,
            errorCb:this.categoriesFetchError
        })
    }

    categoriesFetchSuccess = (data) => {
        const { classes } = this.props;
        let renderTabs = []
        data && data.map((tab,index)=>{
            renderTabs.push(<Tab onClick={()=>this.props.handleTabChange(index, tab.category_id)} className={classes.tabColor} label={tab.category_name}/>)
        })
        this.setState({ renderTabs })
    }

    categoriesFetchError = () => {

    }

    render() {
        const { classes } = this.props;
        const { selectedTab } = this.state;
        return (
            <React.Fragment>
                    <div className="mobile-tabs-title d-block d-md-none">
                    <Container fluid={true}  className="d-flex align-items-center h-100 justify-content-center">   
                        <Row className=" align-items-center flex-grow-1 pt-4 px-3">
                        <Col xs={'auto'}  className=""> 
                            <KeyboardBackspaceIcon style={{fontSize:'3rem'}}/>
                        </Col>
                        <Col  className="title"> 
                                 Party Cans
                        </Col>
                        <Col xs={'auto'}  className=""> 
                            <SearchIcon style={{fontSize:'3rem'}}/>
                        </Col>
                        </Row>
                        </Container>
                        </div>
                    <Tabs
                        value={this.props.tabValue}
                        variant="standard"
                        indicatorColor=""
                        textColor="white"
                        aria-label="icon tabs example"
                        className="product-tabs"
                    >
                        {this.state.renderTabs}
                    </Tabs>
              
            </React.Fragment>
          );
     }
}

const mapStateToProps = (state) => {
  
};

export default connect(mapStateToProps)(withStyles(styles)(ProductTabs));