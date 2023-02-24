// 处理数据的方法的集中文件

import { SET_TODO, SET_TODO_LIST } from '@/store/actionType';
import { STORAGE_NAME } from './localStorageTypes';
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

  // 导入操作 localStorage 的方法
  const { getLocalList, setLocalList }: IUseLocalStorage = useLocalStorage();

  //  调用获取 localStorage 中 todoList 数据
  const todoList: ITodo[] = getLocalList();

  // 加工 todo 数据的方法：从字符串到带有 id 和 status 的对象数据
  function setTodo(value: string): void {
    const todo: ITodo = {
      id: new Date().getTime(),
      content: value,
      status: TODO_STATUS.WILLDO,
    };

    store.dispatch(SET_TODO, todo);

    console.log(store.state.list);
    setLocalList(store.state.list);
  }

  function setTodoList() {
    store.dispatch(SET_TODO_LIST, todoList);
  }

  function removeTodo() {}

  function setStatus() {}

  function setDoing() {}

  return { setTodo, setTodoList, removeTodo, setStatus, setDoing };
}

// 操作 localStorage 的方法封装：获取 + 存储 todoList 数据到 localStorage 中
interface IUseLocalStorage {
  getLocalList: () => ITodo[];
  setLocalList: (todoList: ITodo[]) => void;
}

function useLocalStorage(): IUseLocalStorage {
  const getLocalList = () =>
    JSON.parse(localStorage.getItem(STORAGE_NAME) || '[]');

  const setLocalList = (todoList: ITodo[]) => {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(todoList));
  };

  return { getLocalList, setLocalList };
}

export { useTodo };
