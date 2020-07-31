<template>
  <div class="tp-multiple-page-control-group">
    <div class="tp-multiple-page-control-content" flex-box="1">
      <div class="tp-multiple-page-control-content-inner">
        <click-menu-context
          :visible.sync="showClickMenu"
          :x="contentmenuX"
          :y="contentmenuY"
        >
          <click-menu
            :list="tabName === 'index' ? contextMenuListHome : contextMenuList"
            @rowClick="contextMenuClick">
          </click-menu>
        </click-menu-context>
        <el-tabs
          class="tp-multiple-page-control"
          :value="current"
          type="card"
          :closable="true"
          @tab-click="handleClickTab"
          @edit="closeCurrentTab"
          @contextmenu.native.prevent="handleContextmenu"
        >
          <el-tab-pane
            v-for="(item) in opened"
            :key="item.fullPath"
            :closable="item.name === 'index'"
            :label="item.meta.title || '未命名'"
            :name="item.name"
          />
        </el-tabs>
      </div>
    </div>
    <div class="tp-multiple-page-control-btn">
      <el-dropdown
        size="default"
        @command="handleControlItemClick">
        <el-button :style="{height: '40px', background: 'inherit'}" size="medium" icon="el-icon-circle-close"></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item) in contextMenuList" :key="item.value" :command="item.value">
            <span>{{ showTitle(item.title) }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { showTitle } from '@/utils/tools'
export default {
  name: 'NavTabs',
  components: {
    ClickMenuContext: () => import('./ClickMenuContext'),
    ClickMenu: () => import('./ClickMenu')
  },
  data () {
    return {
      contextMenuList: [
        { icon: 'arrow-left', title: '关闭左侧', value: 'left' },
        { icon: 'arrow-right', title: '关闭右侧', value: 'right' },
        { icon: 'close', title: '关闭其它', value: 'others' },
        { icon: 'circle-close', title: '关闭全部', value: 'all' }
      ],
      contextMenuListHome: [
        { icon: 'circle-close', title: '关闭全部', value: 'all' }
      ],
      showClickMenu: false,
      contentmenuX: 0,
      contentmenuY: 0,
      tabName: null
    }
  },
  computed: {
    ...mapState('page', [
      'opened',
      'current'
    ])
  },
  methods: {
    ...mapActions('page', [
      'close',
      'closeLeft',
      'closeRight',
      'closeOthers',
      'closeAll'
    ]),
    handleControlItemClick (command) {
      this.closeMethods(command)
    },
    contextMenuClick (value) {
      this.showClickMenu = false
      this.closeMethods(value, this.tabName)
    },
    handleContextmenu (e) {
      let target = e.target
      let flag = false
      if (target.classList.contains('el-tabs__item')) {
        flag = true
      } else if (target.parentNode.classList.contains('el-tabs__item')) {
        target = target.parentNode
        flag = true
      }
      if (flag) {
        this.contentmenuX = e.clientX
        this.contentmenuY = e.clientY
        this.tabName = target.getAttribute('aria-controls').slice(5)
        this.showClickMenu = true
      }
    },
    closeMethods (type, tabName) {
      switch (type) {
        case 'left':
          this.closeLeft(tabName)
          break
        case 'right':
          this.closeRight(tabName)
          break
        case 'others':
          this.closeOthers(tabName)
          break
        case 'all':
          this.closeAll()
          break
      }
    },
    handleClickTab (tab, e) {
      const page = this.opened.find(t => t.name === tab.name)
      if (page) {
        const { name, params, query } = page
        this.$router.push({
          name,
          params,
          query
        })
      }
    },
    closeCurrentTab (tabName, action) {
      if (action === 'remove') {
        this.close(tabName)
      }
    },
    showTitle (item) {
      return showTitle(item, this)
    }
  }
}
</script>
<style lang="scss">
.tp-multiple-page-control-group {
  display: flex;
  margin-top: -2px;

  .tp-multiple-page-control-content {
    flex: 1;
    position: relative;
    overflow: auto;
  }
  .tp-multiple-page-control-btn {
    flex: 0 0 auto;
    position: relative;
  }
}
.el-tabs__nav.is-top {
  border-left: 0;
}
// 隐藏第一个tab的删除按钮
.tp-multiple-page-control {
  .el-tabs__nav .el-tabs__item:first-child {
    &.is-closable:hover {
      // padding 20 是elTab正常情况下的数值
      padding-left: 20px;
      padding-right: 20px;
    }
    span {
      display: none;
    }
  }
  .el-tabs__nav-prev,
  .el-tabs__nav-next {
    padding: 0 6px;
  }
}
</style>
