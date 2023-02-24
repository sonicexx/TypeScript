// vuex 的 mutation 方法：用来修改 state

import { IState, ITodo } from '@/typings';
import { SET_TODO, SET_TODO_LIST } from './actionType';

export default {
  // mutation 有两个参数：1.state 本身，2.参数

  // SET_TODO mutation
  [SET_TODO](state: IState, todo: ITodo) {
    // 给 state.list 前添加一条数据
    state.list.unshift(todo);
  },

  // SET_TODO_LIST mutation
  [SET_TODO_LIST](state: IState, todoList: ITodo[]) {
    state.list = todoList;
  },
};
