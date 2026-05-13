<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { ItemInfo, UserType } from '@/types/frontend'
import { addToCart, getGoodInfoById } from '@/pages/services'
import type { AddToCartRequestType } from '@/api/types'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  itemId: string | null
  user: UserType | null
}>()

const visible = defineModel<boolean>()

const itemInfo = ref<ItemInfo | null>(null)
const loading = ref(false)

const formData = ref<AddToCartRequestType>({
  userId: props.user?.userId ?? '',
  itemId: props.itemId ?? '',
  variant: {
    size: '',
    color: '',
    quantity: 1,
  },
})

const dialogLoading = computed(() => loading.value || !itemInfo.value)

const maxQuantity = computed(() => {
  if (!itemInfo.value || !formData.value.variant.size || !formData.value.variant.color) return 0
  const variant = itemInfo.value.variants.find(
    (v) => v.size === formData.value.variant.size && v.color === formData.value.variant.color,
  )
  return variant?.quantity ?? 0
})
const minQuantity = computed(() => {
  return maxQuantity.value > 1 ? 1 : 0
})
const hasStock = computed(() => maxQuantity.value > 0)

const totalPrice = computed(() => {
  if (!itemInfo.value) {
    return 0
  }
  return (itemInfo.value.price[formData.value.variant.size] ?? 0) * formData.value.variant.quantity
})

async function getItemInfo() {
  if (props.itemId) {
    loading.value = true
    try {
      itemInfo.value = await getGoodInfoById(props.itemId)
      if (itemInfo.value) {
        formData.value.itemId = props.itemId
        formData.value.variant.size = itemInfo.value.sizes[0] || ''
        formData.value.variant.color = itemInfo.value.colors[0] || ''
        formData.value.variant.quantity = 1
      }
    } finally {
      loading.value = false
    }
  }
}

async function handleSubmit() {
  loading.value = true
  formData.value.userId = props.user?.userId ?? ''
  if (formData.value.userId && formData.value.itemId) {
    const res = await addToCart(formData.value)
    loading.value = false
    if (res) {
      ElMessage({
        message: res,
        type: 'error',
        plain: true,
      })
    } else {
      ElMessage({
        message: 'Add successful!',
        type: 'success',
        plain: true,
      })
      handleClose()
    }
  }
}

function handleClose() {
  visible.value = false
  itemInfo.value = null
}

watch(visible, (value) => {
  if (value && props.itemId) {
    getItemInfo()
  }
})

watch(
  () => formData.value.variant.color,
  () => {
    if (maxQuantity.value > 1) {
      formData.value.variant.quantity = 1
    }
  },
)
</script>

<template>
  <el-dialog
    v-model="visible"
    title="Product Details"
    width="800"
    align-center
    :before-close="handleClose"
  >
    <div v-loading="dialogLoading" class="dialog-content">
      <template v-if="itemInfo">
        <div class="left-panel">
          <div class="image-container">
            <el-image :src="itemInfo.imgUrl" fit="contain" />
          </div>
          <div class="description">{{ itemInfo.description }}</div>
        </div>

        <div class="right-panel">
          <div class="product-name">{{ itemInfo.name }}</div>

          <el-form :model="formData" label-width="80px" class="product-form" label-position="left">
            <el-form-item label="Size">
              <el-radio-group v-model="formData.variant.size">
                <el-radio-button
                  v-for="size in itemInfo.sizes"
                  :key="size"
                  :label="size"
                  :value="size"
                >
                  {{ size }}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="Color">
              <el-radio-group v-model="formData.variant.color">
                <el-radio-button
                  v-for="color in itemInfo.colors"
                  :key="color"
                  :label="color"
                  :value="color"
                >
                  {{ color }}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="Quantity">
              <el-input-number
                v-model="formData.variant.quantity"
                :min="minQuantity"
                :max="maxQuantity"
                :disabled="!hasStock"
              />
              <span v-if="!hasStock" class="no-stock">Out of stock</span>
            </el-form-item>

            <el-form-item label="Price">
              <span class="price-display">${{ totalPrice }}</span>
            </el-form-item>
          </el-form>

          <div class="footer">
            <el-button
              type="primary"
              size="large"
              class="add-to-cart-btn"
              :disabled="!hasStock"
              @click="handleSubmit"
            >
              Add to Cart
            </el-button>
          </div>
        </div>
      </template>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dialog-content {
  display: flex;
  gap: 24px;
  min-height: 400px;
}

.left-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  .image-container {
    width: 100%;
    display: flex;
    justify-content: center;

    :deep(.el-image) {
      width: 300px;
      height: 300px;
    }
  }

  .description {
    text-align: center;
    color: #666;
    font-size: 14px;
  }
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;

  .product-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
    color: #333;
  }

  .product-form {
    flex: 1;
  }

  .price-display {
    font-size: 20px;
    font-weight: bold;
    color: #e72d48;
  }

  .no-stock {
    margin-left: 12px;
    color: #f56c6c;
    font-size: 14px;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;

    .add-to-cart-btn {
      min-width: 150px;
    }
  }
}
</style>
