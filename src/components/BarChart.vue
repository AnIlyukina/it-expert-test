<template>
  <div class="bar-chart">
    <apexcharts id='chart' class="bar-chart__apexcharts" type="bar" :options="chartOptions" :series="series"></apexcharts>
  </div>
</template>

<script>

import VueApexCharts from "vue3-apexcharts";

export default {
  name: 'BarChart',
  components: {
    apexcharts: VueApexCharts
  },
  date () {
    return {
      chartOptions: {},
      series: []
    }
  },
  props: {
    sortedUsers: {
      type: Function,
      default: () => {
          return [];
      }
    }
  },
  created () {
    this.chartOptions = {
      chart: {
        type: 'bar',
        height: 400,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10
        },
      },
      xaxis: {
        categories: this.sortedUsers.map(user => 'User ' + user.userId)
      },
      fill: {
        colors: ['#31f545', '#E91E63'],
        opacity: 0.8,
      }
    },
    this.series = [{
      name: 'Выполненные задачи',
      color: '#31f545',
      data: this.sortedUsers.map(user => user.countCompleted)
    },
    {
      name: 'Невыполненные задачи',
      color: '#E91E63',
      data: this.sortedUsers.map(user => user.todos.length - user.countCompleted)
    }]
  }

}
</script>

<style>

</style>
