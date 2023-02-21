import axios from 'axios';
import { iTodoData } from './typing';
export function getTodoList(
  target: Object,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  // 保存原有 init 函数
  // this 指向 undefined
  const _origin = descriptor.value;

  // 重写 init 函数
  descriptor.value = function (todoData: iTodoData[]) {
    axios
      .get('http://localhost:8080/todolist')
      .then(res => {
        if (!res) return;

        todoData = res.data;
      })
      .then(() => {
        // this 指向 TodoEvent
        // ****************************************
        // _origin 重新定义了一遍， this 被改写了
        _origin.call(this, todoData); //等同于 init(todoData)
        // _origin(todoData);
      });
  };
}
