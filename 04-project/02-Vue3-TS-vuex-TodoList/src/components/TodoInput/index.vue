<template>
  <!-- 双向绑定 todo、绑定事件 keyup -->
  <input type="text" v-model="todo" @keyup="addTodo" />
</template>

<script lang="ts" setup>
import { IUseTodo, useTodo } from '@/hooks';
import { ref } from 'vue';
const todo = ref<string>(''); //ref 数据，指定 TS 类型

const { setTodo }: IUseTodo = useTodo(); // 取出 setTodo 方法

// input 框，键盘抬起事件：添加 todo 数据、todo 赋值为空
const addTodo = (e: KeyboardEvent): void => {
  if (e.key === 'Enter' && todo.value.trim().length) {
    // 加工数据
    setTodo(todo.value);

    // 输入框赋值为空
    todo.value = '';
  }
};
</script>
