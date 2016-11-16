<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">Conditions</h1>
          <div class="columns">
            <div class="column is-3">
              <p class="control">
                <label class="label">Date:</label>
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  placeholder="Select Time Range."
                  style="width:80%">
                </el-date-picker>
              </p>
            </div>
            <div class="column is-1">
              <p class="control">
                <label class="label">Compare</label>
                <vb-switch type="primary" size="medium" :checked="isCompare" @change="updateValue"></vb-switch>
              </p>
            </div>
            <transition name="slide-fade">
              <div class="column is-3" v-show="isCompare">
                <p class="control">
                  <label class="label">Compare Date:</label>
                  <el-date-picker
                    v-model="compareDateRange"
                    type="daterange"
                    placeholder="Select Compare Time Range."
                    style="width:80%">
                  </el-date-picker>
                </p>
              </div>
            </transition>
          </div>
          <div class="columns">
            <div class="column">
              <p class="control">
                <label class="label">Interval:</label>
                <a class="button" :class="{ 'is-primary': isMonthActive }" @click="interval='month'">
                  <span class="icon is-small">
                    <i class="fa fa-align-left"></i>
                  </span>
                  <span>Month</span>
                </a>
                <a class="button" :class="{ 'is-primary': isWeekActive }" @click="interval='week'">
                  <span class="icon is-small">
                    <i class="fa fa-align-center"></i>
                  </span>
                  <span>Week</span>
                </a>
                <a class="button" :class="{ 'is-primary': isDayActive }" @click="interval='day'">
                  <span class="icon is-small">
                    <i class="fa fa-align-right"></i>
                  </span>
                  <span>Day</span>
                </a>
              </p>
            </div>
            <div class="column">
              <p class="control">
                <label class="label">Manufacturer:</label>
                <span class="select">
                  <select>
                    <option>All</option>
                    <option>SDMC</option>
                  </select>
                </span>
              </p>
            </div>
            <div class="column">
              <p class="control">
                <label class="label">Model:</label>
                <span class="select">
                  <select>
                    <option>All</option>
                    <option>DV8429</option>
                  </select>
                </span>
              </p>
            </div>
            <div class="column">
              <p class="control">
                <label class="label">Version:</label>
                <span class="select">
                  <select>
                    <option>All</option>
                    <option>6.0.11</option>
                  </select>
                </span>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <nav class="level">
            <div class="level-item has-text-centered">
              <p class="heading">Total</p>
              <p class="title">3,456</p>
            </div>
            <div class="level-item has-text-centered">
              <p class="heading">Maximum</p>
              <p class="title">123</p>
            </div>
            <div class="level-item has-text-centered">
              <p class="heading">Minimum</p>
              <p class="title">456K</p>
            </div>
            <div class="level-item has-text-centered">
              <p class="heading">Average</p>
              <p class="title">789</p>
            </div>
          </nav>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h4 class="title">User Register Percent</h4>
          <!--<chart :type="'pie'" :data="waveData" :options="options"></chart>-->
          <echart :options="pie"></echart>
        </article>
      </div>
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h4 class="title">User Register Count</h4>
          <!--<chart :type="'line'" :data="waveData" :options="options"></chart>-->
          <echart :options="line"></echart>
        </article>
      </div>
      <div id="main" style="width: 600px;height:400px;"></div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Table</h4>
          <table class="table is-boardered">
            <thead>
            <tr>
              <th>Name</th>
              <th>Instrument</th>
              <th></th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Misty Abbott</td>
              <td>Bass Guitar</td>
              <td class="is-icon">
                <a href="#">
                  <i class="fa fa-twitter"></i>
                </a>
              </td>
              <td class="is-icon">
                <a href="#">
                  <i class="fa fa-instagram"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>John Smith</td>
              <td>Rhythm Guitar</td>
              <td class="is-icon">
                <a href="#">
                  <i class="fa fa-twitter"></i>
                </a>
              </td>
              <td class="is-icon">
                <a href="#">
                  <i class="fa fa-instagram"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>Robert Mikels</td>
              <td>Lead Guitar</td>
              <td class="is-icon">
                <a href="#">
                  <i class="fa fa-twitter"></i>
                </a>
              </td>
              <td class="is-icon">
                <a href="#">
                  <i class="fa fa-instagram"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>Karyn Holmberg</td>
              <td>Drums</td>
              <td class="is-icon">
                <a href="#">
                  <i class="fa fa-twitter"></i>
                </a>
              </td>
              <td class="is-icon">
                <a href="#">
                  <i class="fa fa-instagram"></i>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker'
import Chart from 'vue-bulma-chartjs'
import VbSwitch from 'vue-bulma-switch'
import ECharts from 'vue2-echarts/src/ECharts/ECharts.vue'

