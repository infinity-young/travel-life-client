import { createStore,applyMiddleware,compose } from 'redux'
import reducers from './reducers/index.ts'
import createSagaMiddleware from 'redux-saga';
import saga from './saga/index.ts'
import { composeWithDevTools } from 'redux-devtools-extension';



export default function createStoreByRootTag() {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    composeWithDevTools()
  );
  const store = createStore(reducers,enhancer);
  sagaMiddleware.run(saga);
  return store
}