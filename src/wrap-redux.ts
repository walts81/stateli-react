import { IStateliStore } from 'stateli';
import { createStore } from 'redux';

export default (store: IStateliStore<any>, debug = false) => {
  const reducer = () => store.rootState;

  const devTools =
    (debug && (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()) ||
    undefined;
  const reduxStore = createStore(reducer, devTools);

  store.subscribe(s => {
    reduxStore.dispatch({ type: s.type, payload: s.payload });
  });

  return reduxStore;
};
