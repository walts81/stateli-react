import * as React from 'react';
import { IStateliStore } from 'stateli';

export interface IAppContext<RootState = any> {
  store: IStateliStore<RootState>;
}

export const CreateAppContext = <RootState = any>(defaultValue: IAppContext<RootState>) => {
  return React.createContext<IAppContext<RootState>>(defaultValue);
};
