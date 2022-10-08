<template>
  <button @click="getDate">Получить данные</button>
</template>

<script>

import { getUsersDate } from './api/api'

export default {
  name: 'App',
  components: {
  
  },
  methods: {
    getDate () {
      console.log('отправляем данные')
      getUsersDate()
      .then(response => {
        console.log(response)
      })
    }
  }
}
</script>

<style>
@import './assets/app.scss';
</style>
