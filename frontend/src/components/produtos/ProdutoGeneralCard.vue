<template>
  <div class="row items-center q-gutter-x-lg">
    <q-img
      contain
      width="100px"
      height="100px"
      src="https://www.drogariaminasbrasil.com.br/media/product/084/refrigerante-coca-cola-lata-350ml-80c.jpg"
    />
    <div class="column col-grow">
      <div class="row items-center q-gutter-x-md">
        <span class="text-h6 text-bold"> Refrigerante </span>
        <span
          class="codigo q-px-md q-py-sm bg-grey-4 text-bold text-primary rounded-borders"
          >#9999</span
        >
      </div>
      <span class="text-primary">
        {{ "BEBIDA" | categoriaProduto }}
      </span>
      <div class="tag-preco q-mt-sm">
        <div class="row q-gutter-x-sm justify-center items-center">
          <span class="q-pl-sm text-subtitle1 text-primary">
            {{ 1000 | money }}</span
          >
          <q-icon name="las la-tag" size="16px" class="text-primary" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ProdutoGeneralCard extends Vue {}
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
