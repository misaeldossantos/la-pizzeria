<template>
  <q-card class="col col-grow card bg-white" bordered flat>
    <div>
      <div class="toc q-pa-md q-pb-xl q-gutter-y-md column">
        <div>
          <span class="text-h6">Resumo</span>
        </div>
        <li>
          <span class="title">Foo</span>
          <span class="chapter">Chapter 1</span>
        </li>
        <li>
          <span class="title">Bar</span>
          <span class="chapter">Chapter 2</span>
        </li>
      </div>
      <q-separator />
      <div class="row q-pa-md q-gutter-md items-center justify-end">
        <span class="text-h6 text-bold">Total:</span>
        <span class="text-h6 text-bold text-primary">{{ 120 | money }}</span>
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Comanda } from "../../core/model/Comanda";

@Component({
  components: {},
})
export default class DadosIniciaisCard extends Vue {

  @Prop({ required: true })
  comanda: Comanda;

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
