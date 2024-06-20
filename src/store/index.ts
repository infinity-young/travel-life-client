import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index.ts';
import createSagaMiddleware from 'redux-saga';
import saga from './saga/index.ts';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function createStoreByRootTag() {
  const sagaMiddleware = createSagaMiddleware();
  
  // 使用 composeWithDevTools 来组合中间件和 dev tools
  const enhancer = composeWithDevTools(
    applyMiddleware(sagaMiddleware)
    // 可以在这里添加其他的中间件
  );

  const store = createStore(reducers, enhancer);
  sagaMiddleware.run(saga);
  return store;
}
