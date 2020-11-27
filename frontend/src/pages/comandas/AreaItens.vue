<template>
  <q-card class="q-pa-md" bordered flat>
    <div class="column q-gutter-y-md">
      <span class="text-h6"> Itens da comanda </span>

      <div style="max-width: 400px">
        <q-tabs
          v-model="tab"
          class="text-grey-8"
          dense
          inline-label
          indicator-color="primary"
          align="justify"
          active-color="primary"
        >
          <q-tab name="todos" label="Todos" />
          <q-tab
            icon="las la-list-alt"
            name="itensIncluidos"
            label="Itens incluídos"
          />
        </q-tabs>
      </div>

      <div class="row q-gutter-x-md">
        <q-input
          outlined
          :size="40"
          v-model="q"
          placeholder="Pesquise aqui..."
          @keyup.enter="load()"
          dense
          class="col-grow"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn @click="load()" color="primary" icon="search" size="14px"></q-btn>
      </div>

      <div class="q-gutter-y-md overflow-auto" style="max-height: 400px">
        <div
          v-if="loading"
          class="q-pa-md row items-center justify-center"
        >
          <q-circular-progress indeterminate color="primary" size="30px" />
        </div>
        <div v-else-if="!listaAtual.length" class="column items-center justify-center text-grey-8 text-center">
          <q-icon name="las la-frown" size="40pt" color="grey-8" />
          <span>Nenhum produto encontrado</span>
        </div>
        <produto-comanda
          v-else
          v-for="produto of listaAtual"
          :produto="produto"
          :key="produto.id"
        />
      </div>
    </div>
  </q-card>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import ProdutoComanda from "./ProdutoComanda.vue";
import { Loader } from "../../core/utils/Loader";
import ProdutoService from "../../core/services/ProdutoService";

@Component({
  components: {
    ProdutoComanda,
  },
})
export default class AreaItens extends Vue {
  tab = "todos";

  q = ""

  produtosLoader = new Loader(ProdutoService.list);

  mounted() {
    this.produtosLoader.load();
  }

  get listaAtual() {
    return this.tab === "todos"? this.produtosLoader.data: []
  }

  get loading() {
    return this.produtosLoader.loading
  }

  load() {
    if(this.tab === "todos") {
      this.produtosLoader.load({ q: this.q })
    }
  }
}
</script>

<style>

</style>
