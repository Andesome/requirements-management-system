import {queryAllDemands} from '../services/demand';
import {query as queryUsers} from "../services/user";

export default {
  namespace: 'demand',

  state: {
    list: [],
    loading: false,
  },

  effects: {
    * fetch(_, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryAllDemands);
      console.log('所有需求列表：', response.data);
      yield put({
        type: 'saveAll',
        payload: response.data,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    saveAll(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
};
