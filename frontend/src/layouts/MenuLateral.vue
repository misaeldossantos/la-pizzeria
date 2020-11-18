<template>
  <q-drawer :value="true" bordered content-class="bg-grey-1 ">
    <div style="height: 93%" class="column no-wrap q-gutter-y-sm overflow-auto overflow-hidden-x">
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
    <div class="row items-center justify-between q-px-md q-py-sm bg-grey-4">
      <div class="row q-gutter-x-sm">
        <q-avatar color="grey-5" icon="las la-user" />
        <div class="column">
          <span>Felipe Giust</span>
          <span class="text-primary">Administrador</span>
        </div>
      </div>
      <div class="column">
        <q-btn size="18px" text-color="grey-9" icon="las la-sign-out-alt" flat round />
      </div>
    </div>
  </q-drawer>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import MenuItens from "./MenuItens.vue";

@Component({
  components: { MenuItens },
})
export default class MenuLateral extends Vue {
  menus = [
    {
      title: "Dados do sistema",
      itens: [
        {
          description: "Usuários",
          icon: "las la-user",
          href: "/usuarios"
        },
        {
          description: "Mesas",
          icon: "las la-chair",
          href: "/mesas"
        },
        {
          description: "Produtos",
          icon: "las la-pizza-slice",
        },
      ],
    },
    {
      title: "Vendas",
      itens: [
        {
          description: "Comandas",
          icon: "las la-clipboard-check",
        },
        {
          description: "Caixa",
          icon: "las la-hand-holding-usd",
        },
      ],
    },
    {
      title: "Suporte",
      itens: [
        {
          description: "Entrar em contato",
          icon: "las la-phone",
        },
        {
          description: "Sobre",
          icon: "las la-info-circle",
        },
      ],
    },
  ];
}
</script>

<style>
  .category-title {
    font-size: 14pt;
  }
</style>
