<!--
 * @Author:zhuwenfang
 * @Description:
 * @Date: 2022-03-14 13:1:11
 * @LastEditTime: 2022-03-14 13:1:11
 * @LastEditors:zhuwenfang
 * @UpdateLogs:
 -->
<template>
    <CommonLayout noFooter :tools="tools">
        <template slot="title">
            <Tabs @on-click="clickTab" :value="tabIndex">
                <TabPane v-for="(label, i) of tabs" :key="`label-${i}`" :label="label"></TabPane>
            </Tabs>
        </template>
        <!-- 切换组件 -->
        <component ref="component" :is="component" :isAdminRole="isAdminRole" :isLoading.sync="isLoading" :searchText="searchText"></component>
    </CommonLayout>
</template>

<script>
import Storage from '@/utils/Storage';
import child1 from './child1';
import child2 from './child2';
import child3 from './child3';
import child4 from './child4';

export default {
    name: 'test13',
    data () {
        return {
            isAdminRole: false,
            searchText: '',
            isLoading: false,
            tabs: ['子页面1', '子页面2', '子页面3', '子页面4'],
            tabIndex: parseInt(Storage.get('test13TabIndex')) || 0,
            component: null
        };
    },
    created () {
        this.isAdminRole = Boolean(Storage.get('isAdminRole'));
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
                    event: this.refreshData
                },
                {
                    key: 'button',
                    icon: ' iconfont icon-xinzeng',
                    text: '创建',
                    event: this.createEvent,
                    hide: !this.isAdminRole
                }
            ];
        }
    },
    watch: {
        tabIndex: {
            handler (now) {
                switch (now) {
                    case 0:
                        this.component = child1;
                        break;
                    case 1:
                        this.component = child2;
                        break;
                    case 2:
                        this.component = child3;
                        break;
                    case 3:
                        this.component = child4;
                        break;
                    default:
                        this.component = null;
                }
            },
            immediate: true
        }
    },
    methods: {
        clickTab (index) {
            this.tabIndex = index;
            Storage.set('test13TabIndex', index);
            this.searchText = '';
        },
        changeSearchTxt (value) {
            this.searchText = value;
        },
        /**
         * 调用子组件的刷新事件
         */
        refreshData () {
            if (typeof this.$refs.component.refreshData === 'function') {
                this.$refs.component.refreshData(true);
            }
        },
        /**
         * 调用子组件的刷新事件
         */
        createEvent () {
            if (typeof this.$refs.component.createEvent === 'function') {
                this.$refs.component.createEvent();
            }
        }
    }
};
</script>
<style lang="less" scoped>
/* 调整tab样式 */
/deep/ .layout-title {
    padding-left: 0 !important;
    .ivu-tabs-bar {
        border-bottom: 0;
        margin-bottom: 1px;
    }
}
</style>
