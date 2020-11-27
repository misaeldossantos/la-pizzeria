<template>
  <div>
    <q-card class="q-pa-md" bordered flat>
      <div class="row items-center justify-between">
        <div class="row items-center q-gutter-x-lg">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <div class="column">
            <span> {{ usuario.nome }} </span>
            <span class="text-primary"> {{ usuario.nivelAcesso | nivelAcesso }} </span>
          </div>
        </div>
        <div class="row items-center q-gutter-x-md">
          <q-btn label="Excluir" color="negative" @click="excluir"/>
          <q-btn label="Editar" color="positive" @click="editar" />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Usuario } from "../../core/model/Usuario";

@Component({
  components: {},
})
export default class UsuarioCard extends Vue {

  @Prop({ required: true })
  usuario: Usuario;

  excluir() {
    this.$emit("excluir", this.usuario.id)
  }

  editar() {
    this.$emit("editar", this.usuario.id)
  }

}
</script>

<style>

</style>
