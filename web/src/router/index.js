import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import AdminUser from '@/components/admin/User';
import Wholesale from '@/components/admin/Wholesale';
import AdminRole from '@/components/admin/Role';
import AdminPermission from '@/components/admin/Permission';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/dashboard',
      component: Dashboard
    },
    {
      path: '/adminuser',
      component: AdminUser
    },
    {
      path: '/adminrole',
      component: AdminRole
    },
    {
      path: '/adminpermission',
      component: AdminPermission
    },
    {
      path: '/adminwholesale',
      component: Wholesale,
    }
  ]
});
