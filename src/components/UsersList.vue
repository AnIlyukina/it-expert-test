<template>
  <ul class="user-list">
    <li class="user-list__item" v-for="user in sortedUsers" :key="user.userId">
      <UserItem
        :user="user"
      />
    </li>
  </ul>
</template>

<script>
import UserItem from "./UserItem.vue";
export default {
  name: "UsersList",
  props: {
    sortedUsers: {
      type: Function,
      default: () => {
          return [];
      }
    }
  },
  components: { UserItem }
}
</script>

<style>

</style>
