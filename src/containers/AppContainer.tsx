import { connect } from 'react-redux';
import { AppState } from '../store';
import { App } from '../App';

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.Root);
}

export default connect(mapStateToProps, null)(App);