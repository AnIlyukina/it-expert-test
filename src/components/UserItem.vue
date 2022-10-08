<template>
  <div>
    Пользователь {{user.userId}} 
    <span> {{ user.countCompleted}} / {{user.todos.length - user.countCompleted }} </span>
  </div>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    user: {
      type: Function,
      default: () => {
        return {}
      }
    }
  }

}
</script>

<style>

</style>