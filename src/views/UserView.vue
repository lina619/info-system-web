<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'

// 用户数据
const tableData = ref([])

// 搜索关键词
const keyword = ref('')

// 控制新增/编辑弹窗
const dialogVisible = ref(false)

// 表单数据
const formRef = ref()

// 分页参数
const pageNum = ref(1)

// 每页条数
const pageSize = ref(10)

// 总条数
const total = ref(0)

// 用户表单
const form = ref({
  id: null,
  username: '',
  // createTime: '',
  password: ''
})

// 查询全部用户
const loadData = () => {

  axios.get(
    'http://localhost:8080/user/page',
    {
      params: {
        pageNum: pageNum.value,
        pageSize: pageSize.value
      }
    }
  ).then(res => {

    tableData.value = res.data.list
    total.value = res.data.total

  }).catch(err => {

    console.error(err)

  })

}

//根据用户名搜索
const searchUser = () => {

  axios.get(
    'http://localhost:8080/user/search',
    {
      params: {
        username: keyword.value
      }
    }
  ).then(res => {

    tableData.value = res.data

  })
}

//新增用户或更新用户
const saveUser = () => {
  // 表单验证
  formRef.value.validate((valid) => {

    // 验证失败
    if (!valid) {
      return
    }

    // 如果表单中有ID，说明是编辑用户，否则是新增用户
    if (form.value.id) {

      // 编辑用户
      axios.put(
        'http://localhost:8080/user/update',
        form.value
      ).then(() => {

        // 编辑成功
        ElMessage.success('编辑用户成功')
        dialogVisible.value = false

        // 刷新用户列表
        loadData()

      })

    } else {

      // 新增用户
      axios.post(
        'http://localhost:8080/user/add',
        form.value
      ).then(() => {

        // 新增成功
        ElMessage.success('新增用户成功')
        dialogVisible.value = false

        // 刷新用户列表
        loadData()

      }).catch(err => {

        ElMessage.error('用户名已存在')

        console.error(err)

      })

    }

  })

}

//编辑用户
const edit = (row) => {

  form.value = { ...row }

  dialogVisible.value = true

}

//新增用户
const addUser = () => {

  form.value = {
    id: null,
    username: '',
    // createTime: '',
    password: ''
  }

  dialogVisible.value = true

}

//删除用户
const deleteUser = (id) => {

  ElMessageBox.confirm('确定要删除该用户吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {

    axios.get(
      'http://localhost:8080/user/delete',
      {
        params: {
          id: id
        }
      }
    ).then(() => {

      console.log("删除成功")

      loadData()

    }).catch(() => {

      console.error("删除失败")
      console.error(err)

    })

  }).catch(() => {

    // 用户点击了取消，不执行任何操作
    ElMessage.info('已取消删除')

  })

}

//重置搜索
const reset = () => {

  keyword.value = ''

  loadData()

}

// 页码变化
const handleCurrentChange = (page) => {

  pageNum.value = page

  loadData()

}

//关闭弹窗
const closeDialog = () => {

  dialogVisible.value = false

  form.value = {
    id: null,
    username: '',
    // createTime: '',
    password: ''
  }
}

//表单验证
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

// 组件挂载后加载用户数据
onMounted(() => {

  // 加载用户数据
  loadData()

})

</script>

<template>

  <div>

    <h2 style="margin-bottom:20px">用户管理</h2>

    <div style="margin-bottom:20px">

      <el-input v-model="keyword" placeholder="请输入用户名" style="width:200px" />

      <el-button type="primary" style="margin-left:10px" @click="searchUser">

        搜索

      </el-button>

      <el-button type="primary" style="margin-left:10px" @click="reset">

        重置

      </el-button>

      <el-button type="success" style="margin-left:10px" @click="addUser">

        新增用户

      </el-button>
    </div>

    <el-table :data="tableData" border>

      <el-table-column prop="id" label="ID" />

      <el-table-column prop="username" label="用户名" />

      <el-table-column prop="createTime" label="创建时间" />

      <el-table-column prop="password" label="密码" />

      <el-table-column label="操作">

        <template #default="scope">

          <el-button size="small" type="primary" @click="edit(scope.row)">

            编辑

          </el-button>

          <el-button size="small" type="danger" @click="deleteUser(scope.row.id)">

            删除

          </el-button>

        </template>

      </el-table-column>

    </el-table>

    <!-- 在这里新增分页组件 -->
    <el-pagination style="margin-top: 20px" background layout="total, prev, pager, next" :total="total"
      :page-size="pageSize" :current-page="pageNum" @current-change="handleCurrentChange" />

    <el-dialog v-model="dialogVisible" :title="form.id ? '编辑用户' : '新增用户'">

      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">

        <el-form-item label="用户名" prop="username">

          <el-input v-model="form.username" placeholder="请输入用户名" />

        </el-form-item>

        <el-form-item label="密码" prop="password">

          <el-input v-model="form.password" placeholder="请输入密码" type="password" />

        </el-form-item>

      </el-form>

      <template #footer>

        <el-button @click="closeDialog">

          取消

        </el-button>

        <el-button type="primary" @click="saveUser">

          保存

        </el-button>

      </template>

    </el-dialog>
  </div>

</template>