import TodoDom from './TodoDom';
import { ITodoData } from './typings';

class TodoEvent extends TodoDom {
  private todoData: ITodoData[];

  constructor(todoData: ITodoData[], todoWrapper: HTMLElement) {
    super(todoWrapper);
    this.todoData = todoData;

    this.init();
  }

  public addTodo(todo: ITodoData): number | undefined {
    const _todo: undefined | ITodoData = this.todoData.find(
      (item: ITodoData) => item.content === todo.content
    );

    if (!_todo) {
      this.todoData.push(todo);
      this.addItem(todo);
      return;
    }
    return 1001;
  }

  public removeTodo(target: HTMLElement, id: number): void {
    this.todoData = this.todoData.filter((item: ITodoData) => item.id !== id);
    this.removeItem(target);
  }

  public toggleCompleted(target: HTMLElement, id: number): void {
    this.todoData = this.todoData.map((item: ITodoData) => {
      if (item.id === id) {
        item.completed = !item.completed;
        this.changeCompleted(target, item.completed);
      }
      return item;
    });
  }

  private init() {
    this.initList(this.todoData);
  }
}

export default TodoEvent;
