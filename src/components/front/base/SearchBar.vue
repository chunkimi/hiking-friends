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
  <form class="d-flex search__bar" role="search">
    <input
      class="form-control me-3 search__input"
      type="search"
      aria-label="Search"
      :placeholder="searchSetting.placeholder"
    />

    <button class="btn rounded-circle search__btn" type="submit" @click="searchData">
      <span class="material-icons"> {{ searchSetting.optionBtn.search }} </span>
    </button>
    <button class="btn rounded-circle search__btn ms-3" type="button" @click="resetSearch">
      <span class="material-icons"> {{ searchSetting.optionBtn.reset }} </span>
    </button>
  </form>
</template>

<script setup>
const searchSetting = {
  placeholder: '探索步道',
  optionBtn: {
    search: 'search',
    reset: 'restart_alt'
  }
}

function searchData() {
  console.log('內層searchData')
}

function resetSearch() {
  console.log('內層resetSearch')
}
</script>
