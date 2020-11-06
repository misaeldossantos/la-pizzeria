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
        <div class="text-h6">{{ !isNew ? "Editar" : "Cadastrar" }} usuário</div>
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
                  emit-value
                />
              </div>
            </div>
            <div class="q-gutter-y-sm col-5">
              <span class="text-subtitle2"> Imagem do perfil </span>
              <q-uploader
                flat
                bordered
                color="grey-11"
                text-color="black"
                ref="fotoUploader"
                @added="(files) => (foto = files[0])"
                @removed="foto = null"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="bg-grey-11 q-pa-md">
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
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { nivelAcessoOptions, Usuario } from "../../core/model/Usuario";
import ArquivoService from "../../core/services/ArquivoService";
import UsuarioService from "../../core/services/UsuarioService";
import { confirmExclusao } from "../../core/utils/AlertUtils";

@Component({
  components: {},
})
export default class CadastroUsuarioDialog extends Vue {
  dialogOpened: boolean = false;

  foto: File = null;

  usuario = new Usuario();

  niveisOptions = nivelAcessoOptions;

  show(id: number) {
    this.reset()
    this.dialogOpened = true;
    if (id) {
      this.load(id);
    }
  }

  async load(id) {
    this.$q.loading.show();
    this.usuario = await UsuarioService.get(id);
    this.$q.loading.hide();
  }

  async salvar() {
    try {
      await this.salvarFoto();
      this.$q.loading.show();
      const usuario = await UsuarioService.save(this.usuario);
      this.dialogOpened = false;
      this.$emit("onSave", usuario);
    } catch (e) {
      console.log(e);
    } finally {
      this.$q.loading.hide();
    }
  }

  async salvarFoto() {
    if (this.foto) {
      this.usuario.foto = await ArquivoService.upload(this.foto);
    } else {
      this.usuario.foto = null;
    }
  }

  async excluir() {
    this.$q.loading.show();
    const confirmado = await confirmExclusao();
    if (confirmado) {
      await UsuarioService.delete(this.usuario.id);
      this.dialogOpened = false;
      this.$emit("onDelete");
    }
    this.$q.loading.hide();
  }

  reset() {
    this.usuario = new Usuario()
    this.foto = null
  }

  get isNew() {
    return !this.usuario?.id;
  }
}
</script>

<style>

</style>
