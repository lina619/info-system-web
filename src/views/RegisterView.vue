<script setup>
import { ref } from 'vue'           
import axios from 'axios'          // 导入axios库
import { ElMessage } from 'element-plus'  // 导入Element Plus的消息组件
// 注册表单数据
const form = ref({
  username: '',
  password: '',
  role: ''
})

// 注册函数
const register = () => {

  // 发送注册请求
  axios.post('http://localhost:8080/users/register', form.value)
    .then(res => {

      ElMessage.success('注册成功')
    })
    .catch(err => {
      ElMessage.error('注册失败')
    })

}
</script>

<template>
    <h2>注册</h2>
    <div class="form-container">
        <el-form :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="form.role" placeholder="请选择角色">
                    <el-option label="用户" value="user"></el-option>
                    <el-option label="管理员" value="admin"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register">注册</el-button>
            </el-form-item>
        </el-form>  
    </div>








</template>