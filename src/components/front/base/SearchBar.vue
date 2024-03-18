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
      placeholder="探索步道"
      aria-label="Search"
    />
    <button class="btn rounded-circle search__btn" type="submit">
      <i class="bi bi-search"></i>
    </button>
  </form>
</template>

<script setup></script>
