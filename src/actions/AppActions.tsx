import actionCreatorFactory from 'typescript-fsa';
import LoginUser from '../interface/LoginUser';
import { Dispatch, Action } from 'redux';
import { AppState } from '../store';
import axios from 'axios';
import { createURL, getTokenPram } from '../common/utils';
import Const from '../common/const';
import Cookies from 'js-cookie';

const actionCreator = actionCreatorFactory();
const getUserId = actionCreator<LoginUser>('ACTIONS_APP_USERID_GET');

export const getUser = () => {
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    try {
      const response = await axios({
        method: 'GET',
        url: createURL(Const.URLS.GET_USER_ID_URL),
        headers: {
          'Authorization': getTokenPram(Cookies.get(Const.KEY_TOKEN) || ""),
        },
      });
      const result: LoginUser = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        token: response.data.token,
        isSocial: response.data.isSocial,
        statusCd: response.status,
      };
      dispatch(getUserId(result));
    } catch (error) {
      const result: LoginUser = {
        id: 0,
        name: '',
        email: '',
        token: '',
        isSocial: false,
        statusCd: error.response !== undefined ? error.response.status : 500,
      };
      dispatch(getUserId(result));
    }
  };
};

export const AppActions = {
  updatelogininfo: actionCreator<{}>('ACTIONS_UPDATE_LOGIN_INFO'),
  onClear: actionCreator<{}>('ACTIONS_APP_CLEAR'),
  updateState: actionCreator<{ name: string, value: any }>('ACTIONS_APP_UPDATE_STATE'),
  getUserId,
};