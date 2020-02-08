import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { isLogin } from '../common/global';
import { AppActions } from '../actions/AppActions';
import LoginUser from '../interface/LoginUser';
import { UserActions } from '../actions/UserActions';

export interface RootState {
  loginUser?: LoginUser,
  isLogin?: boolean,
  menuTabActive?:string,
}

const initialState: RootState = {
  loginUser:{
    id: "",
    name: "",
    email: "",
    token: "",
  },
  isLogin: isLogin(),
  menuTabActive: "/menu/new",
};

export const AppReducer = reducerWithInitialState(initialState)
  .case(AppActions.updateState, (state, { name, value }) => {
    return Object.assign({}, state, { [name]: value });
  })
  .case(UserActions.onLogin, (state, payload) => {
    return Object.assign({}, state, {
      loginUser:payload.user,
      isLogin:isLogin(),
    });
  })
  .case(AppActions.onClear, (state, {}) => {
    return Object.assign({}, state, { 
      isLogin: isLogin(),
      menuTabActive: "/menu/new",
    });
  })
  ;
