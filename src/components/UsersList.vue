<template>
  <div class="user-list__search">
    <input
      v-model="searchName"
      type="number"
      class="user-list__search-input"
      placeholder="Введите номер (id) пользователя"
    />
  </div>
  
  <div>
    <ul class="user-list__list">
      <li
        v-for="user in visibleUsers"
        :key="user.userId"
        class="user-list__item"
      >
        <UserItem :user="user" />
      </li>
    </ul>
  </div>
</template>

<script>
import UserItem from "@/components/UserItem";

export default {
  name: "UsersList",
  data() {
    return {
      searchName: "",
    };
  },
  props: {
    sortedUsers: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    visibleUsers() {
      const users = Object.assign([], this.sortedUsers);
      if (this.searchName) {
        let findedUser = users.filter(
          (user) => user.userId === this.searchName
        );
        return findedUser;
      } else {
        return users;
      }
    },
  },
  components: {
    UserItem,
  },
};
</script>