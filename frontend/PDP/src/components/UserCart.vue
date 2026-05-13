<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import type { CartInfo, UserType } from '@/types/frontend'
import { getCartInfoById } from '@/pages/services'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  currentUser: UserType | null
}>()

const loading = ref(true)
const lists = ref<CartInfo[]>([])

function getTotalPrice(
  variant: {
    size: string
    color: string
    quantity: number
  },
  price: Record<string, number>,
) {
  return (price[variant.size] || 0) * variant.quantity
}

onMounted(async () => {
  loading.value = true
  if (props.currentUser) {
    lists.value = await getCartInfoById(props.currentUser.userId)
  } else {
    ElMessage({
      message: 'Please Login.',
      type: 'warning',
    })
  }

  loading.value = false
})

watch(
  () => props.currentUser,
  async () => {
    if (!props.currentUser) {
      lists.value = []
    } else {
      loading.value = true
      lists.value = await getCartInfoById(props.currentUser.userId)
      loading.value = false
    }
  },
)
</script>

<template>
  <el-space style="width: 100%" fill>
    <el-skeleton
      style="display: flex; gap: 8px"
      :loading="loading"
      animated
      :count="3"
      :throttle="{ initVal: true, leading: 500, trailing: 500 }"
    >
      <template #template>
        <div style="flex: 1">
          <el-skeleton-item variant="image" style="height: 240px" />
          <div style="padding: 14px">
            <el-skeleton-item variant="h3" style="width: 50%" />
            <div
              style="
                display: flex;
                align-items: center;
                justify-items: space-between;
                margin-top: 16px;
                height: 16px;
              "
            >
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="width: 30%" />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <div class="products-container">
          <el-card
            v-for="item in lists"
            :key="item.id"
            :body-style="{ padding: '0px', marginBottom: '1px', backgroundColor: '#f1dddf' }"
            class="product-item"
          >
            <img class="img" v-lazy="item.imgUrl" style="max-width: 100%" />
            <div class="good-info-container" style="padding: 14px">
              <div class="info-row">
                <span class="label">Name:</span>
                <span>{{ item.name }}</span>
              </div>
              <div class="info-row">
                <span class="label">Color:</span>
                <span>{{ item.variants.color }}</span>
              </div>
              <div class="info-row">
                <span class="label">Size:</span>
                <span>{{ item.variants.size }}</span>
              </div>
              <div class="info-row">
                <span class="label">Quantity:</span>
                <span>{{ item.variants.quantity }}</span>
              </div>
              <div class="info-row">
                <span class="label">Price:</span>
                <span>${{ getTotalPrice(item.variants, item.price) }}</span>
              </div>
              <el-button class="add-to-cart-btn" type="success" :disabled="true"
                >Removed (Currently Unavailable)</el-button
              >
            </div>
          </el-card>
        </div>
      </template>
    </el-skeleton>
  </el-space>
</template>

<style lang="scss" scoped>
.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.product-item {
  width: 200px;
}

.good-info-container {
  display: flex;
  gap: 4px;
  flex-direction: column;

  .info-row {
    display: flex;
    justify-content: space-between;

    .label {
      font-weight: 500;
      color: #666;
    }
  }

  .add-to-cart-btn {
    margin-top: 10px;

    :deep(span) {
      white-space: normal;
      word-wrap: break-word;
      word-break: break-word;
    }
  }
}
</style>
