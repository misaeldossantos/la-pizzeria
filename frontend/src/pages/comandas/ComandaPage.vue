<template>
  <div>
    <app-header
      :title="isNew ? 'Cadastrar comanda' : `Comanda #${comanda.id}`"
    />
    <div class="row q-gutter-x-xl q-pa-md">
      <div class="column col-grow q-gutter-y-md">
          <dados-iniciais-card />
          <area-itens />
      </div>
      <resumo-card />
    </div>

  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import AppHeader from "../../components/AppHeader.vue";
import AreaItens from "./AreaItens.vue";
import DadosIniciaisCard from "./DadosIniciaisCard.vue";
import ResumoCard from "./ResumoCard.vue";

@Component({
  components: { AppHeader, DadosIniciaisCard, ResumoCard, AreaItens },
})
export default class ComandaPage extends Vue {
  isNew = true;
}
</script>

<style>

</style>
