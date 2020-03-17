import { connect } from 'react-redux';
import store, { AppState } from '../store';
import { Action } from 'typescript-fsa';
import { ShushiActions, getCategory, saveCategory } from '../actions/ShushiActions';
import Const from '../common/const';
import { CategoryForm } from '../components/CategoryForm';
import { push } from 'connected-react-router';
import { getUserId } from '../common/utils';
import Category from '../interface/Category';
import { AppActions, getUser } from '../actions/AppActions';

export interface Actions {
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
  onCategoryGet: (kbn: string, token: string) => void,
  onCategoryDelete: (index: number, kbn: string, subindex: number | null) => void,
  onCategoryInsert: (index: number, kbn: string) => void,
  onCategoryUpdate: (index: number, subindex: number | null, before: string) => void,
  onCategoryModalInsert: () => void,
  onCategoryModalUpdate: () => void,
  onCategorySave: (kbn: string, token: string, categories: Category[] | null) => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState: (value: any, name: string) => dispatch(ShushiActions.updateState({ name, value })),
    onCategoryGet: async (kbn: string, token: string) => {
      await dispatch(ShushiActions.updateState({ name: "categoryKbn", value: kbn }));
      dispatch(ShushiActions.updateState({ name: "loading", value: true }));
      await dispatch(getCategory(Const.URLS.CATEGORY_URL, kbn, token));
      dispatch(ShushiActions.updateState({ name: "loading", value: false }));
      if (store.getState().Shushi.statsuCd == 401) {
        dispatch(push(Const.SITE_ROOT + "/login"));
      };
    },
    onCategoryDelete: (index: number, kbn: string, subindex: number | null) =>
      dispatch(ShushiActions.onCategoryDelete({ index, kbn, subindex })),
    onCategoryInsert: (index: number, kbn: string) => {
      if (kbn == 'カテゴリ') {
        dispatch(ShushiActions.updateState({ name: "modalTitle", value: "新規カテゴリ名を入力してください" }));
        dispatch(ShushiActions.updateState({ name: "modalPlaceholder", value: "新規カテゴリ名" }));
        dispatch(ShushiActions.updateState({ name: "modalTarget", value: "カテゴリ" }));
      } else {
        dispatch(ShushiActions.updateState({ name: "modalTitle", value: "新規カテゴリ名（詳細）を入力してください" }));
        dispatch(ShushiActions.updateState({ name: "modalPlaceholder", value: "新規カテゴリ名（詳細）" }));
        dispatch(ShushiActions.updateState({ name: "modalTarget", value: "詳細" }));
      }
      dispatch(ShushiActions.updateState({ name: "modalAfterText", value: "" }));
      dispatch(ShushiActions.updateState({ name: "modalDescription", value: "※空白の場合キャンセルとなります" }));
      dispatch(ShushiActions.updateState({ name: "modalIndex", value: index }));
      dispatch(ShushiActions.updateState({ name: "isInsertModalOpen", value: true }));
    },
    onCategoryUpdate: (index: number, subindex: number | null, before: string) => {
      if (subindex == null) {
        dispatch(ShushiActions.updateState({ name: "modalTitle", value: "変更後のカテゴリ名を入力してください" }));
        dispatch(ShushiActions.updateState({ name: "modalPlaceholder", value: "カテゴリ名" }));
        dispatch(ShushiActions.updateState({ name: "modalTarget", value: "カテゴリ" }));
      } else {
        dispatch(ShushiActions.updateState({ name: "modalTitle", value: "変更後のカテゴリ名（詳細）を入力してください" }));
        dispatch(ShushiActions.updateState({ name: "modalPlaceholder", value: "カテゴリ名（詳細）" }));
        dispatch(ShushiActions.updateState({ name: "modalTarget", value: "詳細" }));
      }
      dispatch(ShushiActions.updateState({ name: "modalBeforeText", value: before }));
      dispatch(ShushiActions.updateState({ name: "modalAfterText", value: "" }));
      dispatch(ShushiActions.updateState({ name: "modalDescription", value: "※空白の場合キャンセルとなります" }));
      dispatch(ShushiActions.updateState({ name: "modalIndex", value: index }));
      dispatch(ShushiActions.updateState({ name: "modalSubIndex", value: subindex }));
      dispatch(ShushiActions.updateState({ name: "isUpdateModalOpen", value: true }));
    },
    onCategoryModalInsert: async () => {
      dispatch(ShushiActions.updateState({ name: "loading", value: true }));
      let id = getUserId();
      if (id === 0) {
        await dispatch(getUser());
        if (store.getState().Root.statusCd == 401) {
          dispatch(push(Const.SITE_ROOT + "/login"));
        };
        id = getUserId();
      };
      dispatch(ShushiActions.onCategoryModalInsert({ id }))
      dispatch(ShushiActions.updateState({ name: "loading", value: false }));
    },
    onCategorySave: async (kbn: string, token: string, categories: Category[] | null) => {
      dispatch(ShushiActions.updateState({ name: "loading", value: true }));
      await dispatch(saveCategory(Const.URLS.CATEGORY_URL, kbn, token, categories));
      dispatch(ShushiActions.updateState({ name: "loading", value: false }));
      if (store.getState().Shushi.statsuCd == 401) {
        dispatch(push(Const.SITE_ROOT + "/login"));
      };
    },
    onCategoryModalUpdate: () => {
      dispatch(ShushiActions.onCategoryModalUpdate({}))
    },

  }
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.Shushi);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);