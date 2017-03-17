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
                      v-model="date"
                      type="date"
                      placeholder="Select Time Range..."
                      style="width:80%">
                    </el-date-picker>
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
          <h4 class="title">Device Application Distribution</h4>
          <div>
            <echart :options="treemap" style="width:100%"></echart>
          </div>
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
            </a>
          </h4>
          <div style="width:100%;overflow:auto">
            <table width="350" class="table is-bordered">
              <thead>
              <tr>
                <th width="100">Model</th>
                <th width="50">Count</th>
                <th width="100">Version</th>
                <th width="100">Count</th>
              </tr>
              </thead>
              <tbody>
                <template v-for="item in data">
                  <td :rowspan="item.children.length + 1" style="vertical-align:middle">{{item.name}}</td>
                  <td :rowspan="item.children.length + 1" style="vertical-align:middle">{{item.value}}</td>
                  <tr v-for="(version, index) in item.children">
                    <td>{{version.name}}</td>
                    <td>{{version.value}}</td>
                  </tr>
                </template>
              </tbody>
            </table>
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
import { Tabs, TabPane } from 'vue-bulma-tabs'
import * as util from '../../components/util'

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
      date: new Date(),
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      data: [],
      percentData: []
    }
  },

  computed: {
    day () {
      return util.getDate(this.date)
    },
    nextDay () {
      return util.nextDay(this.date)
    },
    legendData () {
      return this.data.map(item => item.name)
    },
    tableData () {
      return this.data.slice((this.currentPage - 1) * this.currentSize, this.currentPage * this.currentSize)
    },
    treemap () {
      return {
        tooltip: {},
        series: [{
          name: 'Model',
          type: 'treemap',
          visibleMin: 300,
          data: this.data,
          leafDepth: 1,
          levels: [
            {
              itemStyle: {
                normal: {
                  borderColor: '#555',
                  borderWidth: 4,
                  gapWidth: 4
                }
              }
            },
            {
              colorSaturation: [0.3, 0.6],
              itemStyle: {
                normal: {
                  borderColorSaturation: 0.7,
                  gapWidth: 2,
                  borderWidth: 2
                }
              }
            },
            {
              colorSaturation: [0.3, 0.5],
              itemStyle: {
                normal: {
                  borderColorSaturation: 0.6,
                  gapWidth: 1
                }
              }
            },
            {
              colorSaturation: [0.3, 0.5]
            }
          ]
        }]
      }
    }
  },

  watch: {
    date: 'updateData'
  },

  mounted: function () {
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
      this.$http.post(util.elasticAPI, {
        index: 'tms-*',
        type: 'device_app',
        body: {
          size: 0,
          query: {
            range: {
              '@timestamp': {
                gte: this.day,
                lt: this.nextDay,
                time_zone: util.timezone()
              }
            }
          },
          aggs: {
            aggs_app_name: {
              terms: {
                field: 'name.keyword',
                size: 20
              },
              aggs: {
                aggs_version: {
                  terms: {
                    field: 'version_name.keyword',
                    size: 20
                  }
                }
              }
            }
          }
        }
      }).then(res => {
        let body = res.body
        notify('success', 'Success', 'Successfully received data from server!')
        let buckets = body.aggregations.aggs_app_name.buckets
        if (buckets.length === 0) {
          notify('warning', 'Warning', 'Received no data under the conditions you choose!')
        }
        this.data = buckets.map(bucket => ({
          'name': bucket.key,
          'value': bucket.doc_count,
          'children': bucket.aggs_version.buckets.map(bucket => ({
            'name': bucket.key,
            'value': bucket.doc_count
          }))
        }))
      }, error => {
        notify('danger', 'Fail', 'Can not receive data from server!')
        console.trace(error.message)
      })
    },
    getExcel () {
      var data = this.data
      var csvContent = 'data:text/csv;charset=utf-8,'
      data.forEach(model =>
        model.children.forEach(version =>
          (csvContent += model.name + ',' + model.value + ',' + version.name + ',' + version.value + '\r\n')
        )
      )
      var encodedUri = encodeURI(csvContent)
      var link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', 'tms_application_distribution.csv')
      document.body.appendChild(link)  // Required for FF
      link.click()
      document.body.removeChild(link)
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
