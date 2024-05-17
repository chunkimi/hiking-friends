<!-- <style lang="scss" scoped></style>
<template>
  <div class="d-flex justify-content-center">
    <nav aria-label="Page navigation example">
      <div class="d-flex justify-content-center">
        <nav aria-label="Page navigation example ">
          <ul class="pagination">
            <li class="page-item" @click="changePage(currentPage - 1)">
              <p class="page-link bg-transparent cursor-pointer" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </p>
            </li>
            <li
              class="page-item"
              v-for="page in numberOfPages"
              :key="page"
              @click="changePage(page)"
            >
              <p class="page-link bg-transparent cursor-pointer" href="#">{{ page }}</p>
            </li>
            <li class="page-item" @click="changePage(currentPage + 1)">
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
import { ref, computed } from 'vue'

const props = defineProps({
  trailsNum: {
    type: Number,
    required: true
  }
})

const perPageTrails = 12
const numberOfPages = computed(() => Math.ceil(props.trailsNum.value / perPageTrails))
const currentPage = ref(1)
const filterTrails = ref([])
const curPageTrails = ref(getTrailsByPage(currentPage.value))

function getTrailsByPage(pageNum) {
  const data = filterTrails.value.length !== 0 ? filterTrails : trailsData
  const startIndex = (pageNum - 1) * perPageTrails
  return data.slice(startIndex, startIndex + perPageTrails)
}

function changePage(page) {
  if (page >= 1 && page <= numberOfPages.value) {
    currentPage.value = page
    curPageTrails.value = getTrailsByPage(page)
  }
}
</script> -->
