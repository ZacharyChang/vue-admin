<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">Conditions</h1>
          <div class="block is-flex">
            <collapse>
              <div class="columns">
                <div class="column is-3">
                  <p class="control">
                    <label class="label">Date:</label>
                    <el-date-picker
                      v-model="dateRange"
                      type="daterange"
                      placeholder="Select Time Range..."
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
                        placeholder="Select Compare Time Range..."
                        style="width:80%">
                      </el-date-picker>
                    </p>
                  </div>
                </transition>
              </div>
              <collapse-item title="More.." selected>
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
                        </select>
                      </span>
                    </p>
                  </div>
                </div>
              </collapse-item>
            </collapse>
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
              <p v-if="isCompare" class="title">
                {{sum}}
                <i v-if="compareSum > sum" aria-hidden="true" class="greater fa fa-long-arrow-up"></i>
                <i v-if="compareSum < sum" aria-hidden="true" class="lesser fa fa-long-arrow-down"></i>
                <i v-if="compareSum == sum" aria-hidden="true" class="equal fa fa-exchange"></i>
                {{compareSum}}
              </p>
              <p v-else class="title">{{sum}}</p>
            </div>
            <div class="level-item has-text-centered">
              <p class="heading">Maximum</p>
              <p v-if="isCompare" class="title">
                {{max}}
                <i v-if="compareMax > max" aria-hidden="true" class="greater fa fa-long-arrow-up"></i>
                <i v-if="compareMax < max" aria-hidden="true" class="lesser fa fa-long-arrow-down"></i>
                <i v-if="compareMax == max" aria-hidden="true" class="equal fa fa-exchange"></i>
                {{compareMax}}
              </p>
              <p v-else class="title">{{max}}</p>
            </div>
            <div class="level-item has-text-centered">
              <p class="heading">Minimum</p>
              <p v-if="isCompare" class="title">
                {{min}}
                <i v-if="compareMin > min" aria-hidden="true" class="greater fa fa-long-arrow-up"></i>
                <i v-if="compareMin < min" aria-hidden="true" class="lesser fa fa-long-arrow-down"></i>
                <i v-if="compareMin == min" aria-hidden="true" class="equal fa fa-exchange"></i>
                {{compareMin}}
              </p>
              <p v-else class="title">{{min}}</p>
            </div>
            <div class="level-item has-text-centered">
              <p class="heading">Average</p>
              <p v-if="isCompare" class="title">
                {{avg}}
                <i v-if="compareAvg > avg" aria-hidden="true" class="greater fa fa-long-arrow-up"></i>
                <i v-if="compareAvg < avg" aria-hidden="true" class="lesser fa fa-long-arrow-down"></i>
                <i v-if="compareAvg == avg" aria-hidden="true" class="equal fa fa-exchange"></i>
                {{compareAvg}}
              </p>
              <p v-else class="title">{{avg}}</p>
            </div>
          </nav>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h4 class="title">User Register Percent</h4>
          <echart :options="pie"></echart>
        </article>
      </div>
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h4 class="title">User Register Count</h4>
          <echart :options="line"></echart>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Table</h4>
          <table class="table is-bordered">
            <thead>
            <tr>
              <th>Date</th>
              <th>Count</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in data">
              <td>{{item.name}}</td>
              <td>{{item.value}}</td>
            </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import VbSwitch from 'vue-bulma-switch'
import ECharts from 'vue2-echarts/src/ECharts/ECharts.vue'
import client from '../../elastic'
import notify from '../../components/notification'
import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'

