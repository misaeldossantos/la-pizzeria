<template>
  <q-card :class="innerClass" class="q-pa-md" bordered flat>
    <div class="row items-center justify-between">
      <div class="row items-center q-gutter-x-lg">
        <q-img contain width="100px" height="100px" :src="produto.fotoUrl" />
        <div class="column col-grow">
          <div class="row items-center q-gutter-x-md">
            <span class="text-h6 text-bold"> {{ produto.descricao }} </span>
            <span
              class="codigo q-px-md q-py-sm bg-grey-4 text-bold text-primary rounded-borders"
              >#{{ produto.id }}</span
            >
          </div>
          <span class="text-primary">
            {{ produto.categoria | categoriaProduto }}
          </span>
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
      <div class="row items-center q-gutter-x-md" v-if="ms.isAdm">
        <q-btn round icon="las la-edit" color="positive" @click="editar" />
        <q-btn
          round
          icon="las la-trash-alt"
          color="negative"
          @click="excluir"
        />
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { Observer } from "mobx-vue";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Produto } from "../../core/model/Produto";
import MemoryService from "../../core/services/MemoryService";

@Observer
@Component({
  components: {},
})
export default class ProdutoCard extends Vue {
  @Prop({ required: true })
  produto: Produto;

  ms = MemoryService

  @Prop()
  innerClass: string;

  excluir() {
    this.$emit("excluir", this.produto.id);
  }

  editar() {
    this.$emit("editar", this.produto.id);
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
