<template>
  <button
    class="app__button"
    :disabled="isSendRequest"
    @click="getDate"
  >
    Получить данные
  </button>
  <Loader v-if="isLoader"/>
  <UserDate
    v-if="usersList.length"
    :usersList="usersList"/>
</template>

<script>

import { getUsersDate } from './api/api'
import UserDate from './components/UsersDate.vue'
import Loader from "@/components/Loader";

export default {
  name: 'App',
  components: {
    UserDate,
    Loader
  },
  data () {
    return {
      usersList: [],
      isLoader: false,
      isSendRequest: false,
      errorMessage: ''
    }
  },
  methods: {
    async getDate() {
      this.isLoader = true;
      this.isSendRequest = true;
      this.errorMessage = "";
      try {
        this.usersList = await getUsersDate();

      } catch (e) {
        this.isSendRequest = false;
        this.errorMessage = "Что-то пошло не так, попробуйте позже";
      } finally {
        this.isLoader = false;
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/app.scss';
</style>
