import { Action } from 'typescript-fsa';
import { connect } from 'react-redux';
import { AppState } from '../store';
import PostUserRequest from '../interface/PostUserRequest';
import { postUser, chkUser, UserActions, updateUser } from '../actions/UserActions';
import Const from '../common/const';
import { Login } from '../components/Login';
import { push } from 'connected-react-router';
import { isLogin } from '../common/global';
import { AppActions } from '../actions/AppActions';

export interface Actions {
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
  onRegister: (chkpassword: string,body: PostUserRequest) => void,
  onUpdate: (chkpassword: string,body: PostUserRequest) => void,
  onLogin: (body: PostUserRequest) => void,
  toNew: () => void,
  toTop: () => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState: (value: any, name: string) => dispatch(UserActions.updateState({ name, value })),
    onRegister: async (chkpassword: string,body: PostUserRequest) => {
      dispatch(UserActions.updateState({ name: "loadingRegister", value: true }));
      dispatch(UserActions.updateState({ name: "valid", value: false }));
      dispatch(UserActions.updateState({ name: "info", value: false }));
      await dispatch(postUser(Const.POST_USER_URL, chkpassword, body));
    },
    onUpdate: async (chkpassword: string,body: PostUserRequest) => {
      dispatch(UserActions.updateState({ name: "loadingRegister", value: true }));
      dispatch(UserActions.updateState({ name: "valid", value: false }));
      dispatch(UserActions.updateState({ name: "info", value: false }));
      await dispatch(updateUser(Const.PUT_USER_URL, chkpassword, body));
    },
    onLogin: async (body: PostUserRequest) => {
      dispatch(UserActions.updateState({ name: "loadingRegister", value: true }));
      dispatch(UserActions.updateState({ name: "valid", value: false }));
      dispatch(UserActions.updateState({ name: "info", value: false }));
      await dispatch(chkUser(Const.URLS.LOGIN_URL, body));
      if (isLogin()) {
        dispatch(push(Const.SITE_ROOT + "/menu"));
      };
    },
    toNew:() =>{
      dispatch(UserActions.updateState({ name: "loadingRegister", value: true }));
      dispatch(UserActions.updateState({ name: "valid", value: false }));
      dispatch(UserActions.updateState({ name: "info", value: false }));
      dispatch(UserActions.updateState({ name: "isNew", value: true }));
      dispatch(UserActions.updateState({ name: "btnName", value: "新規登録" }));
    },
    toTop:() =>{
      dispatch(AppActions.onClear({ }));
      dispatch(push(Const.SITE_ROOT + "/menu/new"));
    }
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.User);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);