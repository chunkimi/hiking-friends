<style lang="scss" scoped>
.accordion {
  --bs-accordion-btn-color: #7c8e74;
  --bs-accordion-btn-bg: #f0ede7;
  --bs-accordion-active-color: #fff;
  --bs-accordion-active-bg: #a7b47f;
}
</style>
<template>
  <div>
    <h5 class="h3 text-darken">{{ listTitle.main }}</h5>
    <p class="fs-6 text-darken">{{ listTitle.description }}</p>
    <ul class="list-unstyled">
      <li v-for="listItem in listArr" :key="listItem.id">
        <AccordionItem :list-item="listItem" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import AccordionItem from '@/components/front/base/AccordionItem.vue'
defineProps({
  listId: {
    type: String,
    required: true
  },
  listTitle: {
    type: Object,
    required: true
  },
  listArr: {
    type: Array,
    required: true
  }
})
</script>
