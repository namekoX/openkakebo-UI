import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store , {history} from './store';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import './index.scss';
import { ConnectedRouter } from 'connected-react-router';
import AppContainer from './containers/AppContainer';

ReactDOM.render(
  <Provider store={Store}>
    <ConnectedRouter history={history}>
      <AppContainer />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

serviceWorker.unregister();
