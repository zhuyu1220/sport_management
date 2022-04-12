<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="序号" width="50px"> </el-table-column>
      <el-table-column prop="deviceName" label="多功能健康柱I型" width="300px">
      </el-table-column>
      <el-table-column prop="status" label="正常" width="300px">
      </el-table-column>
    </el-table>
    <div class="chart">
      <div ref="secChart" class="item"></div>
      <div ref="firstChart" class="item"></div>
      <div class="item">
        <p>个人活跃排行</p>
         <el-table height="200px" :data="rankOfAcitve" border style="width: 100%">
           <el-table-column prop="id" label="排名" width="100%"> </el-table-column>
          <el-table-column prop="name" label="姓名">
        </el-table-column>
         <el-table-column prop="score" label="成绩" >
         </el-table-column>
          </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "01",
          deviceName: "多功能健康柱I型",
          status: "正常",
        },
        {
          id: "02",
          deviceName: "多功能气象站",
          status: "正常",
        },
      ],
      chartData: [
        {
          id: 1,
          name: "大屏使用人次",
          data: [
            { id: "001", key: "2/20", value: "50" },
            { id: "001", key: "2/21", value: "50" },
            { id: "001", key: "2/22", value: "50" },
            { id: "001", key: "2/23", value: "60" },
            { id: "001", key: "2/24", value: "70" },
            { id: "001", key: "2/25", value: "80" },
          ],
        },
        {
          id: 2,
          name: "个人活跃日排行top50",
          data: [
            { id: "001", key: "一班", value: "50" },
            { id: "001", key: "二班", value: "50" },
            { id: "001", key: "三班", value: "50" },
            { id: "001", key: "四班", value: "50" },
          ],
        },
      ],
      rankOfAcitve: [
        { id: 1, name: "zhangsan", score: "1111" },
        { id: 1, name: "zhangsan", score: "1111" },
        { id: 1, name: "zhangsan", score: "1111" },
        { id: 1, name: "zhangsan", score: "1111" },
        { id: 1, name: "zhangsan", score: "1111" },
        { id: 1, name: "zhangsan", score: "1111" },
        { id: 1, name: "zhangsan", score: "1111" },
        { id: 1, name: "zhangsan", score: "1111" },
        { id: 1, name: "zhangsan", score: "1111" },
        { id: 1, name: "zhangsan", score: "1111" },

        { id: 1, name: "zhangsan", score: "1111" },
      ],
    };
  },
  methods: {
    // transformFontSize(fontsize) {
    //     // 获取屏幕宽度
    //   const width = window.screen.width
    //   const ratio = width / 1920
    //   // 取下整
    //   return parseInt(fontsize * ratio)
    // },
    drawAllCharts() {
      const Chart = this.$echarts.init(this.$refs.firstChart);
      let xAxisData = [];
      let yAxisData = [];
      this.chartData[0].data.forEach((item) => {
        xAxisData.push(item.key);
      });

      this.chartData[0].data.forEach((item) => {
        yAxisData.push(item.value);
      });

      let options = {
        title: {
          text: "大屏使用日人次(近七日)",
          textStyle: {
            fontsize: "22px",
            fontWeight: "normal",
          },
          top: 10,
        },
        tooltip: {},
        legend: {
          data: yAxisData,
        },
        xAxis: {
          data: xAxisData,
        },
        yAxis: {},
        series: [
          {
            type: "line",
            data: yAxisData,
          },
        ],
      };
      Chart.setOption(options);
      window.addEventListener("resize", () => {
        Chart.resize();
      });
    },
  },
  mounted() {
    this.drawAllCharts();
  },
  beforeDestroy() {
    window.removeEventListener("resize", () => {
      // this.myChart.resize();
    });
  },
};
</script>

<style scoped lang="scss">
.chart {
  display: flex;
  & .item {
    border-radius: 5px;
    background: white;
    margin: 20px 20px 20px 0;
    width: 500px;
    height: 500px;
    h3{
      font-weight: normal;
      font-size: 22Px;
    }
  }
  .rank {
  }
  .times {
  }
}
</style>
