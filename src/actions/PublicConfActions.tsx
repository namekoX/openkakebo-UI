import actionCreatorFactory from 'typescript-fsa';
import { Dispatch, Action } from 'redux';
import { AppState } from '../store';
import axios from 'axios';
import { createURL, getTokenPram } from '../common/utils';
import Const from '../common/const';
import Cookies from 'js-cookie';
import GetPublicConfResult from '../interface/GetPublicConfResult';
import PutHanyoResult from '../interface/PutHanyoResult';
import PublicConf from '../interface/PublicConf';

const actionCreator = actionCreatorFactory();
const onGetPublicConf = actionCreator<GetPublicConfResult>('ACTION_PUBLICCONF_GET');
const onSavePublicConf = actionCreator<PutHanyoResult>('ACTION_PUBLICCONF_SAVE');

export const getPublicConf = () => {
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    try {
      const response = await axios({
        method: 'GET',
        url: createURL(Const.URLS.PUBLIC_CONF_URL),
        headers: {
          'Authorization': getTokenPram(Cookies.get(Const.KEY_TOKEN) || ""),
        },
      });
      const result: GetPublicConfResult = {
        results: response.data,
        valid: false,
        validMsg: '',
        statusCd: response.status,
      };
      dispatch(onGetPublicConf(result));
    } catch (error) {
      const ret = {
        id: null,
        user_id: 0,
        is_open: '0',
        is_shunyu: '0',
        is_shunyu_category: '0',
        is_shishutu: '0',
        is_shishutu_category: '0',
        is_togetu: '0',
        is_zandaka: '0',
      }
      const result: GetPublicConfResult = {
        results: ret,
        valid: true,
        validMsg: 'データ取得で想定外のエラーが発生しました',
        statusCd: error.response !== undefined ? error.response.status : 500,
      };
      dispatch(onGetPublicConf(result));
    }
  };
};

export const savePublicConf = (conf: PublicConf) => {
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    try {
      const response = await axios({
        method: 'PUT',
        url: createURL(Const.URLS.PUBLIC_CONF_URL),
        headers: {
          'Authorization': getTokenPram(Cookies.get(Const.KEY_TOKEN) || ""),
        },
        data: conf
      });
      const result: PutHanyoResult = {
        valid: false,
        validMsg: '保存しました',
        statusCd: response.status,
        info: true,
      };
      dispatch(onSavePublicConf(result));
    } catch (error) {
      const result: PutHanyoResult = {
        valid: true,
        validMsg: '保存で想定外のエラーが発生しました',
        statusCd: error.response !== undefined ? error.response.status : 500,
        info: false,
      };
      dispatch(onSavePublicConf(result));
    }
  };
};

export const PublicConfActions = {
  updateState: actionCreator<{ name: string, value: any }>('ACTIONS_PUBLICCONF_UPDATE_STATE'),
  onGetPublicConf,
  onSavePublicConf,
};