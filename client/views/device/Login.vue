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
                      <a class="button" :class="{ 'is-primary': interval === 'month' }" @click="interval='month'">
                        <span class="icon is-small">
                          <i class="fa fa-align-left"></i>
                        </span>
                        <span>Month</span>
                      </a>
                      <a class="button" :class="{ 'is-primary': interval === 'week' }" @click="interval='week'">
                        <span class="icon is-small">
                          <i class="fa fa-align-center"></i>
                        </span>
                        <span>Week</span>
                      </a>
                      <a class="button" :class="{ 'is-primary': interval === 'day' }" @click="interval='day'">
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
                  <div class="column">
                    <p class="control">
                      <label class="label">Version:</label>
                      <span class="select">
                        <select v-model="version">
                          <option value="_all">All</option>
                          <option v-for="(item, index) in versionList">{{item}}</option>
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
          <h4 class="title">Device Login Percent</h4>
          <echart :options="pie" class="fullwidth"></echart>
        </article>
      </div>
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h4 class="title">Device Login Count</h4>
          <echart :options="line" class="fullwidth"></echart>
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
            <tr v-for="(item, index) in tableData">
              <td>{{item.name}}</td>
              <td>{{item.value}}</td>
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

export default {

  components: {
    VbSwitch,
    Collapse,
    CollapseItem
  },

  data () {
    return {
      isCompare: false,
      dateRange: util.thisWeekRange(),
      compareDateRange: null,
      interval: 'day',
      manufacturerList: [],
      modelList: [],
      versionList: [],
      manufacturer: '_all',
      model: '_all',
      version: '_all',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      pieLimit: 20,
      data: [],
      compareDataArray: [],
      currentSize: 10,
      currentPage: 1
    }
  },

  computed: {
    legendData () {
      return this.data.map(item => item.name)
    },
    dataArray () {
      return this.data.map(item => item.value)
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
    paginationLayout () {
      return util.paginationLayout()
    },
    condition () {
      var condition = [{
        'range': {
          '@timestamp': {
            'gte': this.dateStart,
            'lte': this.dateEnd
          }
        }
      }]
      if (this.manufacturer !== '_all') {
        condition.push({'term': {
          'manufacturer.keyword': this.manufacturer
        }})
      }
      if (this.model !== '_all') {
        condition.push({'term': {
          'model.keyword': this.model
        }})
      }
      if (this.version !== '_all') {
        condition.push({'term': {
          'system_version.keyword': this.version
        }})
      }
      return condition
    },
    compareCondition () {
      var condition = [{
        'range': {
          '@timestamp': {
            'gte': this.compareDateStart,
            'lt': this.compareDateEnd
          }
        }
      }]
      if (this.manufacturer !== '_all') {
        condition.push({'term': {
          'manufacturer.keyword': this.manufacturer
        }})
      }
      if (this.model !== '_all') {
        condition.push({'term': {
          'model.keyword': this.model
        }})
      }
      if (this.version !== '_all') {
        condition.push({'term': {
          'system_version.keyword': this.version
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
          name: 'login',
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
            name: 'Login',
            type: 'line',
            data: this.data
          }
        ]
      }
    }
  },

  watch: {
    dateRange: 'updateData',
    interval: 'updateAll',
    manufacturer: 'updateAll',
    model: 'updateAll',
    version: 'updateAll',
    compareDateRange: function (newVal, oldVal) {
      if (this.compareDateRange && this.compareDateRange[0]) {
        this.updateCompareData()
      }
    }
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
    updateValue (val) {
      this.isCompare = val
      if (val === true) {
        this.compareDateRange = null
      }
    },
    updateData () {
      this.$http.post(util.elasticAPI, {
        index: 'tms-*',
        type: 'login',
        body: {
          size: 0,
          query: {
            bool: {
              must: this.condition
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
              }
            }
          }
        }
      }).then(res => {
        let body = res.body
        notify('success', 'Success', 'Successfully received data from server!')
        var buckets = body.aggregations.aggs_date.buckets
        if (buckets.length === 0) {
          notify('warning', 'Warning', 'Received no data under the conditions you choose!')
        }
        this.data = buckets.map(bucket => ({
          'name': util.formatByInterval(new Date(bucket.key), this.interval),
          'value': bucket.doc_count
        }))
      }, error => {
        notify('danger', 'Fail', 'Can not receive data from server!')
        console.trace(error.message)
      })
    },
    updateCompareData () {
      this.$http.post(util.elasticAPI, {
        index: 'tms-*',
        type: 'login',
        body: {
          size: 0,
          query: {
            bool: {
              must: this.compareCondition
            }
          },
          aggs: {
            aggs_date: {
              date_histogram: {
                field: '@timestamp',
                interval: this.interval,
                time_zone: util.timezone()
              }
            }
          }
        }
      }).then(res => {
        let body = res.body
        notify('success', 'Success', 'Successfully got data from server!')
        var buckets = body.aggregations.aggs_date.buckets
        if (buckets.length === 0) {
          notify('warning', 'Warning', 'Received no data under the conditions you choose!')
        }
        this.compareDataArray = buckets.map(bucket => bucket.doc_count)
      }, error => {
        notify('danger', 'Fail', 'Can not get data from server!')
        console.trace(error.message)
      })
    },
    updateAll () {
      this.updateData()
      this.updateCompareData()
    },
    getList () {
      this.$http.post(util.elasticAPI, {
        index: 'tms-*',
        type: 'login',
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
            aggs_version: {
              terms: {
                field: 'system_version.keyword',
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
        this.versionList = body.aggregations.aggs_version.buckets.map(item => item.key)
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
