<template>
  <div class="tab-block">
    <a
      href="#"
      :class="[
        activeTab === 'userList' ? 'tab-block__tab active' : '',
        'tab-block__tab',
      ]"
      @click.prevent="changeTab('userList')"
    >
      Общий список
    </a>
    <a
      href="#"
      :class="[
        activeTab === 'barChart' ? 'tab-block__tab active' : '',
        'tab-block__tab',
      ]"
      @click.prevent="changeTab('barChart')"
    >
      Показатели
    </a>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    activeTab: {
      type: String,
      default: "userList",
    },
  },
  methods: {
    changeTab(tab) {
      this.$emit("changeTab", tab);
    },
  },
};
</script>
