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
        <div class="text-h6">Cadastrar usuário</div>
        <q-btn round flat icon="close" v-close-popup></q-btn>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="column">
          <div class="row q-gutter-x-md q-gutter-y-md">
            <div class="q-gutter-y-lg column col-grow">
              <div>
                <q-input v-model="usuario.nome" label="Nome" clearable />
              </div>
              <div>
                <q-input
                  v-model="usuario.email"
                  label="E-mail"
                  type="email"
                  clearable
                />
              </div>
              <div>
                <q-input
                  v-model="usuario.senha"
                  label="Senha"
                  type="password"
                  clearable
                />
                <span class="text-grey-8 text-caption">
                  A senha deve ter pelo menos 8 caracteres
                </span>
              </div>
              <div>
                <q-select
                  option-value="value"
                  option-label="label"
                  :options="niveisOptions"
                  v-model="usuario.nivelAcesso"
                  label="Nível de acesso"
                  clearable
                />
              </div>
            </div>
            <div class="q-gutter-y-sm col-5">
              <span class="text-subtitle2"> Imagem do perfil </span>
              <q-uploader flat bordered color="grey-11" text-color="black" />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="bg-grey-11 q-pa-md">
        <q-btn flat label="Cancelar" color="dark" v-close-popup />
        <q-btn icon="save" label="Salvar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { nivelAcessoOptions, Usuario } from "../../core/model/Usuario";

@Component({
  components: {},
})
export default class CadastroUsuarioDialog extends Vue {
  dialogOpened: boolean = true;

  usuario = new Usuario();

  niveisOptions = nivelAcessoOptions;

  show() {
    this.dialogOpened = true;
  }
}
</script>

<style>

</style>
