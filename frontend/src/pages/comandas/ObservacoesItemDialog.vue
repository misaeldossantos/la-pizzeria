<template>
  <q-dialog
    v-model="dialogOpened"
    persistent
    transition-show="jump-down"
    transition-hide="jump-up"
  >
    <q-card style="width: 600px; max-width: 900px">
      <q-card-section
        class="row bg-grey-9 text-white justify-between items-center"
      >
        <div class="row q-gutter-x-md items-center">
          <div class="text-h6">Observações</div>
        </div>
        <q-btn round flat icon="close" v-close-popup></q-btn>
      </q-card-section>

      <q-separator />

      <q-card-section style="height: 400px; overflow: auto">
        <div class="column q-gutter-md">
          <q-checkbox
            v-for="(observacao, index) of observacoes"
            :key="index"
            v-model="observacao.incluido"
            :label="observacao.ingrediente.descricao"
          />

        </div>
        <div
            class="row items-center justify-center full-height"
            v-if="!observacoes.length"
          >
            <span class="text-h6">Nenhum ingrediente cadastrado para este produto.</span>
          </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-grey-11 q-pa-md">
        <q-btn flat label="Cancelar" color="dark" v-close-popup />
        <q-btn label="Salvar" color="positive" @click="salvar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {
  categoriaOptions,
  unidadeMedidaOptions,
} from "../../core/model/Produto";
import { nivelAcessoOptions, Usuario } from "../../core/model/Usuario";
import ArquivoService from "../../core/services/ArquivoService";
import ComandaService from "../../core/services/ComandaService";
import ProdutoService from "../../core/services/ProdutoService";
import { confirmExclusao } from "../../core/utils/AlertUtils";

const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),

  newItem,

  ...arr.slice(index),
];

@Component({
  components: {},
})
export default class ObservacoesItemDialog extends Vue {
  dialogOpened: boolean = false;

  item = null

  observacoes = [];

  show(item) {
    this.dialogOpened = true;
    this.item = item
    if (!this.observacoes.length) {
      this.carregarIngredientesItem();
    }
  }

  async carregarIngredientesItem() {
    const observacoes = await ComandaService.getObservacoes(this.item.id)

    if(observacoes.length) {
      this.observacoes = observacoes
      return;
    }

    const ingredientes = await ProdutoService.getIngredientesItem(
      this.item.produto.id
    );

    this.observacoes = ingredientes.map((ingrediente) => {
      return { ingrediente, item: this.item, incluido: true };
    });
  }

  excluir() {}

  salvar() {
    this.dialogOpened = false;
    this.$emit("save", this.observacoes);
  }
}
</script>

<style>

</style>
