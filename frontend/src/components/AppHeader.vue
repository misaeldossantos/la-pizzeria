<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round icon="arrow_back" @click="$router.back()" />
      <q-toolbar-title>
        {{ title }}
      </q-toolbar-title>
      <q-btn dense round flat icon="las la-bell">
        <q-badge color="blue" floating v-if="notificacoes.length">
          {{ notificacoes.length }}
        </q-badge>
        <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
          <q-list separator>
            <q-item v-for="notificacao of notificacoes" :key="notificacao.id">
              <div
                class="row items-center justify-between full-width"
                style="flex-wrap: nowrap !important"
              >
                <span
                  v-html="notificacao.mensagem"
                />
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

export default {
  data() {
    return {
      notificacoes: [],
    };
  },
  methods: {
    async loadNotificacoes() {
      try {
        this.notificacoes = await NotificacaoService.getNotificacoes();
      } catch (e) {
        console.log(e);
      }
    },
    async remove(id) {
      try {
        await NotificacaoService.remove(id);
        this.loadNotificacoes();
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    // TODO: verificar se usuário é garçom
    this.interval = setInterval(() => {
      this.loadNotificacoes();
    }, 3000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
};
</script>
