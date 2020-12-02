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
            placeholder="Pesquise por código da comanda..."
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

      <div style="max-width: 500px">
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
          <q-tab icon="las la-file-invoice-dollar" name="PAGO"  label="Pagas" />
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
        @notificar="abrirModalNotificacao"
      />
    </div>

    <notificar-dialog
      ref="notificarDialogRef"
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
import NotificarDialog from './NotificarDialog.vue'

@Component({
  components: { AppHeader, NotificarDialog, ComandaCard },
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

  abrirModalNotificacao(idComanda) {
    (this.$refs.notificarDialogRef as any).show(idComanda)
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

  async pagar(comanda) {
    const confirmado = await showConfirm("Deseja realmente realizar o pagamento desta comanda?");
    if (confirmado) {
      await ComandaService.finalizar(comanda.id)
      this.$router.push('/caixa?mesa=' + comanda.mesa.numero)
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
