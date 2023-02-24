// 处理数据的方法的集中文件

import { SET_TODO } from '@/store/actionType';
import { ITodo, TODO_STATUS } from '@/typings';
import { Store, useStore } from 'vuex';

// 接口类型：总 hook 函数
export interface IUseTodo {
  setTodo: (value: string) => void;
  setTodoList: () => void;
  removeTodo: () => void;
  setStatus: () => void;
  setDoing: () => void;
}

// hooks 总函数：通过调用该方法，返回想使用的方法
// const { setTodo } = useTodo()

function useTodo(): IUseTodo {
  // 使用 vuex store
  const store: Store<any> = useStore();

  // 加工 todo 事项的方法：从字符串到带有 id 和 status 的对象数据
  function setTodo(value: string): void {
    const todo: ITodo = {
      id: new Date().getTime(),
      content: value,
      status: TODO_STATUS.WILLDO,
    };

    store.dispatch(SET_TODO, todo);
  }

  function setTodoList() {}

  function removeTodo() {}

  function setStatus() {}

  function setDoing() {}

  return { setTodo, setTodoList, removeTodo, setStatus, setDoing };
}

export { useTodo };
