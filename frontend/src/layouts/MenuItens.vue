<template>
  <div class="column q-gutter-y-md">
    <span class="q-px-md text-primary category-title">
      {{ title }}
    </span>

    <div>
      <div
        v-for="(item, index) in itens"
        :key="index"
        class="row items-center item q-gutter-x-md q-px-md q-py-md bg-grey-12 text-grey-9"
        @click="navigate(item.href)"
      >
        <q-icon size="32px" :name="item.icon" />
        <span class="text-h6">
          {{ item.description }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class MenuItens extends Vue {
  @Prop({})
  title: string;

  @Prop({ default: [], type: Array })
  itens: { description: string, icon: string, href: string }[];

  navigate(href) {
    this.$router.push(href)
  }

}
</script>

<style lang="stylus" scoped>
.item {
  border-bottom: 1px solid #D4D4D4;
  border-top: 1px solid #D4D4D4;
}
</style>
