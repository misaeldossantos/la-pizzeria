<template>
  <div>
    <q-card class="q-pa-md" bordered flat>
      <div class="row q-gutter-x-md justify-between">
        <div class="row q-gutter-x-md items-center">
          <div class="column items-center q-gutter-y-sm">
            <span class="text-bold text-primary"> MESA</span>
            <div class="bg-grey-4 q-pa-md rounded-borders q-px-lg">
              <span class="text-h6 text-bold"> {{ comanda.mesa.numero }} </span>
            </div>
          </div>
          <q-separator vertical />
          <div class="column q-gutter-y-sm">
            <div class="row items-center q-gutter-x-md">
              <span class="">
                Comanda
                <span class="text-primary text-bold">#{{ comanda.id }}</span>
              </span>
            </div>
            <span>
              <span class="text-primary text-bold">Garçom:</span>
              {{ comanda.garcom.nome }}
            </span>
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
            <div class="tag-preco q-mt-sm q-px-md">
              <div class="row q-gutter-x-sm justify-center items-center">
                <span class="q-pl-sm text-subtitle1 text-primary">
                  Valor parcial: {{ comanda.valorTotal | money }}
                </span>
                <q-icon name="las la-tag" size="16px" class="text-primary" />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-center q-gutter-x-md">
          <q-btn
            icon="las la-bullhorn"
            @click="notificar"
            round
            color="orange"
            v-if="comandaAberta && ms.isCozinheiro"
          >
            <q-tooltip
              content-class="bg-grey-8"
              content-style="font-size: 14px"
              :offset="[10, 10]"
            >
              Notificar
            </q-tooltip>
          </q-btn>
          <q-btn
            icon="las la-money-bill"
            round
            color="positive"
            @click="pagar"
            v-if="(comanda.status !== 'PAGO') && ms.isAdm"
          >
            <q-tooltip
              content-class="bg-grey-8"
              content-style="font-size: 14px"
              :offset="[10, 10]"
            >
              Finalizar e Pagar
            </q-tooltip>
          </q-btn>
          <q-btn
            icon="las la-edit"
            round
            color="blue"
            @click="editar"
            v-if="comandaAberta && !ms.isCozinheiro"
          >
            <q-tooltip
              content-class="bg-grey-8"
              content-style="font-size: 14px"
              :offset="[10, 10]"
            >
              Editar
            </q-tooltip>
          </q-btn>
          <q-btn
            icon="las la-trash-alt"
            round
            color="negative"
            @click="excluir"
            v-if="comandaAberta && !ms.isCozinheiro"
          >
            <q-tooltip
              content-class="bg-grey-8"
              content-style="font-size: 14px"
              :offset="[10, 10]"
            >
              Excluir
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Observer } from "mobx-vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import StatusComandaIndicator from "../../components/StatusComandaIndicator.vue";
import { Comanda } from "../../core/model/Comanda";
import MemoryService from '../../core/services/MemoryService'

@Observer
@Component({
  components: { StatusComandaIndicator },
})
export default class ComandaCard extends Vue {
  @Prop({ required: true })
  comanda: Comanda;

  ms = MemoryService

  abrirModal() {
    (this.$refs.cadastroDialogRef as any).show();
  }
  pagar() {
    this.$emit("pagar", this.comanda);
  }

  excluir() {
    this.$emit("excluir", this.comanda.id);
  }

  editar() {
    this.$router.push(`/comandas/${this.comanda.id}`);
  }

  notificar() {
    this.$emit("notificar", this.comanda.id);
  }

  get comandaAberta() {
    return this.comanda.status === "ABERTO";
  }
}
</script>

<style lang="stylus" scoped>
.tag-preco {
  border-radius: 3px;
  border: 1px $primary solid;
}
</style>
