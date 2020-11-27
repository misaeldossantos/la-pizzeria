<template>
  <div>
    <app-header title="Comandas" />
    <div class="column q-gutter-y-md q-py-lg q-px-md">
      <div class="row items-center q-gutter-x-md justify-between">
        <div class="row q-gutter-x-md">
          <q-input
            v-model="q"
            outlined
            :size="40"
            placeholder="Pesquise aqui..."
            @keyup.enter="load"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn color="primary" icon="search" size="18px" @click="load"></q-btn>
        </div>
        <q-btn
          round
          flat
          color="primary"
          icon="las la-plus"
          size="18px"
          @click="cadastrarNovo()"
        />
      </div>

      <q-separator inset />

      <div
        v-if="!usuarios.length"
        class="column q-gutter-y-md items-center justify-center q-pa-md"
      >
        <q-icon name="las la-frown" size="40pt" color="grey-8" />
        <span class="text-grey-8 text-center text-h6">
          Nenhum usuário encontrado!
        </span>
      </div>

      <comanda-card
        v-for="usuario of usuarios"
        :key="usuario.id"
        :usuario="usuario"
        @excluir="excluir"
        @editar="editar"
      />
    </div>

    <cadastro-usuario-dialog
      ref="cadastroDialogRef"
      @onSave="onChange"
      @onDelete="onChange"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AppHeader from "../../components/AppHeader.vue";
import { NivelAcessoEnum, Usuario } from "../../core/model/Usuario";
import UsuarioService from "../../core/services/UsuarioService";
import CadastroUsuarioDialog from "./CadastroUsuarioDialog.vue";
import { confirmExclusao } from "../../core/utils/AlertUtils";
import ComandaCard from "./ComandaCard.vue";

@Component({
  components: { AppHeader, CadastroUsuarioDialog, ComandaCard },
})
export default class Usuarios extends Vue {
  q = "";
  page = 1;

  usuarios: Usuario[] = [];

  inputValue: string = "";

  cadastrarNovo() {
    this.$router.push("/comanda/novo")
  }

  async load() {
    const { list } = await UsuarioService.list({
      rpp: 10,
      page: this.page,
      q: this.q,
    });
    this.usuarios = list;
  }

  mounted() {
    this.load();
  }

  onChange() {
    this.load();
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
}
</script>

<style>

</style>
