<template>
  <el-dropdown size="small">
    <span class="user-info">
      <el-avatar size="small" :src="userInfo.avatar"></el-avatar>
      <span class="user-status">{{ userInfo.name || '未登录'}}</span>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="userLogout">
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('user', [
      'userInfo'
    ])
  },
  methods: {
    ...mapActions('user', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    userLogout () {
      this.logout({
        confirm: true
      })
    }
  }
}
</script>
<style>
.user-info {
  display: flex;
  align-items: center;
  height: 60px;
}
.user-info .user-status {
  margin-left: 10px;
}
</style>
