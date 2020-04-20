/* Main Route Imports */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
/* Redux Imports*/
import { createStore, applyMiddleware, compose } from 'redux';
import axiosMiddleWare from './Redux/axiosMiddleware';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './Redux/RootReducer';
import { Provider } from 'react-redux';
/* Stylesheet */
import './assets/stylesheets/main.less';
import 'bootstrap/dist/css/bootstrap.css';
import "../src/assets/stylesheets/font-awesome-4.7.0/css/font-awesome.min.css"

/* Material Date Picker */
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
/*Material UI Imports*/
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
//import { createGenerateClassName } from '@material-ui/core/styles';
import theme from './MaterialUiSettings/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
/*Redux Persist Import */
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { PersistGate } from 'redux-persist/integration/react';

/*Layout imports*/
import EmptyLayout from './Layout/EmptyLayout';
import MainLayout from './Layout/MainLayout';
import RouteWithLayout from './Layout/RouteWithLayout';

/* Main Route Imports */
import AddressHomeContainer from './Containers/AddressHomeContainer';
import SplashContainer from './Containers/Login/SplashContainer';
import LoginContainer from './Containers/Login/LoginContainer';
import CreateAccountContainer from './Containers/Login/CreateAccountContainer';
import HoldupContainer from './Containers/Login/HoldupContainer';
import CartContainer from "./Containers/Cart/CartContainer";

import * as serviceWorker from './serviceWorker';
import ProductsContainer from './Containers/Products/ProductsContainer';
import SettingContainer from './Containers/Setting/SettingContainer';
import OrderStatusContainer from './Containers/Order/OrderStatus';
import ProductMainSection from './Containers/Products/ProductMainSection';
import ProductDetails from './Components/ProductComponents/ProductDetails';
import PartyLocatorContainer from './Containers/PartyLocator/PartyLocatorContainer';

// commented temporarly

// import socketIOClient from "socket.io-client";
// const endpoint = 'http://127.0.0.1:8000';
// export const socket = socketIOClient(endpoint);

// socket.on('userdetail', data => {
//   socket.emit('adduser', { data: { id: 123, username: 'prabhanshu'}});
// });

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

const middleware = [thunk, axiosMiddleWare];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
};
const persistConfig = {
  key: 'PARTYCAN',
  storage,
  stateReconciler: hardSet,
  blacklist: ['form', 'ShowToast']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store;

if (process.env.NODE_ENV !== 'production') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(persistedReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
}
else {
  store = createStore(persistedReducer, applyMiddleware(...middleware));
}

export const persistor = persistStore(store);


// @todo: drive url routes from a config file for central control
ReactDOM.render(
  //   <div>
  //     <Favicon url="/src/assets/images/favicon.ico" />

  <StylesProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarProvider maxSnack={8} autoHideDuration={4000} style={{ width: '100%' }}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <Router>
              <Switch>
                <RouteWithLayout Layout={EmptyLayout} exact path="/" Component={HoldupContainer} />
                <RouteWithLayout Layout={MainLayout} exact path="/signIn" Component={LoginContainer} />
                <RouteWithLayout Layout={MainLayout} exact path="/createAccount" Component={CreateAccountContainer} />
                <RouteWithLayout Layout={MainLayout} exact path="/splash" Component={SplashContainer} />
                <RouteWithLayout Layout={MainLayout} exact path="/cart" Component={CartContainer} />
                <RouteWithLayout Layout={MainLayout} exact path="/cart/:cartflow" Component={AddressHomeContainer} />
                {/* <RouteWithLayout Layout={EmptyLayout} exact path="/holdup" Component={HoldupContainer} /> */}
                {/* <RouteWithLayout Layout={MainLayout} exact path="/cart/address" Component={AddressHomeContainer} /> */}
                <RouteWithLayout Layout={MainLayout} exact path="/category" Component={ProductsContainer} />
                <RouteWithLayout Layout={MainLayout} exact path="/category/:categoryType" Component={ProductsContainer} />
                <RouteWithLayout Layout={MainLayout} exact path="/category/:categoryType/product/:productID" Component={ProductDetails} />
                <RouteWithLayout Layout={MainLayout} exact path="/home" Component={ProductMainSection} />
                <RouteWithLayout Layout={MainLayout} exact path="/setting/:settingParam" Component={SettingContainer} />
                <RouteWithLayout Layout={MainLayout} exact path="/order/status" Component={OrderStatusContainer} />
                <RouteWithLayout Layout={MainLayout} exact path="/party/locator" Component={PartyLocatorContainer} />

              </Switch>
            </Router>
            </PersistGate>
          </Provider>
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </StylesProvider>,
  //   </div>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();