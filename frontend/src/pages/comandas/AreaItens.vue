<template>
  <q-card :class="innerClass" class="q-pa-md" bordered flat>
    <div class="column q-gutter-y-md">
      <span class="text-h6"> Itens da comanda </span>

      <div style="max-width: 400px">
        <q-tabs
          v-model="tab"
          class="text-grey-8"
          dense
          inline-label
          indicator-color="primary"
          align="justify"
          active-color="primary"
        >
          <q-tab name="todos" label="Todos" />
          <q-tab icon="las la-list-alt" name="itensIncluidos" label="Itens incluídos" />
        </q-tabs>
      </div>

      <div class="row q-gutter-x-md">
        <q-input
          outlined
          :size="40"
          placeholder="Pesquise aqui..."
          @keyup.enter="load"
          dense
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn color="primary" icon="search" size="14px"></q-btn>
      </div>

      <div class="q-gutter-y-md overflow-auto" style="max-height: 400px;">
        <produto-comanda />
        <produto-comanda />
        <produto-comanda />
        <produto-comanda />
        <produto-comanda />
        <produto-comanda />
        <produto-comanda />
      </div>
    </div>
  </q-card>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import ProdutoComanda from "./ProdutoComanda.vue";

@Component({
  components: {
    ProdutoComanda
  },
})
export default class AreaItens extends Vue {
  tab = "todos";
}
</script>

<style>

</style>
