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
              v-for="page in numberOfPages"
              :key="page"
              @click="handleChangePage(page)"
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
defineProps({
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

function handleChangePage(page) {
  emit('changePage', page)
}
</script>
