import TodoTemplate from './TodoTemplate';
import { iTodoData } from './typing';
import { create } from './utils';

class TodoDom extends TodoTemplate {
  todoWrapper: HTMLElement;

  constructor(todoWraper: HTMLElement) {
    super();
    this.todoWrapper = todoWraper;
  }

  protected initList(todoData: iTodoData[]): void {
    if (!todoData.length) return;
    const frag: DocumentFragment = document.createDocumentFragment();
    todoData.forEach((todo: iTodoData) => {
      const oItem: HTMLElement = create(
        'div',
        'todo-item',
        this.todoView(todo)
      );
      frag.appendChild(oItem);
    });
    this.todoWrapper.appendChild(frag);
  }

  protected addItem(todo: iTodoData) {
    const oItem: HTMLElement = create('div', 'todo-item', this.todoView(todo));
    this.todoWrapper.appendChild(oItem);
  }

  protected removeItem(target: HTMLElement) {
    // const oParentNode = findParentNode(target, 'todo-item')
    // oParentNode?.remove()
    // target.parentNode?.removeChild()
    // console.log(target.parentNode);
    while ((target = target.parentNode as HTMLElement)) {
      if (target.className === 'todo-item') {
        target.remove();
        return;
      }
    }
  }

  protected changeComplete(target: HTMLElement, completed: boolean) {
    const oParentNode: HTMLElement = target.parentNode as HTMLElement;
    const oSpan = oParentNode.querySelector('span')!;
    oSpan.style.textDecoration = completed ? 'line-through' : 'none';
  }
}

export default TodoDom;
