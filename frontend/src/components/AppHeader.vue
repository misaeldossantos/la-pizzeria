<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round icon="arrow_back" @click="$router.back()" />
      <q-toolbar-title>
        {{ title }}
      </q-toolbar-title>
      <q-btn
        v-if="memoryService.nivelAcesso === 'GARCOM'"
        dense
        round
        flat
        icon="las la-bell"
      >
        <q-badge color="blue" floating v-if="memoryService.notificacoes.length">
          {{ memoryService.notificacoes.length }}
        </q-badge>
        <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
          <q-list separator>
            <q-item v-for="notificacao of memoryService.notificacoes" :key="notificacao.id">
              <div
                class="row items-center justify-between full-width"
                style="flex-wrap: nowrap !important"
              >
                <span v-html="notificacao.mensagem" />
                <q-btn
                  @click="remove(notificacao.id)"
                  flat
                  round
                  icon="las la-trash"
                  color="negative"
                />
              </div>
            </q-item>
          </q-list>
        </q-popup-proxy>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import NotificacaoService from "../core/services/NotificacaoService";
import MemoryService from "../core/services/MemoryService";
import { autorun, observable, reaction } from "mobx";
import { Observer, observer } from "mobx-vue";
import { Vue, Component, Prop } from "vue-property-decorator";

@Observer
@Component({
  components: {},
})
export default class AppHeader extends Vue {
  @Prop()
  title;

  memoryService = MemoryService;

  async remove(id) {
    try {
      await NotificacaoService.remove(id);
      this.memoryService.loadNotificacoes();
    } catch (e) {
      console.log(e);
    }
  }

  mounted() {
  }
}
</script>
