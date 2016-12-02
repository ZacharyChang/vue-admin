<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="block is-flex">
            <collapse>
              <collapse-item title="Conditions">
                <div class="columns">
                  <div class="column is-3">
                    <p class="control">
                      <label class="label">Date:</label>
                      <el-date-picker
                        v-model="dateRange"
                        type="date"
                        placeholder="Select Time Range..."
                        style="width:80%">
                      </el-date-picker>
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
          <h4 class="title">Device System Distribution</h4>
          <div>
            <echart :options="treemap" style="width:100%"></echart>
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
import { Tabs, TabPane } from 'vue-bulma-tabs'

export default {

  components: {
    VbSwitch,
    echart: ECharts,
    Collapse,
    CollapseItem,
    Tabs,
    TabPane
  },

  data () {
    return {
      dateRange: null,
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
    legendData () {
      return this.data.map(item => item.name)
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
    percentOption () {
      if (this.model === '_all') {
        return 'model.keyword'
      }
      return 'upgrade_version.keyword'
    },
    percentLegend () {
      if (this.model === '_all') {
        return 'Model'
      }
      return 'Upgrade Version'
    },
    condition () {
      var condition = [{
        'range': {
          '@timestamp': {
            'gte': this.dateStart,
            'lt': this.dateEnd
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
      return condition
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
    dateRange: 'updateData'
  },

  mounted: function () {
    this.updateData()
  },

  methods: {
    updateData () {
      client.search({
        index: 'tms-device-*',
        body: {
          size: 0,
          aggs: {
            aggs_model: {
              terms: {
                field: 'model_name.keyword',
                size: 20
              },
              aggs: {
                aggs_version: {
                  terms: {
                    field: 'current_software.keyword',
                    size: 20
                  }
                }
              }
            }
          }
        }
      }).then(body => {
        notify('success', 'Success', 'Successfully received data from server!')
        let buckets = body.aggregations.aggs_model.buckets
        if (buckets.length === 0) {
          notify('warning', 'Warning', 'Received no data under the conditions you choose!')
        } else {
          this.data = buckets.map(bucket => ({
            'name': bucket.key,
            'children': bucket.aggs_version.buckets.map(bucket => ({
              'name': bucket.key,
              'value': bucket.doc_count
            }))
          }))
          console.log(this.data)
        }
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
</style>
