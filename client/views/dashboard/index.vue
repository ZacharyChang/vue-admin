<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p>Total Users</p>
          <p class="title">12055</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p>Login Times</p>
          <p class="title">18235</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p>Register Times</p>
          <p class="title">1345</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p>System Upgrade</p>
          <p class="title">1345</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p>App Install</p>
          <p class="title">2698</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p>App Upgrade</p>
          <p class="title">1346</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p>App Uninstall</p>
          <p class="title">297</p>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-8">
        <article class="tile is-child box">
          <h4 class="title">User Online</h4>
          <echart :options="line" style="width:100%"></echart>
        </article>
      </div>
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <h4 class="title">System Status</h4>
          <div class="content">
            <echart :options="clock" style="width:100%"></echart>
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-vertical is-9">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">Seven</p>
              <p class="subtitle">Subtitle</p>
              <div class="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
              </div>
            </article>
          </div>
          <div class="tile is-8 is-parent">
            <article class="tile is-child box">
              <p class="title">Eight</p>
              <p class="subtitle">Subtitle</p>
              <div class="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
              </div>
            </article>
          </div>
        </div>
        <div class="tile">
          <div class="tile is-8 is-parent">
            <article class="tile is-child box">
              <p class="title">Nine</p>
              <p class="subtitle">Subtitle</p>
              <div class="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
              </div>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">Ten</p>
              <p class="subtitle">Subtitle</p>
              <div class="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="content">
            <p class="title">Eleven</p>
            <p class="subtitle">Subtitle</p>
            <div class="content">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.</p>
              <p>Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non semper leo.</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'
import ECharts from 'vue2-echarts/src/ECharts/ECharts.vue'
import VbSwitch from 'vue-bulma-switch'

export default {
  components: {
    Chart,
    echart: ECharts,
    VbSwitch
  },

  data () {
    return {
      data: [300, 50, 100],
      statusData: [],
      cpuData: 0,
      memoryData: 0,
      diskData: 34,
      onlineInterval: null,
      statusInterval: null
    }
  },

  computed: {
    onlineData () {
      return this.statusData.map(item => item.online).slice(-10, -1)
    },
    dateData () {
      return this.statusData.map(item => item.date).slice(-10, -1)
    },
    offlineData () {
      return this.statusData.map(item => item.offline).slice(-10, -1)
    },
    clock () {
      return {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [{
          name: 'CPU',
          type: 'gauge',
          center: ['50%', '25%'], // 默认全局居中
          radius: '40%',
          axisLine: {
            show: false,
            lineStyle: { // 属性lineStyle控制线条样式
              color: [
                [this.cpuData / 100, '#0193cf'],
                [1, 'rgba(1, 147, 207, 0.3)']
              ],
              width: 10
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          pointer: {
            show: false,
            length: '0',
            width: '0'
          },
          detail: {
            formatter: '{value}%',
            offsetCenter: [0, '5%']
          },
          data: [{
            name: 'CPU',
            value: this.cpuData,
            label: {
              textStyle: {
                fontSize: 12
              }
            }
          }]
        }, {
          name: 'Memory',
          type: 'gauge',
          center: ['25%', '75%'], // 默认全局居中
          radius: '40%',
          axisLine: {
            show: false,
            lineStyle: { // 属性lineStyle控制线条样式
              color: [
                [this.memoryData / 100, '#F37B1D'],
                [1, 'rgba(2, 0, 12, 0.3)']
              ],
              width: 10
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          pointer: {
            show: false,
            length: '0',
            width: '0'
          },
          detail: {
            formatter: '{value}%',
            offsetCenter: [0, '5%']
          },
          data: [{
            name: 'Memory',
            value: this.memoryData,
            label: {
              textStyle: {
                fontSize: 12
              }
            }
          }]
        }, {
          name: 'Disk',
          type: 'gauge',
          center: ['75%', '75%'], // 默认全局居中
          radius: '40%',
          axisLine: {
            show: false,
            lineStyle: { // 属性lineStyle控制线条样式
              color: [
                [this.diskData / 100, '#5eb95e'],
                [1, 'rgba(154, 171, 184, 0.3)']
              ],
              width: 10
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          pointer: {
            show: false,
            length: '0',
            width: '0'
          },
          detail: {
            formatter: '{value}%',
            offsetCenter: [0, '5%']
          },
          data: [{
            name: 'Disk',
            value: this.diskData,
            label: {
              textStyle: {
                fontSize: 12
              }
            }
          }]
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
          data: ['Online', 'Offline']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.dateData
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [
          {
            name: 'Online',
            type: 'line',
            data: this.onlineData,
            itemStyle: {
              normal: {
                color: '#1fc8db'
              }
            },
            lineStyle: {
              normal: {
                color: '#1fc8db'
              }
            }
          },
          {
            name: 'Offline',
            type: 'line',
            data: this.offlineData,
            itemStyle: {
              normal: {
                color: '#ff3860'
              }
            },
            lineStyle: {
              normal: {
                color: '#ff3860'
              }
            }
          }
        ]
      }
    }
  },
  mounted: function () {
    this.onlineInterval = setInterval(() => {
      this.$http.get('http://10.10.121.204:3000').then(data => {
        this.statusData.push(data.body)
        console.log(this.statusData)
      }, error => {
        console.trace(error)
      })
    }, 2000)
    this.statusInterval = setInterval(() => {
      this.cpuData = (Math.random() * 10 + 30).toFixed(2)
      this.memoryData = (Math.random() * 10 + 70).toFixed(2)
    }, 2000)
  },
  destroyed: function () {
    clearInterval(this.onlineInterval)
    clearInterval(this.statusInterval)
  },
  methods: {
    getData () {
      this.$http.get('http://localhost:3000').then(data => {
        this.statusData.push(data.body)
        console.log(this.statusData)
      }, error => {
        console.trace(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .block button:hover {
    background:red;
  }
</style>
