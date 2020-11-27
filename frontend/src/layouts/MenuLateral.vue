<template>
  <q-drawer :value="true" bordered content-class="bg-grey-1">
    <div
      style="height: 93%"
      class="column no-wrap q-gutter-y-sm overflow-auto overflow-hidden-x"
    >
      <div class="q-pt-md row items-center justify-center">
        <q-img src="../assets/logotipo.png" height="183px" width="185px" />
      </div>
      <div class="column q-gutter-y-md">
        <menu-itens
          v-for="menu of menus"
          :key="menu.title"
          :title="menu.title"
          :itens="menu.itens"
        />
      </div>
    </div>
    <div
      v-if="perfil"
      class="row items-center justify-between q-px-md q-py-sm bg-grey-4"
    >
      <div class="row q-gutter-x-sm">
        <q-avatar color="grey-5">
          <img v-if="perfil.fotoUrl" :src="perfil.fotoUrl"/>
          <q-icon v-else icon="las la-user"/>
        </q-avatar>
        <div class="column">
          <span>{{ perfil.nome }}</span>
          <span class="text-primary">{{
            perfil.nivelAcesso | nivelAcesso
          }}</span>
        </div>
      </div>
      <div class="column">
        <q-btn
          @click="logout"
          size="18px"
          text-color="grey-9"
          icon="las la-sign-out-alt"
          flat
          round
        />
      </div>
    </div>
  </q-drawer>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { NivelAcessoEnum, Usuario } from "../core/model/Usuario";
import AuthService from "../core/services/AuthService";
import { showConfirm } from "../core/utils/AlertUtils";
import MenuItens from "./MenuItens.vue";

const menus = {
  usuarios: {
    description: "Usuários",
    icon: "las la-user",
    href: "/usuarios",
  },
  mesas: {
    description: "Mesas",
    icon: "las la-chair",
    href: "/mesas",
  },
  produtos: {
    description: "Produtos",
    icon: "las la-pizza-slice",
    href: "/produtos"
  },
  comandas: {
    description: "Comandas",
    icon: "las la-clipboard-check",
    href: "/comandas"
  },
  caixa: {
    description: "Caixa",
    icon: "las la-hand-holding-usd",
  },
};

@Component({
  components: { MenuItens },
})
export default class MenuLateral extends Vue {
  perfil: Usuario = null;

  menus = [];

  async mounted() {
    await this.getPerfil();
  }

  async getPerfil() {
    this.perfil = await AuthService.getPerfil();

    const { nivelAcesso } = this.perfil;

    switch (nivelAcesso) {
      case "ADMINISTRADOR":
        this.menus = [
          {
            title: "Dados do sistema",
            itens: [menus.usuarios, menus.mesas, menus.produtos],
          },
          {
            title: "Vendas",
            itens: [menus.comandas, menus.caixa],
          },
        ];
        break;
      case "GARCOM":
        this.menus = [
          {
            title: "Dados do sistema",
            itens: [menus.mesas, menus.produtos],
          },
          {
            title: "Vendas",
            itens: [menus.comandas],
          },
        ];
        break;
      default:
        this.menus = [
          {
            title: "Vendas",
            itens: [menus.comandas],
          },
        ];
    }
  }

  async logout() {
    const confirmation = await showConfirm("Deseja realmente sair?");
    if (confirmation) {
      localStorage.removeItem("token");
      this.$router.push("/login");
    }
  }
}
</script>

<style>
  .category-title {
    font-size: 14pt;
  }
</style>
