import { iTodoData } from './typing';
import { myAxios } from './utils';

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
    //   axios 裸奔方法
    //     .get('http://localhost:8080/todolist')

    // ----改为自己封装的 axios 方法
    myAxios('/todolist')
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

// 删除方法装饰器
export function removeTodo(
  target: Object,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const _origin = descriptor.value;

  // 发送删除数据请求 》执行原始方法
  descriptor.value = function (target: HTMLElement, id: number) {
    // 发送删除请求

    // ****axios 裸奔方法
    // 1
    // axios.post('/remove', { a: 1, b: 2 })

    //2
    // axios('/remove', {
    //   method: 'post',
    //   data: { a: 1, b: 2 },
    // });

    //自封装 axios 的方法
    myAxios('/remove', 'POST', { id }).then(res => {
      console.log(res.data);

      // 执行原有方法
      _origin.call(this, target, id);
    });
  };
}

// 改变状态方法封装
export function toggleComplete(
  target: Object,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const _origin = descriptor.value;

  descriptor.value = function (target: HTMLElement, id: number) {
    myAxios('/toggle', 'POST', { id }).then(res => {
      console.log(res.data);

      _origin.call(this, target, id);
    });
  };
}

// 增加事项方法封装
export function addTodo(
  target: Object,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const _origin = descriptor.value;
  descriptor.value = function (todo: iTodoData) {
    myAxios('/add', 'POST', { todo: todo }).then(res => {
      console.log(res.data);
      if (res.data.status === 404) {
        console.log('数据已存在');
        return;
      }

      _origin.call(this, todo);
    });
  };
}
