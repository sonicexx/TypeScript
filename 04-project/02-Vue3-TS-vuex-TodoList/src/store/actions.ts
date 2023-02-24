// vuex 的 actions 方法：调用 mutation 方法、完成异步方法

import { IState, ITodo } from '@/typings';
import { Commit } from 'vuex';
import { SET_TODO } from './actionType';

// 接口 action 方法的第一个入参：包含整个 store 对象
interface ICtx {
  commit: Commit;
  state: IState;
}

export default {
  // 调用 SET_TODO 变量代表的方法
  // 参数 1：整个 store 对象：包含调用 mutation 的 commit 方法
  // 参数 2：dispatch 时的参数
  [SET_TODO]({ commit }: ICtx, todo: ITodo) {
    commit(SET_TODO, todo);
  },
};
