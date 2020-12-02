<template>
  <div>
    <app-header title="Caixa" />
    <div class="column q-gutter-y-md q-py-lg q-px-md">
      <div class="row q-gutter-x-md justify-start">
        <q-input
          v-model.number="q"
          outlined
          :size="40"
          placeholder="Insira o número da mesa"
          @keyup.enter="load"
          bg-color="white"
          dense
          use-input
          type="number"
          class="col-3"
        />
        <q-btn color="primary" icon="search" size="14px" @click="loadComanda" />
      </div>
    </div>
    <div class="row q-pa-md">
      <div v-if="comanda" class="row col-grow q-gutter-x-md items-start">
        <pagamento :comanda="comanda" @setStatusComanda="setStatusComanda" @concluir="concluir" @finalizado="onFinalizar"/>
        <dados-comanda :comanda="comanda" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AppHeader from "../../components/AppHeader.vue";
import { NivelAcessoEnum, Usuario } from "../../core/model/Usuario";
import UsuarioService from "../../core/services/UsuarioService";
import CadastroUsuarioDialog from "./CadastroUsuarioDialog.vue";
import UsuarioCard from "./UsuarioCard.vue";
import { confirmExclusao } from "../../core/utils/AlertUtils";
import DadosComanda from "./DadosComanda.vue";
import Pagamento from "./Pagamento.vue";
import ResumoCard from "./ResumoCard.vue";
import { Comanda } from "../../core/model/Comanda";
import MesaService from "../../core/services/MesaService";
import { stat } from "fs";

@Component({
  components: { AppHeader, DadosComanda, Pagamento, ResumoCard },
})
export default class Caixa extends Vue {
  q = "";
  page = 1;

  comanda: Comanda = null;

  usuarios: Usuario[] = [];

  inputValue: string = "";

  cadastrarNovo() {
    (this.$refs.cadastroDialogRef as any).show();
  }

  async loadComanda() {
    try {
      this.$q.loading.show();
      const comanda = await MesaService.getComandaByMesa(this.q);
      this.comanda = comanda;
    } catch (e) {
      console.log(e);
    } finally {
      this.$q.loading.hide();
    }
  }

  onChange() {}

  async excluir(id) {
    const confirmado = await confirmExclusao();
    if (confirmado) {
      await UsuarioService.delete(id);
      // this.load();
    }
  }

  editar(id: number) {
    (this.$refs.cadastroDialogRef as any).show(id);
  }

  mounted() {
    const { mesa } = this.$route.query;
    if (mesa) {
      this.q = mesa + "";
      this.loadComanda();
    }
  }

  setStatusComanda(status) {
    this.comanda.status = status
  }

  concluir() {
    this.comanda = null
  }

  onFinalizar() {
    this.q = ""
  }
}
</script>

<style>

</style>
