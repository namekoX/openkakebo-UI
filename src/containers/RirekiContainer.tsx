import { connect } from 'react-redux';
import store, { AppState } from '../store';
import { Action } from 'typescript-fsa';
import { ShushiActions, getKoza, getRireki, deleteRireki, } from '../actions/ShushiActions';
import Const from '../common/const';
import { push } from 'connected-react-router';
import { RirekiForm } from '../components/RirekiForm';
import Rireki from '../interface/Rireki';

export interface Actions {
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
  onRirekiGet: (token: string, month: number | null, pageNumber: number) => void,
  onRirekiDelete: (rireki: Rireki, index: number) => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState: (value: any, name: string) => dispatch(ShushiActions.updateState({ name, value })),
    onRirekiGet: async (token: string, month: number | null, pageNumber: number) => {
      dispatch(ShushiActions.updateState({ name: "loading", value: true }));
      dispatch(ShushiActions.updateState({ name: "pagerActive", value: pageNumber }));
      await dispatch(getRireki(Const.URLS.SHUSHI_URL, token, month, Const.LIST_PAGER_PERPAGE * (pageNumber - 1), Const.LIST_PAGER_PERPAGE));
      dispatch(ShushiActions.updateState({ name: "loading", value: false }));
      if (store.getState().Shushi.statsuCd == 401) {
        dispatch(push(Const.SITE_ROOT + "/login"));
      };
    },
    onRirekiDelete: async (rireki: Rireki, index: number) => {
      dispatch(ShushiActions.updateState({ name: "loading", value: true }));
      await dispatch(deleteRireki(Const.URLS.SHUSHI_URL, rireki, index));
      dispatch(ShushiActions.updateState({ name: "loading", value: false }));
      if (store.getState().Shushi.statsuCd == 401) {
        dispatch(push(Const.SITE_ROOT + "/login"));
      };
    }
  }
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.Shushi);
}

export default connect(mapStateToProps, mapDispatchToProps)(RirekiForm);