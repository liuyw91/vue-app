<template>
    <div>
        <div>
            <div style="display: flex;justify-content: space-between">
                <div>
                    <el-date-picker v-model="data.startDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始日期"></el-date-picker>
                    ~
                    <el-date-picker v-model="data.endDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择结束日期" ></el-date-picker>
                    <el-button icon="el-icon-search" type="primary" @click="initData" :disabled="showAdvanceSearchView">查询</el-button>
                </div>
            </div>
        </div>
        <div class="hr-container">
            <el-row>
                <el-col :span="4" v-for="(item, index) in users">
                    <el-card shadow="hover" class="hr-card" @click.native="approveHeadImg(index, item)">
                        <div class='img-container'>
                            <img v-if="item.headImg" :src="'https://pic.yunmiapp.com/'+ item.headImg"  :alt="item.name" :title="item.name" class="image">
                            <img v-else :src="require('@/assets/logo.jpg')"  :alt="item.name" :title="item.name" class="image">
                        </div>
                        <div class="userinfo-container">
                            <div>
                                <span v-if="item.gender">性别:
                                    <span v-if="item.gender == 1">男</span>
                                    <span v-if="item.gender == 0">女</span>
                                </span>
                                <span v-else>性别:其他</span>
                            </div>
                            <div v-if="item.age">年 龄:{{item.age}}</div>
                            <div v-else>年 龄:未填写</div>
                            <div>手机号:{{item.phone}}</div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <div style="display: flex;justify-content: flex-end">
            <!-- 分页 start -->
            <el-pagination
                    background
                    @current-change="currentChange"
                    @size-change="sizeChange"
                    :current-page="data.current"
                    :page-sizes="[30, 60, 90, 120, 150, 300]"
                    layout="sizes, prev, pager, next, jumper, ->, total, slot"
                    :total="data.total">
            </el-pagination>
            <!-- 分页 end -->
            
            <!-- 弹框 start -->
            <el-dialog :visible.sync="dialogHeadImgVisible" :show-close='false'>
                <div style="text-align:center">
                     <el-row>
                        <el-col :span="2">
                            <i class='el-icon-arrow-left'></i>
                            <el-button type="text" :disabled="btnStatusPre == 0 ? true : false"  @click="findPre">上一张</el-button>
                        </el-col>
                        <el-col :span="20">
                                <el-image style="width: 100%; height: 100%" :src="url" :fit="fits"></el-image>
                                <div class="userinfo-container">
                                    <div>
                                        <span v-if="data.gender">性别:
                                            <span v-if="data.gender == 1">男</span>
                                            <span v-if="data.gender == 0">女</span>
                                        </span>
                                        <span v-else>性别:其他</span>
                                    </div>
                                    <div v-if="data.age">年 龄:{{data.age}}</div>
                                    <div v-else>年 龄:未填写</div>
                                    <div>手机号:{{data.phone}}</div>
                                </div>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="text" :disabled="btnStatusNext == 0 ? true : false" @click="findNext">下一张</el-button>
                            <i class='el-icon-arrow-right'></i>
                        </el-col>
                    </el-row>
                    <span style="margin-bottom:5px" slot="footer" class="dialog-footer">
                        <el-button round type="danger" @click="approval(-3)">永久封号</el-button>
                        <el-button round type="warning" @click="approval(-2)">封 号</el-button>
                        <el-button round type="success" @click="approval(1)">通 过</el-button>
                        <el-button round type="info" @click="approval(-1)">不通过</el-button>
                    </span>
                </div>
            </el-dialog>
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
                    startDate: null,
                    endDate: null,
                    size: 30,
                    page: 1,
                    total: 0,
                    current: 1,
                    userid: '',
                    currentIndex: '',
                    phone: '',
                    age: '',
                    gender: '',
                    operate: 0
                },
                users: [],
                loading: false,
                showAdvanceSearchView: false,
                dialogHeadImgVisible:false,
                fits: "'fill', 'contain', 'cover', 'none', 'scale-down'",
                url: '',
                btnStatusPre: 1,
                btnStatusNext: 1
            }
        },
        created(){
            this.initBtn()
        },
        mounted() {
            this.initData();
        },
        methods: {
            initBtn(){
                this.btnStatusPre = 1
                this.btnStatusPre = 1
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
                let url = '/user/listApprove';
                this.postRequest(url, this.data).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.users = resp.data;
                        this.data.total = resp.total;
                    }
                });
            },
            approveHeadImg(index, item){ 
                console.log(index + (this.data.current - 1) * this.data.size)
                console.log(this.data.startDate)
                console.log(this.data.endDate)
                console.log(item.headImg)
                this.dialogHeadImgVisible = true
                this.initBtn()
                if(item.headImg != null){
                    this.url = "https://pic.yunmiapp.com/" + item.headImg
                }else{
                    // 显示默认图片
                    this.url = require('@/assets/logo.jpg')
                }
                this.data.userid = item.id
                this.data.currentIndex = index + (this.data.current - 1) * this.data.size
                this.data.phone = item.phone
                this.data.age = item.age
                this.data.gender = item.gender
            },
            approval(operate){
                this.data.operate = operate
                console.log(operate)
                console.log(this.data.userid)
                let url = '/user/approval';
                this.postRequest(url, this.data).then(resp => {
                    if (resp) {
                        console.log(resp)
                        if(resp.code == 0){     // 操作成功
                            this.$message({
                                type: 'success',
                                message: '审核操作成功！'
                            });
                            this.initData()
                            // 自动显示下一张 
                            this.data.currentIndex = this.data.currentIndex - 1 
                            console.log("是否自动显示下一张")
                            this.findNext()
                        }else{
                            this.$message({
                                type: 'error',
                                message: '审核操作失败！'
                            });
                        }
                    }
                });

            },
            findPre(){
                console.log(this.data.currentIndex)
                console.log(this.data.startDate)
                console.log(this.data.endDate)
                if(this.data.currentIndex > 0){
                    this.data.currentIndex = this.data.currentIndex - 1
                    let url = '/user/getSomeUser';
                    this.postRequest(url, this.data).then(resp => {
                        if (resp) {
                            console.log(resp)
                            if(resp.headImg != null){
                                this.url = "https://pic.yunmiapp.com/" + resp.headImg
                            }else{
                                // 显示默认图片
                                this.url = require('@/assets/logo.jpg')
                            }
                            this.data.userid = resp.id
                            this.data.phone = resp.phone
                            this.data.age = resp.age
                            this.data.gender = resp.gender
                        }
                    });
                }else{
                    this.$message({
                        type: 'info',
                        message: '已是第一张图片！！'
                    });
                }

            },
            findNext(){
                console.log(this.data.total)
                console.log(this.data.currentIndex)
                console.log(this.data.startDate)
                console.log(this.data.endDate)
                this.data.currentIndex = this.data.currentIndex + 1
                if(this.data.currentIndex < this.data.total){
                    let url = '/user/getSomeUser';
                    this.postRequest(url, this.data).then(resp => {
                        if (resp) {
                            console.log(resp)
                            if(resp.headImg != null){
                                this.url = "https://pic.yunmiapp.com/" + resp.headImg
                            }else{
                                // 显示默认图片
                                this.url = require('@/assets/logo.jpg')
                            }
                            this.data.userid = resp.id
                            this.data.phone = resp.phone
                            this.data.age = resp.age
                            this.data.gender = resp.gender
                        }
                    });
                }else{
                    this.$message({
                        type: 'info',
                        message: '已是最后一张图片！！'
                    });
                }

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
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    img > div{
        padding: 1px
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .userinfo-container div {
        font-size: 12px;
    }

    .userinfo-container span {
        font-size: 12px;
    }

    .userinfo-container {
        margin-top: 20px;
    }

    .dialoginfo-container > div{
        font-size: 16px;
    }

    .hr-container {
        margin-top: 10px;
        display: contents;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .hr-card {
        width: 100%;
    }

    .img-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .image{
        width: 100px;
        height: 100px;
        border-radius: 50px;
    }
    .el-card__body{
        height: 150px;
        width: 180px;
    }
    .el-dialog{
        margin-top: 0px;
        width: 60%;
    }
    .el-row > div{
        padding: 5px
    }
</style>