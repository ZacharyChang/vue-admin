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
                          <i class="fa fa-align-left"></i>
                        </span>
                      <span>Week</span>
                    </a>
                    <a class="button" :class="{ 'is-primary': this.interval === 'day' }" @click="interval='day'">
                        <span class="icon is-small">
                          <i class="fa fa-align-center"></i>
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
                  <p class="control el-input-bottom">
                    <label class="label">APP Name:</label>
                    <el-autocomplete
                      class="inline-input"
                      v-model="appName"
                      :fetch-suggestions="filterApp"
                      style="position:fixed;z-index:3"
                    ></el-autocomplete>
                  </p>
                </div>
                <div class="column">
                  <p class="control el-input-bottom">
                    <label class="label">Package Name:</label>
                    <el-autocomplete
                      class="inline-input"
                      v-model="packageName"
                      :fetch-suggestions="filterClass"
                      style="position:fixed;z-index:2"
                    ></el-autocomplete>
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
              <p class="heading">Total</p>
              <p class="title">{{sum}}</p>
            </div>
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
      <div class="tile is-parent">
        <article class="tile is-child box">
          <tabs type="toggle" size="medium" :is-fullwidth="true" :only-fade="false" animation="slide">
            <tab-pane label="Summary" style="width:100%">
              <div class="tile is-ancestor box">
                <div class="tile is-parent is-6">
                  <article class="tile is-child box">
                    <h4 class="title">APP Use Percent</h4>
                    <echart :options="pie" class="fullwidth"></echart>
                  </article>
                </div>
                <div class="tile is-parent is-6">
                  <article class="tile is-child box">
                    <h4 class="title">APP Use Count</h4>
                    <echart :options="line" class="fullwidth"></echart>
                  </article>
                </div>
              </div>
            </tab-pane>
            <tab-pane label="Time" style="width:100%" v-show="isShow">
              <div class="tile is-ancestor box">
                <div class="tile is-parent is-12">
                  <article class="tile is-child box">
                    <h4 class="title">APP Use Duration</h4>
                    <echart :options="scatter" style="width:100%"></echart>
                  </article>
                </div>
              </div>
            </tab-pane>
          </tabs>
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
              <th>Count</th>
              <th>Sum Use Time</th>
              <th>Average Use Time</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tableData">
                <td>{{item.name}}</td>
                <td>{{item.count}}</td>
                <td>{{item.sum}}</td>
                <td>{{item.avg}}</td>
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
import notify from '../../components/notification'
import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'
import * as util from '../../components/util'
import { Tabs, TabPane } from 'vue-bulma-tabs'

