<template>
  <div class="users-block">
    <button
      class="users-block__button"
      @click="getDate"
    >
      Получить данные
    </button>
  </div>
  <UsersList
    :sortedUsers="sortedByСountCompleted"
  />
  <div v-if="isBuilderBarChart" style="margin-left: 50px">
    <BarChart :sortedUsers='sortedUsersById'/>
  </div>

</template>

<script>

import { getUsersDate } from '../api/api'
import UsersList from './UsersList.vue'
import BarChart from './BarChart.vue'

export default {
  name: 'UsersDate',
  components: {
    UsersList,
    BarChart
},
  data () {
    return {
      usersList: []
    }
  },
  computed: {
    sortedUsersById () {
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
        return sortedbyUserId
      } else {
        return []
      }
    },
    sortedByСountCompleted () {
      if (this.sortedUsersById.length) {
        const clone = Object.assign([], this.sortedUsersById)
        const sortedByСountCompleted = clone.sort((a, b) => {
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
    },
    isBuilderBarChart () {
      return this.sortedUsersById.length
    }
  },
  methods: {
    async getDate() {
      this.usersList = await getUsersDate();
    }
  }
}
</script>
