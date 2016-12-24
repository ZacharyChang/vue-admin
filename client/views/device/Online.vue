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
                <div class="column is-4">
                  <p class="control">
                    <label class="label">Interval:</label>
                    <a class="button" :class="{ 'is-primary': this.interval === 'month' }" @click="interval='month'">
                        <span class="icon is-small">
                          <i class="fa fa-align-left"></i>
                        </span>
                      <span>Month</span>
                    </a>
                    <a class="button" :class="{ 'is-primary': this.interval === 'week' }" @click="interval='week'">
                        <span class="icon is-small">
                          <i class="fa fa-align-center"></i>
                        </span>
                      <span>Week</span>
                    </a>
                    <a class="button" :class="{ 'is-primary': this.interval === 'day' }" @click="interval='day'">
                        <span class="icon is-small">
                          <i class="fa fa-align-right"></i>
                        </span>
                      <span>Day</span>
                    </a>
                    <a class="button" :class="{ 'is-primary': this.interval === 'hour' }" @click="interval='hour'">
                        <span class="icon is-small">
                          <i class="fa fa-align-right"></i>
                        </span>
                      <span>Hour</span>
                    </a>
                  </p>
                </div>
                <div class="column">
                  <p class="control">
                    <label class="label">Manufacturer:</label>
                    <span class="select">
                        <select v-model="manufacturer">
                          <option value="_all">All</option>
                          <option v-for="(item, index) in manufacturerList">
                            {{item}}
                          </option>
                        </select>
                      </span>
                  </p>
                </div>
                <div class="column">
                  <p class="control">
                    <label class="label">Model:</label>
                    <span class="select">
                        <select v-model="model">
                          <option value="_all">All</option>
                          <option v-for="(item, index) in modelList">{{item}}</option>
                        </select>
                      </span>
                  </p>
                </div>
              </div>
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
              <p class="heading">Maximum</p>
              <p class="title">{{max}}</p>
            </div>
            <div class="level-item has-text-centered">
              <p class="heading">Minimum</p>
              <p class="title">{{min}}</p>
            </div>
            <div class="level-item has-text-centered">
              <p class="heading">Average</p>
              <p class="title">{{avg}}</p>
            </div>
          </nav>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
        <article class="tile is-child box">
          <h4 class="title">Device Online Number</h4>
          <echart :options="line" class="fullwidth"></echart>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Table
            <a class="button is-primary is-outlined" style="float:right" @click="getExcel">
              <span class="icon is-small">
                <i class="fa fa-file-excel-o"></i>
              </span>
            <span>Export Excel</span>
          </a></h4>
          <table class="table is-bordered">
            <thead>
            <tr>
              <th>Date</th>
              <th>Online</th>
              <th>Offline</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tableData">
                <td>{{item.name}}</td>
                <td>{{item.online}}</td>
                <td>{{item.offline}}</td>
              </tr>
            </tbody>
          </table>
          <div style="text-align:center">
            <el-pagination
              small
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="currentSize"
              :layout="paginationLayout"
              :total="data.length">
            </el-pagination>
          </div>
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
import * as util from '../../components/util'

