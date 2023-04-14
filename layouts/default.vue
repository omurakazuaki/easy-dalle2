<template>
<a-layout style="min-height: 100vh">
  <a-layout-sider>
    <div class="logo">Easy DALL·E 2</div>
    <a-menu mode="inline" theme="dark" v-model:selectedKeys="selectedKeys">
      <a-menu-item key="/new">
        <nuxt-link to="/new">
          <plus-outlined />
          <span>New</span>
        </nuxt-link>
      </a-menu-item>
      <a-sub-menu>
        <template #title>
          <history-outlined />
          <span>History</span>
        </template>
        <a-menu-item v-for="data in history.value" :key="`/history/${data.id}`">
          <nuxt-link :to="`/history/${data.id}`">
            <span>{{data.keyword}}</span>
          </nuxt-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
  <a-layout-content style="padding: 48px">
    <slot />
  </a-layout-content>
</a-layout>
</template>
<script setup>
import {
  PlusOutlined,
  HistoryOutlined,
} from "@ant-design/icons-vue";
const history = useHistory();
const route = useRoute();
const selectedKeys = ref([route.path]);
watch(() => route.path, (path) => {
  selectedKeys.value = [path];
});
console.log(route.path)
</script>
<style>
.logo {
  height: 32px;
  margin: 16px;
  font-size: 1rem;
  font-weight: 700;
  color: #FFFFFF;
}
</style>
