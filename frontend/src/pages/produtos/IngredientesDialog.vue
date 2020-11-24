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
          <div class="text-h6">Ingredientes</div>
        </div>
        <q-btn round flat icon="close" v-close-popup></q-btn>
      </q-card-section>

      <q-separator />

      <q-card-section style="height: 400px; overflow: auto">
        <div class="q-gutter-y-md" v-if="ingredientes.length">
          <div
            v-for="(ingrediente, index) of ingredientes"
            :key="index"
            class="row items-center q-gutter-x-sm"
          >
            <q-input
              v-model="ingrediente.descricao"
              class="col-grow"
              outlined
              label="Descrição"
            />
            <q-btn round flat icon="las la-trash-alt" @click="remover(index)" />
            <q-btn round flat icon="las la-plus" @click="addNovo(index)" />
          </div>
        </div>

        <div
          v-else
          class="column items-center full-height justify-center q-gutter-y-md q-py-lg"
        >
          <span class="text-h6">
            Ainda não existes ingredientes cadastrados!
          </span>
          <q-btn icon="las la-plus" round @click="addNovo(0)" color="positive">
            <q-tooltip
              content-class="bg-grey-8"
              content-style="font-size: 14px"
              :offset="[10, 10]"
            >
              Adicionar ingrediente
            </q-tooltip>
          </q-btn>
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
import UsuarioService from "../../core/services/UsuarioService";
import { confirmExclusao } from "../../core/utils/AlertUtils";

const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),

  newItem,

  ...arr.slice(index),
];

@Component({
  components: {},
})
export default class IngredientesDialog extends Vue {
  dialogOpened: boolean = false;

  ingredientes = []

  show(ingredientes = []) {
    this.ingredientes = ingredientes
    this.dialogOpened = true;
  }

  excluir() {}

  salvar() {
    this.dialogOpened = false
    this.$emit("save", this.ingredientes)
  }

  addNovo(index) {
    this.ingredientes = insert(this.ingredientes, index + 1, {
      descricao: "",
    });
  }

  remover(index) {
    this.ingredientes.splice(index, 1);
  }
}
</script>

<style>

</style>
