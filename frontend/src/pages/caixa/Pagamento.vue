<template>
  <q-card class="col-grow relative" bordered flat>
    <div
      v-if="loading"
      class="loader column items-center justify-center text-white"
    >
      <q-circular-progress indeterminate color="white" size="30px" />
      <span>{{ message }}...</span>
    </div>
    <div class="column q-pa-md q-gutter-y-md">
      <span class="text-h6">Pagamento</span>

      <q-stepper
        v-model="step"
        ref="stepper"
        animated
        done-color="green"
        :active-color="step === 3 ? 'green' : 'blue'"
        inactive-color="grey"
        flat
        keep-alive
      >
        <q-step
          :name="1"
          title="Inserir dados"
          icon="settings"
          :done="step > 1"
          active-color="primary"
          style="min-height: 400px"
        >
          <div style="max-width: 400px" class="column q-gutter-y-md">
            <q-tabs
              v-model="formaPagamento"
              class="text-grey-8"
              dense
              inline-label
              indicator-color="primary"
              align="justify"
              active-color="primary"
            >
              <q-tab
                icon="las la-money-bill"
                name="DINHEIRO"
                label="Dinheiro"
              />
              <q-tab
                icon="las la-credit-card"
                name="CARTAO"
                label="Cartão de crédito"
              />
            </q-tabs>

            <div class="content">
              <div v-if="formaPagamento === 'DINHEIRO'">
                <q-input label="Valor pago" />
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
                  v-if="aniversariante"
                />
              </div>
            </div>
          </div>
        </q-step>

        <q-step
          :name="2"
          title="Conferência"
          icon="las la-list-alt"
          active-icon="las la-list-alt"
          :done="step > 2"
          style="min-height: 400px"
        >
        <div class="column text-right q-gutter-y-md justify-end q-pa-md">
            <span class="text-h6"> Calculando descontos...</span>
            <span class="text-h6"> Calculando valor total... </span>

          </div>
          <!-- <div class="column text-right q-gutter-y-md justify-end q-pa-md">
            <span class="text-h6"> 1. Desconto pagamento no dinheiro 5%. </span>
            <span class="text-h6"> 2. Desconto pagamento no dinheiro 5%. </span>
            <span class="text-h6"> 3. Desconto pagamento no dinheiro 5%. </span>
            <span class="text-bold text-h6">
              Valor do troco:
              <span class="text-primary">{{ 20 | money }}</span>
            </span>
            <span class="text-bold text-h6">
              Valor a ser pago:
              <span class="text-primary">{{ 100 | money }}</span>
            </span>
          </div> -->
        </q-step>

        <q-step
          :name="3"
          title="Finalizado"
          active-icon="las la-check"
          icon="las la-check"
          style="min-height: 400px"
        >
          <div class="column items-center q-gutter-y-md justify-center">
            <q-icon name="las la-check" size="50px" color="green" />
            <span class="text-h5 text-grey"
              >Pagamento realizado com sucesso!</span
            >
            <span class="text-grey text-center" style="width: 500px">
              O pagamento da comanda número 5 foi realizada com sucesso. Para
              realizar outro pagamento, clique em concluir.
            </span>
            <q-btn label="Concluir" color="green" />
          </div>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation align="right">
            <q-btn
              v-if="step == 2"
              flat
              color="blue"
              @click="$refs.stepper.previous()"
              label="Corrigir"
              class="q-mr-md"
            />
            <q-btn
              v-if="step == 2"
              color="blue"
              @click="pagar()"
              label="Pagar"
            />
            <q-btn
              v-if="step == 1"
              @click="enviarDados()"
              color="primary"
              label="Continuar"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

const messages = ["Inserindo cartão", "Selecionando as parcelas", "Aguardando dados", "Confirmando pagamento", "Transação aceita"];

@Component({
  components: {},
})
export default class Pagamento extends Vue {
  step = 1;
  loading = false;
  message = "";
  formaPagamento = "DINHEIRO";
  aniversariante = false;

  pagamento = {
    cartao: "",
    nomeTitular: "",
  };

  async enviarDados() {
    (this.$refs.stepper as any).next();
  }

  async pagar() {
    this.loading = true;
    let currentIndex = 0;
    let self = this;
    const interval = setInterval(() => {
      if (currentIndex === messages.length) {
        clearInterval(interval);
        self.loading = false;
        (this.$refs.stepper as any).next();
        return;
      }
      self.message = messages[currentIndex];
      currentIndex++;
    }, 2000);
  }
}
</script>
<style scoped lang="stylus">
.loader {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(black, 0.8);
  z-index: 1000;
}
</style>
