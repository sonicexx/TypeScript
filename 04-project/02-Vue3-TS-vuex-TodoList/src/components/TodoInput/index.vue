<template>
  <!-- 双向绑定 todo、绑定事件 keyup -->
  <input type="text" v-model="todo" @keyup="addTodo" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const todo = ref<string>('');

const addTodo = (e: KeyboardEvent): void => {
  if (e.key === 'Enter' && todo.value.trim().length) {
    console.log(todo.value);
    todo.value = '';
  }
};
</script>
