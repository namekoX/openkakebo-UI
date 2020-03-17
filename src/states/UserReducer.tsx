import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { UserActions } from '../actions/UserActions';
import Cookies from 'js-cookie';
import Const from '../common/const';

export interface UserState {
  email: string,
  password: string,
  chkpassword: string,
  isNew: boolean,
  isChange: boolean,
  changeMode: string,
  valid: boolean,
  loading: boolean;
  msg: string,
  info: boolean,
  btnName: string,
}

const initialState: UserState = {
  email: '',
  password: '',
  chkpassword: '',
  isNew: false,
  isChange: false,
  valid: false,
  loading: false,
  msg: '',
  info: false,
  btnName: 'ログイン',
  changeMode: 'パスワード',
};

export const UserReducer = reducerWithInitialState(initialState)
  .case(UserActions.onLogin, (state, payload) => {
    if (!payload.valid && payload.user) {
      Cookies.set(Const.KEY_TOKEN, payload.user.token);
    }

    return Object.assign({}, state, {
      msg: payload.msg,
      valid: payload.valid,
      info: payload.info,
      loading: false,
      email: (payload.valid ? state.email : ""),
      password: "",
      chkpassword: "",
    });
  })
  .case(UserActions.onLogout, (state, payload) => {
    Cookies.remove(Const.KEY_TOKEN);
    return Object.assign({}, state, {
      msg: "",
      valid: payload.valid,
      info: payload.info,
      email: "",
      password: "",
      chkpassword: "",
    });
  })
  .case(UserActions.onRegister, (state, payload) => {
    if (!payload.valid && payload.user) {
      Cookies.set(Const.KEY_TOKEN, payload.user.token);
    }

    return Object.assign({}, state, {
      msg: payload.msg,
      valid: payload.valid,
      info: payload.info,
      loading: false,
      btnName: (payload.valid ? "新規登録" : "戻る"),
      user_id: (payload.valid ? state.email : ""),
      password: "",
      chkpassword: "",
    });
  })
  .case(UserActions.onUpdate, (state, payload) => {
    return Object.assign({}, state, {
      msg: payload.msg,
      valid: payload.valid,
      info: payload.info,
      loading: false,
      btnName: (payload.valid ? "更新" : "戻る"),
      password: "",
      chkpassword: "",
    });
  })
  .case(UserActions.updateState, (state, { name, value }) => {
    return Object.assign({}, state, { [name]: value });
  })
  .case(UserActions.onClear, (state, { }) => {
    return Object.assign({}, state, initialState);
  })
  ;
