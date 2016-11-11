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
                <datepicker placeholder="Pick date and time" :config="{ enableTime: true }"></datepicker>
              </p>
            </div>
            <div class="column is-1">
              <p class="control">
                <label class="label">Compare</label>
                <vb-switch type="primary" size="medium" :checked="isCompare" @change="updateValue"></vb-switch>
              </p>
            </div>
            <div class="column is-3" v-show="isCompare">
              <p class="control">
                <label class="label">Compare Date:</label>
                <datepicker placeholder="Pick date and time" :config="{ enableTime: true }"></datepicker>
              </p>
            </div>
            <div class="column">
              <p class="control">
                <label class="label">Interval:</label>
                <a class="button">
              <span class="icon is-small">
                <i class="fa fa-align-left"></i>
              </span>
                  <span>Left</span>
                </a>
                <a class="button">
              <span class="icon is-small">
                <i class="fa fa-align-center"></i>
              </span>
                  <span>Center</span>
                </a>
                <a class="button">
              <span class="icon is-small">
                <i class="fa fa-align-right"></i>
              </span>
                  <span>Right</span>
                </a>
              </p>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <p class="control">
                <label class="label">Manufacturer:</label>
                <span class="select">
                  <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                  </select>
                </span>
              </p>
            </div>
            <div class="column">
              <p class="control">
                <label class="label">Model:</label>
                <span class="select">
                  <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                  </select>
                </span>
              </p>
            </div>
            <div class="column">
              <p class="control">
                <label class="label">Version:</label>
                <span class="select">
                  <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
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
              <p class="heading">Tweets</p>
              <p class="title">3,456</p>
            </div>
            <div class="level-item has-text-centered">
              <p class="heading">Following</p>
              <p class="title">123</p>
            </div>
            <div class="level-item has-text-centered">
              <p class="heading">Followers</p>
              <p class="title">456K</p>
            </div>
            <div class="level-item has-text-centered">
              <p class="heading">Likes</p>
              <p class="title">789</p>
            </div>
          </nav>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <article class="tile is-child box" style="height:300px">
          <h4 class="title">ANIMATED BARS</h4>
          <chart :type="'line'" :data="waveData" :options="options"></chart>
        </article>
      </div>
      <div class="tile is-parent is-6">
        <article class="tile is-child box" style="height:300px">
          <h4 class="title">ANIMATED BARS</h4>
          <chart :type="'bar'" :data="waveData" :options="options"></chart>
        </article>
      </div>
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

export default {

  components: {
    Datepicker,
    Chart,
    VbSwitch
  },

  data () {
    return {
      isCompare: false,
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
      ]
    }
  },

  computed: {
    today () {
      return new Date()
    },
    maxDate () {
      let d = new Date()
      d.setDate(32)
      return d
    },
    placeholder () {
      return `minDate: today, maxDate: ${this.maxDate.getFullYear()}-${this.maxDate.getMonth() + 1}-${this.maxDate.getDate()}`
    },
    // https://github.com/chmln/flatpickr/blob/gh-pages/src/flatpickr.l10n.zh.js
    l10n () {
      return {
        firstDayOfWeek: 1,
        weekdays: {
          shorthand: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
          longhand: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },
        months: {
          shorthand: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          longhand: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
      }
    },
    waveData () {
      return {
        labels: this.labels_2,
        datasets: [{
          label: 'My Radar',
          data: this.data_2,
          backgroundColor: this.backgroundColor[0]
        }]
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
    }
  }
}

</script>

<style scoped>
.js-plotly-plot {
  max-width: 100%;
}

</style>
