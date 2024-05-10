<style lang="scss" scoped>
$circleRadius: 60px;
$pointerScale: 9.43px;

.circle {
  &__list {
    border-radius: 50%;
    width: $circleRadius * 2;
    height: $circleRadius * 2;
    position: relative;
  }
  &__item {
    position: absolute;
    z-index: 2;
    width: 2px;
    height: $pointerScale;
    left: 50%;
    margin-left: -1px;
    top: calc(#{$circleRadius} - #{$pointerScale});
    transform-origin: 50% $circleRadius;
  }
  &__icon {
    font-size: 40px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 75%);
  }
}

.clock {
  &__wrap {
    margin-bottom: calc(#{$circleRadius} + 12px);
  }
  &__icon {
    @extend .circle__icon;
    top: 55%;
  }
}

.sun {
  &__wrap {
    margin-bottom: 8px;
  }
  &__icon {
    @extend .circle__icon;
    top: 40%;
  }
}
</style>
<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div :class="isClockLine ? 'clock__wrap' : 'sun__wrap'">
      <div class="circle__list">
        <div
          class="circle__item"
          v-for="i in 40"
          :key="i"
          :class="`bg-${color}`"
          :style="{
            transform: isClockLine
              ? `rotate(${9 * i}deg)`
              : i < 11 || i > 29
              ? `rotate(${9 * i}deg)`
              : null
          }"
        ></div>
        <span
          class="material-icons fs-1"
          :class="[isClockLine ? 'clock__icon' : 'sun__icon', `text-${color}`]"
          >{{ icon }}</span
        >
      </div>
    </div>
    <h3 :class="[isClockLine ? 'h3' : 'fs-6 fw-bold', `text-${color}`]">{{ titleText }}</h3>
  </div>
</template>

<script setup>
defineProps({
  isClockLine: {
    type: Boolean,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  titleText: {
    type: String,
    required: true
  }
})
</script>
