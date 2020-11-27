<template>
  <div>
    <q-card class="q-pa-md" bordered flat>
      <div class="row q-gutter-x-md justify-between">
        <div class="row q-gutter-x-md items-center">
          <div class="column items-center q-gutter-y-sm">
            <span class="text-bold text-primary"> MESA</span>
            <div class="bg-grey-4 q-pa-md rounded-borders q-px-lg">
              <span class="text-h6 text-bold"> 444 </span>
            </div>
          </div>
          <q-separator vertical />
          <div class="column q-gutter-y-sm">
            <div class="row items-center q-gutter-x-md">
              <span class="">
                Comanda <span class="text-primary text-bold">#05</span>
              </span>
            </div>
            <span>
              <span class="text-primary text-bold">Garçom:</span> Bruno
            </span>
            <span>
              <span class="text-primary text-bold col-4">Para viagem:</span>
              {{ true | booleanLabel }}
            </span>
            <span>
              <span class="text-primary text-bold col-4">Status:</span>
              finalizado
            </span>
            <div class="tag-preco q-mt-sm q-px-md">
              <div class="row q-gutter-x-sm justify-center items-center">
                <span class="q-pl-sm text-subtitle1 text-primary">
                  Valor parcial: {{ 100 | money }}
                </span>
                <q-icon name="las la-tag" size="16px" class="text-primary" />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-center q-gutter-x-md">
          <q-btn
            icon="las la-money-bill"
            round
            color="positive"
            @click="pagar"
          >
            <q-tooltip
              content-class="bg-grey-8"
              content-style="font-size: 14px"
              :offset="[10, 10]"
            >
              Pagar
            </q-tooltip>
          </q-btn>
          <q-btn icon="las la-edit" round color="blue" @click="editar">
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
import { Vue, Component, Prop } from "vue-property-decorator";
import { Usuario } from "../../core/model/Usuario";

@Component({
  components: {},
})
export default class ComandaCard extends Vue {
  @Prop({ required: true })
  usuario: Usuario;

  pagar() {
    this.$emit("pagar", this.usuario.id);
  }

  excluir() {
    this.$emit("excluir", this.usuario.id);
  }

  editar() {
    this.$emit("editar", this.usuario.id);
  }
}
</script>

<style lang="stylus" scoped>
.tag-preco {
  border-radius: 3px;
  border: 1px $primary solid;
}
</style>
