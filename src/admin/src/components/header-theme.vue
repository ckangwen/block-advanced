<template>
  <span class="top-header-extra-block">
    <el-dropdown
      placement="bottom"
      size="small"
      @command="onChangeTheme">
        <i class="el-icon-set-up"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in themeList"
          :key="item.value"
          :style="{
            color: activeTheme === item.value ? '#177ddc' : undefined
          }"
          :command="item.value">
          {{ item.text }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </span>
</template>

<script>
import { themeList } from '@/config/settings'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      themeList
    }
  },
  computed: {
    ...mapState('theme', [
      'activeTheme'
    ])
  },
  methods: {
    ...mapActions('theme', [
      'updateTheme'
    ]),
    onChangeTheme (theme) {
      this.updateTheme(theme)
    }
  }
}
</script>
