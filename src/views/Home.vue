<template>
  <div class="home container">
    <div class="firstRow">
      <div ref="classActivePerson"  class="classActivePerson">111</div>
      <div ref="bigScreenUsage" class="bigScreenUsage">222</div>
      <div ref="dayCollected" class="dayCollected">333</div>
    </div>
    <!-- <div class="firstRow">
      <div ref="classActivePerson" class="classActivePerson">111</div>
      <div ref="bigScreenUsage" class="bigScreenUsage">222</div>
      <div ref="dayCollected" class="dayCollected">333</div>
    </div>
    <div class="firstRow">
      <div ref="classActivePerson" class="classActivePerson">111</div>
      <div ref="bigScreenUsage" class="bigScreenUsage">222</div>
      <div ref="dayCollected" class="dayCollected">333</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      classActivePersonData: {},
    };
  },
  methods: {
    draw() {
      let myChart = this.$echarts.init(this.$refs.classActivePerson);
 
      myChart.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
  mounted() {
    this.draw();
  },
};
</script>
<style scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
.firstRow {
  margin: 10px 30px;
  width: 100%;
  height: 100px;
  display: flex;
  height: 250px;
}
.firstRow > div {
  background-color: #9aecdb;
  width: 30%;
  flex-shrink: 0;
  border-radius: 10px;
}
.firstRow div:nth-of-type(2) {
  margin: 0 10px;
}
</style>
