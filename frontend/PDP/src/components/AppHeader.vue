<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { UserFilled, ArrowDown } from '@element-plus/icons-vue'
import { mockApi } from '@/api/mock'
import { ElMessage } from 'element-plus'
import type { UserType } from '@/types/frontend'
import LoginDialog from '@/components/LoginDialog.vue'

const emit = defineEmits<{
  select: [index: string]
  login: [user: UserType | null]
}>()

const currentUser = ref<UserType | null>(null)
const loginDialogVisible = ref(false)

onMounted(async () => {
  const currentToken = localStorage.getItem('currentToken')
  if (currentToken) {
    const res = await mockApi.getCurrentUser(currentToken)
    if (res.status === 0) {
      localStorage.removeItem('currentToken')
    } else if (res.status === 1 && res.data) {
      currentUser.value = {
        userId: res.data.userId,
        userName: res.data.name,
      }
      emit('login', JSON.parse(JSON.stringify(currentUser.value)))
    }
  }
})

const handleSelect = (index: string) => {
  emit('select', index)
}

function openLoginDialog() {
  loginDialogVisible.value = true
}

function handleLogin(user: UserType) {
  currentUser.value = user
  emit('login', user)
}

async function handleLogout() {
  if (currentUser.value) {
    await mockApi.logout(currentUser.value.userId)
  }
  localStorage.removeItem('currentToken')
  currentUser.value = null
  ElMessage({
    message: 'Logged out successfully',
    type: 'success',
  })
  emit('login', null)
}
</script>

<template>
  <div class="header-container">
    <div class="title">PDP</div>
    <div class="menu-container">
      <el-menu
        mode="horizontal"
        @select="handleSelect"
        background-color="#f1dddf"
        text-color="#E72D48"
        active-text-color="#E72D48"
      >
        <el-menu-item index="1">Products</el-menu-item>
        <el-menu-item index="2">My Cart</el-menu-item>
      </el-menu>
    </div>
    <div v-if="currentUser" class="user-info-container">
      <div class="icon">
        <el-avatar :size="30" :icon="UserFilled"></el-avatar>
      </div>
      <el-dropdown>
        <span class="username-dropdown">
          Welcome! {{ currentUser.userName }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div v-else class="login-container">
      <el-button type="primary" plain @click="openLoginDialog"> Login </el-button>
    </div>
  </div>
  <LoginDialog v-model:visible="loginDialogVisible" @login="handleLogin" />
</template>

<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
  height: 60px;
  background-color: #f1dddf;

  .title {
    display: flex;
    justify-content: center;
    width: 10%;
    font-size: large;
    cursor: pointer;
  }

  .menu-container {
    flex: 1;
  }

  .user-info-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: 10px;

    .username-dropdown {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .login-container {
    margin-right: 5px;
  }
}
</style>
