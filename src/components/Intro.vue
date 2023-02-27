<script setup>

</script>

<template>
  <n-collapse-transition :appear="true">
    <div>
      <n-text depth="2" strong style="font-size: 3em; font-weight: 1000;">
        Hi, 🙌 <br>
        I track coin mentions on <br>
        <a class="rainbow" href="https://www.reddit.com/r/CryptoCurrency/" target="blank_" style="text-decoration:none;">
          r/cryptocurrency
        </a>
      </n-text>
    </div>
  </n-collapse-transition>
</template>

<style>

@keyframes rainbow {
  0% { color: #29cd64 }
  17% { color: #29cd64 }
  34% { color: #2a7bf5 }
  51% { color: #2af5e4 }
  68% { color: #cd296c }
  85% { color: #f5dd2a }
  100% { color: #29cd64 }
}
.rainbow {
  animation-name: rainbow;
  animation-duration: 30s;
  animation-iteration-count: infinite;
}

</style>
