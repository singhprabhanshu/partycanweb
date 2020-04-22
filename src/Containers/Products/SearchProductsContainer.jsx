import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { map as _map, findIndex as _findIndex, find as _find, get as _get } from 'lodash';
import {Container, Row, Col} from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import genericPostData from "../../Redux/Actions/genericPostData";

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
    }    

    handleSearchProducts = (e) => {
        let searchRequest = _get(e, "target.value", "");
        genericPostData({
            dispatch:this.props.dispatch,
            reqObj: { q: searchRequest },
            url:`/index.php/connect/index/search?q=${searchRequest}`,
            constants:{
            init:"SEARCH_PRODUCTS_LIST_INIT",
            success:"SEARCH_PRODUCTS_LIST_SUCCESS",
            error:"SEARCH_PRODUCTS_LIST_ERROR" 
            },
            identifier:"SEARCH_PRODUCTS_LIST",
            successCb:this.searchProductsFetchSuccess,
            errorCb:this.searchProductsFetchError
        })
    }

    searchProductsFetchSuccess = () => {

    }

    searchProductsFetchError = () => {

    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />   
                <Container fluid={true}  className="search-panel">
                <div className="pt-5">    
                     <Input onChange={(e)=>this.handleSearchProducts(e)} className="searchItembar" placeholder="SEARCH PRODUCTS" />
                 </div>
                </Container>
            </React.Fragment>
            
        );
    }
}

function mapStateToProps(state) {
    }
export default connect(mapStateToProps)(withStyles(styles)(SearchProductsContainer));