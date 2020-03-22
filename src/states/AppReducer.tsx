import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { isLogin } from '../common/global';
import { AppActions } from '../actions/AppActions';
import LoginUser from '../interface/LoginUser';
import { UserActions } from '../actions/UserActions';

export interface RootState {
  loginUser?: LoginUser;
  isLogin?: boolean;
  menuTabActive?: string;
  isSocialLogin?: boolean;
  statusCd?: number;
}

const initialState: RootState = {
  loginUser: {
    id: 0,
    name: "",
    email: "",
    token: "",
    isSocial: false,
  },
  isLogin: isLogin(),
  menuTabActive: "/menu/summary",
  isSocialLogin: false,
  statusCd: 200,
};

export const AppReducer = reducerWithInitialState(initialState)
  .case(AppActions.updateState, (state, { name, value }) => {
    return Object.assign({}, state, { [name]: value });
  })
  .case(UserActions.onLogin, (state, payload) => {
    return Object.assign({}, state, {
      loginUser: payload.user,
      isLogin: isLogin(),
    });
  })
  .case(UserActions.onRegister, (state, payload) => {
    return Object.assign({}, state, {
      loginUser: payload.user,
      isLogin: isLogin(),
    });
  })
  .case(AppActions.getUserId, (state, payload) => {
    return Object.assign({}, state, {
      loginUser: payload,
      isLogin: isLogin(),
    });
  })
  .case(AppActions.onClear, (state, { }) => {
    return Object.assign({}, state, {
      isLogin: isLogin(),
      menuTabActive: "/menu/summary",
    });
  })
  ;
