<template>
  <div>
    <app-header title="Mesas" />
    <div class="column q-gutter-y-md q-py-lg q-px-md">
      <div class="row items-center q-gutter-x-md justify-between">
        <div class="row q-gutter-x-md">
          <q-input
            v-model="q"
            outlined
            :size="40"
            placeholder="Pesquise por número..."
            @keyup.enter="load"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>

          </q-input>
          <q-btn color="primary" icon="search" size="18px" @click="load"></q-btn>
          <div class="q-gutter-sm">
            <q-radio v-model="disponivel" :val="null" label="Todas as mesas" />
            <q-radio v-model="disponivel" :val="true" label="Apenas disponíveis" />
            <q-radio v-model="disponivel" :val="false" label="Apenas indisponíveis" />
          </div>
        </div>
      </div>

      <q-separator inset />

      <div class="q-px-md row q-gutter-x-sm items-center">
        <q-btn
          label="Gerar mesas em um intervalo"
          color="primary"
          @click="gerarNumerosModal = true"
          v-if="ms.isAdm"
        />
        <q-btn icon="las la-sync" flat @click="loadAll" />
        <q-dialog
          v-if="ms.isAdm"
          v-model="gerarNumerosModal"
          persistent
          transition-show="jump-down"
          transition-hide="jump-up"
          position="top"
        >
          <q-card style="width: 100%; max-width: 900px">
            <q-card-section
              class="row bg-grey-9 text-white justify-between items-center"
            >
              <div class="text-h6">Gerar mesas em um intervalo</div>
              <q-btn round flat icon="close" v-close-popup></q-btn>
            </q-card-section>

            <q-separator />
            <q-card-section>
              <div class="q-pa-md row q-gutter-x-md items-center">
                <q-input
                  class="col-grow"
                  v-model.number="rangeGerador.min"
                  label="De"
                  type="number"
                />
                <q-input
                  class="col-grow"
                  v-model.number="rangeGerador.max"
                  label="Até"
                  type="number"
                />
                <div>
                  <q-btn
                    color="positive"
                    @click="gerarIntervalo"
                    :disabled="disableGerarIntervalo"
                    label="Gerar"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>

      <div class="row items-center q-gutter-x-md q-gutter-y-md q-pa-md">
        <div @click="addNovaMesa" class="add-new-card" v-if="ms.isAdm && !mesa">
          <q-icon name="las la-plus" size="50px" color="grey-8" />
        </div>
        <mesa-card
          v-else-if="ms.isAdm"
          :mesa="mesa"
          @onSave="onNewSave"
          ref="novaMesaRef"
          @modoEdicaoChange="onModoEdicaoNovoChange"
          :openAsModoEdicao="true"
        />
        <mesa-card
          v-for="mesa of mesas"
          :key="mesa.id"
          :mesa="mesa"
          @excluir="excluir"
          @editar="editar"
          @onSave="salvar"
          @onDelete="loadAll"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import AppHeader from "../../components/AppHeader.vue";
import { NivelAcessoEnum, Usuario } from "../../core/model/Usuario";
import UsuarioService from "../../core/services/UsuarioService";
import MesaService from "../../core/services/MesaService";
import MemoryService from "../../core/services/MemoryService";
import MesaCard from "./MesaCard.vue";
import { confirmExclusao } from "../../core/utils/AlertUtils";
import { Mesa } from "../../core/model/Mesa";
import { Notify } from "quasar";
import { Observer } from "mobx-vue";

@Observer
@Component({
  components: { AppHeader, MesaCard },
})
export default class Mesas extends Vue {
  gerarNumerosModal = false;
  disponivel = null

  ms = MemoryService

  rangeGerador = {
    min: 0,
    max: 0,
  };

  q = "";
  page = 1;

  mesas = [];

  inputValue: string = "";

  mesa = null;

  addNovaMesa() {
    this.mesa = {
      numero: 0,
      disponivel: true,
    };
  }

  cadastrarNovo() {}

  async load() {
    this.loadAll();
  }

  mounted() {
    this.loadAll();
  }

  onChange() {
    this.loadAll();
  }

  async excluir(id) {
    const confirmado = await confirmExclusao();
    if (confirmado) {
      await UsuarioService.delete(id);
      this.load();
    }
  }

  editar(id: number) {
    (this.$refs.cadastroDialogRef as any).show(id);
  }

  async salvar(mesa: Mesa) {
    this.loadAll();
    console.log(mesa);
  }

  async loadAll() {
    this.mesas = (
      await MesaService.list({
        q: this.q,
        page: 1,
        rpp: 10,
        disponivel: this.disponivel
      })
    ).list;
  }

  async onNewSave(mesa) {
    this.mesa = null;
    this.loadAll();
  }

  onModoEdicaoNovoChange(value) {
    if (!value) {
      this.mesa = null;
    }
  }

  get disableGerarIntervalo() {
    return (
      !this.rangeGerador.min ||
      !this.rangeGerador.max ||
      this.rangeGerador.min > this.rangeGerador.max
    );
  }

  async gerarIntervalo() {
    await MesaService.gerarIntervalo(this.rangeGerador);
    this.loadAll();
    this.rangeGerador = {
      min: 0,
      max: 0,
    };
    this.gerarNumerosModal = false;
  }

  @Watch("disponivel")
  onDisponivelChange() {
    this.loadAll()
  }
}
</script>

<style lang="stylus" scoped>
.add-new-card {
  width: 300px;
  height: 280px;
  background-color: $grey-4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
}
</style>
