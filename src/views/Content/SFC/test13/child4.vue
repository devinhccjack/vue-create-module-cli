<!--
 * @Author:zhuwenfang
 * @Description:
 * @Date: 2022-03-14 13:1:11
 * @LastEditTime: 2022-03-14 13:1:11
 * @LastEditors:zhuwenfang
 * @UpdateLogs:
 -->
<template>
    <div class="child-menage">
        <CommonTable ref="table" :loading="isLoading" :searchText="searchText" :columns="showColumns" :data="tableData">
        </CommonTable>
        <CommonDrawer v-model="showDrawer" :title="`${createType === 'create' ? '创建' : '修改'}子页面4`" :width="550"
            :submitLoading="submitLoading" @cancel="showDrawer = false" @submit="submitDrawer">
            <CommonForm ref="form" :labelWidth="110" :form="form" :data="formData"></CommonForm>
        </CommonDrawer>
    </div>
</template>

<script>
import { apiCover } from '@/api/index';
// import RegExpRule from '@/utils/RegExpRule';
import CommonTable from '@/components/Table/Table.vue';
import CommonDrawer from '@/components/Drawer.vue';
import CommonForm from '@/components/Form/Form.vue';
// eslint-disable-next-line no-unused-vars
import { Divider } from 'view-design';

export default {
    name: 'child4',
    components: {
        CommonTable,
        CommonDrawer,
        CommonForm
    },
    props: {
        isLoading: {
            type: Boolean,
            default: false
        },
        searchText: {
            type: String
        },
        isAdminRole: {
            type: Boolean
        }
    },
    data () {
        return {
            columns: [
                {
                    title: '名称',
                    key: 'name'
                }
            ],
            tableData: [],
            showDrawer: false,
            formData: {},
            submitLoading: false,
            createType: 'create'
        };
    },
    computed: {
        form () {
            return [
                {
                    type: 'input',
                    key: 'name',
                    label: '名称：',
                    validate: [
                        {required: true, message: '名称不能为空'}
                    ]
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
        this.initData();
    },
    methods: {
        async initData (flag) {
            this.$emit('update:isLoading', true);
            await this.getList(flag);
            this.$emit('update:isLoading', false);
        },
        getList (flag) {
            const tips = flag ? '子页面4获取' : '';
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
                tips: '子页面4创建'
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
                tips: '子页面4修改'
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
                content: '是否删除该子页面4？',
                closable: true,
                onOk: () => {
                    this.submitLoading = true;
                    apiCover({
                        url: '',
                        dynamicRouterParams: {
                            id: param.id
                        },
                        tips: '子页面4删除'
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
.child-menage {
    height: 100%;
}
/deep/ .drawer-body {
    padding-top: 50px;
    padding-right: 37px;
}
</style>
