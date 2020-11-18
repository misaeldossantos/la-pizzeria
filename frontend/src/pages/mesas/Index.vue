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
        </div>
      </div>

      <q-separator inset />

      <div
        v-if="!mesas.length"
        class="column q-gutter-y-md items-center justify-center q-pa-md"
      >
        <q-icon name="las la-frown" size="40pt" color="grey-8" />
        <span class="text-grey-8 text-center text-h6">
          Nenhuma mesa encontrada!
        </span>
      </div>

      <div class="row items-center q-gutter-x-md q-gutter-y-md q-pa-md">
        <div @click="addNovaMesa" class="add-new-card" v-if="!mesa">
          <q-icon name="las la-plus" size="50px" color="grey-8" />
        </div>
        <mesa-card
          v-else
          :mesa="mesa"
          @onSave="onNewSave"
          ref="novaMesaRef"
          :openAsModoEdicao="true"
        />
        <mesa-card
          v-for="mesa of mesas"
          :key="mesa.id"
          :mesa="mesa"
          @excluir="excluir"
          @editar="editar"
          @onSave="salvar"
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
import MesaCard from "./MesaCard.vue";
import { confirmExclusao } from "../../core/utils/AlertUtils";
import { Mesa } from "../../core/model/Mesa";

@Component({
  components: { AppHeader, MesaCard },
})
export default class Mesas extends Vue {
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
    this.loadAll()
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
      })
    ).list;
  }

  async onNewSave(mesa) {
      this.mesa = null;
      this.loadAll();
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