export default {

  components: {
    VbSwitch,
    echart: ECharts,
    Collapse,
    CollapseItem
  },

  data () {
    return {
      isCompare: false,
      dateRange: null,
      compareDateRange: null,
      interval: 'day',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      pieLimit: 20,
      legendData: [],
      data: [],
      dataArray: [],
      compareDataArray: []
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
    timezone () {
      var offset = new Date().getTimezoneOffset() / 60
      var abs = Math.abs(offset)
      var str = '0' + abs + ':00'
      // the timezone is opposite to the offset
      if (offset > 0) {
        return '-' + str.slice(-5)
      }
      return '+' + str.slice(-5)
    },
    dateStart () {
      if (this.dateRange) {
        return this.dateRange[0]
      }
    },
    dateEnd () {
      if (this.dateRange) {
        var end = new Date(this.dateRange[1])
        end.setDate(end.getDate() + 1)
        return end
      }
    },
    compareDateStart () {
      if (this.compareDateRange) {
        return this.compareDateRange[0]
      }
    },
    compareDateEnd () {
      if (this.compareDateRange) {
        var end = new Date(this.compareDateRange[1])
        end.setDate(end.getDate() + 1)
        return end
      }
    },
    sum () {
      if (this.dataArray.length > 0) {
        return this.dataArray.reduce((a, b) => a + b, 0)
      }
      return 0
    },
    max () {
      if (this.dataArray.length > 0) {
        return Math.max.apply(null, this.dataArray)
      }
      return 0
    },
    min () {
      if (this.dataArray.length > 0) {
        return Math.min.apply(null, this.dataArray)
      }
      return 0
    },
    avg () {
      if (this.dataArray.length > 0) {
        return parseInt(this.sum / (this.dataArray.length))
      }
      return 0
    },
    compareSum () {
      if (this.compareDataArray.length > 0) {
        return this.compareDataArray.reduce((a, b) => a + b, 0)
      }
      return 0
    },
    compareMax () {
      if (this.compareDataArray.length > 0) {
        return Math.max.apply(null, this.compareDataArray)
      }
      return 0
    },
    compareMin () {
      if (this.compareDataArray.length > 0) {
        return Math.min.apply(null, this.compareDataArray)
      }
      return 0
    },
    compareAvg () {
      if (this.compareDataArray.length > 0) {
        return parseInt(this.compareSum / (this.compareDataArray.length))
      }
      return 0
    },
    pie () {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
          name: 'register',
          type: 'pie',
          radius: '60%',
          center: ['50%', '60%'],
          data: this.data.slice(0, this.pieLimit),
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
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.legendData
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [
          {
            name: 'Register',
            type: 'line',
            data: this.data
          }
        ]
      }
    }
  },

  watch: {
    interval: 'updateData',
    dateRange: function (newVal, oldVal) {
      console.log(newVal)
      this.updateData()
    },
    compareDateRange: function (newVal, oldVal) {
      console.log(this.compareDateRange)
      if (this.compareDateRange && this.compareDateRange[0]) {
        this.updateCompareData()
      }
    }
  },

  mounted: function () {
    this.updateData()
  },

  methods: {
    updateValue (val) {
      console.log(this.data)
      this.isCompare = val
      if (val === true) {
        this.compareDateRange = null
      }
    },
    updateData () {
      var that = this   // 保存Vue对象的指针，否则子函数中无法获取
      notify('info', 'Searching', 'Please wait for a few seconds...')
      client.search({
        index: 'tms-*',
        body: {
          size: 0,
          'query': {
            'range': {
              'logtime': {
                'gte': this.dateStart,
                'lt': this.dateEnd
              }
            }
          },
          aggs: {
            aggs_date: {
              date_histogram: {
                field: 'logtime',
                interval: this.interval,
                time_zone: this.timezone
                // offset: new Date().getTimezoneOffset()
              }
            }
          }
        }
      }).then(function (body) {
        notify('success', 'Success', 'Successfully received data from server!')
        var buckets = body.aggregations.aggs_date.buckets
        if (buckets.length === 0) {
          notify('warning', 'Warning', 'Received no data under the conditions you choose!')
        }
        console.log(buckets)
        that.legendData = []
        that.data = []
        that.dataArray = []
        for (var i in buckets) {
          var obj = {}
          var date = new Date(buckets[i].key).toLocaleDateString()
          var value = buckets[i].doc_count
          that.legendData.push(date)
          that.dataArray.push(value)
          obj['value'] = value
          obj['name'] = date
          that.data.push(obj)
        }
      }, function (error) {
        notify('danger', 'Fail', 'Can not receive data from server!')
        console.trace(error.message)
      })
    },
    updateCompareData () {
      var that = this   // 保存Vue对象的指针，否则子函数中无法获取
      client.search({
        index: 'tms-*',
        body: {
          size: 0,
          'query': {
            'range': {
              'logtime': {
                'gte': this.compareDateStart,
                'lt': this.compareDateEnd
              }
            }
          },
          aggs: {
            aggs_date: {
              date_histogram: {
                field: 'logtime',
                interval: this.interval,
                time_zone: this.timezone
              }
            }
          }
        }
      }).then(function (body) {
        notify('success', 'Success', 'Successfully got data from server!')
        var buckets = body.aggregations.aggs_date.buckets
        if (buckets.length === 0) {
          notify('warning', 'Warning', 'Received no data under the conditions you choose!')
        }
        console.log(buckets)
        that.compareDataArray = []
        for (var i in buckets) {
          that.compareDataArray.push(buckets[i].doc_count)
        }
      }, function (error) {
        notify('danger', 'Fail', 'Can not get data from server!')
        console.trace(error.message)
      })
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
.collapse-item {
  width: 100%
}
.greater {
  color: #23d160
}
.lesser {
  color: #ff3860
}
.equal {
  color: #3273dc
}
</style>
