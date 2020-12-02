<template>
  <div style="max-width: 400px" class="column q-gutter-y-md">
    <div class="row q-gutter-x-md">
      <q-radio
        icon="las la-money-bill"
        val="DINHEIRO"
        v-model="pagamento.formaPagamento"
        label="Dinheiro"
        dense
      />
      <q-radio
        v-model="pagamento.formaPagamento"
        icon="las la-credit-card"
        val="CARTAO"
        label="Cartão de crédito"
        dense
      />
    </div>

    <div class="content">
      <div v-if="pagamento.formaPagamento === 'DINHEIRO'">
        <q-input label="Valor pago" v-model.number="pagamento.valorPago" type="number" />
      </div>
      <div class="column q-gutter-y-sm q-pt-md">
        <q-checkbox
          dense
          label="Aniversariante do dia"
          v-model="aniversariante"
        />
        <q-input
          mask="##/##/####"
          label="Data de nascimento"
          v-model="pagamento.dataNascimento"
          v-if="aniversariante"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class InserirDados extends Vue {

  @Prop({ required: true })
  pagamento;

  aniversariante = false;

  dataNascimento = "";

}
</script>

<style>

</style>
