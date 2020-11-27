<template>
  <q-page class="row">
    <span>Bem vindo(a) {{usuario.nome}}</span>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {  }
})
export default class PageIndex extends Vue {
};
</script>
