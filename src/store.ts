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
import { ShushiState, ShushiReducer } from './states/ShushiReducer';
import { InputReducer,InputState } from './states/InputReducer';
import { SummaryState, SummaryReducer } from './states/SummaryReducer';
import { PublicConfState, PublicConfReducer } from './states/PublicConfReducer';

export const history = createBrowserHistory();
ReactGA.initialize(getGAID());

history.listen(({ pathname }) => {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
});

export type AppState = {
  User: UserState,
  Root: RootState,
  Shushi:ShushiState,
  Input:InputState,
  router: RouterState,
  summary:SummaryState,
  publicConf:PublicConfState,
};

const store = createStore(
  combineReducers<AppState>({
    User: UserReducer,
    Root: AppReducer,
    Shushi: ShushiReducer,
    Input: InputReducer,
    router: connectRouter(history),
    summary: SummaryReducer,
    publicConf:PublicConfReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history), logger))
);

export default store;