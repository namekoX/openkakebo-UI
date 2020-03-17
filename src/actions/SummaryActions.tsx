import actionCreatorFactory from 'typescript-fsa';
import { Dispatch, Action } from 'redux';
import { AppState } from '../store';
import axios from 'axios';
import { createURL, getTokenPram } from '../common/utils';
import Const from '../common/const';
import Cookies from 'js-cookie';
import GetSummaryRequest from '../interface/GetSummaryRequest';
import GetSummaryResult from '../interface/GetSummaryResult';

const actionCreator = actionCreatorFactory();
const onGetSammary = actionCreator<GetSummaryResult>('ACTION_SUMMARY_GET');

export const getSammary = (month: number) => {
  const prams: GetSummaryRequest = {
    month: month,
  }
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    console.log(createURL(Const.URLS.SUMMARY_URL, prams));
    try {
      const response = await axios({
        method: 'GET',
        url: createURL(Const.URLS.SUMMARY_URL, prams),
        headers: {
          'Authorization': getTokenPram(Cookies.get(Const.KEY_TOKEN) || ""),
        },
      });
      const result: GetSummaryResult = {
        results: response.data,
        valid: false,
        validMsg: '',
        statusCd: response.status,
      };
      dispatch(onGetSammary(result));
    } catch (error) {
      const ret ={
        id: null,
        user_id: 0,
        shunyu: 0,
        shishutu: 0,
        koza:[],
      }
      const result: GetSummaryResult = {
        results: ret,
        valid: true,
        validMsg: 'データ取得で想定外のエラーが発生しました',
        statusCd: error.response !== undefined ? error.response.status : 500,
      };
      dispatch(onGetSammary(result));
    }
  };
};

export const SummaryActions = {
  updateState: actionCreator<{ name: string, value: any }>('ACTIONS_SUMMARY_UPDATE_STATE'),
  onGetSammary,
};