import actionCreatorFactory from 'typescript-fsa';
import { createURL, getTokenPram } from '../common/utils';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { AppState } from '../store';
import GetCategoryResult from '../interface/GetCategoryResult';
import Category from '../interface/Category';
import PutHanyoResult from '../interface/PutHanyoResult';
import GetKozaResult from '../interface/GetKozaResult';
import Koza from '../interface/Koza';
import GetRirekiResult from '../interface/GetRirekiResult';
import GetRirekiRequest from '../interface/GetRirekiRequest';
import Rireki from '../interface/Rireki';
import Cookies from 'js-cookie';
import Const from '../common/const';

const actionCreator = actionCreatorFactory();

const onCategoryGet = actionCreator<GetCategoryResult>('ACTIONS_SHUSHI_CATEGORY_GET');
const onCategorySave = actionCreator<PutHanyoResult>('ACTIONS_SHUSHI_CATEGORY_SAVE');

const onKozaGet = actionCreator<GetKozaResult>('ACTIONS_SHUSHI_KOZA_GET');
const onKozaSave = actionCreator<PutHanyoResult>('ACTIONS_SHUSHI_KOZA_SAVE');

const onRirekiGet = actionCreator<GetRirekiResult>('ACTIONS_SHUSHI_RIREKI_GET');
const onRirekiDelete = actionCreator<PutHanyoResult>('ACTIONS_SHUSHI_RIREKI_DELETE');

export const getCategory = (url: string, kbn: string, token: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    try {
      const response = await axios({
        method: 'GET',
        url: createURL(url),
        headers: {
          'Authorization': getTokenPram(token),
          'kbn': kbn,
        },
      });
      const result: GetCategoryResult = {
        results: response.data,
        valid: false,
        validMsg: '',
        statusCd: response.status,
      };
      dispatch(onCategoryGet(result));
    } catch (error) {
      const result: GetCategoryResult = {
        results: [],
        valid: true,
        validMsg: 'データ取得で想定外のエラーが発生しました',
        statusCd: error.response !== undefined ? error.response.status : 500,
      };
      dispatch(onCategoryGet(result));
    }
  };
};

export const saveCategory = (url: string, kbn: string, token: string, categories: Category[] | null) => {
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    try {
      const response = await axios({
        method: 'PUT',
        url: createURL(url),
        headers: {
          'Authorization': getTokenPram(token),
          'kbn': kbn,
        },
        data: categories
      });
      const result: PutHanyoResult = {
        valid: false,
        validMsg: '保存しました',
        statusCd: response.status,
        info: true,
      };
      dispatch(onCategorySave(result));
    } catch (error) {
      const result: PutHanyoResult = {
        valid: true,
        validMsg: '保存で想定外のエラーが発生しました',
        statusCd: error.response !== undefined ? error.response.status : 500,
        info: false,
      };
      dispatch(onCategorySave(result));
    }
  };
};

export const getKoza = (url: string, token: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    try {
      const response = await axios({
        method: 'GET',
        url: createURL(url),
        headers: {
          'Authorization': getTokenPram(token),
        },
      });
      const result: GetKozaResult = {
        results: response.data,
        valid: false,
        validMsg: '',
        statusCd: response.status,
      };
      dispatch(onKozaGet(result));
    } catch (error) {
      const result: GetKozaResult = {
        results: [],
        valid: true,
        validMsg: 'データ取得で想定外のエラーが発生しました',
        statusCd: error.response !== undefined ? error.response.status : 500,
      };
      dispatch(onKozaGet(result));
    }
  };
};

export const saveKoza = (url: string, token: string, kozas: Koza[] | null) => {
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {

    let errorflg = false;
    kozas!.forEach(koza => {
      if (koza.koza_name === "") {
        const result: PutHanyoResult = {
          valid: true,
          validMsg: '口座名は必須です',
          statusCd: 400,
          info: false,
        };
        dispatch(onKozaSave(result));
        errorflg = true
      }
    }
    )

    if (errorflg) return;

    try {
      const response = await axios({
        method: 'PUT',
        url: createURL(url),
        headers: {
          'Authorization': getTokenPram(token),
        },
        data: kozas
      });
      const result: PutHanyoResult = {
        valid: false,
        validMsg: '保存しました',
        statusCd: response.status,
        info: true,
      };
      dispatch(onKozaSave(result));
    } catch (error) {
      const result: PutHanyoResult = {
        valid: true,
        validMsg: '保存で想定外のエラーが発生しました',
        statusCd: error.response !== undefined ? error.response.status : 500,
        info: false,
      };
      dispatch(onKozaSave(result));
    }
  };
};

export const getRireki = (url: string, token: string, month: number | null, offset: number, limit: number) => {
  const prams: GetRirekiRequest = {
    month: month,
    offset: offset,
    limit: limit,
  }
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    try {
      const response = await axios({
        method: 'GET',
        url: createURL(url, prams),
        headers: {
          'Authorization': getTokenPram(token),
        },
      });
      const result: GetRirekiResult = {
        results: response.data,
        valid: false,
        validMsg: '',
        statusCd: response.status,
      };
      dispatch(onRirekiGet(result));
    } catch (error) {
      const ret = {
        rireki: [],
        pagerTotalCount: 0,
      }
      const result: GetRirekiResult = {
        results: ret,
        valid: true,
        validMsg: 'データ取得で想定外のエラーが発生しました',
        statusCd: error.response !== undefined ? error.response.status : 500,
      };
      dispatch(onRirekiGet(result));
    }
  };
};

export const deleteRireki = (url: string, rireki: Rireki, index: number) => {

  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    try {
      const response = await axios({
        method: 'DELETE',
        url: createURL(url),
        headers: {
          'Authorization': getTokenPram(Cookies.get(Const.KEY_TOKEN) || ""),
        },
        data: rireki,
      });
      const result: PutHanyoResult = {
        valid: false,
        validMsg: '削除しました。',
        statusCd: response.status,
        info: true,
        hanyo: index,
      };
      dispatch(onRirekiDelete(result));
    } catch (error) {
      const ret = {
        rireki: [],
        pagerTotalCount: 0,
      }
      const result: PutHanyoResult = {
        valid: true,
        validMsg: '削除で想定外のエラーが発生しました',
        statusCd: error.response !== undefined ? error.response.status : 500,
        info: false,
      };
      dispatch(onRirekiDelete(result));
    }
  };
};

export const ShushiActions = {
  onClear: actionCreator<{}>('ACTIONS_SHUSHI_CLEAR'),
  updateState: actionCreator<{ name: string, value: any }>('ACTIONS_SHUSHI_UPDATE_STATE'),
  onCategoryDelete: actionCreator<{ index: number, kbn: string, subindex: number | null }>('ACTIONS_SHUSHI_CATEGORY_DELETE'),
  onCategoryModalInsert: actionCreator<{ id: number }>('ACTIONS_SHUSHI_CATEGORY_INSERT'),
  onCategoryModalUpdate: actionCreator<{}>('ACTIONS_SHUSHI_CATEGORY_UPDATE'),
  onCategoryGet,
  onCategorySave,
  onKozaGet,
  onKozaSave,
  onKozaDelete: actionCreator<{ index: number }>('ACTIONS_SHUSHI_KOZA_DELETE'),
  updateKoza: actionCreator<{ name: string, value: any, index: number, id: number }>('ACTIONS_KOZA_UPDATE_STATE'),
  onRirekiGet,
  onRirekiDelete,
};