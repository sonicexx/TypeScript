// vuex 的 mutation 方法：用来修改 state

import { IState, ITodo, TODO_STATUS } from '@/typings';
import {
  REMOVE_TODO,
  SET_DOING,
  SET_STATUS,
  SET_TODO,
  SET_TODO_LIST,
} from './actionType';

export default {
  // mutation 有两个参数：1.state 本身，2.参数

  // SET_TODO mutation
  [SET_TODO](state: IState, todo: ITodo) {
    // 给 state.list 前添加一条数据
    state.list = [...state.list, todo];
  },

  // SET_TODO_LIST mutation
  [SET_TODO_LIST](state: IState, todoList: ITodo[]) {
    state.list = todoList;
  },

  [REMOVE_TODO](state: IState, id: number) {
    state.list = state.list.filter((item: ITodo) => item.id !== id);
  },

  [SET_STATUS](state: IState, id: number) {
    state.list = state.list.map((item: ITodo) => {
      if (item.id === id) {
        switch (item.status) {
          case TODO_STATUS.FINISHED:
            item.status = TODO_STATUS.WILLDO;
            break;
          case TODO_STATUS.DOING:
          case TODO_STATUS.WILLDO:
            item.status = TODO_STATUS.FINISHED;
          default:
            break;
        }
      }
      return item;
    });
  },

  [SET_DOING](state: IState, id: number) {
    state.list = state.list.map((item: ITodo) => {
      if (item.id !== id) {
        item.status === TODO_STATUS.DOING && (item.status = TODO_STATUS.WILLDO);
      } else {
        item.status === TODO_STATUS.DOING
          ? (item.status = TODO_STATUS.WILLDO)
          : (item.status = TODO_STATUS.DOING);
      }
      return item;
    });
  },
};
