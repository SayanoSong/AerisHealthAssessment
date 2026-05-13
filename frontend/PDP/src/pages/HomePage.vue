<script setup lang="ts">
import { ref, watch } from 'vue'
import type { UserType } from '@/types/frontend'
import ProductList from '@/components/ProductList.vue'
import UserCart from '@/components/UserCart.vue'
import AppHeader from '@/components/AppHeader.vue'

const currentUser = ref<UserType | null>(null)
const activeIndex = ref('1')

const handleSelect = (index: string) => {
  activeIndex.value = index
}

const handleLogin = (user: UserType | null) => {
  currentUser.value = user
}

watch(activeIndex, (newVal) => {
  console.log('activeIndex changed:', newVal)
})
</script>

<template>
  <div class="main-container">
    <AppHeader @select="handleSelect" @login="handleLogin"></AppHeader>
    <div class="body-container">
      <ProductList v-if="activeIndex === '1'" :current-user="currentUser"></ProductList>
      <UserCart v-if="activeIndex === '2'" :current-user="currentUser"></UserCart>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  height: 100dvh;
  background: #f5f7fa;
}
</style>
