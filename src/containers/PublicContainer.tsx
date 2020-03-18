import { Action } from 'typescript-fsa';
import { connect } from 'react-redux';
import store, { AppState } from '../store';
import { SummaryActions, getSammary } from '../actions/SummaryActions';
import { SummaryForm } from '../components/SummaryForm';
import Const from '../common/const';
import { push } from 'connected-react-router';
import { PublicForm } from '../components/PublicForm';

export interface Actions {
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
  onSammaryGet: (month: number, id: string) => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState: (value: any, name: string) => dispatch(SummaryActions.updateState({ name, value })),
    onSammaryGet: async (month: number, id: string) => {
      dispatch(SummaryActions.updateState({ name: "loading", value: true }));
      await dispatch(getSammary(Const.URLS.PUBLIC_URL, month, id));
      if (store.getState().summary.statsuCd == 401) {
        dispatch(push(Const.SITE_ROOT + "/login"));
      };
      if (store.getState().summary.statsuCd == 403) {
        dispatch(SummaryActions.updateState({ name: "isOpen", value: false }));
      };
      dispatch(SummaryActions.updateState({ name: "loading", value: false }));
    },
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.summary);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicForm);