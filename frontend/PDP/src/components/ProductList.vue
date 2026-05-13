<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { ListItem, UserType } from '@/types/frontend'
import { getGoodList } from '@/pages/services'
import AddCartDialog from './AddCartDialog.vue'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  currentUser: UserType | null
}>()

const loading = ref(true)
const lists = ref<ListItem[]>([])

const addCartDialogVisibile = ref(false)
const selectedItem = ref<string | null>(null)
function openAddCartDialog(itemId: string) {
  selectedItem.value = itemId
  if (props.currentUser?.userId) {
    addCartDialogVisibile.value = true
  } else {
    ElMessage({
      message: 'Please login before adding item into your cart.',
      type: 'warning',
    })
  }
}

onMounted(async () => {
  loading.value = true
  lists.value = await getGoodList()
  loading.value = false
})
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
              <span>{{ item.name }}</span>
              <span>{{ `$${item.minPrice} ~ $${item.maxPrice}` }}</span>
              <el-button
                class="add-to-cart-btn"
                :type="item.status ? 'success' : 'info'"
                :disabled="!item.status"
                @click="openAddCartDialog(item.id)"
                >{{ item.status ? 'Add to Cart' : 'Sold Out' }}</el-button
              >
            </div>
          </el-card>
        </div>
      </template>
    </el-skeleton>
  </el-space>
  <AddCartDialog
    v-model="addCartDialogVisibile"
    :item-id="selectedItem"
    :user="currentUser"
  ></AddCartDialog>
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

  .add-to-cart-btn {
    margin-top: 10px;
  }
}
</style>
