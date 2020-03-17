import actionCreatorFactory from 'typescript-fsa';
import PostUserResult from '../interface/PostUserResult';
import PostUserRequest from '../interface/PostUserRequest';
import { Dispatch, Action } from 'redux';
import axios from 'axios';
import { createURL, isEnptystr, getTokenPram } from '../common/utils';
import Validation from '../interface/Validation';
import PutHanyoResult from '../interface/PutHanyoResult';
import Const from '../common/const';

const actionCreator = actionCreatorFactory();

const onRegister = actionCreator<PostUserResult>('ACTIONS_USER_REGISTER');
const onUpdate = actionCreator<PostUserResult>('ACTIONS_USER_UPDATE');
const onLogin = actionCreator<PostUserResult>('ACTIONS_USER_LOGIN');
const onLogout = actionCreator<PutHanyoResult>('ACTIONS_USER_LOGOUT');

export const postUser = (url: string, chkpassword: string, body: PostUserRequest) => {
  return async (dispatch: Dispatch<Action>) => {
    const vd = PostUserValidchk(body, chkpassword);

    if (vd.isError) {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: vd.msg,
      };
      dispatch(onRegister(result));
      return;
    }

    try {
      const response = await axios.post(createURL(url), body);
      const result: PostUserResult = {
        valid: false,
        info: false,
        msg: "",
        user: response.data.user,
      };
      dispatch(onRegister(result));
    } catch {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: "登録に失敗しました",
      };
      dispatch(onRegister(result));
    }
  };
};

export const chkUser = (url: string, body: PostUserRequest) => {
  return async (dispatch: Dispatch<Action>) => {
    const vd = PostUserValidchk(body);

    if (vd.isError) {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: vd.msg,
      };
      dispatch(onLogin(result));
      return Promise.resolve();
    }

    try {
      const response = await axios.post(createURL(url), body);
      const result: PostUserResult = {
        valid: false,
        info: false,
        msg: "",
        user: response.data.user,
      };
      dispatch(onLogin(result));
      return Promise.resolve();
    } catch {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: "ログインできませんでした。ユーザIDとパスワードを再確認してください。",
      };
      dispatch(onLogin(result));
      return Promise.resolve();
    }
  };
};

export const updateUser = (url: string, token: string, chk: string, after: string, before: string, ) => {
  return async (dispatch: Dispatch<Action>) => {
    const vd = ChangePasswordValidchk(url, chk, after, before);

    if (vd.isError) {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: vd.msg,
      };
      dispatch(onUpdate(result));
      return Promise.resolve();
    }

    const body = {
      after: after,
      before: before,
    }

    try {
      const response = await axios({
        method: 'PUT',
        url: createURL(url),
        headers: {
          'Authorization': getTokenPram(token),
        },
        data: body,
      });
      const result: PostUserResult = {
        valid: false,
        info: true,
        msg: response.data.message,
      };
      dispatch(onUpdate(result));
    } catch {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: "更新に失敗しました。現在の情報が違う可能性があります。",
      };
      dispatch(onUpdate(result));
    }
  };
};

export const logout = (url: string, token?: string) => {
  return async (dispatch: Dispatch<Action>) => {

    if (isEnptystr(token)) {
      const result: PutHanyoResult = {
        valid: false,
        info: false,
        validMsg: "",
        statusCd: 200,
      };
      dispatch(onLogout(result));
      return Promise.resolve();
    }

    try {
      await axios({
        method: 'POST',
        url: createURL(url),
        headers: {
          'Authorization': getTokenPram(token === undefined ? "" : token),
        },
      });
      const result: PutHanyoResult = {
        valid: false,
        info: false,
        validMsg: "",
        statusCd: 200,
      };
      dispatch(onLogout(result));
      return Promise.resolve();
    } catch {
      const result: PutHanyoResult = {
        valid: false,
        info: false,
        validMsg: "",
        statusCd: 200,
      };
      dispatch(onLogout(result));
      return Promise.resolve();
    }
  };
};


function PostUserValidchk(body: PostUserRequest, chkpassword?: string): Validation {
  let vd: Validation = {
    isError: false,
    msg: "",
  }

  if (body.email === "") {
    vd = {
      isError: true,
      msg: "メールアドレスは必須です",
    };
    return vd;
  }

  if (body.password === "") {
    vd = {
      isError: true,
      msg: "パスワードは必須です",
    };
    return vd;
  }

  if (chkpassword !== undefined && chkpassword !== body.password) {
    vd = {
      isError: true,
      msg: "パスワードとパスワード（確認）が一致しません",
    };
    return vd;
  }

  const regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  if (!regexp.test(body.email)) {
    vd = {
      isError: true,
      msg: "メールアドレスの形式が不正です",
    };
    return vd;
  }

  return vd;
}

function ChangePasswordValidchk(url: string, chk: string, after: string, before: string): Validation {
  let vd: Validation = {
    isError: false,
    msg: "",
  }

  if (before === "") {
    vd = {
      isError: true,
      msg: url === Const.URLS.PASS_CHANGE_URL ? "現パスワードは必須です": "現メールアドレスは必須です",
    };
    return vd;
  }

  if (after === "") {
    vd = {
      isError: true,
      msg: url === Const.URLS.PASS_CHANGE_URL ? "新パスワードは必須です": "新メールアドレスは必須です",
    };
    return vd;
  }

  if (chk !== undefined && chk !== after) {
    vd = {
      isError: true,
      msg: url ===  Const.URLS.PASS_CHANGE_URL ? "新パスワードと新パスワード（確認）が一致しません": "新メールアドレスと新メールアドレス（確認）が一致しません",
    };
    return vd;
  }

  const regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  if ( url ===  Const.URLS.ID_CHANGE_URL && !regexp.test(after)) {
    vd = {
      isError: true,
      msg: "メールアドレスの形式が不正です",
    };
    return vd;
  }

  return vd;
}

export const UserActions = {
  onRegister,
  onUpdate,
  onLogin,
  onLogout,
  onClear: actionCreator<{}>('ACTIONS_USER_CLEAR'),
  updateState: actionCreator<{ name: string, value: any }>('ACTIONS_USER_UPDATE_STATE'),
};