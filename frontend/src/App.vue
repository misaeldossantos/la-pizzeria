<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { httpRequest } from "./core/services/HttpService";

@Component
export default class App extends Vue {
  mounted() {
    httpRequest.interceptors.response.use(
      (response) => response,
      (error) => {
        if(error.response.status === 401) {
          this.$router.push("/login")
        }
        return Promise.reject(error);
      }
    );
  }
}
</script>
