import express, { Application } from 'express'; //搭建服务器，****app类型？
import bodyParse from 'body-parser'; //处理 post 请求，解析请求端传递的值
import { fileOperation } from './utils'; // 自定义操作数据文件方法
import { iTodoData } from '../src/js/typing';

// 创建 app 服务器
const app: Application = express();

// 编译请求信息
app.use(bodyParse.urlencoded({ extended: true })); //x-www-form
app.use(bodyParse.json()); //json 格式

// 跨域问题处理
app.all('*', (req, res, next) => {
  // 支持跨域请求
  res.header('Access-Control-Allow-Origin', '*');

  //----Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response.
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

  // TODO支持跨方法请求？
  res.header('Access-Control-Allow', 'POST,GET,PUT,DELETE,OPTIONS');

  next();
});

// 请求方法
app.get('/todolist', (req, res) => {
  // 读取文件数据信息
  const todoList: string = fileOperation('todo.json') as string;
  // 返回给请求端
  res.send(todoList);

  // 访问地址测试：localhost:8080/todolist
});

app.post('/toggle', (req, res) => {
  const id: number = +req.body.id;

  fileOperation('todo.json', function (todoData: iTodoData[]) {
    // 返回本身 completed 的取反
    todoData.map((todo: iTodoData) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      //map 方法，将符合条件的项目返回给原数组
      return todo;
    });

    return todoData;
  });

  res.send({
    msg: 'toggle server',
    status: 200,
  });
});

app.post('/remove', (req, res) => {
  // 保存请求端传来的 id
  const id: number = +req.body.id;

  /* ---- 文件操作重复操作，封装一个函数
  // 读取出来的值是 string 格式，不用 send 回去，还是字符串处理，所以需要先 parse 一下
  let todoList: iTodoData[] = JSON.parse(myReadFile('todo.json')) || [];

  if (!todoList.length) {
    console.log('无数据，请先添加');
    res.send('无数据，请先添加');
  }

  // 处理读出来的数据，留下未被删除的项
  todoList = todoList.filter((item: iTodoData) => item.id !== id);
  
  // 写入文件
  myWriteFile<object>('todo.json', todoList);
  */

  // 文件处理方法
  fileOperation('todo.json', function (todoList: iTodoData[]) {
    return todoList.filter((item: iTodoData) => item.id !== id);
  });

  // 返回成功状态
  res.send({
    msg: 'removeTodo done',
    status: 200,
  });
});

app.post('/add', (req, res) => {
  const todo: iTodoData = req.body.todo;
  fileOperation('todo.json', function (todoData: iTodoData[]): iTodoData[] {
    // 判断新建的数据是否已存在在整个列表数据中
    const _todo = todoData.find(
      (item: iTodoData) => item.content === todo.content
    );

    // 不存在，将新数据 push 到 todoData 中
    if (_todo) {
      res.send({
        msg: '事项已存在，请重新输入',
        status: 404,
      });

      return;
    }

    todoData.push(todo);
    // 存在，将原数据返回
    return todoData;
  });
  res.send({
    msg: 'add done',
    status: 200,
  });
});

// 设置监听
app.listen(8080, function () {
  console.log('welcom to express');
  console.log('listening on port 8080');
});
