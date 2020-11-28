<template>
  <q-card class="q-pa-md col-4" bordered flat>
    <div class="column q-pb-md q-gutter-y-sm">
      <span class="text-h6">Dados da comanda</span>
      <div class="column q-gutter-y-sm">
        <div class="row items-center q-gutter-x-md">
          <span class="">
            Comanda <span class="text-primary text-bold">#05</span>
          </span>
        </div>
        <span> <span class="text-primary text-bold">Garçom:</span> Bruno </span>
        <span>
          <span class="text-primary text-bold col-4">Para viagem:</span>
          {{ true | booleanLabel }}
        </span>
        <span>
          <span class="text-primary text-bold col-4">Status:</span>
          finalizado
        </span>
        <div class="row">
          <div class="tag-preco q-mt-sm q-px-md">
            <div class="row q-gutter-x-sm justify-center items-center">
              <span class="q-pl-sm text-subtitle1 text-primary">
                Total da comanda: {{ 100 | money }}
              </span>
              <q-icon name="las la-tag" size="16px" class="text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DadosComanda extends Vue {}
</script>

<style lang="stylus" scoped>
.tag-preco {
  border-radius: 3px;
  border: 1px $primary solid;
}
</style>
