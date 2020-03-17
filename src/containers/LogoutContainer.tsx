import { connect } from 'react-redux';
import { AppState } from '../store';
import {logout } from '../actions/UserActions';
import Const from '../common/const';
import Cookies from 'js-cookie';
import { Logout } from '../components/Loout';

export interface Actions {
  onLogout: () => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    onLogout:() => {
      dispatch(logout(Const.URLS.LOGOUT_URL, Cookies.get(Const.KEY_TOKEN)));
    },
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.User);
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);