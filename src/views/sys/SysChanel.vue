<template>
    <div>
        <el-form :model="officialInfo" :rules="rules" ref="officialForm">
            <el-row>
                <el-col>
                    <el-form-item prop="gender">
                        <el-radio-group v-model="officialInfo.gender">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="0">女</el-radio>
                            <el-radio label="2">全部</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="officialMsg">
                        <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="officialInfo.officialMsg"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='6' style='display: flex;justify-content: center;align-items: center;'>
                    <el-button type="primary" @click="doSubmit">提交</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "SysChanel",
        data() {
            return {
                officialInfo: {
                    gender: "2",
                    officialMsg: ''

                },
                rules: {
                    gender: [{required: true, message: '请选择性别', trigger: 'blur'}],
                    officialMsg: [{required: true, message: '请输入消息', trigger: 'blur'}]
                }
            }
        },
        mounted() {
            //页面加载时调用
            // this.initEmps();
        },
        methods: {
            doSubmit() {
                this.$refs['officialForm'].validate(valid => {
                    if (valid) {
                        this.postRequest("/official/pub", this.officialInfo).then(resp => {
                            if (resp) {
                                console.log(resp)
                                if(resp.code == 0){
                                    this.$message({
                                        type: 'info',
                                        message: '发送官方频道消息成功！'
                                    });

                                    this.$refs.officialForm.resetFields();
                                }
                            }
                        }).catch(() => {
                            this.$message({
                                type: 'error',
                                message: '发送官方频道消息失败！'
                            });
                        });
                    }
                });
            }
        }
    }
</script>

<style>
</style>