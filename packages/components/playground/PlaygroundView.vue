<template>
  <div class="playground">
    <h1>Playground</h1>
    <p>Welcome to the playground!</p>
    <p>Here you can experiment with different components and features.</p>
  </div>
  <div class="playground__content">
    <h2>Button Playground</h2>
    <p>Click the button below to see it in action:</p>
    <AButton @click="handleClick">Click</AButton>
  </div>
</template>

<script setup lang="ts">
import { AButton } from '../src/components/AButton/AButton';

const handleClick = () => {
  alert('Button clicked!');
};
</script>

<style lang="scss" scoped></style>
