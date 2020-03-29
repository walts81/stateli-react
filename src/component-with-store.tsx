import * as React from 'react';
import { IStateliStore } from 'stateli';

export interface IComponentWithStore<RootState = any> {
  readonly rootState: RootState;
  commit(type: string, payload?: any): void;
  dispatch(type: string, payload?: any): Promise<any>;
  getter(type: string): any;
  storeSubscribe(
    observer: (payload: { type: string; payload: any; store: IStateliStore<RootState> }) => void
  ): { unsubscribe: () => void };
  getStore(): IStateliStore<RootState>;
}

export class ComponentWithStore<RootState = any, State = any> extends React.Component<any>
  implements IComponentWithStore<RootState> {
  unsub: () => void;

  constructor(props: any, context?: any, public getStateliState?: (rootState: RootState) => State) {
    super(props, context);
  }

  get rootState() {
    return this.getStore()?.rootState;
  }

  commit(type: string, payload?: any) {
    this.getStore()?.commit(type, payload);
  }

  dispatch(type: string, payload?: any) {
    return this.getStore()?.dispatch(type, payload);
  }

  getter(type: string) {
    return this.getStore()?.getter(type);
  }

  storeSubscribe(observer: (payload: { type: string; payload: any; store: IStateliStore<RootState> }) => void) {
    return this.getStore()?.subscribe(observer);
  }

  getStore() {
    return this.props.store;
  }

  componentDidMount() {
    this.unsub = this.getStore()?.subscribe(s => {
      const state = !!this.getStateliState ? this.getStateliState(s.store.rootState) : s.store.rootState;
      const newState = { ...this.state, ...state };
      this.setState(newState);
    });
  }

  componentWillUnmount() {
    if (!!this.unsub) {
      this.unsub();
    }
  }
}
