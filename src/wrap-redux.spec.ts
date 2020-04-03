import wrapRedux from './wrap-redux';

describe('Wrap Redux', () => {
  test('should call redux dev tools', () => {
    const mock = jest.fn(() => undefined);
    const originalWindow = { ...window };
    const windowSpy = jest.spyOn<any, any>(global, 'window', 'get');
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      __REDUX_DEVTOOLS_EXTENSION__: mock,
    }));
    const store: any = { state: '', subscribe: () => {} };
    wrapRedux(store, true);
    expect(mock).toBeCalledTimes(1);
  });
  test('should subscribe to store', () => {
    const mock = jest.fn();
    const store: any = { state: '', subscribe: mock };
    wrapRedux(store);
    expect(mock).toBeCalledTimes(1);
  });
});
