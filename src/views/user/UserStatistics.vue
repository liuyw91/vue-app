<template>
  <el-row class='test'>
    <el-form>
      <el-col>
        <div style="margin-top: 10px;display: flex;justify-content: center">
          <el-date-picker
            v-model="data.startDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择开始日期"
            >
          </el-date-picker>
          ~
          <el-date-picker
            v-model="data.endDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择结束日期"
            >
          </el-date-picker>
          <el-button icon="el-icon-search" type="primary" @click="doSearch">查询</el-button>
        </div>
      </el-col>
    </el-form>
    <el-col :span="10" style="margin: 30px;">
        <linegraph id = "linegraph" :data="optionLine" style="height:350px;"/>
    </el-col>
    <el-col :span="10" style="margin: 30px;">
        <linegraph id = "piegraph" :data="optionPie" style="height:350px;"/>
    </el-col>
  </el-row>
</template>
 
<!-- 引入组件库 -->
<script>
  import linegraph from '@/components/charts/Linegraph.vue'
  export default {
    data(){
        return{
          data:{
            startDate: '',
            endDate: ''
          },
          optionLine: {},
          optionPie: {}
        }
    },
    methods: {
      doSearch() {
        console.log(this.linedata)
        this.postRequest("/user/statistics", this.data).then(resp => {
            if (resp) {
                console.log(resp)
                if(resp.code == 0){
                  console.log(resp.data.line)

                  //渲染柱状图
                  let linegraph = document.getElementById('linegraph')
                  this.lineChart = this.$echarts.init(linegraph)
                  let optionLine = {
                    title : {
                        text: '注册用户',
                    },
                    legend: {
                        data:['人数']
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    calculable : true,
                    color:['#7EC0EE'],
                    xAxis : [
                        {
                            type : 'category',
                            data : ['全部用户','男性','女性','其他']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'人数',
                            type:'bar',
                            data: resp.data.line
                        }
                    ]
                  }
                  this.lineChart.setOption(optionLine);
                  
                  // 渲染饼图
                  
                  console.log(resp.data.pie)
                  let pieArray = []
                  pieArray.push(resp.data.pie)
                  let piegraph = document.getElementById('piegraph')
                  this.pieChart = this.$echarts.init(piegraph)
                  let optionPie = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient : 'vertical',
                        x : 'right',
                        data:['男性','女性','其他']
                    },
                    calculable : true,
                    color:['#87CEEB', '#CD96CD','#8470FF'],
                    series : [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius : '70%',
                            center: ['50%', '60%'],
                            data: resp.data.pie
                        }
                    ]
                  }
                  this.pieChart.setOption(optionPie);

                }
            }
        }).catch(() => {
            this.$message({
                type: 'error',
                message: '查询用户统计信息失败！'
            });
        });
      }
    },
    mounted(){
      this.doSearch();
    },
    components:{
        linegraph
    }
  }
</script>
 
<style>
  .test{
      float:left;
      width:100%;
  }
</style>