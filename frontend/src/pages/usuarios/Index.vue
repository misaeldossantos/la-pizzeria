<template>
  <div>
    <app-header
      title="Usuários"
    />
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import AppHeader from "../../components/AppHeader.vue";

@Component({
  components: { AppHeader },
})
export default class Usuarios extends Vue {
}
</script>

<style>

</style>
