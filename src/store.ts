import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { UserReducer, UserState } from './states/UserReducer';
import createBrowserHistory from 'history/createBrowserHistory';
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { AppReducer, RootState } from './states/AppReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReactGA from 'react-ga';
import { getGAID } from './common/utils';

export const history = createBrowserHistory();
ReactGA.initialize(getGAID());

history.listen(({ pathname }) => {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
});

export type AppState = {
  User: UserState,
  Root: RootState,
  router: RouterState,
};

const store = createStore(
  combineReducers<AppState>({
    User: UserReducer,
    Root: AppReducer,
    router: connectRouter(history),
  }),
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history), logger))
);

export default store;