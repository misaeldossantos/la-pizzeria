<template>
  <q-card class="q-pa-md col-grow" bordered flat>
    <div class="column q-gutter-y-md">
      <span class="text-h6">Dados iniciais</span>
      <q-select
        option-label="numero"
        :options="mesaAutoComplete.options"
        label="Digite e selecione a mesa"
        clearable
        outlined
        use-input
        dense
        :disabled="comanda.id"
        v-model="comanda.mesa"
        @filter="mesaAutoComplete.filter"
        emit-value
      />
      <q-select
        option-label="nome"
        :options="garcomAutoComplete.options"
        label="Digite e selecione o garçom"
        clearable
        outlined
        use-input
        dense
        v-model="comanda.garcom"
        @filter="garcomAutoComplete.filter"
        emit-value
        v-if="!ms.isGarcom"
      />
      <q-checkbox
        dense
        v-model="comanda.paraViagem"
        label="Para viagem"
        color="primary"
      />

      <div class="row justify-end">
        <q-btn label="Salvar" :disabled="disableSave" color="primary" @click="salvar()" />
      </div>

    </div>
  </q-card>
</template>

<script lang="ts">
import { Observer } from "mobx-vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import { Comanda } from "../../core/model/Comanda";
import { NivelAcessoEnum } from "../../core/model/Usuario";
import MesaService from "../../core/services/MesaService";
import UsuarioService from "../../core/services/UsuarioService";
import MemoryService from "../../core/services/MemoryService";
import AutoComplete from "../../core/utils/AutoComplete";

@Observer
@Component({
  components: {},
})
export default class DadosIniciaisCard extends Vue {

  ms = MemoryService

  garcomAutoComplete = new AutoComplete({
    loadCallback: (q) => UsuarioService.list({ q, nivelAcesso: NivelAcessoEnum.GARCOM } as any),
  });
  mesaAutoComplete = new AutoComplete({
    loadCallback: (q) => MesaService.list({ q } as any),
  });

  @Prop({ required: true })
  comanda: Comanda;

  salvar() {
    this.$emit("salvar");
  }

  get disableSave() {
    return !this.comanda.mesa || !this.comanda.garcom
  }
}
</script>

<style>

</style>
