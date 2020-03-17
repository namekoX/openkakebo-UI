import { Action } from 'typescript-fsa';
import { connect } from 'react-redux';
import store, { AppState } from '../store';
import { InputActions, saveShushi } from '../actions/InputActions';
import { InputForm } from '../components/InputForm';
import { getCategory, getKoza } from '../actions/ShushiActions';
import Const from '../common/const';
import { push } from 'connected-react-router';
import Shushi from '../interface/Shushi';
import { getUserId } from '../common/utils';
import { getUser } from '../actions/AppActions';

export interface Actions {
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
  onCategoryGet: (kbn: string, token: string) => void,
  onShushiSave: (token: string, shushi: Shushi) => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState: (value: any, name: string) => dispatch(InputActions.updateState({ name, value })),
    onCategoryGet: async (kbn: string, token: string) => {
      dispatch(InputActions.updateState({ name: "shushi_kbn", value: kbn }));
      dispatch(InputActions.updateState({ name: "loading", value: true }));
      dispatch(getCategory(Const.URLS.CATEGORY_URL, kbn, token));
      await dispatch(getKoza(Const.URLS.KOZA_URL, token));
      if (store.getState().Shushi.statsuCd == 401) {
        dispatch(push(Const.SITE_ROOT + "/login"));
      };
      dispatch(InputActions.updateState({ name: "loading", value: false }));
    },
    onShushiSave: async (token: string, shushi: Shushi) => {
      dispatch(InputActions.updateState({ name: "loading", value: true }));
      let id = getUserId();
      if (id === 0) {
        await dispatch(getUser());
        if (store.getState().Root.statusCd == 401) {
          dispatch(push(Const.SITE_ROOT + "/login"));
        };
        id = getUserId();
      };
      shushi.user_id = id;
      await dispatch(saveShushi(Const.URLS.SHUSHI_URL, token, shushi));
      dispatch(InputActions.updateState({ name: "loading", value: false }));
      if (store.getState().Shushi.statsuCd == 401) {
        dispatch(push(Const.SITE_ROOT + "/login"));
      };
    },
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.Input);
}

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);