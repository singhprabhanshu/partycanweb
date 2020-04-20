import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { map as _map, findIndex as _findIndex, get as _get } from 'lodash';
import genericGetData from "../../Redux/Actions/genericGetData";
import { isEmpty as _isEmpty } from 'lodash';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import WithLoading from '../../Global/UIComponents/LoaderHoc';

const styles = theme => ({
});

class ProductsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        this.fetchTabs();
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

categoriesFetchSuccess = (data) => { }

categoriesFetchError = () => { }

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
                {this.props.categoriesList && this.props.categoriesList.length > 0 && 
                <div className="productsList">
                    {CategoryList}
                </div> }
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    let categoriesList = _get(state,'categoriesList.lookUpData.data');
    let isLoading = _get(state, 'categoriesList.isFetching')
    return {categoriesList, isLoading}
    }
export default connect(mapStateToProps)(withStyles(styles)(WithLoading(ProductsContainer)));