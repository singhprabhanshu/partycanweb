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
import { isEmpty as _isEmpty } from 'lodash';
import proImg from '../../assets/images/party-can.png'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
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
}

categoriesFetchError = () => {

}

redirectToCategories = (category) => {
    this.props.history.push(`/category/${category.category_name}`)
}
    

    render() {
        const { categoriesList, classes } = this.props;
        let CategoryList = []
        !_isEmpty(categoriesList) && categoriesList.map((category, index)=>{
            CategoryList.push(
                <Card style={{ height: "200px" }} onClick={()=>this.redirectToCategories(category)} >
                    <div className="prodcutMinDetails">
                        <CardImg style={{ maxHeight: "15rem" }} src={category.category_image} alt="Card image cap" />
                        <CardBody>
                        <CardTitle className=" text-white text-center text-uppercase">{category.category_name}</CardTitle>
                        </CardBody>
                    </div>
                </Card>
            )
        })
        return (
            <React.Fragment>
                <CssBaseline />
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <h1>SHOP</h1>
                    </div>
                <div className="productsList">
                    {CategoryList}
                    </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    let categoriesList = _get(state,'categoriesList.lookUpData.data');
    return {categoriesList}
    }
export default connect(mapStateToProps)(withStyles(styles)(ProductsContainer));