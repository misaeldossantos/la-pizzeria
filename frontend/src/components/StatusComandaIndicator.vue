<template>
  <q-icon name="las la-square" :color="cor"/>
</template>

<script>

const statusByCor = {
  ABERTO: "green",
  FINALIZADO: "orange",
  PAGO: "blue"
}

export default {
  name: "StatusComandaIndicator",
  props: ["status"],
  computed: {
    cor() {
      return statusByCor[this.status]
    }
  }
};
</script>

<style>

</style>
