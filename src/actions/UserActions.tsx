import actionCreatorFactory from 'typescript-fsa';
import PostUserResult from '../interface/PostUserResult';
import PostUserRequest from '../interface/PostUserRequest';
import { Dispatch, Action } from 'redux';
import axios from 'axios';
import { createURL } from '../common/utils';
import Validation from '../interface/Validation';

const actionCreator = actionCreatorFactory();

const onRegister = actionCreator<PostUserResult>('ACTIONS_USER_REGISTER');
const onUpdate = actionCreator<PostUserResult>('ACTIONS_USER_UPDATE');
const onLogin = actionCreator<PostUserResult>('ACTIONS_USER_LOGIN');

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
        valid: !response.data.OK,
        info: response.data.OK,
        msg: response.data.Msg,
        user: response.data,
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

export const updateUser = (url: string, chkpassword: string, body: PostUserRequest) => {
  return async (dispatch: Dispatch<Action>) => {
    if (body.email == "" || body.password == "") {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: body.email == "" ? "ユーザーIDは必須です" : "パスワードは必須です",
      };
      dispatch(onUpdate(result));
      return;
    }
    if (chkpassword != body.password) {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: "パスワードとパスワード（確認）が一致しません",
      };
      dispatch(onUpdate(result));
      return;
    }

    try {
      const response = await axios.post(createURL(url), body);
      const result: PostUserResult = {
        valid: !response.data.OK,
        info: response.data.OK,
        msg: response.data.Msg,
      };
      dispatch(onUpdate(result));
    } catch {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: "更新に失敗しました",
      };
      dispatch(onUpdate(result));
    }
  };
};

function PostUserValidchk(body: PostUserRequest, chkpassword?: string): Validation {
  let vd: Validation = {
    isError: false,
    msg: "",
  }

  if (body.email == "") {
    vd = {
      isError: true,
      msg: "メールアドレスは必須です",
    };
    return vd;
  }

  if (body.password == "") {
    vd = {
      isError: true,
      msg: "パスワードは必須です",
    };
    return vd;
  }

  if (chkpassword != undefined && chkpassword != body.password) {
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

export const UserActions = {
  onRegister,
  onUpdate,
  onLogin,
  onClear: actionCreator<{}>('ACTIONS_USER_CLEAR'),
  updateState: actionCreator<{ name: string, value: any }>('ACTIONS_USER_UPDATE_STATE'),
};