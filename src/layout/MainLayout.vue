<script setup>
import { ref,onMounted } from 'vue'
import axios from 'axios'

const tableData = ref([])

const keyword = ref('')

const dialogVisible = ref(false)

const form = ref({
  id:null,
  username:''
})

const loadData = () => {

  axios.get(
    'http://localhost:8080/user/list'
  ).then(res=>{

    console.log("用户数据", res.data)
    tableData.value = res.data

  }).catch(err => {

    console.error(err)

  })

}

onMounted(()=>{

  loadData()

})
</script>

<template>
    <el-container style="height: 100vh">

        <!-- 左侧 -->
        <el-aside width="200px" style="background:#304156;color:#fff">
            <div style="padding:20px;font-weight:bold">
                后台管理系统
            </div>

            <el-menu background-color="#304156" text-color="#fff" active-text-color="#409EFF">
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">光回线</el-menu-item>
                <el-menu-item index="3">申请</el-menu-item>
                <el-menu-item index="4">注册</el-menu-item>
                <el-menu-item index="5">API测试</el-menu-item>
                <el-menu-item index="6">用户管理</el-menu-item>
            </el-menu>
        </el-aside>

        <!-- 右侧 -->
        <el-container>

            <!-- 顶部 -->
            <el-header style="background:#fff; border-bottom:1px solid #eee">
                用户管理
            </el-header>

            <!-- 内容 -->
<el-main>

  <div style="margin-bottom:20px">

    <el-input
      v-model="keyword"
      placeholder="请输入用户名"
      style="width:200px"/>

    <el-button
      type="primary"
      style="margin-left:10px">

      搜索

    </el-button>

        <el-button
      type="primary"
      style="margin-left:10px">

      重置

    </el-button>

    <el-button
      type="success"
      style="margin-left:10px"
      @click="dialogVisible=true">

      新增用户

    </el-button>

  </div>

  <el-table
    :data="tableData"
    border>

    <el-table-column
      prop="id"
      label="ID"/>

    <el-table-column
      prop="username"
      label="用户名"/>

    <el-table-column
      prop="createTime"
      label="创建时间"/>

    <el-table-column label="操作">

  <template #default="scope">

    <el-button
      size="small"
      type="primary">

      编辑

    </el-button>

    <el-button
      size="small"
      type="danger">

      删除

    </el-button>

  </template>

</el-table-column>

  </el-table>

</el-main>
<el-dialog
  v-model="dialogVisible"
  title="新增用户">

  <el-input
    v-model="form.username"
    placeholder="用户名"/>

  <template #footer>

    <el-button
      @click="dialogVisible=false">

      取消

    </el-button>

    <el-button
      type="primary">

      保存

    </el-button>

  </template>

</el-dialog>
        </el-container>

    </el-container>
</template>