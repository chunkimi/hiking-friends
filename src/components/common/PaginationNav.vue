<style lang="scss" scoped></style>
<template>
  <div class="d-flex justify-content-center">
    <nav aria-label="Page navigation example">
      <div class="d-flex justify-content-center">
        <nav aria-label="Page navigation example ">
          <ul class="pagination">
            <li class="page-item" @click="handleChangePage(currentPage - 1)">
              <p class="page-link bg-transparent cursor-pointer" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </p>
            </li>
            <li
              class="page-item"
              v-for="(page, index) in computedPages"
              :key="page"
              @click="handleChangePage(page, index)"
            >
              <p
                class="page-link cursor-pointer"
                href="#"
                :class="page === currentPage ? ['bg-primary', 'text-light'] : 'bg-transparent'"
              >
                {{ page }}
              </p>
            </li>
            <li class="page-item" @click="handleChangePage(currentPage + 1)">
              <p class="page-link bg-transparent cursor-pointer" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'

const isMediaXsDown = useMediaQuery('(max-width: 576px)')
const isMediaLgDown = useMediaQuery('(max-width: 990px)')
const isMediaLgUp = useMediaQuery('(min-width: 991px)')

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  numberOfPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['changePage'])

const ellipsis = '...'

const computedPages = computed(() => {
  let maxPages

  switch (true) {
    case isMediaXsDown.value:
      maxPages = 4
      break
    case isMediaLgDown.value:
      maxPages = 7
      break
    case isMediaLgUp.value:
      maxPages = 10
      break
    default:
      maxPages = 10
  }

  if (props.numberOfPages <= maxPages) {
    return Array.from({ length: props.numberOfPages }, (_, i) => i + 1)
  }

  const pages = []
  pages.push(1)
  if (isMediaXsDown.value && props.currentPage > 3 && props.currentPage < props.numberOfPages - 2) {
    pages.push(ellipsis)
    pages.push(props.currentPage)
    pages.push(ellipsis)
  } else if (props.currentPage > 3 && props.currentPage < props.numberOfPages - 2) {
    pages.push(ellipsis)
    pages.push(props.currentPage - 1)
    pages.push(props.currentPage)
    pages.push(props.currentPage + 1)
    pages.push(ellipsis)
  } else if (props.currentPage <= 3) {
    for (let i = 2; i <= maxPages - 1; i++) {
      pages.push(i)
    }
    pages.push(ellipsis)
  } else {
    pages.push(ellipsis)
    for (let i = props.numberOfPages - (maxPages - 2); i < props.numberOfPages; i++) {
      pages.push(i)
    }
  }
  pages.push(props.numberOfPages)
  return pages
})

function handleChangePage(rawPage, index) {
  const curIndexInComputedPages = computedPages.value.indexOf(props.currentPage)

  if (rawPage === ellipsis && index < curIndexInComputedPages) {
    const result = computedPages.value[2] - 1
    emit('changePage', result)
    return
  }
  if (rawPage === ellipsis && index > curIndexInComputedPages) {
    const result = computedPages.value[2] + 1
    emit('changePage', result)
    return
  } else {
    emit('changePage', rawPage)
  }
}
</script>
