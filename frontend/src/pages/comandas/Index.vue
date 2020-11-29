<template>
  <div>
    <app-header title="Comandas" />
    <div class="column q-gutter-y-md q-py-lg q-px-md">
      <div class="row items-center q-gutter-x-md justify-between">
        <div class="row q-gutter-x-md">
          <q-input
            v-model.number="q"
            outlined
            :size="40"
            placeholder="Pesquise por mesa..."
            @keyup.enter="load"
            dense
            bg-color="white"
            class="col-grow"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn color="primary" icon="search" size="16px" @click="load"></q-btn>
        </div>
        <q-btn
          round
          flat
          color="primary"
          icon="las la-plus"
          size="18px"
          @click="cadastrarNovo()"
        />
      </div>

      <q-separator inset />

      <div style="max-width: 400px">
        <q-tabs
          v-model="tab"
          class="bg-grey-1 text-grey-8"
          dense
          inline-label
          indicator-color="primary"
          align="justify"
          active-color="primary"
        >
          <q-tab name="todos" label="Todas" />
          <q-tab icon="las la-clipboard" name="ABERTO" label="Abertas" />
          <q-tab icon="las la-clipboard-check" name="FINALIZADO"  label="Finalizadas" />
        </q-tabs>
      </div>

      <div
        v-if="!comandas.length"
        class="column q-gutter-y-md items-center justify-center q-pa-md"
      >
        <q-icon name="las la-frown" size="40pt" color="grey-8" />
        <span class="text-grey-8 text-center text-h6">
          Nenhuma comanda encontrado!
        </span>
      </div>

      <comanda-card
        v-for="comanda of comandas"
        :key="comanda.id"
        :comanda="comanda"
        @pagar="pagar"
        @excluir="excluir"
        @editar="editar"
      />
    </div>

    <cadastro-usuario-dialog
      ref="cadastroDialogRef"
      @onSave="onChange"
      @onDelete="onChange"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import AppHeader from "../../components/AppHeader.vue";
import { NivelAcessoEnum, Usuario } from "../../core/model/Usuario";
import CadastroUsuarioDialog from "./CadastroUsuarioDialog.vue";
import { confirmExclusao, showConfirm } from "../../core/utils/AlertUtils";
import ComandaCard from "./ComandaCard.vue";
import ComandaService from "../../core/services/ComandaService";

@Component({
  components: { AppHeader, CadastroUsuarioDialog, ComandaCard },
})
export default class Comandas extends Vue {
  q = "";
  page = 1;

  tab = "todos"

  comandas: Usuario[] = [];

  inputValue: string = "";

  cadastrarNovo() {
    this.$router.push("/comandas/novo")
  }

  @Watch("tab")
  onTabChange() {
    this.load()
  }

  async load() {
    const { list } = await ComandaService.list({
      rpp: 10,
      page: this.page,
      q: this.q,
      status: this.tab !== "todos"? this.tab: null
    });
    this.comandas = list;
  }

  mounted() {
    this.load();
  }

  onChange() {
    this.load();
  }

  async pagar(id) {
    const confirmado = await showConfirm("Deseja realmente realizar o pagamento desta comanda?");
    if (confirmado) {
      this.$router.push('/caixa')
      this.load();
    }
  }

  async excluir(id) {
    const confirmado = await confirmExclusao();
    if (confirmado) {
      await ComandaService.delete(id);
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
