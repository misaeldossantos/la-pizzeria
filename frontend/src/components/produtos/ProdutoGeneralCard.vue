<template>
  <div class="row items-center q-gutter-x-lg">
    <q-img
      contain
      width="100px"
      height="100px"
      :src="`/api/produtos/${produto.id}/foto` | fileUrl"
    />
    <div class="column col-grow">
      <div class="row items-center q-gutter-x-md">
        <span class="text-h6 text-bold"> {{ produto.descricao }}</span>
        <span
          v-if="!ocultaCodigo"
          class="codigo q-px-md q-py-sm bg-grey-4 text-bold text-primary rounded-borders"
        >
          #{{ produto.id }}
        </span>
      </div>
      <span class="text-primary">
        {{ produto.categoria | categoriaProduto }}
      </span>
      <div class="row">
        <div class="tag-preco q-mt-sm">
          <div class="row q-gutter-x-sm justify-center items-center">
            <span class="q-pl-sm text-subtitle1 text-primary">
              {{ produto.preco | money }}</span
            >
            <q-icon name="las la-tag" size="16px" class="text-primary" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Produto } from "../../core/model/Produto";

@Component({
  components: {},
})
export default class ProdutoGeneralCard extends Vue {
  @Prop({ required: true })
  produto: Produto;

  @Prop()
  ocultaCodigo: boolean;
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
