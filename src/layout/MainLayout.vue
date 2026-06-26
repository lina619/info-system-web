<template>
  <el-container style="height: 100vh">

    <!-- 左侧菜单 -->
    <el-aside width="200px">

      <el-menu @select="handleSelect" router>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/hikari">光回线</el-menu-item>
        <el-menu-item index="/apply">申请</el-menu-item>
        <el-menu-item index="/register">注册</el-menu-item>
        <el-menu-item index="/apitest">API测试</el-menu-item>
        <el-menu-item index="/user">用户管理</el-menu-item>
      </el-menu>

    </el-aside>

    <!-- 右侧 -->
    <el-container>

      <!-- 顶部 -->
      <el-header>
        后台管理系统
      </el-header>

      <!-- ⭐关键：页面显示出口 -->
      <el-main>
        <router-view />
      </el-main>

    </el-container>
  </el-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleSelect = (index) => {
  router.push(index)
}
</script>