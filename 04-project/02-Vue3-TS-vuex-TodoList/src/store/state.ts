export default {};

/*
状态 以及 状态类型划分

list: ITodo[]


ITodo
listItem:{
    id: new Data().getTime() => number
    content: string
    status:FINISHED  DOING WILLDO => 枚举类型
}

**** 为什么推荐使用 interface ，而不是 type？
        interface 可以使用 extends，复用性强
*/
