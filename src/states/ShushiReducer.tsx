import { reducerWithInitialState } from 'typescript-fsa-reducers';
import Category from '../interface/Category';
import { ShushiActions } from '../actions/ShushiActions';
import Const from '../common/const';
import SubCategory from '../interface/SubCategory';
import Koza from '../interface/Koza';
import { formatDateYYYYMM, formatDate } from '../common/utils';
import Rireki from '../interface/Rireki';

export interface ShushiState {
  shishutuCategory?: Category[];
  shunyuCategory?: Category[];
  koza?: Koza[];
  categoryKbn: string;
  loading: boolean;
  valid: boolean,
  info: boolean,
  msg: string,
  statsuCd: number,
  updater: number,
  isInsertModalOpen: boolean,
  isUpdateModalOpen: boolean,
  modalTitle: string,
  modalDescription: string,
  modalPlaceholder: string,
  modalTarget: string,
  modalIndex: number,
  modalSubIndex: number,
  modalBeforeText: string,
  modalAfterText: string,
  month: string,
  rireki: Rireki[],
  pagerActive: number,
  pagerTotalCount: number,
}

const initialState: ShushiState = {
  shishutuCategory: undefined,
  shunyuCategory: undefined,
  koza: undefined,
  categoryKbn: Const.CATEGORY_KBN.SHUNYU,
  loading: false,
  valid: false,
  info: false,
  msg: '',
  statsuCd: 200,
  updater: 0,
  isInsertModalOpen: false,
  isUpdateModalOpen: false,
  modalTitle: '',
  modalDescription: '',
  modalPlaceholder: '',
  modalTarget: '',
  modalIndex: 0,
  modalSubIndex: 0,
  modalBeforeText: '',
  modalAfterText: '',
  month: formatDateYYYYMM(new Date),
  rireki: [],
  pagerActive: 1,
  pagerTotalCount: 0,
};

