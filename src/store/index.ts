import { createStore,applyMiddleware } from 'redux'
import reducers from './reducers/index.ts'
import createSagaMiddleware from 'redux-saga';
import saga from './saga/index.ts'


export default function createStoreByRootTag() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers,applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(saga);
  return store
}