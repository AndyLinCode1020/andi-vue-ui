<template>
  <div class="playground">
    <h1>Playground</h1>
    <p>Welcome to the playground!</p>
    <p>Here you can experiment with different components and features.</p>
  </div>
  <div class="playground__content">
    <h2>Button Playground</h2>
    <p>Click the button below to see it in action:</p>
    <div class="btn-group">
      <AButton @click="handleClick">Click</AButton>
      <AButton
        textColor="#fff"
        borderColor="transparent"
        bgColor="#000"
        bgHoverColor="#fff"
        textHoverColor="#000"
        borderHoverColor="#000"
        bgActiveColor="#444"
        textActiveColor="#fff"
        borderActiveColor="#000"
        >TEST</AButton
      >
      <AButton bgColor="#000">TEST</AButton>
      <AButton textColor="#ff6f91">TEST</AButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AButton } from '../src/components/AButton/AButton';

const handleClick = () => {
  console.log('Button clicked!');
};
</script>

<style lang="scss" scoped>
.playground__content {
  .btn-group {
    display: flex;
    gap: 10px;
  }
}
</style>
