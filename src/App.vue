<template>
  <button class="app__button" :disabled="isSendRequest" @click="getDate">
    Получить данные
  </button>

  <Loader v-if="isLoader" />

  <UserBlock v-if="usersList.length" :usersList="usersList" />
</template>

<script>
import { getUsersDate } from "./api/api";
import UserBlock from "@/components/UsersBlock";
import Loader from "@/components/Loader";

export default {
  name: "App",
  components: {
    UserBlock,
    Loader,
  },
  data() {
    return {
      usersList: [],
      isLoader: false,
      isSendRequest: false,
      errorMessage: "",
    };
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
    },
  },
};
</script>

<style lang="scss">
  @import "./assets/app.scss";
</style>
