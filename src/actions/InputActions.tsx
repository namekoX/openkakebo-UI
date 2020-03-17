import actionCreatorFactory from 'typescript-fsa';
import PutHanyoResult from '../interface/PutHanyoResult';
import Shushi from '../interface/Shushi';
import { Dispatch, Action } from 'redux';
import { AppState } from '../store';
import axios from 'axios';
import { createURL, getTokenPram } from '../common/utils';
import Validation from '../interface/Validation';

const actionCreator = actionCreatorFactory();
const onShushiSave = actionCreator<PutHanyoResult>('ACTIONS_INPUT_SHUSHI_SAVE');

export const saveShushi = (url: string, token: string, shushi: Shushi) => {
  const vd = PostInputValidchk(shushi);
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    if (vd.isError) {
      const result: PutHanyoResult = {
        valid: true,
        info: false,
        validMsg: vd.msg,
        statusCd: 400,
      };
      dispatch(onShushiSave(result));
      return Promise.resolve();
    }
    
    try {
      const response = await axios({
        method: 'POST',
        url: createURL(url),
        headers: {
          'Authorization': getTokenPram(token),
        },
        data: shushi
      });
      const result: PutHanyoResult = {
        valid: false,
        validMsg: '保存しました。続けて入力ができます。',
        statusCd: response.status,
        info: true,
      };
      dispatch(onShushiSave(result));
    } catch (error) {
      const result: PutHanyoResult = {
        valid: true,
        validMsg: '保存で想定外のエラーが発生しました',
        statusCd: error.response !== undefined ? error.response.status : 500,
        info: false,
      };
      dispatch(onShushiSave(result));
    }
  };
};

function PostInputValidchk(body: Shushi): Validation {
  let vd: Validation = {
    isError: false,
    msg: "",
  }

  if (body.koza_id === null) {
    vd = {
      isError: true,
      msg: "口座は必須です",
    };
    return vd;
  }

  if (body.hiduke === null) {
    vd = {
      isError: true,
      msg: "日付は必須です",
    };
    return vd;
  }

  return vd;
}

export const InputActions = {
  onClear: actionCreator<{}>('ACTIONS_INPUT_CLEAR'),
  updateState: actionCreator<{ name: string, value: any }>('ACTIONS_INPUT_UPDATE_STATE'),
  onShushiSave,
};