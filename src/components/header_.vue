<script setup>
import { ref, onMounted } from 'vue'
import { useThemeVars } from 'naive-ui'
import { useStore } from 'vuex'
import { useIsMobile } from '../utils'

const themeVars = useThemeVars()
const store = useStore()
const isMobile = useIsMobile()
const emits = defineEmits(['logoClick'])
const showModal = ref(false)

const donationAddresses = {
  'ETH': '0x864a0Baeb1cA7A45ADbF48700a4C96a8B8F03aB2',
  'BTC': '1NLZU3UfYbC4hT4ayJc9n78e679khxFybJ',
  'MOON': '0xa592a9e581c32537f533c8028e168a088c3205f2',
  'ALGO': 'YWQFRGNS2VEYX7G4A7YNBEDRGVE5FMLMFXPEEPPOPIQBYXNZN4FHDNZAFM',
  'NANO': 'nano_1gzki1hxxfyh7u8gfpbun5i4ga7gperdxuwmqjz498dwkpm6hbxyj69d9xoz',
}

const lookBackBlocks = ref(store.getters['settings/getBlockSpan'])

</script>

<template>
  <n-layout-header bordered>
    <n-page-header :style="isMobile ? 'padding: 0.5em 1em 0.5em 1em;': 'padding: 1em 3em 1em 3em; max-width: 125vh; margin: 0 auto;'">
      <template #title>
        <a href="/" style="text-decoration: none; color: inherit">
          <b>RedditCoins</b> <n-text depth="3"><br>coin mentions on r/cc</n-text>
        </a>
      </template>
      <template #header>
      </template>
      <template #avatar>
        <n-element>
          <n-avatar :size="68" class="logo" @click="$emit('logoClick')">
            <n-text style="font-size: 32px;">
              🐿️
            </n-text>
          </n-avatar>
        </n-element>
      </template>
      <template #extra>
        <n-space>

          <n-button tertiary type="info" size="large" @click="showModal = !showModal">
            <template #icon>
              <n-icon :color="themeVars.errorColor" class="pulsing">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M12.82 5.58l-.82.822l-.824-.824a5.375 5.375 0 1 0-7.601 7.602l7.895 7.895a.75.75 0 0 0 1.06 0l7.902-7.897a5.376 5.376 0 0 0-.001-7.599a5.38 5.38 0 0 0-7.611 0z" fill="currentColor"></path></g></svg>
              </n-icon>
            </template>
            <template #default>
              <n-text type="info">Donate</n-text>
            </template>
          </n-button>

          <n-button tertiary type="info" size="large">
            <template #icon>
              <n-icon :color="themeVars.infoColor">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path><path d="M3 6v13"></path><path d="M12 6v13"></path><path d="M21 6v13"></path></g></svg>
              </n-icon>
            </template>
            <template #default>
              <n-text type="info">API Docs</n-text>
            </template>
          </n-button>

          <n-button tertiary type="info" size="large" @click="store.dispatch('theme/changeTheme')">
            <template #icon>
              <n-icon :color="themeVars.infoColor">
                <div v-if="store.getters['theme/themeIsLight']">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M3 12h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"></path></g></svg>
                </div>
                <div v-else>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
              </n-icon>
            </template>
          </n-button>

        </n-space>
      </template>
      <template #footer>
      </template>

      <n-modal v-model:show="showModal">
        <n-card
          style="width: 50em"
          title="Donate"
          :bordered="true"
          size="huge"
        >
          <template #header-extra>
            💙
          </template>
          <div v-for="(value, key) in donationAddresses">
            <n-text type="info" strong style="font-weight: 900;">
              {{ key }}:
            </n-text>
            <n-text depth="2">
              {{ value }}
            </n-text>
          </div>
        </n-card>
      </n-modal>

    </n-page-header>
  </n-layout-header>
</template>

<style scoped>

.logo {
  will-change: filter;
  transition: filter .9s ease-out;
  transition: transform .6s ease-out;
  cursor: pointer;
}
.logo:hover {
  filter: drop-shadow(0em 0em 0.6em var(--info-color));
  transform: scale(1.1);
}

.pulsing:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  content: '';
  box-shadow: inset 0 0 0 10px;
  transition: transform 0.2s, opacity 0.2s;
  animation: pulsing 3s infinite;
}

@keyframes pulsing {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(2);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

</style>
