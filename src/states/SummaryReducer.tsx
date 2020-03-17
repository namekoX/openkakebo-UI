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
    koza:[],
  },
};

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
    });
  })
  ;
