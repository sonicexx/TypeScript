# 逻辑：面向对象 类的继承 横向切割 --- 设计方案

    1.外层：事件绑定 》按钮事件响应
    2.操作数据：addTodo、removerTodo、toggleCompleted
    3.操作DOM：addItem、removeItem、changeComplete
    4.管理模板：todoView 》接收参数 返回 每一个事项的节点

    1.搭建 app.ts 框架
        1.获取元素：input、addBtn、list
        2.初始化列表数据：todoData
            1.新建 类型文件typings
            2.新建 单个事项数据 的数据类型接口 iTodoData
            3.导入 app.ts 规定 todoData 的数据类型
        3.初始化函数 init 执行事件绑定函数 bindEvent
        4.bindEvent
            1.绑定 oAddBtn 按钮事件
            2.绑定 oList 点击事件 》获取 e:MouseEvent 对象
    2.搭建 数据处理组件 TodoEvent
        1.接收 todoData 数据
            1.新建 private todoData 类型
            2.在 constructor 中接收 todoData 的数据
        2.创建 处理数据的函数
            (需要继承 TodoDom 类，并将 list 节点 super 给 TodoDom)
            1.addTodo：比较是否重复，不重复添加，并触发增加 dom 的方法 addItem
            2.removeTodo：返回除 id 以外的所有项，并触发删除 dom 的方法 removeItem
            3.toggleComplete：改变对应 id 项的 completed 值，并触发 TodoDom 的 changeComplete 函数
    3.搭建 DOM 处理组件 TodoDom
        1.DOM 的管理是基于 list 的节点，所以接收存储一个 list 的元素数据
            1.新建 todoWrapper 数据，接收传来的数据
            2.由于是 TodoEvent 继承 TodoDom 的，所以在 TodoEvent 的构造函数中需要接收 list 的节点 》就需要实例化 TodoEvent 的时候传入 list 节点数据
            3.但 TodoEvent 不需要存储 list 的数据，只需要 super 给TodoDom就行
                TodoEvent 》extends 》super()
        2.事件处理
        2.1 创建 TodoTemplate 用来返回 模板字符串
            1.DOMaddItem：增加节点并插入
                获取单项数据，创建 todo-item 节点，插入到 todoWrapper 中
            2.DOMremoveItem：删除此项 DOM 节点
                获取 target 元素，获取 todo-item 父级，删除
            3.DOMchangeComplete：为 span 内容加上中划线样式
                获取 target 元素，获取 todo-item 父级，获取 span

