  <template>
  <q-layout view="lHh Lpr lFf">
    <menu-lateral />
    <q-page-container class="container">
      <router-view />
      <div class="overflow-hidden">
        <img
          class="marca-dagua"
          src="../assets/logotipo.png"
          :draggable="false"
        />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MenuLateral from "./MenuLateral.vue";

@Component({
  components: { MenuLateral },
})
export default class MainLayout extends Vue {}
</script>

<style lang="stylus">
.marca-dagua {
  opacity: 0.1;
  width: 500px;
  height: 500px;
  position: fixed;
  bottom: -15%;
  right: -4%;
  transform: rotate(25deg);
  user-select: none;
  pointer-events none
}

.container {
  background-color #faf9f9
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  overflow auto
}
</style>
