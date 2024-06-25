<template>
  {{ curTaskId }}
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const curTaskId = route.params.task
</script>
