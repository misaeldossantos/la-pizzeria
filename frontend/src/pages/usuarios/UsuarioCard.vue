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
          <q-btn 
            round icon="las la-edit" 
            color="positive" 
            @click="editar"
          >
            <q-tooltip
              content-class="bg-grey-8"
              content-style="font-size: 14px"
              :offset="[10, 10]"
            >
              Editar
            </q-tooltip>
          </q-btn>
          <q-btn
            round
            icon="las la-trash-alt"
            color="negative"
            @click="excluir"
          >
            <q-tooltip
              content-class="bg-grey-8"
              content-style="font-size: 14px"
              :offset="[10, 10]"
            >
              Excluir
            </q-tooltip>
          </q-btn>
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
