import {combineReducers} from 'redux';
import ShowToast from './Reducers/toastReducer';
/* COMMON Reducer*/ 
import commonReducer from './Reducers/commonReducer';

/* COMMON Static Reducer */
import commonStaticReducer from './Reducers/commonStaticReducer';

let zipCodeLocator = commonReducer('ZIPCODE_LOCATOR');
let userSignInInfo = commonReducer('USER_SIGNIN');
let cart = commonReducer("CART_ITEMS");
let removeCart = commonReducer("CART_ITEM_REMOVE");
let updateCart = commonReducer("CART_ITEM_UPDATE");
let productList = commonReducer("PRODUCTS_LIST");
let categoriesList = commonReducer("CATEGORIES_LIST");
let lockTerminal = commonStaticReducer('LOCK_TERMINAL');
let productDetails = commonReducer("PRODUCT_DETAILS_LIST");
let cartFlow = commonStaticReducer('CART_FLOW');


let rootRducer = combineReducers({
    zipCodeLocator,
    userSignInInfo,
    lockTerminal,
    ShowToast,
    cart,
    productList,
    categoriesList,
    productDetails,
    cartFlow,
    removeCart,
    updateCart
})

export default rootRducer;