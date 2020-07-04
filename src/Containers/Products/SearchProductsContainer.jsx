import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import genericPostData from "../../Redux/Actions/genericPostData";
import { isArray as _isArray, map as _map, findIndex as _findIndex, get as _get, isEmpty as _isEmpty } from 'lodash';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { cleanEntityData } from '../../Global/helper/commonUtil';
import { ProductClick, PageView } from '../../Global/helper/react-ga';

const styles = theme => ({

});

class SearchProductsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0,
            selectedTab: "",
            isLoading: true
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleSearchProducts = (e) => {
        let searchRequest = _get(e, "target.value", "");
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: { q: searchRequest },
            url: `/connect/index/search?q=${searchRequest}`,
            constants: {
                init: "SEARCH_PRODUCTS_LIST_INIT",
                success: "SEARCH_PRODUCTS_LIST_SUCCESS",
                error: "SEARCH_PRODUCTS_LIST_ERROR"
            },
            identifier: "SEARCH_PRODUCTS_LIST",
            successCb: this.searchProductsFetchSuccess,
            errorCb: this.searchProductsFetchError,
            dontShowMessage: true
        })
    }

    searchProductsFetchSuccess = () => {

    }

    searchProductsFetchError = () => {

    }

    fetchProductDetails = (ProductID) => {
        this.props.history.push(`/category/ALL/product/${ProductID}`)
    }

    handleReactGAProcutClickEvents = ({ product }) => {
        const payload =  cleanEntityData({
            productId: _get(product, 'id'),
            name: _get(product, 'name'),
            price: _get(product, 'price') ? Number(_get(product, 'price')) : undefined,
        })
        ProductClick(payload);
        PageView();
    };

    render() {
        const { classes, searchedProducts } = this.props;
        let ProductList = []
        _isArray(searchedProducts) && searchedProducts.map((product, index) => {
            ProductList.push(
                <Card onClick={() => { this.fetchProductDetails(product.id); this.handleReactGAProcutClickEvents({ product }) }} >
                    <div className="prodcutMinDetails">
                        <CardImg src={product.image} alt="Card image cap" />
                        <CardBody>
                            <CardTitle className=" text-white text-center text-uppercase">{product.name}</CardTitle>
                        </CardBody>
                    </div>
                </Card>
            )
        })
        return (
            <React.Fragment>
                <CssBaseline />
                <Container fluid={true} className="d-flex justify-content-center" >
                    <div className="pt-5 search-panel">
                        <Input onChange={(e) => this.handleSearchProducts(e)} className="searchItembar" placeholder="SEARCH PRODUCTS" />
                    </div>
                </Container>
                <div className="productsList">
                    {ProductList}
                </div>
            </React.Fragment>

        );
    }
}

function mapStateToProps(state) {
    let searchedProducts = _get(state, 'searchProductsData.lookUpData.data');
    return { searchedProducts }
}
export default connect(mapStateToProps)(withStyles(styles)(SearchProductsContainer));