<template>
  <div class="admin-user-view">
    <Card dis-hover>

      <Row type="flex" justify="center" class="table-action-section">
        <Col span="22"><b>批发信息</b></col>
        <Col offset="1" span="1">
        </col>
      </Row>

      <Table border :data="tableData" :columns="tableColumns" stripe>
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page show-total :total="totalCount" :page-size="pageSize" @on-change="changePage"></Page>
        </div>
      </div>
    </Card>

 

    <Modal width="300" v-model="destroyModal">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>用户删除确认</span>
      </p>
      <div style="text-align:center; font-size:14px" >
        <p>用户：{{ destroyData ? destroyData.username : '-'}}</p>
        <p>将被删除且无法恢复，是否继续？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="destroy(true)">删除</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
export default {
  data() {
    return {
      allRoles: [],
      dataModel: {},
      rules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { type: 'string', min: 3, message: '姓名不能少于3位', trigger: 'blur' }
        ],
        password: [
          { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
        ]
      },
      editModal: false,
      destroyModal: false,
      destroyData: null,
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      tableColumns: [
        {
          title: 'ID',
          key: 'id',
          align: 'center'
        },
        {
          title: 'Name',
          key: 'names',
          align: 'center'
        },
        {
          title: 'Email',
          key: 'email',
          align: 'center',
        },
        {
          title: 'Telephone',
          key: 'telephone',
          align: 'center',
        },
        {
          title: 'Country',
          key: 'country',
          align: 'center',
        },
        {
          title: 'Message',
          key: 'messages',
          align: 'center',
        },
        {
          title: '创建时间',
          key: 'createdAt',
          align: 'center',
          render: (h, params) => moment(params.row.createdAt).format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: '操作',
          key: 'actions',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: (params.row.username && params.row.username === 'admin')
                },
                on: {
                  click: () => {
                    this.showDestroy(params.index);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ]
    };
  },
  created() {
    this.changePage(1);
    this.$http.get('admin/roles?limit=100').then((res) => {
      const data = res.data.data;
      this.allRoles = data.rows;
    });
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
      this.$http.get(`rest/wholesale?limit=10&offset=${((page || 1) - 1) * this.pageSize}`).then((res) => {
        const data = res.data.data;
        this.tableData = data.rows;
        this.totalCount = data.count;
      });
    },
    showDestroy(index) {
      this.destroyData = this.tableData[index];
      this.destroyModal = true;
    },
    destroy(result) {
      if (result && this.destroyData) {
        this.$http.delete(`rest/wholesale/${this.destroyData.id}`).then(() => {
          this.$Message.success('删除成功!');
          this.refresh();
        });
      }
      this.destroyModal = false;
    },
    refresh() {
      if (this.currentPage) {
        this.changePage(this.currentPage);
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-action-section {
  border-bottom: 1px solid #e9eaec;
  height: 25px;
  margin-bottom: 12px;
}
</style>
