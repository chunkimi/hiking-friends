<style lang="scss" scoped>
@import '@/styles/main.scss';
.search {
  &__bar {
    width: 100%;
    min-width: 40%;
    max-width: 312px;
    @include media-breakpoint-up(sm) {
      max-width: 596px;
    }
  }
  &__input {
    width: 100%;
    max-width: 544px;
    background-color: $light;
    border: 1px sold $dark-gray;
    border-radius: 1000px;
  }
  &__btn {
    display: flex;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: $dark;
    background-color: $light-gray;
    border: 0;
    &:hover,
    &:focus,
    &:active,
    &.active {
      color: $light;
      background-color: $dark-gray;
    }
  }
}
</style>

<template>
  <form class="d-flex search__bar" role="search" @submit.prevent="onSearch">
    <input
      class="form-control me-3 search__input"
      type="search"
      aria-label="Search"
      :placeholder="searchSetting.placeholder"
      v-model="queryWord"
    />
    <button class="btn rounded-circle search__btn" type="submit">
      <span class="material-icons"> {{ searchSetting.optionBtn.search }} </span>
    </button>
    <button
      class="btn rounded-circle search__btn ms-3"
      type="button"
      @click.prevent="resetSearch"
      v-if="hasResetBtn"
    >
      <span class="material-icons"> {{ searchSetting.optionBtn.reset }} </span>
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'

const searchSetting = {
  placeholder: '探索步道',
  optionBtn: {
    search: 'search',
    reset: 'restart_alt'
  }
}

defineProps({
  hasResetBtn: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['search-data', 'search-reset'])
const queryWord = ref('')

function onSearch() {
  const trimmedQuery = queryWord.value.trim()
  if (trimmedQuery) {
    emit('search-data', queryWord.value)
  } else {
    queryWord.value = ''
    alert('輸入空白呢，讓我們回到登山口吧')
    resetSearch()
  }
}

function resetSearch() {
  queryWord.value = ''
  emit('search-reset', true)
}

const trailsListStore = useTrailsListStore()
const { toggleReload } = storeToRefs(trailsListStore)

watch(
  () => toggleReload.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      queryWord.value = ''
    }
  }
)
</script>
