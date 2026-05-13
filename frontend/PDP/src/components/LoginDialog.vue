<script setup lang="ts">
import { ref, watch } from 'vue'
import { mockApi } from '@/api/mock'
import type { UserType } from '@/types/frontend'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  login: [user: UserType]
}>()

const isLoginMode = ref(true)
const loginForm = ref({
  username: '',
  password: '',
})
const loading = ref(false)

function switchMode() {
  isLoginMode.value = !isLoginMode.value
  loginForm.value = { username: '', password: '' }
}

async function handleSubmit() {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.warning('Please enter username and password')
    return
  }

  loading.value = true
  try {
    if (isLoginMode.value) {
      const result = await mockApi.login(loginForm.value)
      if (result.status) {
        ElMessage.success('Login successful')
        if (result.user) {
          emit('login', {
            userId: result.user.id,
            userName: result.user.username,
          })
        }
        if (result.token) {
          localStorage.setItem('currentToken', result.token)
        }
        emit('update:visible', false)
      } else {
        ElMessage.error(result.message)
      }
    } else {
      const result = await mockApi.register(loginForm.value)
      if (result.status) {
        ElMessage.success('Registration successful')
        if (result.user) {
          emit('login', {
            userId: result.user.id,
            userName: result.user.username,
          })
        }

        if (result.token) {
          localStorage.setItem('currentToken', result.token)
        }
        emit('update:visible', false)
      } else {
        ElMessage.error(result.message)
      }
    }
  } finally {
    loading.value = false
  }
}

watch(
  () => props.visible,
  (val) => {
    if (val) {
      isLoginMode.value = true
      loginForm.value = { username: '', password: '' }
    }
  },
)
</script>

<template>
  <el-dialog
    :model-value="visible"
    :title="isLoginMode ? 'Login' : 'Register'"
    width="400px"
    align-center
    @update:model-value="$emit('update:visible', $event)"
  >
    <el-form :model="loginForm" label-width="80px">
      <el-form-item label="Username">
        <el-input v-model="loginForm.username" placeholder="Enter username" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="Enter password"
          show-password
          @keyup.enter="handleSubmit"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="switchMode">
          {{ isLoginMode ? 'Register' : 'Login' }}
        </el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit"> Submit </el-button>
      </span>
    </template>
  </el-dialog>
</template>
