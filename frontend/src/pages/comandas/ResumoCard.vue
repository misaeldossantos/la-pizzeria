<template>
  <q-card class="col col-grow card bg-white" bordered flat>
    <div>
      <div class="toc q-pa-md q-pb-xl q-gutter-y-md column">
        <div>
          <span class="text-h6">Resumo</span>
        </div>
        <div v-if="!itens.length" class="column items-center justify-center q-pa-md">
          Nenhum item adicionado!
        </div>
        <li v-for="item of itens" :key="item.id">
          <span class="title">{{ item.produto.descricao }}</span>
          <span class="chapter">{{
            (item.produto.preco * item.quantidade) | money
          }}</span>
        </li>
      </div>
      <q-separator />
      <div class="row q-pa-md q-gutter-md items-center justify-end">
        <span class="text-h6 text-bold">Total:</span>
        <span class="text-h6 text-bold text-primary">{{ (total || 0) | money }}</span>
      </div>
      <div class="row q-pa-md justify-end">
        <q-btn
          label="Pagar comanda"
          color="green"
        />
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ResumoCard extends Vue {
  @Prop({ required: true })
  itens: any[];

  get total() {
    return this.itens
      .map((item) => (item.produto.preco * item.quantidade))
      .reduce((a, b) => a + b, 0);
  }
}
</script>

<style scoped>
.toc li {
  display: flex;
}

.toc li .title {
  order: 1;
  padding-right: 10px;
}

.toc li .chapter {
  order: 3;
  padding-left: 10px;
  text-align: right;
}

.toc li::after {
  content: "";
  border-bottom: 1px dashed;
  flex-grow: 1;
  order: 2;
}
</style>
