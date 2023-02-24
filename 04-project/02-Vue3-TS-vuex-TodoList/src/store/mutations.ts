// vuex 的 mutation 方法：用来修改 state

import { IState, ITodo } from '@/typings';
import { SET_TODO } from './actionType';

export default {
  // mutation 有两个参数：1.state 本身，2.参数
  [SET_TODO](state: IState, todo: ITodo) {
    state.list.unshift(todo);
  },
};