export default {

  components: {
    VbSwitch,
    Collapse,
    CollapseItem,
    Tabs,
    TabPane
  },

  data () {
    return {
      dateRange: util.thisWeekRange(),
      interval: 'day',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      isShow: true,  // to hide the tab after all elements mounted
      data: [],
      appData: [],
      versionData: [],
      appDurationData: [],
      appNumberData: [],
      isCompare: false,
      compareData: [],
      appList: [],
      appName: '',
      packageList: [],
      packageName: '',
      currentSize: 10,
      currentPage: 1
    }
  },

  computed: {
    legendData () {
      return this.data.map(item => item.name)
    },
    countData () {
      return this.data.map(item => item.count)
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
    maxNumber () {
      return Math.max.apply(null, this.appNumberData)
    },
    sum () {
      return this.countData.reduce((a, b) => a + b, 0)
    },
    max () {
      if (this.countData.length > 0) {
        return Math.max.apply(null, this.countData)
      }
      return 0
    },
    min () {
      if (this.countData.length > 0) {
        return Math.min.apply(null, this.countData)
      }
      return 0
    },
    avg () {
      if (this.countData.length > 0) {
        return parseInt(this.sum / (this.countData.length))
      }
      return 0
    },
    paginationLayout () {
      return util.paginationLayout()
    },
    condition () {
      var condition = [{
        'range': {
          'start_time': {
            'gte': this.dateStart,
            'lte': this.dateEnd
          }
        }
      }]
      if (this.appName !== '') {
        condition.push({'term': {
          'app_name.keyword': this.appName
        }})
      }
      if (this.packageName !== '') {
        condition.push({'term': {
          'package_name.keyword': this.packageName
        }})
      }
      return condition
    },
    pie () {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
          name: 'APP Name',
          type: 'pie',
          radius: '50%',
          data: this.appData,
          label: {
            normal: {
              position: 'inside'
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }, {
          name: 'APP Version',
          type: 'pie',
          radius: ['60%', '80%'],
          data: this.versionData,
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
            name: 'Count',
            type: 'bar',
            data: this.countData,
            itemStyle: {
              normal: {
                color: '#3273dc'
              }
            },
            lineStyle: {
              normal: {
                color: '#3273dc'
              }
            }
          }
        ]
      }
    },
    scatterSeries () {
      return this.appDurationData.map(item => ({
        name: item[0][3], // the third element is the app name
        data: item,
        type: 'scatter',
        symbolSize: data => Math.pow(data[2] / this.maxNumber, 1 / 3) * 60,
        label: {
          emphasis: {
            show: true,
            formatter: function (param) {
              return param.data[3] // APP Name
            },
            position: 'top'
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: 'rgba(25, 100, 150, 0.5)',
            shadowOffsetY: 5
          }
        }
      }))
    },
    scatter () {
      return {
        legend: {
          right: 10,
          data: this.appData.map(item => item.name)  // the array of app names
        },
        tooltip: {
          padding: 10,
          backgroundColor: '#222',
          borderColor: '#777',
          borderWidth: 1,
          formatter: param => (
            'Date: ' + param.data[0] +
            '<br/>APP: ' + param.data[3] +
            '<br/>Number: ' + param.data[2] +
            '<br/>Average Time: ' + util.humanize(param.data[1])
          )
        },
        xAxis: {
          type: 'category',
          data: this.legendData  // time line
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          scale: true,
          name: 'Seconds'
        },
        series: this.scatterSeries
      }
    }
  },

  watch: {
    interval: 'updateData',
    dateRange: 'updateData',
    appName: function (newVal) {
      if (newVal === '') {
        this.updateData()
      } else {
        let appNames = this.appList.map(item => item.value)
        if (appNames.indexOf(newVal) > -1) {
          this.updateData()
        }
      }
    },
    packageName: function (newVal) {
      if (newVal === '') {
        this.updateData()
      } else {
        let packageNames = this.packageList.map(item => item.value)
        if (packageNames.indexOf(newVal) > -1) {
          this.updateData()
        }
      }
    },
    compareDateRange: function (newVal, oldVal) {
      if (this.compareDateRange && this.compareDateRange[0]) {
        this.updateCompareData()
      }
    }
  },

  mounted: function () {
    this.getList()
    this.updateData()
    this.isShow = false
  },

  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleSizeChange (val) {
      this.currentSize = val
    },
    updateData () {
      this.$http.post(util.elasticAPI, {
        index: 'tms-*',
        type: 'app_use',
        body: {
          size: 0,
          'query': {
            'bool': {
              'must': this.condition
            }
          },
          aggs: {
            aggs_date: {
              date_histogram: {
                field: 'start_time',
                interval: this.interval,
                time_zone: util.timezone(),
                extended_bounds: {
                  min: this.dateStart,
                  max: this.dateEnd
                }
              },
              aggs: {
                aggs_sum_duration: {
                  sum: {
                    field: 'duration'
                  }
                },
                aggs_avg_duration: {
                  avg: {
                    field: 'duration'
                  }
                }
              }
            },
            aggs_app: {
              terms: {
                field: 'app_name.keyword',
                size: 5
              },
              aggs: {
                aggs_date: {
                  date_histogram: {
                    field: 'start_time',
                    interval: this.interval,
                    time_zone: util.timezone(),
                    extended_bounds: {
                      min: this.dateStart,
                      max: this.dateEnd
                    }
                  },
                  aggs: {
                    aggs_avg: {
                      avg: {
                        field: 'duration'
                      }
                    }
                  }
                }
              }
            },
            aggs_version: {
              terms: {
                field: 'version_name.keyword',
                size: 5
              }
            }
          }
        }
      }).then(res => {
        let body = res.body
        notify('success', 'Success', 'Successfully received data from server!')
        let dateBuckets = body.aggregations.aggs_date.buckets
        if (dateBuckets.length === 0) {
          notify('warning', 'Warning', 'Received no data under the conditions you choose!')
        }
        this.data = dateBuckets.map(bucket => ({
          'name': util.formatByInterval(bucket.key, this.interval),
          'count': bucket.doc_count,
          'sum': util.humanize(bucket.aggs_sum_duration.value),
          'avg': util.humanize(bucket.aggs_avg_duration.value)
        }))
        this.appData = body.aggregations.aggs_app.buckets.map(bucket => ({
          'name': bucket.key,
          'value': bucket.doc_count
        }))
        this.versionData = body.aggregations.aggs_version.buckets.map(bucket => ({
          'name': bucket.key,
          'value': bucket.doc_count
        }))
        this.appDurationData = []
        this.appNumberData = []
        body.aggregations.aggs_app.buckets.forEach(app => {
          let temp = []
          app.aggs_date.buckets.forEach(date => {
            temp.push([util.formatByInterval(date.key, this.interval), date.aggs_avg.value ? parseInt(date.aggs_avg.value) : 0, date.doc_count, app.key])
            this.appNumberData.push(date.doc_count)
          })
          this.appDurationData.push(temp)
        })
      }, error => {
        notify('danger', 'Fail', 'Can not receive data from server!')
        console.trace(error.message)
      })
    },
    getExcel () {
      var data = this.data
      var csvContent = 'data:text/csv;charset=utf-8,'
      data.forEach(function (value, index) {
        csvContent += value.name + ',' + value.count + ',' + value.sum + ',' + value.avg + '\r\n'
      })
      var encodedUri = encodeURI(csvContent)
      var link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', 'tms_app_use.csv')
      document.body.appendChild(link)  // Required for FF
      link.click()
      document.body.removeChild(link)
    },
    getList () {
      this.$http.post(util.elasticAPI, {
        index: 'tms-*',
        type: 'app_use',
        body: {
          size: 0,
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
            },
            aggs_app: {
              terms: {
                field: 'app_name.keyword',
                order: {
                  _term: 'asc'
                }
              }
            },
            aggs_package: {
              terms: {
                field: 'package_name.keyword',
                order: {
                  _term: 'asc'
                }
              }
            }
          }
        }
      }).then(res => {
        let body = res.body
        this.manufacturerList = body.aggregations.aggs_manufacturer.buckets.map(item => item.key)
        this.modelList = body.aggregations.aggs_model.buckets.map(item => item.key)
        this.appList = body.aggregations.aggs_app.buckets.map(item => ({'value': item.key}))
        this.packageList = body.aggregations.aggs_package.buckets.map(item => ({'value': item.key}))
      }, error => {
        notify('danger', 'Fail', 'Can not receive data from server!')
        console.trace(error.message)
      })
    },
    filterApp (queryString, callback) {
      let results = queryString ? this.appList.filter(object => object.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1) : this.appList
      callback(results)
    },
    filterClass (queryString, callback) {
      let results = queryString ? this.packageList.filter(object => object.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1) : this.packageList
      callback(results)
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
.button {
  margin: 5px 0 0
}
.el-input-bottom {
  padding:0 0 36px 0
}
.fullwidth {
  width: 100%
}
</style>
