<template>
  <div>--{{ item }}</div>
</template>

<script lang="ts" setup>
const props = defineProps({
  item: String,
});
</script>
