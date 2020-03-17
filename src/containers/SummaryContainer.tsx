import { Action } from 'typescript-fsa';
import { connect } from 'react-redux';
import store, { AppState } from '../store';
import { SummaryActions, getSammary} from '../actions/SummaryActions';
import { SummaryForm } from '../components/SummaryForm';
import Const from '../common/const';
import { push } from 'connected-react-router';

export interface Actions {
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
  onSammaryGet: (month: number) => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState: (value: any, name: string) => dispatch(SummaryActions.updateState({ name, value })),
    onSammaryGet: async (month: number) => {
      dispatch(SummaryActions.updateState({ name: "loading", value: true }));
      await dispatch(getSammary(month));
      if (store.getState().Shushi.statsuCd == 401) {
        dispatch(push(Const.SITE_ROOT + "/login"));
      };
      dispatch(SummaryActions.updateState({ name: "loading", value: false }));
    },
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.summary);
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryForm);