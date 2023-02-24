<template>
  <div>
    <!-- 使用子组件 -->
    <todo-input></todo-input>
    <todo-list :todoList="todoList"></todo-list>
  </div>
</template>

<script lang="ts" setup>
//使用 TS 语言 + setup 语法糖

// 引入子组件
import TodoInput from '@/components/TodoInput/index.vue';
import TodoList from '@/components/TodoList/index.vue';
import { computed, onMounted } from 'vue';
import { Store, useStore } from 'vuex';

import { IUseTodo, useTodo } from './hooks';

const { setTodoList }: IUseTodo = useTodo();

const store: Store<any> = useStore();

// 整个组件 mounted 后，获取 todoList 数据
onMounted(() => {
  setTodoList();
});

let todoList = computed(() => store.state.list);
</script>
