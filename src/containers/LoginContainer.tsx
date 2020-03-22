import { Action } from 'typescript-fsa';
import { connect } from 'react-redux';
import store, { AppState } from '../store';
import PostUserRequest from '../interface/PostUserRequest';
import { postUser, chkUser, UserActions, updateUser, logout } from '../actions/UserActions';
import Const from '../common/const';
import { Login } from '../components/Login';
import { push } from 'connected-react-router';
import { isLogin } from '../common/global';
import { getHost, getUserId } from '../common/utils';

export interface Actions {
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
  onRegister: (chkpassword: string, body: PostUserRequest) => void,
  onUpdate: (token: string, chk: string, after: string, before: string, changeMode: string) => void,
  onLogin: (body: PostUserRequest) => void,
  toNew: () => void,
  toTop: () => void,
  toGoogle: () => void,
  toYahoo: () => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState: (value: any, name: string) => dispatch(UserActions.updateState({ name, value })),
    onRegister: async (chkpassword: string, body: PostUserRequest) => {
      dispatch(UserActions.updateState({ name: "loading", value: true }));
      dispatch(UserActions.updateState({ name: "valid", value: false }));
      dispatch(UserActions.updateState({ name: "info", value: false }));
      await dispatch(postUser(Const.URLS.REGISTER_URL, chkpassword, body));
      if (isLogin()) {
        dispatch(push(Const.SITE_ROOT + "/menu/summary"));
      };
    },
    onUpdate: async (token: string, chk: string, after: string, before: string, changeMode: string) => {
      dispatch(UserActions.updateState({ name: "loading", value: true }));
      dispatch(UserActions.updateState({ name: "valid", value: false }));
      dispatch(UserActions.updateState({ name: "info", value: false }));
      let url = Const.URLS.PASS_CHANGE_URL;
      if(changeMode === 'ID'){
        url = Const.URLS.ID_CHANGE_URL;
      }
      await dispatch(updateUser(url, token, chk, after, before));
    },
    onLogin: async (body: PostUserRequest) => {
      dispatch(UserActions.updateState({ name: "loading", value: true }));
      dispatch(UserActions.updateState({ name: "valid", value: false }));
      dispatch(UserActions.updateState({ name: "info", value: false }));
      await dispatch(chkUser(Const.URLS.LOGIN_URL, body));
      if (isLogin()) {
        dispatch(push(Const.SITE_ROOT + "/menu/summary"));
      };
    },
    toNew: () => {
      dispatch(UserActions.updateState({ name: "valid", value: false }));
      dispatch(UserActions.updateState({ name: "info", value: false }));
      dispatch(UserActions.updateState({ name: "isNew", value: true }));
      dispatch(UserActions.updateState({ name: "btnName", value: "新規登録" }));
    },
    toTop: () => {
      dispatch(UserActions.onClear({}));
      dispatch(push(Const.SITE_ROOT + "/menu/summary"));
    },
    toGoogle: () => {
      dispatch(UserActions.updateState({ name: "loading", value: true }));
      window.location.href = getHost() + Const.URLS.GOOGLE_URL;
    },
    toYahoo: () => {
      dispatch(UserActions.updateState({ name: "loading", value: true }));
      window.location.href = getHost() + Const.URLS.YAHOO_URL;
    }
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.User);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);