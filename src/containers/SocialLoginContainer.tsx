import { connect } from 'react-redux';
import { AppState } from '../store';
import Const from '../common/const';
import { SocialLogin } from '../components/SocialLogin';
import { push } from 'connected-react-router';
import { AppActions } from '../actions/AppActions';
import Cookies from 'js-cookie';

export interface Actions {
  toTop: (token: string) => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    toTop: (token: string) => {
      Cookies.set(Const.KEY_TOKEN, token);
      dispatch(AppActions.onClear({}));
      dispatch(AppActions.updateState({ name: "isSocialLogin", value: true }));
      dispatch(push(Const.SITE_ROOT + "/"));
    },
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.Root);
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialLogin);