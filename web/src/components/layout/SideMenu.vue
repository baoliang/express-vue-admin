<template>
  <Menu theme="dark" width="auto" :open-names="menuItemArr" :active-name="activeMenu" @on-select="routeTo">
    <Row justify="center" align="middle">
      <Col span="22" offset="1" class="layout-logo-left">express-vue-admin</Col>
    </Row>

    <Menu-item name="dashboard" v-if="permissions['dashboard']">
      <Icon type="monitor"></Icon>
      {{permissions['dashboard'].menuName}}
    </Menu-item>

    <Submenu name="admin" v-if="permissions['admin']">
      <template slot="title">
        <Icon type="settings"></Icon>
        {{permissions['admin'].menuName}}
      </template>
      <Menu-item name="adminuser" v-if="permissions['adminuser']">{{permissions['adminuser'].menuName}}</Menu-item>
      <Menu-item name="adminrole" v-if="permissions['adminrole']">{{permissions['adminrole'].menuName}}</Menu-item>
      <Menu-item name="adminpermission" v-if="permissions['adminpermission']">{{permissions['adminpermission'].menuName}}</Menu-item>
      <Menu-item name="adminwholesale" v-if="permissions['adminwholesale']">{{permissions['adminwholesale'].menuName}}</Menu-item>

    </Submenu>
  </Menu>
</template>

<script>
import EventBus from '@/event_bus';

export default {
  name: 'SideMenu',
  props: ['permissions'],
  data() {
    return {
      menuItemArr: [],
      activeMenu: ''
    };
  },
  computed: {
  },
  methods: {
    routeTo(route) {
      if (route) {
        const toRoute = `/${route.split(':').join('/')}`;
        this.$router.push(toRoute);
      }
    }
  },
  created() {
    const route = this.$router.currentRoute;
    const path = route.path.substr(1);
    this.menuItemArr = [path.split('/')[0]];
    this.activeMenu = path.split('/').join(':');

    // 路由改变更新menu
    EventBus.$on('route-change', (data) => {
      const toRoute = data.to;
      const toPath = toRoute.path.substr(1);
      this.menuItemArr = [toPath.split('/')[0]];
      this.activeMenu = toPath.split('/').join(':');
    });
  }
};
</script>

<style scoped>
.layout-logo-left {
  height: 30px;
  line-height: 30px;
  background: #ffffff;
  border-radius: 3px;
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 18px;
}
</style>
