import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import ProductTabs from '../../Components/ProductComponents/ProductTabs';
import { map as _map, findIndex as _findIndex, get as _get } from 'lodash';
import ProductsListing from "../../Components/ProductComponents/ProductsListing";
import ProductDetails from "../../Components/ProductComponents/ProductDetails"
import genericGetData from "../../Redux/Actions/genericGetData";
import {Container, Row, Col} from 'reactstrap'
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
});

class ProductsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0,
            selectedTab: ""
        }
    }

    componentDidMount() {
        let categoryId = _get(this.props, "categoriesList[0].category_id", 0)
        this.fetchProducts(categoryId)
    }

    handleTabChange = (index, selectedTab) => {
        this.setState({ selectedTab: selectedTab, tabValue: index });
        this.fetchProducts(selectedTab);
    };

    fetchProducts = (categoryID) => {
    
        genericGetData({
            dispatch:this.props.dispatch,
            url:`/index.php/connect/index/category?catid=${categoryID}`,
            constants:{
            init:"PRODUCTS_LIST_INIT",
            success:"PRODUCTS_LIST_SUCCESS",
            error:"PRODUCTS_LIST_ERROR" 
            },
            identifier:"PRODUCTS_LIST",
            successCb:this.productsListFetchSuccess,
            errorCb:this.productsListFetchError
        })
    }

    productsListFetchSuccess = () => {

    }

    productsListFetchError = () => {

    }
    

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />   
                <Container fluid={true}  className="">            
                    <ProductTabs
                    tabValue={this.state.tabValue}
                    handleTabChange={(index, selectedTab)=>this.handleTabChange(index, selectedTab)}
                    />             
                <ProductsListing handleTabChange={(index, selectedTab)=>this.handleTabChange(index, selectedTab)} tabValue={this.state.tabValue} {...this.props} />
                </Container>
            </React.Fragment>
            
        );
    }
}

function mapStateToProps(state) {
    let categoriesList = _get(state,'categoriesList.lookUpData.data');
    return {categoriesList}
    }
export default connect(mapStateToProps)(withStyles(styles)(ProductsContainer));