export const ShushiReducer = reducerWithInitialState(initialState)
  .case(ShushiActions.updateState, (state, { name, value }) => {
    return Object.assign({}, state, { [name]: value });
  })
  .case(ShushiActions.onClear, (state, { }) => {
    return Object.assign({}, state, initialState);
  })
  .case(ShushiActions.onCategoryGet, (state, payload) => {
    return state.categoryKbn == Const.CATEGORY_KBN.SHUNYU ?
      Object.assign({}, state, {
        shunyuCategory: payload.results,
        valid: payload.valid,
        msg: payload.validMsg,
        statsuCd: payload.statusCd,
      })
      :
      Object.assign({}, state, {
        shunyuCategory: payload.results,
        valid: payload.valid,
        msg: payload.validMsg,
        statsuCd: payload.statusCd,
      })
      ;
  })
  .case(ShushiActions.onCategorySave, (state, payload) => {
    return Object.assign({}, state, {
      info: payload.info,
      valid: payload.valid,
      msg: payload.validMsg,
      statsuCd: payload.statusCd,
    })
  })
  .case(ShushiActions.onCategoryDelete, (state, { index, kbn, subindex }) => {
    if (subindex == null) {
      if (kbn == Const.CATEGORY_KBN.SHUNYU) {
        const value = state.shunyuCategory !== undefined ? state.shunyuCategory : [];
        value.splice(index, 1);
        return Object.assign({}, state, {
          shunyuCategory: value,
          updater: ++state.updater
        });
      } else {
        const value = state.shishutuCategory !== undefined ? state.shishutuCategory : [];
        value.splice(index, 1);
        return Object.assign({}, state, {
          shishutuCategory: value,
          updater: ++state.updater
        });
      }
    } else {
      if (kbn == Const.CATEGORY_KBN.SHUNYU) {
        const value = state.shunyuCategory![index].subcategory;
        value.splice(subindex, 1);
        let category = state.shunyuCategory;
        category![index].subcategory = value;
        return Object.assign({}, state, {
          shunyuCategory: category,
          updater: ++state.updater
        });
      } else {
        const value = state.shishutuCategory![index].subcategory;
        value.splice(subindex, 1);
        let category = state.shishutuCategory;
        category![index].subcategory = value;
        return Object.assign({}, state, {
          shishutuCategory: category,
          updater: ++state.updater
        });
      }
    }
  })
  .case(ShushiActions.onCategoryModalInsert, (state, { id }) => {
    if (state.modalAfterText === '') return Object.assign({}, state, { isInsertModalOpen: false, });
    let nextstate = state;
    let category;
    if (state.categoryKbn == Const.CATEGORY_KBN.SHUNYU) {
      category = state.shunyuCategory;
    } else {
      category = state.shishutuCategory;
    }

    if (state.modalTarget == 'カテゴリ') {
      const newCategory: Category = {
        id: null,
        user_id: id,
        category_order: category!.length + 1,
        category_kbn: state.categoryKbn,
        category_name: state.modalAfterText,
        subcategory: [],
      }
      category!.push(newCategory);
    } else {
      const newCategory: SubCategory = {
        id: null,
        category_id: category![state.modalIndex].id,
        subcategory_order: category![state.modalIndex].subcategory.length + 1,
        subcategory_name: state.modalAfterText,
      }
      category![state.modalIndex].subcategory.push(newCategory);
    }

    if (state.categoryKbn == Const.CATEGORY_KBN.SHUNYU) {
      nextstate.shunyuCategory = category;
    } else {
      nextstate.shishutuCategory = category;
    }
    nextstate.isInsertModalOpen = false;
    nextstate.updater = ++state.updater;
    return Object.assign({}, state, nextstate);
  })
  .case(ShushiActions.onCategoryModalUpdate, (state, { }) => {
    if (state.modalAfterText === '') return Object.assign({}, state, { isUpdateModalOpen: false, });
    let nextstate = state;
    let category;
    if (state.categoryKbn == Const.CATEGORY_KBN.SHUNYU) {
      category = state.shunyuCategory;
    } else {
      category = state.shishutuCategory;
    }

    if (state.modalTarget == 'カテゴリ') {
      const newCategory: Category = {
        id: category![state.modalIndex].id,
        user_id: category![state.modalIndex].user_id,
        category_order: category![state.modalIndex].category_order,
        category_kbn: category![state.modalIndex].category_kbn,
        category_name: state.modalAfterText,
        subcategory: category![state.modalIndex].subcategory,
      }
      category![state.modalIndex] = newCategory;
    } else {
      const newCategory: SubCategory = {
        id: category![state.modalIndex].subcategory[state.modalSubIndex].id,
        category_id: category![state.modalIndex].subcategory[state.modalSubIndex].category_id,
        subcategory_order: category![state.modalIndex].subcategory[state.modalSubIndex].subcategory_order,
        subcategory_name: state.modalAfterText,
      }
      category![state.modalIndex].subcategory[state.modalSubIndex] = newCategory;
    }

    if (state.categoryKbn == Const.CATEGORY_KBN.SHUNYU) {
      nextstate.shunyuCategory = category;
    } else {
      nextstate.shishutuCategory = category;
    }
    nextstate.isUpdateModalOpen = false;
    nextstate.updater = ++state.updater;
    return Object.assign({}, state, nextstate);
  })
  .case(ShushiActions.onKozaGet, (state, payload) => {
    return Object.assign({}, state, {
      koza: payload.results,
      valid: payload.valid,
      msg: payload.validMsg,
      statsuCd: payload.statusCd,
    });
  })
  .case(ShushiActions.onKozaSave, (state, payload) => {
    return Object.assign({}, state, {
      info: payload.info,
      valid: payload.valid,
      msg: payload.validMsg,
      statsuCd: payload.statusCd,
    })
  })
  .case(ShushiActions.onKozaDelete, (state, { index }) => {
    const value = state.koza !== undefined ? state.koza : [];
    value.splice(index, 1);
    return Object.assign({}, state, {
      koza: value,
      updater: ++state.updater
    })
  })
  .case(ShushiActions.updateKoza, (state, { name, value, index, id }) => {
    const koza = state.koza !== undefined ? state.koza : [];
    if (koza.length - 1 < index) {
      const newkoza: Koza = {
        id: null,
        user_id: id,
        koza_name: name === "koza_name" ? value : "",
        zandaka: name === "zandaka" ? Number(value) : 0,
        is_credit: name === "is_credit" ? value : '0',
        credit_date: name === "credit_date" ? value : null,
        credit_koza_id: name === "credit_koza_id" ? value : null,
      }
      koza.push(newkoza);
    } else {
      const newkoza: Koza = {
        id: koza[index].id,
        user_id: id,
        koza_name: name === "koza_name" ? value : koza[index].koza_name,
        zandaka: name === "zandaka" ? Number(value) : koza[index].zandaka,
        is_credit: name === "is_credit" ? value : koza[index].is_credit,
        credit_date: name === "credit_date" ? value : koza[index].credit_date,
        credit_koza_id: name === "credit_koza_id" ? value : koza[index].credit_koza_id,
      }
      koza[index] = newkoza;
    };
    return Object.assign({}, state, {
      koza: koza,
      updater: ++state.updater,
    });
  })
  .case(ShushiActions.onRirekiGet, (state, payload) => {
    return Object.assign({}, state, {
      rireki: payload.results.rireki,
      pagerTotalCount: payload.results.pagerTotalCount,
      valid: payload.valid,
      msg: payload.validMsg,
      statsuCd: payload.statusCd,
    });
  })
  ;
