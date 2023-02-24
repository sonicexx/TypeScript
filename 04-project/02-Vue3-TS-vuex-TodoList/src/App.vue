<template>
  <div>
    <!-- 使用子组件 -->
    <todo-input></todo-input>
    <todo-list></todo-list>
    <todo-item></todo-item>
  </div>
</template>

<script lang="ts" setup>
//使用 TS 语言 + setup 语法糖

// 引入子组件
import TodoInput from '@/components/TodoInput/index.vue';
import TodoList from '@/components/TodoList/index.vue';
import TodoItem from '@/components/TodoList/TodoItem.vue';
</script>
