<template>
  <div>
    <app-header title="Produtos" />
    <div class="column q-gutter-y-md q-py-lg q-px-md">
      <div class="row items-center q-gutter-x-md justify-between">
        <div class="row q-gutter-x-md">
          <q-input
            v-model="q"
            outlined
            :size="40"
            placeholder="Pesquise aqui..."
            @keyup.enter="load"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            color="primary"
            icon="search"
            size="18px"
            @click="load"
          ></q-btn>
        </div>
        <q-btn
          v-if="ms.isAdm"
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
          <q-tab name="todos" label="Todos" />
          <q-tab icon="las la-pizza-slice" name="COMIDA" label="Comidas" />
          <q-tab icon="las la-glass-cheers" name="BEBIDA" label="Bebidas" />
        </q-tabs>
      </div>

      <div
        v-if="!produtos.length"
        class="column q-gutter-y-md items-center justify-center q-pa-md"
      >
        <q-icon name="las la-frown" size="40pt" color="grey-8" />
        <span class="text-grey-8 text-center text-h6">
          Nenhum produto encontrado!
        </span>
      </div>

      <div class="row items-center q-gutter-x-md q-gutter-y-md">
        <produto-card
          v-for="produto of produtos"
          :key="produto.id"
          :produto="produto"
          @excluir="excluir"
          @editar="editar"
          inner-class="col-grow"
        />
      </div>
    </div>

    <produto-dialog
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
import UsuarioService from "../../core/services/UsuarioService";
import ProdutoDialog from "./ProdutoDialog.vue";
import ProdutoCard from "./ProdutoCard.vue";
import { confirmExclusao } from "../../core/utils/AlertUtils";
import ProdutoService from "../../core/services/ProdutoService";
import { CategoriaEnum, Produto } from "../../core/model/Produto";
import { Observer } from "mobx-vue";
import MemoryService from "../../core/services/MemoryService";

@Observer
@Component({
  components: { AppHeader, ProdutoDialog, ProdutoCard },
})
export default class Usuarios extends Vue {
  q = "";
  page = 1;
  tab = "todos";
  categoria: CategoriaEnum;

  ms = MemoryService;

  produtos: Produto[] = [];

  inputValue: string = "";

  cadastrarNovo() {
    (this.$refs.cadastroDialogRef as any).show();
  }

  async load() {
    const { list } = await ProdutoService.list({
      rpp: 10,
      page: this.page,
      q: this.q,
      categoria: this.categoria,
    });
    this.produtos = list;
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
      await ProdutoService.delete(id);
      this.load();
    }
  }

  editar(id: number) {
    (this.$refs.cadastroDialogRef as any).show(id);
  }

  @Watch("tab")
  onChangeTab(tab) {
    this.categoria = tab;
    if (tab === "todos") {
      this.categoria = null;
    }

    this.load();
  }
}
</script>

<style>

</style>
