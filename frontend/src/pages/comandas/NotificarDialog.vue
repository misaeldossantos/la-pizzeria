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
        <div class="text-h6">Notificar entrega</div>
        <q-btn round flat icon="close" v-close-popup></q-btn>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="column q-gutter-y-md">
          <q-toggle
            v-for="item of itens"
            :key="item.id"
            :label="item.produto.descricao"
            v-model="item.entregue"
          />
          <div class="row items-center justify-center" v-if="!itens.length">
            <span class="text-h6">Nenhum item para ser entregue.</span>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="bg-grey-11 q-pa-md">
        <q-btn flat label="Cancelar" color="dark" v-close-popup />
        <q-btn label="Finalizar" color="positive" @click="notificar" />
      </q-card-actions>
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
import ComandaService from "../../core/services/ComandaService";
import ProdutoService from "../../core/services/ProdutoService";
import { confirmExclusao } from "../../core/utils/AlertUtils";

@Component({
  components: {},
})
export default class NotificarDialog extends Vue {

  idComanda = null

  dialogOpened = false;
  itens = [];

  show(id) {
    this.dialogOpened = true;
    this.loadComanda(id);
  }

  async loadComanda(id) {
    try {
      this.idComanda = id
      this.$q.loading.show();
      this.itens = (await ComandaService.listItens(id)).filter(
        (item) => !item.entregue && item.produto.categoria === "COMIDA"
      );
    } catch (e) {
      console.log(e);
    } finally {
      this.$q.loading.hide();
    }
  }

  get isNew() {
    return true;
  }

  async notificar() {
    try {
      this.$q.loading.show();
      await ComandaService.notificarEntrega(
        this.idComanda,
        this.itens.filter((item) => item.entregue).map((item) => item.id)
      );
      this.dialogOpened = false;
    } catch (e) {
      console.log(e);
    } finally {
      this.$q.loading.hide();
    }
  }
}
</script>

<style>

</style>
