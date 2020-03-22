import { connect } from 'react-redux';
import store, { AppState } from '../store';
import { Menu } from '../components/Menu';
import { AppActions, getUser } from '../actions/AppActions';
import { push } from 'connected-react-router';
import Const from '../common/const';
import { getUserId } from '../common/utils';
import { Action } from 'typescript-fsa';

export interface Actions {
  onSelect: (url: string) => void,
  toPublic:() => void,
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState: (value: any, name: string) => dispatch(AppActions.updateState({ name, value })),
    onSelect: (url: string) => {
      dispatch(AppActions.updateState({ name: "menuTabActive", value: url }));
      dispatch(push(Const.SITE_ROOT + url));
    },
    toPublic: async () =>{
      let id = getUserId();
      if (id === 0) {
        await dispatch(getUser());
        if (store.getState().Root.statusCd == 401) {
          dispatch(push(Const.SITE_ROOT + "/login"));
        };
        id = getUserId();
      };
      window.open(Const.SITE_ROOT + '/public' + '/' + id, '_blank'); 
    },
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.Root);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);