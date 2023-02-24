# 流程 & 文件准备

    `流程：组件 -> commit -> mutation -> state -> 视图变更 -> 响应式`

- **vuex 工作流**
  1. 组件 => dispatch => action
  2. dispatch => type(actionType) => 某一个 action
  3. action => commit 调用 => mutation
  4. mutation => change => state
  5. render 方案: state => 数据流 => 视图
- **文件集合**
  1. actionTypes...........action 类型
  2. actions..................调用 mutation 的方法
  3. mutations.............更改 state 的方法
  4. state.....................中央数据管理池
  5. store 出口.............actions、mutations、state 统一到仓库进行管理

# 组件划分

- TodoList
  1. TodoInput => 输入的组件
  2. TodoList => 列表组件
     - TodoItem => 列表项
       1. 完成/未完成的选择...checkbox
       2. 删除该项...button
       3. 控制状态的按钮...button

1. 组件 => 通过自定义 hooks 得到加工数据的方法 setTodo
2. 加工好的数据 => dispatch actions 中的 SET_TODO 方法 => commit mutation 中的 SET_TODO 方法 => 修改 state 中的数据
