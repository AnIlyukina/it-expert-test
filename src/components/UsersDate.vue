<template>
  <Tabs :activeTab="activeTab" @changeTab="changeTab"/>
  <UsersList
    v-if="activeTab === 'userList'"
    :sortedUsers="sortedByСountCompleted"
  />
  <BarChart v-if="isBuilderBarChart && activeTab === 'barChart'" :sortedUsers='sortedUsersById'/>
</template>

<script>
import Tabs from "@/components/Tabs";
import UsersList from '@/components/UsersList';
import BarChart from '@/components/BarChart';

export default {
name: 'UsersDate',
components: {
  UsersList,
  BarChart,
  Tabs
},
data () {
  return {
    activeTab: 'userList'
  }
},
props: {
  usersList: {
    type: Array,
    default: () => {
      return []
    }
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
  changeTab (tab) {
    this.activeTab = tab
  }
}
}
</script>