<template>
  <q-card class="q-pa-md col-4" bordered flat>
    <div class="column q-pb-md q-gutter-y-sm">
      <span class="text-h6">Dados da comanda</span>
      <div class="column q-gutter-y-sm">
        <div class="row items-center q-gutter-x-md">
          <span class="">
            Comanda <span class="text-primary text-bold">#{{comanda.id}}</span>
          </span>
        </div>
        <span> <span class="text-primary text-bold">Garçom:</span> {{comanda.garcom.nome}} </span>
        <span>
          <span class="text-primary text-bold col-4">Para viagem:</span>
          {{ comanda.paraViagem | booleanLabel }}
        </span>
        <span class="row items-center">
          <span class="text-primary text-bold q-mr-sm">Status:</span>
          <status-comanda-indicator :status="comanda.status" />
          <span>
            {{ comanda.status | statusComanda }}
          </span>
        </span>
        <div class="row">
          <div class="tag-preco q-mt-sm q-px-md">
            <div class="row q-gutter-x-sm justify-center items-center">
              <span class="q-pl-sm text-subtitle1 text-primary">
                Total da comanda: {{ comanda.valorTotal | money }}
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
import { Comanda } from "../../core/model/Comanda";
import StatusComandaIndicator from "../../components/StatusComandaIndicator.vue";

@Component({
  components: { StatusComandaIndicator },
})
export default class DadosComanda extends Vue {
  @Prop({ required: true })
  comanda: Comanda;
}
</script>

<style lang="stylus" scoped>
.tag-preco {
  border-radius: 3px;
  border: 1px $primary solid;
}
</style>
