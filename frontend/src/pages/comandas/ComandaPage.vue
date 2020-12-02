<template>
  <q-page>
    <app-header
      :title="!comanda.id ? 'Cadastrar comanda' : `Comanda #${comanda.id}`"
    />
    <div class="row q-gutter-x-xl  items-start q-pa-md">
      <div class="column col-grow q-gutter-y-md q-pb-md">
        <dados-iniciais-card :comanda="comanda" @salvar="salvar()" />
        <area-itens
          v-if="comanda.id"
          :itens="itens"
          :itensIncluidos="itensIncluidos"
          :comanda="comanda"
          @atualizaItens="atualizaItens"
        />
      </div>
      <resumo-card v-if="comanda.id" :itens="itensIncluidos" :comanda="comanda"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AppHeader from "../../components/AppHeader.vue";
import { Comanda } from "../../core/model/Comanda";
import ComandaService from "../../core/services/ComandaService";
import MesaService from "../../core/services/MesaService";
import AreaItens from "./AreaItens.vue";
import DadosIniciaisCard from "./DadosIniciaisCard.vue";
import ResumoCard from "./ResumoCard.vue";
import { merge } from "lodash";

@Component({
  components: { AppHeader, DadosIniciaisCard, ResumoCard, AreaItens },
})
export default class ComandaPage extends Vue {
  comanda: Partial<Comanda> = new Comanda();
  itens = [];

  async salvar() {
    try {
      this.comanda.mesa = {
        id: this.comanda.mesa.id,
        numero: this.comanda.mesa.numero,
      } as any;
      this.comanda.garcom = {
        id: this.comanda.garcom.id,
        nome: this.comanda.garcom.nome,
      } as any;
      this.$q.loading.show();
      const { id } = await ComandaService.save(this.comanda);
      this.comanda = { ...this.comanda, id };
    } catch (e) {
      console.log(e);
    } finally {
      this.$q.loading.hide();
    }
  }

  atualizaItens(itens) {
    this.itens = itens;
  }

  get itensIncluidos() {
    return this.itens.filter((item) => item.id);
  }

  async loadComanda(id) {
    const comanda = await ComandaService.get(id);
    this.comanda = comanda;

    this.itens = await ComandaService.listItens(id);
  }

  mounted() {
    const { id } = this.$route.params;
    const { mesa } = this.$route.query;
    if (id !== "novo") {
      this.loadComanda(id);
    }

    if (mesa) {
      this.carregarMesaReserva(mesa)
    }
  }

  async carregarMesaReserva(id) {
    const mesa = await MesaService.get(id);
    this.comanda.mesa = mesa;
  }
}
</script>

<style>

</style>
