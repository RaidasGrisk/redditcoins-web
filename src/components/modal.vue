<template>
  <div>
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content" style="overflow: hidden">
        <slot></slot>
      </div>
      <button class="modal-close is-large" @click="$emit('close')"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  mounted() {
    // Close modal with 'esc' key
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
        this.$emit('close');
      }
    })
  }
}
</script>

<style scoped>
</style>
