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
        <div class="column">
          <div class="row q-gutter-x-md q-gutter-y-md">
            <div class="q-gutter-y-lg column col-grow">
              <div>
                <q-input v-model="produto.descricao" label="Descrição" clearable />
              </div>
              <div>
                <q-input
                  v-model.number="produto.preco"
                  label="Preço"
                  type="number"
                  clearable
                />
              </div>
              <q-input type="number" v-model.number="produto.quantidadeUnidade" label="Quantidade da unidade" clearable />
              <div>
                <q-select
                  option-value="value"
                  option-label="label"
                  :options="unidadeMedidaOptions"
                  v-model="produto.unidadeMedida"
                  label="Unidade de medida"
                  clearable
                  emit-value
                />
              </div>
              <div>
                <q-select
                  option-value="value"
                  option-label="label"
                  :options="categoriasOptions"
                  v-model="produto.categoria"
                  label="Categoria"
                  clearable
                  emit-value
                />
              </div>
            </div>
            <div class="q-gutter-y-sm col-5">
              <span class="text-subtitle2"> Foto do produto </span>
              <q-uploader
                flat
                bordered
                color="grey-11"
                text-color="black"
                ref="fotoUploader"
                @added="(files) => (foto = files[0])"
                @removed="foto = null"
              />
              <div class="row justify-end q-pa-sm"></div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="justify-between bg-grey-11 q-pa-md">
        <q-btn icon="las la-clipboard-list" color="primary" label="Ingredientes" @click="showIngredientes"/>
        <div class="row q-gutter-x-md items-center">
          <q-btn flat label="Cancelar" color="dark" v-close-popup />
          <q-btn
            label="Excluir"
            flat
            color="negative"
            v-close-popup
            @click="excluir"
            v-if="!isNew"
          />
          <q-btn label="Salvar" color="positive" @click="salvar" />
        </div>
      </q-card-actions>
    </q-card>

    <ingredientes-dialog
      ref="ingredientesDialog"
      @save="saveIngredientes"
    />
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
import IngredientesDialog from './IngredientesDialog.vue'

@Component({
  components: {IngredientesDialog},
})
export default class ProdutoDialog extends Vue {
  dialogOpened: boolean = false;

  foto: File = null;

  produto: Produto = new Produto();

  unidadeMedidaOptions = unidadeMedidaOptions;

  categoriasOptions = categoriaOptions;

  show(id: number) {
    this.reset();
    this.dialogOpened = true;
    if (id) {
      this.load(id);
    }
  }

  async load(id) {
    this.$q.loading.show();
    this.produto = await ProdutoService.get(id);
    this.$q.loading.hide();
  }

  async salvar() {
    try {
      await this.salvarFoto();
      this.$q.loading.show();
      const produto = await ProdutoService.save(this.produto);
      this.dialogOpened = false;
      this.$emit("onSave", produto);
    } catch (e) {
      console.log(e);
    } finally {
      this.$q.loading.hide();
    }
  }

  async salvarFoto() {
    if (this.foto) {
      this.produto.foto = await ArquivoService.upload(this.foto);
    } else {
      this.produto.foto = null;
    }
  }

  async excluir() {
    this.$q.loading.show();
    const confirmado = await confirmExclusao();
    if (confirmado) {
      await ProdutoService.delete(this.produto.id);
      this.dialogOpened = false;
      this.$emit("onDelete");
    }
    this.$q.loading.hide();
  }

  reset() {
    this.produto = new Produto();
    this.foto = null;
  }

  get isNew() {
    return !this.produto?.id;
  }

  showIngredientes() {
    if(!this.produto.ingredientes) {
      this.produto.ingredientes = (this.produto as any).__ingredientes__ || []
    }
    (this.$refs.ingredientesDialog as any).show(this.produto.ingredientes)
  }

  @Watch("produto", {immediate: true})
  async handleProduto(produto) {
    if (produto.fotoUrl) {
      const blob: any = await fetch(produto.fotoUrl);
      const file = new File([blob], "foto.png", {
        type: "image/jpg",
      });
      (this.$refs.fotoUploader as any)?.addFiles([file]);
    }
  }

  saveIngredientes(ingredientes) {
    this.produto.ingredientes = ingredientes
  }
}
</script>

<style>

</style>
