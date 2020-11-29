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
          <q-tab name="todos" label="Produtos" />
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
        <q-btn
          @click="load()"
          color="primary"
          icon="search"
          size="14px"
        ></q-btn>
      </div>

      <div class="q-gutter-y-md overflow-auto">
        <div v-if="loading" class="q-pa-md row items-center justify-center">
          <q-circular-progress indeterminate color="primary" size="30px" />
        </div>
        <div
          v-else-if="!listaAtual.length"
          class="column items-center justify-center text-grey-8 text-center"
        >
          <q-icon name="las la-frown" size="40pt" color="grey-8" />
          <span>Nenhum produto encontrado</span>
        </div>
        <produto-comanda
          v-else-if="tab === 'todos'"
          v-for="produto of this.produtosLoader.data"
          :produto="produto"
          :key="produto.id"
          :item="itensByProdutoId[produto.id]"
          @criaItemSeNaoExiste="criaItemSeNaoExiste"
          @adicionar="adicionar"
          @remover="remover"
        />
        <produto-comanda
          v-else
          v-for="item of itensIncluidosBusca"
          :produto="item.produto"
          :key="item.id"
          :item="item"
          @adicionar="adicionar"
          @remover="remover"
        />
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import ProdutoComanda from "./ProdutoComanda.vue";
import { Loader } from "../../core/utils/Loader";
import ProdutoService from "../../core/services/ProdutoService";
import { Comanda } from "../../core/model/Comanda";
import { keyBy } from "lodash";
import ComandaService from "../../core/services/ComandaService";
import { confirmExclusao } from "../../core/utils/AlertUtils";

@Component({
  components: {
    ProdutoComanda,
  },
})
export default class AreaItens extends Vue {
  @Prop({ required: true })
  itens;

  @Prop({ required: true })
  itensIncluidos;

  itensIncluidosBusca = [];

  @Prop({ required: true })
  comanda: Comanda;

  tab = "todos";

  q = "";

  produtosLoader = new Loader(ProdutoService.list as any);

  get itensByProdutoId() {
    return keyBy(this.itens, "produto.id");
  }

  mounted() {
    this.produtosLoader.load();
  }

  @Watch("tab")
  onTabChange() {
    if (this.tab !== "todos") {
      this.loadItensIncluidosBusca();
    }
  }

  get listaAtual() {
    return this.tab === "todos"
      ? this.produtosLoader.data
      : this.itensIncluidosBusca;
  }

  get loading() {
    return this.produtosLoader.loading;
  }

  load() {
    if (this.tab === "todos") {
      this.produtosLoader.load({ q: this.q });
    } else {
      this.loadItensIncluidosBusca();
    }
  }

  criaItemSeNaoExiste(produto) {
    if (!this.itensByProdutoId[produto.id]) {
      this.itens.push({
        quantidade: 0,
        produto: produto,
      });
    }
  }

  async adicionar(item) {
    try {
      const { id } = await ComandaService.saveItem(this.comanda.id, {
        id: item.id,
        produto: {
          id: item.produto.id
        },
        quantidade: item.quantidade
      });
      if (!item.id) {
        const index = this.itens.indexOf(item);
        this.$set(item, "id", id);
      }
    } catch (e) {
      this.$emit("atualizaItens", this.itens.splice(-1, 1));
      console.log(e);
    }
  }

  async remover(item) {
    const confirm = await confirmExclusao();
    if (!confirm) {
      return;
    }
    try {
      this.$emit(
        "atualizaItens",
        this.itens.filter((i) => i.id !== item.id)
      );

      await ComandaService.deleteItem(this.comanda.id, item.id);
    } catch (e) {
      this.itens.push(item);
      console.log(e);
    }
  }

  @Watch("itensIncluidos.length")
  onItensIncluidosChange() {
    this.loadItensIncluidosBusca()
  }

  loadItensIncluidosBusca() {
    const q = this.q.toLowerCase();
    if (!q) {
      this.itensIncluidosBusca = [...this.itensIncluidos];
    } else {
      this.itensIncluidosBusca = this.itensIncluidos.filter((item) => {
        return item.produto.descricao.toLowerCase().includes(q);
      });
    }
  }
}
</script>

<style>

</style>
