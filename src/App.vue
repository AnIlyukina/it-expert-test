<template>
  <button @click="getDate">Получить данные</button>
  <ul>
    <li v-for="user in sortedUsersList" :key="user.userId">
      Пользователь {{user.userId}} 
      <span> {{ user.countCompleted}} / {{user.todos.length - user.countCompleted }} </span>
    </li>
  </ul>
  <div v-if="isBuilderBarChart" style="margin-left: 50px">
    <apexcharts id='chart' width="600" type="bar" :options="chartOptions" :series="series"></apexcharts>
  </div>
</template>

<script>

import { getUsersDate } from './api/api'
import VueApexCharts from "vue3-apexcharts";

export default {
  name: 'App',
  components: {
      apexcharts: VueApexCharts,
  },
  data () {
    return {
      usersList: [],
      chartOptions: {},
      series: []
    }
  },
  computed: {
    isBuilderBarChart () {
      return this.sortedUsersList.length
    },
    sortedUsersList () {
      if (this.usersList.length) {
        const grouppedTodos = this.usersList.reduce((acc, cur) => {
          acc[cur.userId] = acc[cur.userId] || {
            userId: cur.userId,
            todos: [],
            countCompleted: 0
          }
          acc[cur.userId].todos.push({
            id: cur.id,
            title: cur.title,
            completed: cur.completed
          })
          return acc
        }, {})
        const sortedbyUserId = Object.values(grouppedTodos)

        sortedbyUserId.forEach((user) => {
          user.todos.forEach(todo => {
            if (todo.completed) {
              user.countCompleted += 1
            }
          })
        })

        const sortedByСountCompleted = sortedbyUserId.sort((a, b) => {
          if (a.countCompleted > b.countCompleted) {
            return -1;
          }
          if (a.countCompleted < b.countCompleted) {
            return 1;
          }
          return 0;
        })
        
        return sortedByСountCompleted
      } else {
        return []
      }
    }
  },
  watch: {
    isBuilderBarChart(value) {
      if (value) {
        this.buildBarChart()
      }
    }
  },
  methods: {
    async getDate() {
      this.usersList = await getUsersDate();
    },
    buildBarChart () {

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
          categories: this.sortedUsersList.map(user => 'User ' + user.userId)
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          colors: ['#31f545', '#E91E63'],
          opacity: 0.8,
        }
      },
      this.series = [{
        name: 'Выполненные задачи',
        color: '#31f545',
        data: this.sortedUsersList.map(user => user.countCompleted)
      },
      {
        name: 'Невыполненные задачи',
        color: '#E91E63',
        data: this.sortedUsersList.map(user => user.todos.length - user.countCompleted)
      }]
    }
  }
}
</script>

<style>
@import './assets/app.scss';
</style>
