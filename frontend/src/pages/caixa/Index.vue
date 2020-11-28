<template>
  <div>
    <app-header title="Caixa" />
    <div class="column q-gutter-y-md q-py-lg q-px-md">
      <div class="row q-gutter-x-md justify-start">
        <q-select
          v-model="q"
          outlined
          :size="40"
          placeholder="Insira o número da mesa"
          @keyup.enter="load"
          bg-color="white"
          dense
          use-input
          type="number"
          class="col-2"
        />
        <q-btn color="primary" icon="search" size="14px" @click="load"/>
      </div>
    </div>
    <div class="row q-pa-md">
      <div class="row col-grow q-gutter-x-md items-start">
        <pagamento />
        <dados-comanda />
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

@Component({
  components: { AppHeader, DadosComanda, Pagamento, ResumoCard },
})
export default class Caixa extends Vue {
  q = "";
  page = 1;

  usuarios: Usuario[] = [];

  inputValue: string = "";

  cadastrarNovo() {
    (this.$refs.cadastroDialogRef as any).show();
  }

  async load() {
    const { list } = await UsuarioService.list({
      rpp: 10,
      page: this.page,
      q: this.q,
    });
    this.usuarios = list;
  }

  mounted() {
    this.load();
  }

  onChange() {
    this.load();
  }

  async excluir(id) {
    const confirmado = await confirmExclusao();
    if (confirmado) {
      await UsuarioService.delete(id);
      this.load();
    }
  }

  editar(id: number) {
    (this.$refs.cadastroDialogRef as any).show(id);
  }
}
</script>

<style>

</style>
