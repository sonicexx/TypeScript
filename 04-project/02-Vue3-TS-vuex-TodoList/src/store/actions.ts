// vuex 的 actions 方法：调用 mutation 方法、完成异步方法

import { IState, ITodo } from '@/typings';
import { Commit } from 'vuex';
import { SET_TODO, SET_TODO_LIST } from './actionType';

// 接口 action 方法的第一个入参：包含整个 store 对象
interface ICtx {
  commit: Commit;
  state: IState;
}

export default {
  // 调用 SET_TODO 变量代表的方法
  // 参数 1：整个 store 对象：包含调用 mutation 的 commit 方法
  // 参数 2：dispatch 时的参数

  // 增加单个数据的方法：commit SET_TODO mutation
  [SET_TODO]({ commit }: ICtx, todo: ITodo) {
    commit(SET_TODO, todo);
  },

  // 设置 todoList 的方法：commit SET_TODO_LIST mutation
  [SET_TODO_LIST]({ commit }: ICtx, todoList: ITodo[]) {
    commit(SET_TODO_LIST, todoList);
  },
};
