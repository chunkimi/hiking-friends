<style lang="scss" scoped>
@import '@/styles/main.scss';

.dot-check-progress {
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__node {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: $gray-300;
    display: inline-block;
    position: relative;

    &.completed {
      background-color: $success;
    }
  }

  &__line {
    height: 0.25rem;
    flex-grow: 1;
    background-color: $gray-300;
    margin: 0;

    &.completed {
      background-color: $success;
    }
  }

  &__icon {
    position: absolute;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1rem;
    color: $gray-300;

    &.completed {
      color: $success;
    }
  }
}
</style>
<template>
  <div class="dot-check-progress__container">
    <template v-for="(node, index) in progressNode" :key="node.type">
      <div class="dot-check-progress__node" :class="favItem[node.type] ? 'completed' : ''">
        <div class="dot-check-progress__icon" :class="favItem[node.type] ? 'completed' : ''">
          <span class="material-icons">{{ node.icon }}</span>
        </div>
      </div>
      <div
        v-if="index < nodeNum - 1"
        class="dot-check-progress__line"
        :class="
          favItem[progressNode[index].type] && favItem[progressNode[index + 1].type]
            ? 'completed'
            : ''
        "
      ></div>
    </template>
  </div>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  progressNode: {
    type: Array,
    required: true
  },
  favItem: {
    type: Object,
    required: true
  }
})

const nodeNum = computed(() => props.progressNode.length)
</script>
