import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { SummaryActions } from '../actions/SummaryActions';
import Summary from '../interface/Summary';
import { formatDateYYYYMM } from '../common/utils';

export interface SummaryState {
  loading: boolean;
  valid: boolean,
  info: boolean,
  msg: string,
  statsuCd: number,
  month: string,
  summary: Summary,
  isOpen: boolean,
  id: string,
  isMonthChange: boolean,
  istogetu: boolean;
  isShishutu: boolean;
  isShunyu: boolean;
  isShishutuCategory: boolean;
  isShunyuCategory: boolean;
}

const initialState: SummaryState = {
  loading: false,
  valid: false,
  info: false,
  msg: '',
  statsuCd: 200,
  month: formatDateYYYYMM(new Date),
  summary: {
    id: null,
    user_id: 0,
    shunyu: 0,
    shishutu: 0,
    koza: [],
    togetu: false,
    is_shishutu: true,
    is_shunyu: true,
    is_shishutu_category: true,
    is_shunyu_category: true,
  },
  isOpen: true,
  id: "",
  isMonthChange: false,
  istogetu: false,
  isShishutu: true,
  isShunyu: true,
  isShishutuCategory: true,
  isShunyuCategory: true,
};

function addMonth(month: string, add: number) {
  let dt = new Date(Number(month.slice(0, 4)), Number(month.slice(-2)), 1, 0, 0, 0);
  dt.setMonth(dt.getMonth() + add - 1);
  return formatDateYYYYMM(dt);
}

export const SummaryReducer = reducerWithInitialState(initialState)
  .case(SummaryActions.updateState, (state, { name, value }) => {
    return Object.assign({}, state, { [name]: value });
  })
  .case(SummaryActions.onGetSammary, (state, payload) => {
    return Object.assign({}, state, {
      summary: payload.results,
      valid: payload.valid,
      msg: payload.validMsg,
      statsuCd: payload.statusCd,
      month: payload.results.togetu ? addMonth(state.month, -1) : state.month,
      istogetu: payload.results.togetu,
      isShishutu: payload.results.is_shishutu,
      isShunyu: payload.results.is_shunyu,
      isShishutuCategory: payload.results.is_shishutu_category,
      isShunyuCategory: payload.results.is_shunyu_category,
    });
  })
  ;
