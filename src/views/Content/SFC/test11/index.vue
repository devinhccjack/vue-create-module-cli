<!--
 * @Author:zhuwenfang
 * @Description:
 * @Date: 2022-03-14 12:58:12
 * @LastEditTime: 2022-03-14 12:58:12
 * @LastEditors:zhuwenfang
 * @UpdateLogs:
 -->
<template>
    <CommonLayout title="测试一" noFooter :tools="tools">
        <CommonTable ref="table" :loading="isLoading" :searchText="searchText" :columns="showColumns" :data="tableData">
        </CommonTable>
        <CommonDrawer v-model="showDrawer" :title="`${createType === 'create' ? '创建' : '修改'}测试一`" :width="450"
            :submitLoading="submitLoading" @cancel="showDrawer = false" @submit="submitDrawer">
            <CommonForm ref="form" :labelWidth="120" :form="form" :data="formData"></CommonForm>
        </CommonDrawer>
    </CommonLayout>
</template>

<script>
import { apiCover } from '@/api/index';
import Storage from '@/utils/Storage';
import CommonTable from '@/components/Table/Table.vue';
import CommonDrawer from '@/components/Drawer.vue';
import CommonForm from '@/components/Form/Form.vue';
// eslint-disable-next-line no-unused-vars
import { Divider } from 'view-design';

export default {
    name: 'test11',
    components: {
        CommonTable,
        CommonDrawer,
        CommonForm
    },
    data () {
        return {
            searchText: '',
            isLoading: false,
            submitLoading: false,
            showDrawer: false,
            createType: 'create',
            tableData: [],
            formData: {
                name: ''
            },
            columns: [
                {
                    title: 'name',
                    key: '名称'
                }
            ]
        };
    },
    computed: {
        tools () {
            return [
                {
                    key: 'input',
                    suffix: 'ios-search',
                    default: this.searchText,
                    event: this.changeSearchTxt
                },
                {
                    key: 'button',
                    className: 'refresh-btn',
                    icon: ' iconfont icon-shuaxin1',
                    text: '刷新',
                    loading: this.isLoading,
                    event: () => {
                        this.refreshData(true);
                    }
                },
                {
                    key: 'button',
                    icon: ' iconfont icon-xinzeng',
                    text: '创建',
                    event: this.createEvent,
                    hide: !this.isAdminRole
                }
            ];
        },
        form () {
            return [
                {
                    type: 'select',
                    key: 'name',
                    label: '测试1：',
                    options: '',
                    multiple: true,
                    hide: false,
                    onChange: (val) => {
                        console.log(val);
                    }
                }
            ];
        },
        showColumns () {
            const operation = {
                title: '操作',
                width: 160,
                render: (h, params) => {
                    let row = params.row;
                    return (
                        <div>
                            <span
                                class="operate-btn"
                                onClick={e => {
                                    e.stopPropagation();
                                    this.modifyEvent(row);
                                }}
                            >
                                修改
                                </span>
                            <Divider type="vertical" />
                            <span
                                class="operate-btn del-btn"
                                onClick={e => {
                                    e.stopPropagation();
                                    this.deleteAction(row);
                                }}
                            >
                                删除
                                </span>
                        </div>
                    );
                }
            };
            return this.isAdminRole ? [...this.columns, operation] : this.columns;
        }
    },
    // 组件加载刷新
    created () {
        this.isAdminRole = Storage.get('isAdminRole');
        this.initData();
    },
    methods: {
        changeSearchTxt (value) {
            this.searchText = value;
        },
        async initData (flag) {
            this.isLoading = true;
            await this.getList(flag);
            this.isLoading = false;
        },
        getList (flag) {
            const tips = flag ? '测试一获取' : '';
            return apiCover({
                url: '',
                tips
            })
                .then(res => {
                    if (res.type === 'success') {
                        this.tableData = res.data;
                    } else {
                        this.tableData = [];
                        throw res;
                    }
                })
                .catch(() => {
                    this.tableData = [];
                });
        },
        /**
        * 刷新数据，需将表格重置到第一页
        */
        refreshData (flag) {
            this.$refs.table.changePage(1);
            this.initData(flag);
        },
        createEvent () {
            this.showDrawer = true;
            this.formData = {
                name: ''
            };
            this.createType = 'create';
            this.$refs.form.resetFields();
        },
        modifyEvent (param) {
            this.showDrawer = true;
            this.createType = 'modify';
            this.formData = {
                id: param.id,
                name: param.name
            };
        },
        submitDrawer () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    let formData = this.formData;
                    let data = {
                        name: formData.name
                    };
                    if (this.createType === 'create') {
                        this.createAction(data);
                    } else {
                        data.id = formData.id;
                        this.editAction(data);
                    }
                }
            });
        },
        createAction (data) {
            this.submitLoading = true;
            apiCover({
                url: '',
                data,
                tips: '测试一创建'
            })
                .then(res => {
                    this.submitLoading = false;
                    if (res.type === 'success') {
                        this.showDrawer = false;
                        this.initData();
                    } else {
                        throw res;
                    }
                })
                .catch(() => {
                    this.submitLoading = false;
                });
        },
        editAction (data) {
            this.submitLoading = true;
            apiCover({
                url: '',
                data,
                dynamicRouterParams: {
                    id: data.id
                },
                tips: '测试一修改'
            })
                .then(res => {
                    this.submitLoading = false;
                    if (res.type === 'success') {
                        this.showDrawer = false;
                        this.initData();
                    } else {
                        throw res;
                    }
                })
                .catch(() => {
                    this.submitLoading = false;
                });
        },
        deleteAction (param) {
            this.$Modal.confirm({
                title: '删除提醒',
                content: '是否删除该测试一？',
                closable: true,
                onOk: () => {
                    this.submitLoading = true;
                    apiCover({
                        url: '',
                        dynamicRouterParams: {
                            id: param.id
                        },
                        tips: '测试一删除'
                    })
                        .then(res => {
                            this.submitLoading = false;
                            if (res.type === 'success') {
                                this.showDrawer = false;
                                this.refreshData();
                            } else {
                                throw res;
                            }
                        })
                        .catch(() => {
                            this.submitLoading = false;
                        });
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
/deep/ .drawer-body {
  padding-top: 50px;
  padding-right: 37px;
}
</style>
