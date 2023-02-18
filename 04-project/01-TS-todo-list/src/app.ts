import { ITodoData } from './js/typings';

import TodoEvent from './js/TodoEvents';

const oInput: HTMLInputElement = document.querySelector('input')!;
const oAddBtn: HTMLElement = document.querySelector('button')!;
const oTodoList: HTMLElement = document.querySelector('.todo-list')!;

const tododata: ITodoData[] = [
  {
    id: 1,
    content: '123',
    completed: true,
  },
  {
    id: 2,
    content: '22222',
    completed: false,
  },
  {
    id: 3,
    content: '55555',
    completed: true,
  },
];

const todoEvent: TodoEvent = new TodoEvent(tododata, oTodoList);

const init = (): void => {
  bindEvent();
};

const bindEvent = function (): void {
  oAddBtn.addEventListener('click', handleAddBtnClick);
  oTodoList.addEventListener('click', handleListClick);
};

tododata.forEach((item: ITodoData) => todoEvent.addTodo(item));

let id = tododata.length
  ? Math.max(...tododata.map((item: ITodoData) => item.id))
  : 0;
// prettier-ignore
const handleAddBtnClick = function (): void {
    const val = oInput.value.trim()
    
    if(val.length){
        const ret:number|undefined = todoEvent.addTodo({
            id:++id,
            content:val,
            completed:false
        })
        console.log(tododata);
        if(ret && ret === 1001){
            alert('列表项以存在')
            return
        }

        oInput.value = ''
    }

};
// prettier-ignore
const handleListClick = function (e: MouseEvent): void {
    const tar = e.target as HTMLElement
    const tagName = tar.tagName.toLowerCase()

    if(tagName === 'input' || tagName === 'button'){
        const id:number = +tar.dataset.id!
        switch(tagName){
            case 'input':
                todoEvent.toggleCompleted(tar, id)
                break;
            case 'button':
                todoEvent.removeTodo(tar,id)
                break;
            default:
                break;
        }
    }
};

init();
