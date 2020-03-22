import { Action } from 'typescript-fsa';
import { connect } from 'react-redux';
import store, { AppState } from '../store';
import { PublicConfActions, getPublicConf, savePublicConf } from '../actions/PublicConfActions';
import Const from '../common/const';
import { push } from 'connected-react-router';
import { PublicConfForm } from '../components/PublicConfForm';
import PublicConf from '../interface/PublicConf';

export interface Actions {
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
  onPublicConfGet: () => void,
  onPublicConfSave: (conf: PublicConf) => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState: (value: any, name: string) => dispatch(PublicConfActions.updateState({ name, value })),
    onPublicConfGet: async () => {
      dispatch(PublicConfActions.updateState({ name: "loading", value: true }));
      await dispatch(getPublicConf());
      if (store.getState().publicConf.statsuCd == 401) {
        dispatch(push(Const.SITE_ROOT + "/login"));
      };
      dispatch(PublicConfActions.updateState({ name: "loading", value: false }));
    },
    onPublicConfSave: async (conf: PublicConf) => {
      dispatch(PublicConfActions.updateState({ name: "loading", value: true }));
      await dispatch(savePublicConf(conf));
      if (store.getState().publicConf.statsuCd == 401) {
        dispatch(push(Const.SITE_ROOT + "/login"));
      };
      dispatch(PublicConfActions.updateState({ name: "loading", value: false }));
    },
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.publicConf);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicConfForm);