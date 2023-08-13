import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import createStoreByRootTag from '../src/store/index.ts';
import { Provider } from 'react-redux'
import App from './page/index.tsx'
import ShopListPageWapper from './page/shopListPage';
import HomePage from './page/homPage';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
const reduxStore = createStoreByRootTag()
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
    <Router>
      <Link to="/shoplistpage">Go to Shop List Page1</Link>
      <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/shoplistpage/:parentId" component={ShopListPageWapper} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
