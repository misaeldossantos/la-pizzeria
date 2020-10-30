<template>
  <div>
    <app-header title="Usuários" />
    <div class="column q-gutter-y-md q-py-lg q-px-md">
      <div class="row items-center q-gutter-x-md justify-between">
        <div class="row q-gutter-x-md">
          <q-input v-model="inputValue" outlined :size="40" placeholder="Pesquise aqui...">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn color="primary" icon="search" size="18px"></q-btn>
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

    </div>

    <cadastro-usuario-dialog
      ref="cadastroDialogRef"
    />

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AppHeader from "../../components/AppHeader.vue";
import CadastroUsuarioDialog from "./CadastroUsuarioDialog.vue";

@Component({
  components: { AppHeader, CadastroUsuarioDialog },
})
export default class Usuarios extends Vue {

  inputValue: string = ""

  cadastrarNovo() {
    (this.$refs.cadastroDialogRef as any).show()
  }

}
</script>

<style>

</style>
