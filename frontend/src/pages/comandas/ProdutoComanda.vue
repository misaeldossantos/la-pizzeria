<template>
  <q-card flat bordered>
    <div class="q-pa-md row justify-between items-center">
      <produto-general-card
        :produto="produto"
      />
      <div class="column items-center q-gutter-y-sm">
        <div class="row q-gutter-x-sm items-center">
          <q-btn icon="las la-chevron-circle-left" flat round size="14px" color="primary" />
          <span class="text-bold text-primary">
            {{ 2 }}
          </span>
          <q-btn flat icon="las la-chevron-circle-right" round size="14px" color="primary" />
        </div>
        <q-btn label="Adicionar" color="blue-5" />
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ProdutoGeneralCard from "../../components/produtos/ProdutoGeneralCard.vue";
import { Produto } from "../../core/model/Produto";

@Component({
  components: { ProdutoGeneralCard },
})
export default class ProdutoComanda extends Vue {
  @Prop({ required: true })
  produto: Produto;
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