export default {

  components: {
    VbSwitch,
    echart: ECharts,
    Collapse,
    CollapseItem
  },

  data () {
    return {
      dateRange: util.thisDayRange(),
      interval: 'hour',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      pieLimit: 20,
      data: [],
      compareData: [],
      manufacturerList: ['_all'],
      modelList: ['_all'],
      manufacturer: '_all',
      model: '_all',
      currentSize: 10,
      currentPage: 1
    }
  },

  computed: {
    legendData () {
      return this.data.map(item => item.name)
    },
    onlineData () {
      return this.data.map(item => item.online)
    },
    offlineData () {
      return this.data.map(item => item.offline)
    },
    tableData () {
      return this.data.slice(0).reverse().slice((this.currentPage - 1) * this.currentSize, this.currentPage * this.currentSize)
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
        end.setSeconds(end.getSeconds() - 1)
        return end
      }
    },
    sum () {
      if (this.onlineData.length > 0) {
        return this.onlineData.reduce((a, b) => a + b, 0)
      }
      return 0
    },
    max () {
      if (this.onlineData.length > 0) {
        return Math.max.apply(null, this.onlineData)
      }
      return 0
    },
    min () {
      if (this.onlineData.length > 0) {
        return Math.min.apply(null, this.onlineData)
      }
      return 0
    },
    avg () {
      if (this.onlineData.length > 0) {
        return parseInt(this.sum / (this.onlineData.length))
      }
      return 0
    },
    paginationLayout () {
      return util.paginationLayout()
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
          data: this.legendData
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [
          {
            name: 'Online',
            type: 'line',
            data: this.onlineData,
            // stack: 'All',
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
            // stack: 'All',
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

  watch: {
    interval: 'updateData',
    dateRange: 'updateData',
    manufacturer: 'updateData',
    model: 'updateData'
  },

  mounted: function () {
    this.getList()
    this.updateData()
  },

  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleSizeChange (val) {
      this.currentSize = val
    },
    updateData () {
      client.search({
        index: 'tms-*',
        type: 'online',
        body: {
          size: 0,
          'query': {
            'bool': {
              'must': [
                {
                  'range': {
                    '@timestamp': {
                      'gte': this.dateStart,
                      'lte': this.dateEnd
                    }
                  }
                },
                {
                  'term': {
                    'manufacturer.keyword': this.manufacturer
                  }
                },
                {
                  'term': {
                    'model.keyword': this.model
                  }
                }
              ]
            }
          },
          aggs: {
            aggs_date: {
              date_histogram: {
                field: '@timestamp',
                interval: this.interval,
                time_zone: util.timezone(),
                extended_bounds: {
                  min: this.dateStart,
                  max: this.dateEnd
                }
              },
              aggs: {
                aggs_online: {
                  avg: {
                    field: 'online_count'
                  }
                },
                aggs_offline: {
                  avg: {
                    field: 'offline_count'
                  }
                }
              }
            }
          }
        }
      }).then(body => {
        notify('success', 'Success', 'Successfully received data from server!')
        var buckets = body.aggregations.aggs_date.buckets
        if (buckets.length === 0) {
          notify('warning', 'Warning', 'Received no data under the conditions you choose!')
        }
        this.data = buckets.map(bucket => ({
          'name': util.formatByInterval(new Date(bucket.key), this.interval),
          'online': bucket.aggs_online.value ? parseInt(bucket.aggs_online.value) : 0,
          'offline': bucket.aggs_offline.value ? parseInt(bucket.aggs_offline.value) : 0
        }))
      }, error => {
        notify('danger', 'Fail', 'Can not receive data from server!')
        console.trace(error.message)
      })
    },
    getExcel () {
      var data = this.data
      var csvContent = 'data:text/csv;charset=utf-8,'
      data.forEach(function (value, index) {
        csvContent += value.name + ',' + value.online + ',' + value.offline + '\r\n'
      })
      var encodedUri = encodeURI(csvContent)
      var link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', 'tms_online.csv')
      document.body.appendChild(link)  // Required for FF
      link.click()
      document.body.removeChild(link)
    },
    getList () {
      var that = this   // 保存Vue对象的指针，否则子函数中无法获取
      client.search({
        index: 'tms-*',
        type: 'online',
        body: {
          size: 0,
          query: {
            bool: {
              must_not: [
                {
                  term: {
                    'manufacturer.keyword': '_all'
                  }
                },
                {
                  term: {
                    'model.keyword': '_all'
                  }
                }
              ]
            }
          },
          aggs: {
            aggs_model: {
              terms: {
                field: 'model.keyword',
                order: {
                  _term: 'asc'
                }
              }
            },
            aggs_manufacturer: {
              terms: {
                field: 'manufacturer.keyword',
                order: {
                  _term: 'asc'
                }
              }
            }
          }
        }
      }).then(body => {
        that.manufacturerList = body.aggregations.aggs_manufacturer.buckets.map(item => item.key)
        that.modelList = body.aggregations.aggs_model.buckets.map(item => item.key)
      }, error => {
        notify('danger', 'Fail', 'Can not receive data from server!')
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
.fullwidth {
  width: 100%
}
</style>
