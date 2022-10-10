<template>
  <div class="user-item">
    <img
      src="../../src/assets/image/photo.png"
      alt="Фотография"
      class="user-item__photo"
    />
    <div class="user-item__info">
      <h2 class="user-item__title">
        Пользователь {{ user.userId }}
        <p class="user-item__result">
          <span class="user-item__result-success">
            {{ user.countCompleted }}
          </span>
          /
          <span class="user-item__result-fail">
            {{ user.todos.length - user.countCompleted }}
          </span>
        </p>
      </h2>
      <ul class="user-item__todos-list">
        <li
          v-for="todo in user.todos"
          :key="todo.id"
          :class="[
            todo.completed ? 'user-item__todos-item success' : '',
            'user-item__todos-item',
          ]"
        >
          {{ todo.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserItem",
  props: {
    user: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style></style>
