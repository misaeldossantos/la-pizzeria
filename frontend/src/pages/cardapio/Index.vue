<template>
  <div class="container">
    <div
      class="q-pa-md q-ma-md content q-gutter-y-lg overflow-auto full-height rounded-borders"
    >
      <div class="column items-center">
        <q-img
          src="../../assets/logotipo.png"
          height="100px"
          width="100px"
          class="logotipo"
        />
        <span class="text-h6 text-bold text-grey-8">
          Bem-vindo à La Pizzeria
        </span>
        <span> CARDÁPIO </span>
      </div>

      <div v-if="loading" class="column q-gutter-y-sm items-center">
        <q-circular-progress indeterminate color="grey-8" size="30px" />
        <span class="text-center text-bold"> Carregando produtos... </span>
      </div>

      <div v-else class="bg-white rounded-borders">
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
        <div v-for="produto of produtos" :key="produto.id">
          <div class="q-pa-md">
            <produto-general-card :ocultaCodigo="true" :produto="produto" />
          </div>
          <q-separator />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import ProdutoGeneralCard from "../../components/produtos/ProdutoGeneralCard.vue";
import ProdutoService from "../../core/services/ProdutoService";

@Component({
  components: { ProdutoGeneralCard },
})
export default class Cardapio extends Vue {
  tab = "todos";
  produtos = [];
  loading = false;

  @Watch("tab")
  onChangeTab() {
    this.loadProdutos()
  }

  async loadProdutos() {
    try {
      this.loading = true;
      this.produtos = (await ProdutoService.list({
        categoria: this.tab === "todos"? null: this.tab
      })).list;
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  mounted() {
    this.loadProdutos();
  }
}
</script>

<style lang="stylus" scoped>
.container {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('https://i.pinimg.com/736x/01/98/0d/01980df51785f782f0dd775b3f3cc16b.jpg');
}

.content {
  background-color: rgba(white, 0.8);
}
</style>
