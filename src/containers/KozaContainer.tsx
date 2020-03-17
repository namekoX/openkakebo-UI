import { connect } from 'react-redux';
import store, { AppState } from '../store';
import { Action } from 'typescript-fsa';
import { ShushiActions, getKoza, saveKoza, } from '../actions/ShushiActions';
import Const from '../common/const';
import { KozaForm } from '../components/KozaForm';
import { push } from 'connected-react-router';
import Koza from '../interface/Koza';
import { getUserId } from '../common/utils';
import { getUser } from '../actions/AppActions';

export interface Actions {
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
  updateKoza: (value: any, name: string, index: number) => any,
  onKozaGet: (token: string) => void,
  onKozaDelete: (index: number) => void,
  onKozaSave: (token: string, kozas: Koza[] | null) => void,
  onHide: () => void,
  onInsert: (index: number) => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState: (value: any, name: string) => dispatch(ShushiActions.updateState({ name, value })),
    onKozaGet: async (token: string) => {
      dispatch(ShushiActions.updateState({ name: "loading", value: true }));
      await dispatch(getKoza(Const.URLS.KOZA_URL, token));
      dispatch(ShushiActions.updateState({ name: "loading", value: false }));
      if (store.getState().Shushi.statsuCd == 401) {
        dispatch(push(Const.SITE_ROOT + "/login"));
      };
    },
    onKozaDelete: (index: number) =>
      dispatch(ShushiActions.onKozaDelete({ index })),
    onKozaSave: async (token: string, kozas: Koza[] | null) => {
      dispatch(ShushiActions.updateState({ name: "loading", value: true }));
      await dispatch(saveKoza(Const.URLS.KOZA_URL, token, kozas));
      dispatch(ShushiActions.updateState({ name: "loading", value: false }));
      if (store.getState().Shushi.statsuCd == 401) {
        dispatch(push(Const.SITE_ROOT + "/login"));
      };
    },
    updateKoza: (value: any, name: string, index: number) => {
      let id = getUserId();
      if (id === 0) {
        dispatch(getUser());
        if (store.getState().Root.statusCd == 401) {
          dispatch(push(Const.SITE_ROOT + "/login"));
        };
        id = getUserId();
      };
      dispatch(ShushiActions.updateKoza({ name, value, index, id }))
    },
    onHide: () =>
      dispatch(ShushiActions.updateState({ name: "isInsertModalOpen", value: false })),
    onInsert: async (index: number) => {
      dispatch(ShushiActions.updateState({ name: "modalIndex", value: index }));
      let id = getUserId();
      if (id === 0) {
        await dispatch(getUser());
        if (store.getState().Root.statusCd == 401) {
          dispatch(push(Const.SITE_ROOT + "/login"));
        };
        id = getUserId();
      };
      await dispatch(ShushiActions.updateKoza({ name: "", value: "", index, id }));
      dispatch(ShushiActions.updateState({ name: "isInsertModalOpen", value: true }));
    },
  }
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.Shushi);
}

export default connect(mapStateToProps, mapDispatchToProps)(KozaForm);