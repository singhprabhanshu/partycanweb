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
let paymentMethods = commonReducer("GET_PAYMENTMETHODS")
let lockTerminal = commonStaticReducer('LOCK_TERMINAL');
let productDetails = commonReducer("PRODUCT_DETAILS_LIST");
let cartFlow = commonStaticReducer('CART_FLOW');
let speed = commonReducer('FETCH_DELIVERY_OPTIONS');
let cartTabValidation = commonStaticReducer('CART_TAB_VALIDATION');
let userSettings = commonReducer("GET_SETTING_DATA");
let orderSettings = commonReducer("GET_ORDER_SETTING_DATA");
let searchProductsData = commonReducer("SEARCH_PRODUCTS_LIST");
let addProductToCartByFooter = commonStaticReducer("PRODUCT_DETAILS_FOOTER");
let userAddress = commonReducer("USER_ADDRESS");


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
    updateCart,
    paymentMethods,
    speed,
    cartTabValidation,
    userSettings,
    orderSettings,
    searchProductsData,
    addProductToCartByFooter,
    userAddress
})

export default rootRducer;