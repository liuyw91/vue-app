<template>
    <div>
        <div>
            <div style="display: flex;justify-content: space-between">
                <div>
                    <el-input placeholder="请输入手机号进行查询，可以直接回车查询..." prefix-icon="el-icon-search" clearable @clear="initData"
                              style="width: 350px;margin-right: 10px" v-model="data.phone" @keydown.enter.native="initData" :disabled="showAdvanceSearchView">
                    </el-input>
                    <el-date-picker v-model="data.startDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始日期"></el-date-picker>
                    ~
                    <el-date-picker v-model="data.endDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择结束日期" > </el-date-picker>
                    <el-button icon="el-icon-search" type="primary" @click="initData" :disabled="showAdvanceSearchView">查询</el-button>
                </div>
            </div>
        </div>
        <div class="hr-container">
            <div>
                <el-table :data="users" stripe border v-loading="loading" element-loading-text="正在加载..."
                        element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" style="width: 100%"> 
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column fixed type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
                    <el-table-column
                            prop="id"
                            fixed
                            align="left"
                            label="ID"
                            width="250">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            fixed
                            label="用户名"
                            align="left"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            fixed
                            label="手机号"
                            align="left"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="gender"
                            fixed
                            label="性别"
                            align="left"
                            width="50"
                            :formatter="formatterGender">
                    </el-table-column>
                    <el-table-column
                            prop="sign"
                            fixed
                            label="个性签名"
                            align="left"
                            width="250">
                    </el-table-column>
                    <el-table-column
                            prop="headImg"
                            fixed
                            width="130"
                            align="left"
                            label="头像">
                            <template slot-scope="scope">
                                <el-button
                                    @click="handleView(scope.row)"
                                    size="mini"
                                    class="btn"
                                    >点击查看头像
                                </el-button>
                            </template>
                    </el-table-column>
                    <el-table-column
                            prop="createDate"
                            fixed
                            width="150"
                            align="left"
                            label="注册时间">
                    </el-table-column>
                    <el-table-column
                            fixed
                            align="center"
                            label="操作">
                    </el-table-column>
                </el-table>
                <div style="display: flex;justify-content: flex-end">
                    <!-- 分页 start -->
                    <el-pagination
                            background
                            @current-change="currentChange"
                            @size-change="sizeChange"
                            :current-page="data.current"
                            layout="sizes, prev, pager, next, jumper, ->, total, slot"
                            :total="data.total">
                    </el-pagination>
                    <!-- 分页 end -->
                    <!-- 弹框 start -->
                    <el-dialog :visible.sync="dialogHeadImgVisible" width="60%" :show-close='false'>
                        <el-image style="width: 100%; height: 100%" :src="url" :fit="fits"></el-image>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserList",
        data() {
            return {
                data:{
                    phone: null,
                    startDate: null,
                    endDate: null,
                    size: 10,
                    page: 1,
                    total: 0,
                    current: 1
                },
                users: [],
                loading: false,
                showAdvanceSearchView: false,
                dialogHeadImgVisible:false,
                fits: "'fill', 'contain', 'cover', 'none', 'scale-down'",
                url: ''
            }
        },
        mounted() {
            this.initData();
        },
        methods: {
            handleView(row){
                this.dialogHeadImgVisible = true
                this.url="https://pic.yunmiapp.com/" + row.headImg
            },
            indexMethod(index) {
                return (index+1) +(this.data.current - 1) * this.data.size;
            },
            formatterGender(row, column){
                switch(row.gender){
                    case "0":
                    return '女';
                    case "1":
                    return '男';
                    break;
                    default:
                        return '-';
                }
            },
            sizeChange(currentSize) {
                this.data.size = currentSize;
                this.initData();
            },
            currentChange(currentPage) {
                this.data.page = currentPage;
                this.data.current = currentPage;
                this.initData();
            },
            initData() {
                this.loading = true;
                let url = '/user/list';
                this.postRequest(url, this.data).then(resp => {
                    this.loading = false;
                    if (resp.total > 0) {
                        this.users = resp.data;
                        this.data.total = resp.total;
                    }else{
                        this.$message({
                            type: 'info',
                            message: '未查询到符合要求的数据！！'
                        });
                    }
                });
            }
        }
    }
</script>

<style>
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .8s ease;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateX(10px);
        opacity: 0;
    }    
    .hr-container {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

</style>