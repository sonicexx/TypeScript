import TodoDom from './TodoDom';
import {
  addTodo,
  getTodoList,
  removeTodo,
  toggleComplete,
} from './TodoService';
import { iTodoData } from './typing';

// 数据处理方法
class TodoEvent extends TodoDom {
  // 接收 todoData 数据
  private todoData: iTodoData[];

  // 构造函数
  constructor(todoData: iTodoData[], todoWrapper: HTMLElement) {
    super(todoWrapper);
    this.todoData = todoData;

    this.init(this.todoData);
  }

  @getTodoList
  public init(todoData: iTodoData[]) {
    this.todoData = todoData;
    this.initList(this.todoData);
  }

  // 添加数据
  @addTodo
  public eventAddTodo(todo: iTodoData): undefined | number {
    // 判断新建的数据是否已存在在整个列表数据中
    const _todo = this.todoData.find(
      (item: iTodoData) => item.content === todo.content
    );

    // 不存在，将新数据 push 到 todoData 中
    if (!_todo) {
      this.todoData.push(todo);
      this.addItem(todo);
      return;
    }

    // 已存在，不添加，返回错误值
    return 1001;
  }

  // 删除数据
  @removeTodo
  public eventRemoveTodo(target: HTMLElement, id: number): void {
    // 返回 todoData 中 id 不再相同的所有项
    this.todoData = this.todoData.filter((todo: iTodoData) => todo.id !== id);

    // TodoDom 继承的方法，用于：删除某一项
    this.removeItem(target);
  }

  // 改变完成状态
  @toggleComplete
  public eventToggleComplete(target: HTMLElement, id: number) {
    // 返回本身 completed 的取反
    this.todoData.map((todo: iTodoData) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        this.changeComplete(target, todo.completed);
      }
      //map 方法，将符合条件的项目返回给原数组
      return todo;
    });
  }
}

export default TodoEvent;
