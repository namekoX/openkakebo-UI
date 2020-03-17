import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { InputActions } from '../actions/InputActions';
import Category from '../interface/Category';
import { ShushiActions } from '../actions/ShushiActions';
import Koza from '../interface/Koza';

export interface InputState {
  id: number | null;
  user_id: number;
  shushi_name: string;
  kingaku: number;
  hiduke: Date;
  shushi_kbn: string;
  koza_id: number | null;
  before_koza_id: number | null;
  category_id: number | null;
  sub_category_id: number | null;
  loading: boolean;
  valid: boolean,
  info: boolean,
  msg: string,
  statsuCd: number,
  Category: Category[];
  koza:Koza[];
}

const initialState: InputState = {
  id: null,
  user_id: 0,
  shushi_name: '',
  kingaku: 0,
  hiduke: new Date(),
  shushi_kbn: '',
  koza_id: null,
  before_koza_id: null,
  category_id: null,
  sub_category_id: null,
  loading: false,
  valid: false,
  info: false,
  msg: '',
  statsuCd: 200,
  Category: [],
  koza:[],
};

export const InputReducer = reducerWithInitialState(initialState)
  .case(InputActions.updateState, (state, { name, value }) => {
    return Object.assign({}, state, { [name]: value });
  })
  .case(InputActions.onClear, (state, { }) => {
    return Object.assign({}, state, initialState);
  })
  .case(ShushiActions.onCategoryGet, (state, payload) => {
    return Object.assign({}, state, {
      Category: payload.results,
      valid: payload.valid,
      msg: payload.validMsg,
      statsuCd: payload.statusCd,
    });
  })
  .case(ShushiActions.onKozaGet, (state, payload) => {
    return Object.assign({}, state, {
      koza: payload.results,
      valid: payload.valid,
      msg: payload.validMsg,
      statsuCd: payload.statusCd,
    });
  })
  .case(InputActions.onShushiSave, (state, payload) => {
    return Object.assign({}, state, {
      info: payload.info,
      valid: payload.valid,
      msg: payload.validMsg,
      statsuCd: payload.statusCd,
    })
  })
  ;
