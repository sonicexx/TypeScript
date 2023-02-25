<template>
  <div>
    <todo-item
      v-for="item of todoList"
      :key="item.id"
      :todo="item"
      @removeTodo="removeTodo"
      @setStatus="setStatus"
      @setDoing="setDoing"
      >{{ item.content }}</todo-item
    >
  </div>
</template>

<script lang="ts" setup>
import TodoItem from '@/components/TodoList/TodoItem.vue';
import { IUseTodo, useTodo } from '@/hooks';
import { ITodo } from '@/typings';
import { PropType, toRefs } from 'vue';

const props = defineProps({
  todoList: Array as PropType<ITodo[]>,
});
const { todoList } = toRefs(props);

const { removeTodo, setStatus, setDoing }: IUseTodo = useTodo();
</script>

<style></style>
