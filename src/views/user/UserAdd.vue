<template>
    <div>
        <el-form :model="emp" :rules="rules" ref="empForm">
            <el-row>
                <el-col>
                    <el-form-item label="头像:" prop="headImg">
                        <el-upload
                            class="avatar-uploader"
                            action="/file/uploadPic"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"
                            >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-input v-if=false v-model="emp.headImg"></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="用户名:" prop="name">
                        <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit-outline" v-model="emp.name"
                                    placeholder="请输入用户名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="手机号:" prop="phone">
                        <el-input size="mini" style="width: 150px" prefix-icon="el-icon-phone" v-model="emp.phone"
                                    placeholder="请输入手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="性别:" prop="gender">
                        <el-radio-group v-model="emp.gender">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="生日:" prop="birthDay">
                        <el-date-picker
                                v-model="emp.birthDay" prefix-icon="el-icon-date" 
                                size="mini"
                                type="date"
                                value-format="yyyy-MM-dd"
                                style="width: 150px;"
                                placeholder="出生日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="行业:" prop="industry">
                        <el-select v-model="emp.industry" placeholder="请选择行业" size="mini" style="width: 150px;">
                            <el-option
                                    v-for="item in industrys"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="工作领域:" prop="workArea">
                        <el-select v-model="emp.workArea" placeholder="请选择工作领域" size="mini" style="width: 150px;">
                            <el-option
                                    v-for="item in workAreas"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="个性签名:" prop="sign">
                        <el-input size="mini" style="width: 500px" prefix-icon="el-icon-edit"
                                    v-model="emp.sign" placeholder="个性签名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="个人相册:" prop="photoWall">
                        <el-upload
                            ref='upload'
                            action="/file/uploadPic"
                            list-type="picture-card"
                            :limit='5'
                            :on-preview="handlePictureCardPreview"
                            :on-success="handleSuccess"
                            :on-remove="handleRemove"
                            :class="{hide:showUpload}"
                            accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"
                            >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                        <el-input v-if=false v-model="emp.photoWalls"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='6' style='display: flex;justify-content: center;align-items: center;'>
                    <el-button type="primary" @click="doAddEmp">提交</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "UserAdd",
        data() {
            return {
                title: '',
                imageUrl: '',
                showUpload: false,
                dialogImageUrl: '',
                dialogVisible: false,
                industrys: [{
                    id: '学生',
                    name: '学生'
                },{
                    id: '艺术',
                    name: '艺术'
                },{
                    id: '影视/娱乐',
                    name: '影视/娱乐'
                },{
                    id: '金融',
                    name: '金融'
                },{
                    id: '医药',
                    name: '医药'
                },{
                    id: '工业',
                    name: '工业'
                },{
                    id: 'IT/互联网',
                    name: 'IT/互联网'
                },{
                    id: '教育',
                    name: '教育'
                },{
                    id: '媒体',
                    name: '媒体'
                },{
                    id: '其他',
                    name: '其他'
                }],
                workAreas: [{
                    id: '创始人',
                    name: '创始人'
                },{
                    id: '投资人',
                    name: '投资人'
                },{
                    id: '职业经理人',
                    name: '职业经理人'
                },{
                    id: '高管',
                    name: '高管'
                },{
                    id: '咨询顾问',
                    name: '咨询顾问'
                },{
                    id: '市场',
                    name: '市场'
                },{
                    id: '产品',
                    name: '产品'
                },{
                    id: '销售',
                    name: '销售'
                },{
                    id: '商务',
                    name: '商务'
                },{
                    id: '人事',
                    name: '人事'
                },{
                    id: '行政',
                    name: '行政'
                },{
                    id: '工程师',
                    name: '工程师'
                },{
                    id: '设计',
                    name: '设计'
                }],
                emp: {
                    headImg: "",
                    name: "",
                    phone: "",
                    gender: "1",
                    birthDay: "",
                    industry: "",
                    workArea: "",
                    sign: "",
                    photoWalls:''
                },
                rules: {
                    headImg: [{required: true, message: '请上传头像', trigger: 'blur'}],
                    name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    phone: [{required: true, message: '请输入手机号', trigger: 'blur'}, {
                        pattern: /^1(3|4|5|6|7|8)\d{9}$/,
                        message: '手机号格式不正确',
                        trigger: 'blur'
                    }],
                    gender: [{required: true, message: '请选择性别', trigger: 'blur'}]
                }
            }
        },
        mounted() {
            //页面加载时调用
            // this.initEmps();
        },
        methods: {
            handleAvatarSuccess(res, file) {
                if(res.code == 0){ // 上传成功
                    this.imageUrl = URL.createObjectURL(file.raw);
                    console.log(this.imageUrl)
                    console.log(res)
                    console.log(file)
                    this.emp.headImg = res.data;
                }else{
                    this.$message.error('上传头像图片失败');
                }
            },
            beforeAvatarUpload(file) {
                const isLt10M = file.size / 1024 / 1024 < 10;
                if (!isLt10M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                }
                return isLt10M;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSuccess(response, file, fileList){
                if(response.code == 0){ // 上传成功
                    this.dialogImageUrl = URL.createObjectURL(file.raw);
                    console.log(this.dialogImageUrl)
                    if(fileList.length >= 5){
                        this.showUpload = true
                    }
                    console.log(fileList)
                    this.emp.photoWalls += file.response.data + ' '
                }else{
                    this.$message.error('上传个人相册失败');
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
                if(fileList.length < 5){
                    this.showUpload = false
                }
            },
            emptyEmp() {
                this.emp = {
                    gender: '1'
                }
                this.inputDepName = '';
            },
            doAddEmp() {
                if (this.emp.id) {
                    // 修改用户
                } else {
                    // 添加用户
                    this.$refs['empForm'].validate(valid => {
                        if (valid) {
                            this.postRequest("/user/add", this.emp).then(resp => {
                                if (resp) {
                                    console.log(resp)
                                    if(resp.code == 0){
                                        this.$message({
                                            type: 'info',
                                            message: '添加用户成功！'
                                        });

                                        this.$refs.empForm.resetFields();
                                        this.emp.photoWalls = ''
                                        this.imageUrl = ''
                                        this.$refs.upload.clearFiles();
                                    }
                                }
                            }).catch(() => {
                                this.$message({
                                    type: 'error',
                                    message: '添加用户失败！'
                                });
                            });
                        }
                    });
                }
            }
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
    }
    .avatar {
        width: 150px;
        height: 150px;
        display: block;
    }
    .hide .el-upload--picture-card {
        display: none;
    }
    .el-form-item__label{
        width:100px;
        text-align: center;
    }
</style>