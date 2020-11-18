<template>
  <q-card
    class="add-card column"
    :class="{ disponivel: mesa.disponivel, indisponivel: !mesa.disponivel }"
  >
    <q-card-section class="justify-between row q-gutter-x-sm items-center">
      <div v-if="mesa.id">
        <q-btn
          @click="remover()"
          round
          icon="las la-trash-alt"
          color="negative"
          size="10pt"
          flat
          :disable="loading"
        />
      </div>
      <q-btn
        @click="modoEdicao = !modoEdicao"
        round
        flat
        :icon="modoEdicao ? 'close' : 'las la-edit'"
        color="white"
        size="16pt"
        :disable="loading"
      />
    </q-card-section>
    <q-card-section class="justify-center items-center column">
      <div v-if="loading">
        <q-spinner color="white" size="50pt" />
      </div>
      <div v-else>
        <q-input
          v-if="modoEdicao"
          @keypress="keyPress"
          v-model="mesa.numero"
          borderless
          class="numero"
          color="white"
          ref="numeroInput"
        />
        <span v-else class="numero text-white">
          {{ mesa.numero }}
        </span>
      </div>
    </q-card-section>

    <q-card-actions align="center" v-if="modoEdicao">
      <q-item
        :disable="loading"
        clickable
        class="bottom-button"
        @click="salvar"
      >
        <q-item-section> Salvar </q-item-section>
      </q-item>
    </q-card-actions>

    <q-card-actions align="center" v-else-if="mesa.disponivel">
      <q-item :disable="loading" clickable class="bottom-button">
        <q-item-section> Reservar mesa </q-item-section>
      </q-item>
    </q-card-actions>

    <q-card-actions align="center" v-else-if="!mesa.disponivel">
      <q-item :disable="loading" clickable class="bottom-button">
        <q-item-section> Ver reserva </q-item-section>
      </q-item>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Mesa } from "../../core/model/Mesa";
import MesaService from "../../core/services/MesaService";

@Component({
  components: {},
})
export default class MesaCard extends Vue {
  modoEdicao: boolean = false;

  loading = false;

  @Prop()
  openAsModoEdicao: boolean;

  @Prop({ required: true })
  mesa: Mesa | null;

  @Watch("mesa.numero")
  onNumeroChange(numero) {
    if (numero == "") {
      this.mesa.numero = 0;
    }
  }

  async salvar() {
    try {
      this.loading = true;
      await MesaService.save(this.mesa);
      this.$emit("onSave", this.mesa);
      this.modoEdicao = false;
    } catch (e) {
      this.modoEdicao = true;
      this.numeroFocus();
    } finally {
      this.loading = false;
    }
  }

  onInput(e) {
    this.mesa.numero = Number(e.target.innerText);
  }

  keyPress(ev) {
    if (isNaN(String.fromCharCode(ev.which) as any)) ev.preventDefault();
  }

  @Watch("modoEdicao")
  numeroFocus() {
    if (this.modoEdicao) {
      setTimeout(() => {
        (this.$refs.numeroInput as any).focus();
      }, 200);
    }
  }

  ativarModoEdicao() {
    this.modoEdicao = true;
  }

  excluir() {}

  editar() {}

  mounted() {
    if (this.openAsModoEdicao) {
      this.modoEdicao = true;
    }
  }
}
</script>

<style lang="stylus" scoped>
.add-card {
  background-color: $grey-4;
  display: flex;
  border-radius: 5px;
  width: 300px;
  height: 280px;
  position: relative;
}

.add-card.disponivel {
  background-color: #8ECC97;
}

.add-card.indisponivel {
  background-color: rgba(#FF0F0F, 0.3);
}

.numero-container {
  position: absolute;
  height: 100%;
  flex-direction: column;
}

.numero {
  font-size: 50pt;
  text-align: center;
  align-self: center;
  text-align: center;
  color: white;
  text-shadow: 0 0 0.06em rgba(black, 0.4);

  >>> input {
    text-align: center;
    color: white;
    text-shadow: 0 0 0.06em rgba(black, 0.4);
    caret-color: $primary;
  }
}

.bottom-button {
  background-color: rgba(black, 0.3);
  text-align: center;
  color: white;
  border-radius: 3px;
  font-size: 12pt;
  position: absolute;
  bottom: 15px;
  right: 15px;
  left: 15px;
}
</style>
