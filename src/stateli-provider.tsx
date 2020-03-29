import * as React from 'react';
import { IStateliStore } from 'stateli';
import { CreateAppContext } from './app-context';
import { ComponentWithStore } from './component-with-store';
import wrapRedux from './wrap-redux';

const AppContext = CreateAppContext({ store: null as any });
let reduxStore: any = null;

export class StateliProvider extends React.Component<{ debug: boolean; store: IStateliStore<any> }> {
  constructor(props: any) {
    super(props);

    if (!reduxStore) {
      reduxStore = wrapRedux(this.props.store, this.props.debug);
    }
  }

  render() {
    const props = { store: this.props.store };
    return <AppContext.Provider value={{ ...props }}>{this.props.children}</AppContext.Provider>;
  }
}

export function WrapComponentWithStore<RootState = any, State = any>(
  Component: any,
  getState?: (rootState: RootState) => State
) {
  return class extends ComponentWithStore<RootState, State> {
    constructor(props: any, context?: any) {
      super(props, context, getState);
    }

    render() {
      return (
        <AppContext.Consumer>
          {ctx => {
            const props = {
              ...this.props,
              store: ctx.store,
            };
            return <Component {...props} />;
          }}
        </AppContext.Consumer>
      );
    }
  };
}
