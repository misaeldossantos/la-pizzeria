<template>
  <q-card class="q-pa-md col-grow" bordered flat>
    <div class="column q-gutter-y-sm">
      <span class="text-h6">Dados iniciais</span>
      <q-select
        option-value="value"
        option-label="label"
        :options="[{ label: 'Mesa 1', value: 1 }]"
        label="Selecionar mesa"
        clearable
        outlined
        dense
        emit-value
      />
      <q-select
        option-value="value"
        option-label="label"
        :options="[{ label: 'Garçom 1', value: 1 }]"
        label="Selecionar garçom"
        clearable
        outlined
        dense
        emit-value
      />
      <q-checkbox label="Para viagem" color="primary" />
    </div>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DadosIniciaisCard extends Vue {}
</script>

<style>

</style>
