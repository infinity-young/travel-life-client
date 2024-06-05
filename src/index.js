import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import createStoreByRootTag from '../src/store/index.ts';
import { Provider } from 'react-redux'
import ShopListPageWapper from './page/shopListPage';
import HomePage from '../src/page/homePage/index.tsx';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import ShopPage from '../src/page/shopPage.tsx';
import GoodsDetailPage from '../src/page/goodsDetailPage.tsx';
import './global.scss';




const root = ReactDOM.createRoot(document.getElementById('root'));
const reduxStore = createStoreByRootTag()
root.render(
  // <React.StrictMode>
    <Provider store={reduxStore}>
    <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shoplistpage/:parentId?" component={ShopListPageWapper} />
          <Route exact path='/shoppage/:shopId?' component={ShopPage}/>
          <Route exact path='/goodsdetailpage/:productId?' component={GoodsDetailPage}/>
        </Switch>
      </Router>
    </Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
