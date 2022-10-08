<template>
  <button @click="getDate">Получить данные</button>
  <ul>
    <li v-for="user in sortedUsersList" :key="user.userId">
      Пользователь {{user.userId}} 
      <span> {{ user.countCompleted}} / {{user.todos.length - user.countCompleted }} </span>
    </li>
  </ul>
</template>

<script>

import { getUsersDate } from './api/api'

export default {
  name: 'App',
  components: {
  
  },
  data () {
    return {
      usersList: []
    }
  },
  computed: {
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
  methods: {
    async getDate() {
      this.usersList = await getUsersDate();
    }
  }
}
</script>

<style>
@import './assets/app.scss';
</style>
