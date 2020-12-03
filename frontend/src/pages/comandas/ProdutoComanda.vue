<template>
  <q-card flat bordered>
    <div class="q-pa-md row justify-between items-center">
      <produto-general-card
        :produto="produto"
      />
      <div class="column items-center q-gutter-y-sm">
        <div class="row q-gutter-x-sm items-center">
          <q-btn :disabled="(!item || item.quantidade < 2) " icon="las la-chevron-circle-left" flat round size="14px" color="primary" @click="decrementar()" />
          <span class="text-bold text-primary">
            {{ item? item.quantidade: 0 }}
          </span>
          <q-btn flat icon="las la-chevron-circle-right" round size="14px" color="primary" @click="incrementar()" />
        </div>
        <div class="row q-gutter-md">
          <q-btn v-if="item && item.id && item.produto.categoria == 'COMIDA' " label="Observações" color="blue-5" @click="abrirObservacoesItem" />
          <q-btn v-if="item && item.id" label="Remover" color="red-5" @click="remover" />
          <q-btn v-else label="Adicionar" color="blue-5" @click="adicionar" :disabled="(!item || !item.quantidade)" />
        </div>
      </div>
    </div>
    <observacoes-item-dialog ref="observacoesItemDialog" :item="item" @save="salvarObservacoes" />
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ProdutoGeneralCard from "../../components/produtos/ProdutoGeneralCard.vue";
import { Produto } from "../../core/model/Produto";
import ComandaService from "../../core/services/ComandaService";
import ObservacoesItemDialog from "./ObservacoesItemDialog.vue";

@Component({
  components: { ProdutoGeneralCard, ObservacoesItemDialog },
})
export default class ProdutoComanda extends Vue {
  @Prop({ required: true })
  produto: Produto;

  @Prop()
  item;

  async decrementar() {
    await this.$emit("criaItemSeNaoExiste", this.produto)
    this.item.quantidade--
    if(this.item.id) {
      this.$emit("adicionar", this.item)
    }
  }

  async incrementar() {
    await this.$emit("criaItemSeNaoExiste", this.produto)
    this.item.quantidade++
     if(this.item.id) {
      this.$emit("adicionar", this.item)
    }
  }

  async adicionar() {
    this.$emit("adicionar", this.item)
  }

  async remover() {
    this.$emit("remover", this.item)
  }

  async abrirObservacoesItem() {
    (this.$refs.observacoesItemDialog as any).show(this.item)
  }

  async salvarObservacoes(observacoes) {
    await ComandaService.saveObservacoes(this.item.id, observacoes)
  }
}
</script>

<style lang="stylus" scoped>
.codigo {
  letter-spacing: 0.5px;
}

.tag-preco {
  border-radius: 3px;
  border: 1px $primary solid;
}
</style>
