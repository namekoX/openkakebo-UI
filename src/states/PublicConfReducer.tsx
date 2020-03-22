import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { PublicConfActions } from '../actions/PublicConfActions';
import PublicConf from '../interface/PublicConf';

export interface PublicConfState {
  loading: boolean;
  valid: boolean,
  info: boolean,
  msg: string,
  statsuCd: number,
  PublicConf: PublicConf,
}

const initialState: PublicConfState = {
  loading: false,
  valid: false,
  info: false,
  msg: '',
  statsuCd: 200,
  PublicConf: {
    id: null,
    user_id: 0,
    is_open: '0',
    is_shunyu: '0',
    is_shunyu_category: '0',
    is_shishutu: '0',
    is_shishutu_category: '0',
    is_togetu: '0',
    is_zandaka: '0',
  },
};

export const PublicConfReducer = reducerWithInitialState(initialState)
  .case(PublicConfActions.updateState, (state, { name, value }) => {
    if (name.match(/PublicConf./)) {
      const nextState: PublicConf = {
        id: state.PublicConf.id,
        user_id: state.PublicConf.user_id,
        is_open: name === 'PublicConf.is_open' ? value : state.PublicConf.is_open,
        is_shunyu: name === 'PublicConf.is_shunyu' ? value : state.PublicConf.is_shunyu,
        is_shunyu_category:name === 'PublicConf.is_shunyu_category' ? value : state.PublicConf.is_shunyu_category,
        is_shishutu: name === 'PublicConf.is_shishutu' ? value : state.PublicConf.is_shishutu,
        is_shishutu_category: name === 'PublicConf.is_shishutu_category' ? value : state.PublicConf.is_shishutu_category,
        is_togetu: name === 'PublicConf.is_togetu' ? value : state.PublicConf.is_togetu,
        is_zandaka: name === 'PublicConf.is_zandaka' ? value : state.PublicConf.is_zandaka,
      }
      return Object.assign({}, state, { PublicConf: nextState });
    } else {
      return Object.assign({}, state, { [name]: value });
    }
  })
  .case(PublicConfActions.onGetPublicConf, (state, payload) => {
    return Object.assign({}, state, {
      PublicConf: payload.results,
      valid: payload.valid,
      msg: payload.validMsg,
      statsuCd: payload.statusCd,
    });
  })
  .case(PublicConfActions.onSavePublicConf, (state, payload) => {
    return Object.assign({}, state, {
      info: payload.info,
      valid: payload.valid,
      msg: payload.validMsg,
      statsuCd: payload.statusCd,
    })
  })
  ;
