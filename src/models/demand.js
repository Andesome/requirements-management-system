import {queryAllDemands} from '../services/demand';
import {query as queryUsers} from "../services/user";

export default {
  namespace: 'demand',

  state: {
    list: [],
    loading: false,
  },

  effects: {
    * fetch({offset,limit}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      console.log("分页限制:",offset,limit);
      const response = yield call(queryAllDemands,offset,limit);
      console.log('获取需求响应：：', response);
      yield put({
        type: 'saveAll',
        payload: response,
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
        list: action.payload.data,
        total:action.payload.headers["x-content-total"]>>0,
        offset:action.offset>>0,
        limit:action.limit>>0
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