export default {

  components: {
    Datepicker,
    Chart,
    VbSwitch,
    echart: ECharts
  },

  data () {
    let data = []

    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI
      let r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }
    return {
      isCompare: false,
      dateRange: null,
      compareDateRange: null,
      interval: 'week',
      options: {
        segmentShowStroke: false
      },
      labels_2: ['April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'],
      data_2: [1, 9, 3, 4, 5, 6, 7, 8, 2].map(e => Math.sin(e) * 25 + 25),
      backgroundColor: [
        '#1fc8db',
        '#fce473',
        '#42afe3',
        '#ed6c63',
        '#97cd76'
      ],
      lineData: [
        '2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00', '2009/6/12 7:00', '2009/6/12 8:00', '2009/6/12 9:00', '2009/6/12 10:00', '2009/6/12 11:00', '2009/6/12 12:00', '2009/6/12 13:00', '2009/6/12 14:00', '2009/6/12 15:00', '2009/6/12 16:00', '2009/6/12 17:00', '2009/6/12 18:00', '2009/6/12 19:00', '2009/6/12 20:00', '2009/6/12 21:00', '2009/6/12 22:00', '2009/6/12 23:00',
        '2009/6/13 0:00', '2009/6/13 1:00', '2009/6/13 2:00', '2009/6/13 3:00', '2009/6/13 4:00', '2009/6/13 5:00', '2009/6/13 6:00', '2009/6/13 7:00', '2009/6/13 8:00', '2009/6/13 9:00', '2009/6/13 10:00', '2009/6/13 11:00', '2009/6/13 12:00', '2009/6/13 13:00', '2009/6/13 14:00', '2009/6/13 15:00', '2009/6/13 16:00', '2009/6/13 17:00', '2009/6/13 18:00', '2009/6/13 19:00', '2009/6/13 20:00', '2009/6/13 21:00', '2009/6/13 22:00', '2009/6/13 23:00',
        '2009/6/14 0:00', '2009/7/16 6:00', '2009/7/16 7:00', '2009/7/16 8:00', '2009/7/16 9:00', '2009/7/16 10:00', '2009/7/16 11:00', '2009/7/16 12:00', '2009/7/16 13:00', '2009/7/16 14:00', '2009/7/16 15:00', '2009/7/16 16:00', '2009/7/16 17:00', '2009/7/16 18:00', '2009/7/16 19:00', '2009/7/16 20:00', '2009/7/16 21:00', '2009/7/16 22:00', '2009/7/16 23:00',
        '2009/7/17 0:00', '2009/7/17 1:00', '2009/7/17 2:00', '2009/7/17 3:00', '2009/7/17 4:00', '2009/7/17 5:00', '2009/7/17 6:00', '2009/7/17 7:00', '2009/7/17 8:00', '2009/7/17 9:00', '2009/7/17 10:00', '2009/7/17 11:00', '2009/7/17 12:00', '2009/7/17 13:00', '2009/7/17 14:00', '2009/7/17 15:00', '2009/7/17 16:00', '2009/7/17 17:00', '2009/7/17 18:00', '2009/7/17 19:00', '2009/7/17 20:00', '2009/7/17 21:00', '2009/7/17 22:00', '2009/7/17 23:00',
        '2009/7/18 0:00', '2009/10/1 6:00', '2009/10/1 7:00', '2009/10/1 8:00', '2009/10/1 9:00', '2009/10/1 10:00', '2009/10/1 11:00', '2009/10/1 12:00', '2009/10/1 13:00', '2009/10/1 14:00', '2009/10/1 15:00', '2009/10/1 16:00', '2009/10/1 17:00', '2009/10/1 18:00', '2009/10/1 19:00', '2009/10/1 20:00', '2009/10/1 21:00', '2009/10/1 22:00', '2009/10/1 23:00', '2009/10/2 0:00', '2009/10/2 1:00', '2009/10/2 2:00', '2009/10/2 3:00', '2009/10/2 4:00'
      ]
    }
  },

  computed: {
    isMonthActive () {
      return this.interval === 'month'
    },
    isWeekActive () {
      return this.interval === 'week'
    },
    isDayActive () {
      return this.interval === 'day'
    },
    waveData () {
      return {
        labels: this.labels_2,
        datasets: [{
          label: 'My Radar',
          data: this.data_2,
          backgroundColor: this.backgroundColor
        }]
      }
    },
    pie () {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [{
          name: 'register',
          type: 'pie',
          radius: '60%',
          center: ['50%', '60%'],
          data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 154, name: '搜索引擎'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    },
    line () {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '邮件营销',
            type: 'bar',
            stack: '广告',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '广告',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'bar',
            stack: '广告',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '搜索引擎',
            type: 'bar',
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine: {
              lineStyle: {
                normal: {
                  type: 'dashed'
                }
              },
              data: [
                [{type: 'min'}, {type: 'max'}]
              ]
            }
          },
          {
            name: '百度',
            type: 'bar',
            barWidth: 5,
            stack: '搜索引擎',
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          },
          {
            name: '谷歌',
            type: 'bar',
            stack: '搜索引擎',
            data: [120, 132, 101, 134, 290, 230, 220]
          },
          {
            name: '必应',
            type: 'bar',
            stack: '搜索引擎',
            data: [60, 72, 71, 74, 190, 130, 110]
          },
          {
            name: '其他',
            type: 'bar',
            stack: '搜索引擎',
            data: [62, 82, 91, 84, 109, 110, 120]
          }
        ]
      }
    }
  },

  watch: {
    value (newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  },

  methods: {
    updateValue (val) {
      this.isCompare = val
      if (val === true) {
        this.compareDateRange = null
      }
    }
  }
}
</script>

<style scoped>
.js-plotly-plot {
  max-width: 100%;
}

.slide-fade-enter-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  padding-left: 10px;
  opacity: 0;
}

</style>
