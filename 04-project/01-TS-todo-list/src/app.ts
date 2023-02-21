import TodoEvent from './js/TodoEvent';
import { iTodoData } from './js/typing';

// 获取元素：input、按钮、list
const oInput: HTMLInputElement = document.querySelector('.todo-input')!;
const oAddBtn: HTMLElement = document.querySelector('.todo-add') as HTMLElement;
const oList: HTMLElement = document.querySelector('.todo-list')!;

// console.log(oInput.parentNode);

//初始化列表数据
// 引用 typing.ts 文件中声明的单个数据格式 iTodoData
const todoData: iTodoData[] = [
  {
    id: 1,
    content: '111111111',
    completed: true,
  },
  {
    id: 2,
    content: '22222222',
    completed: false,
  },
  {
    id: 3,
    content: '3333333333',
    completed: false,
  },
];

//   实例化 TodoEvent
const todoEvent = new TodoEvent(todoData, oList);

const init: () => void = function () {
  bindEvent();
};

const bindEvent = function (): void {
  oAddBtn.addEventListener('click', handleAddBtnClick);
  oList.addEventListener('click', handleListClick);
};

const handleAddBtnClick = function (): void {
  const val: string = oInput.value.trim();

  oInput.value = '';
  if (!val.length) return;
  const ret = todoEvent.eventAddTodo({
    id: 10,
    content: val,
    completed: false,
  });

  if (ret && ret === 1001) {
    console.log('数据添加失败，已存在数据');
  }
};

const handleListClick = function (e: MouseEvent): void {
  // 获取鼠标点击对象
  const tar: HTMLElement = e.target as HTMLElement;

  // 获取点击对象 tag 名称：注意大小写
  const tagName: string = tar.tagName.toLowerCase();

  // 根据不同 tag 名处理事件 TODO
  if (tagName === 'input' || tagName === 'button') {
    const id = +tar.dataset.id!;

    switch (tagName) {
      case 'input':
        todoEvent.eventToggleComplete(tar, id);
        break;
      case 'button':
        todoEvent.eventRemoveTodo(tar, id);
        break;
      default:
        break;
    }
  }
};

init();
