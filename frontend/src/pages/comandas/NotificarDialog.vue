<template>
  <q-dialog
    v-model="dialogOpened"
    persistent
    transition-show="jump-down"
    transition-hide="jump-up"
  >
    <q-card style="width: 800px; max-width: 900px">
      <q-card-section
        class="row bg-grey-9 text-white justify-between items-center"
      >
        <div class="text-h6">{{ !isNew ? "Editar" : "Cadastrar" }} produto</div>
        <q-btn round flat icon="close" v-close-popup></q-btn>
      </q-card-section>

      <q-separator />

      <q-card-section>

      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import {
  categoriaOptions,
  Produto,
  unidadeMedidaOptions,
} from "../../core/model/Produto";
import ArquivoService from "../../core/services/ArquivoService";
import ProdutoService from "../../core/services/ProdutoService";
import { confirmExclusao } from "../../core/utils/AlertUtils";

@Component({
  components: { },
})
export default class ProdutoDialog extends Vue {}
</script>

<style>

</style>
