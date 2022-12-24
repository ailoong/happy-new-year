<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BScroll from '@better-scroll/core';
import { BScrollInstance } from '@better-scroll/core';
import Slide from '@better-scroll/slide';

const wrapper = ref<HTMLElement | null>(null);

BScroll.use(Slide);

let slide: BScrollInstance;

onMounted(() => {
  slide = new BScroll(wrapper.value as HTMLElement, {
    scrollX: false,
    scrollY: true,
    momentum: false,
    bounce: false,

    slide: {
      threshold: 100,
    },
    stopPropagation: true,
  });
});

onMounted(() => {
  // slide.destroy();
});
</script>

<template>
  <div ref="wrapper" class="slide-wrapper">
    <div class="slide-content">
      <div class="slide-page">1</div>
      <div class="slide-page">2</div>
      <div class="slide-page">3</div>
      <div class="slide-page">4</div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
}

.slide-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .slide-content {
    width: 100vw;
    .slide-page {
      width: 100vw;
      height: 100vh;
    }
  }
}
</style>
