<template>
    <div id='app'>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">云觅</div>
                <div>
                    <!-- <el-button icon="el-icon-bell" type="text" style="margin-right: 8px;color: #000000;" size="normal" @click="goChat"></el-button> -->
                    <el-dropdown class="userInfo" @command="commandHandler">
                        <span class="el-dropdown-link">
                            {{user.name}}<i><img :src="require('@/assets/logo.jpg')" alt=""></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
                <el-aside width="250px">
                    <el-menu router unique-opened>
                        <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
                            <template slot="title">
                                <i style="margin-right: 5px" :class="item.iconCls"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">
                                {{child.name}}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
                            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
                            欢迎来到云觅APP后台管理系统！
                        </div>
                        <router-view class="homeRouterView"/>
                    </el-main>
                    <el-footer></el-footer>
                </el-container>
            </el-container>            
        </el-container>
    </div>
</template>

<script>
    import '../../theme/index.css'
    export default {
        name: "Home",
        data() {
            return {
                // user: JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        computed: {
            routes() {
                return this.$store.state.routes;
            },
            user() {
                return this.$store.state.currentHr;
            }
        },
        methods: {
            goChat() {
                this.$router.push("/chat");
            },
            commandHandler(cmd) {
                if (cmd == 'logout') {
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout");
                        window.sessionStorage.removeItem("user")
                        this.$store.commit('initRoutes', []);
                        this.$router.replace("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }else if (cmd == 'userinfo') {
                    this.$router.push('/hrinfo');
                }
            }
        }
    }
</script>

<style>  
    html,body,#app,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
         /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
    }
    .el-header, .el-footer {
        background-color: #303133;
        text-align: center;
        line-height: 60px;
    }
    .el-aside {
        background-color: #393D49;
        text-align: center;
        line-height: 200px;
        display: block;
        position: relative;
    }    
    .el-aside .el-submenu {
        background-color: #393D49;
    }
    .el-menu-item {
        background: #23262E;
    }
    .el-menu-item.is-active {
        color: #00c1c4;
    }
    .el-submenu span{
        color: #ffffff;
    }
        
    .el-submenu li{
        color: #ffffff;
    }
    .el-main{
        height: 500px;
    }
    .el-footer{
        background-color: #E9EEF3;
        text-align: center;
        line-height: 60px;
    }
    .homeRouterView {
        margin-top: 10px;
        
    }

    .homeWelcome {
        text-align: center;
        font-size: 30px;
        font-family: 华文行楷;
        padding-top: 50px;
    }

    .homeHeader {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .homeHeader .title {
        font-size: 30px;
        font-family: 华文行楷;
        color: #ffffff
    }

    .homeHeader .userInfo {
        cursor: pointer;
    }

    .el-dropdown-link img {    
        margin-top: 20px;
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }

    .el-dropdown-link {
        display: flex;
        align-items: center;
    }
</style>