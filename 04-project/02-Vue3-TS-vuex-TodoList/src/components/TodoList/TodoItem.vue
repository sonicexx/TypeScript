<template>
  <div>
    --
    <input
      type="checkbox"
      :checked="todo?.status === FINISHED"
      @click="setStatus(todo?.id as number)" />
    <span :class="todo?.status === FINISHED ? 'line-through' : ''">{{
      todo?.content
    }}</span>

    <button @click="removeTodo(todo?.id as number)">删除</button>

    <button
      v-if="todo?.status !== FINISHED"
      @click="setDoing(todo?.id as number)"
      :class="todo?.status === DOING ? DOING : WILLDO">
      {{ todo?.status === DOING ? '正在做' : '马上做' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ITodo, TODO_STATUS } from '@/typings/index';
import { PropType, toRefs } from 'vue';
const props = defineProps({
  todo: Object as PropType<ITodo>,
});

const { todo } = toRefs(props);

interface IStatusState {
  DOING: TODO_STATUS;
  WILLDO: TODO_STATUS;
  FINISHED: TODO_STATUS;
}

const { DOING, WILLDO, FINISHED }: IStatusState = {
  DOING: TODO_STATUS.DOING,
  WILLDO: TODO_STATUS.WILLDO,
  FINISHED: TODO_STATUS.FINISHED,
};

const emit = defineEmits(['setStatus', 'removeTodo', 'setDoing']);
const setStatus = (id: number): void => {
  emit('setStatus', id);
};

const removeTodo = (id: number): void => {
  emit('removeTodo', id);
};
const setDoing = (id: number): void => {
  emit('setDoing', id);
};
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}

button {
  font-size: 25px;
  padding: 10px;
}

.willdo {
  background-color: gray;
  color: orange;
}
.doing {
  background-color: orange;
  color: gray;
}
</style>
