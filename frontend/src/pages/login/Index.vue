<template>
  <div class="container">
    <div class="blur"></div>
    <div
      class="column full-height text-white justify-center items-center"
    >
      <div flat class="card q-pa-lg column q-gutter-y-lg justify-center items-center">
        <q-img
          src="../../assets/logotipo.png"
          height="200px"
          width="200px"
          class="logotipo"
        />
        <div class="column q-gutter-y-md">
          <q-input
            bottom-slots
            placeholder="Email"
            color="primary"
            outlined
            :dense="false"
            label-color="primary"
            standout="bg-white text-primary"
            type="email"
            bg-color="white"
            style="width: 400px"
            v-model="form.email"
            input-class="text-primary"
          >
            <template v-slot:append>
              <q-icon name="las la-at" color="primary" />
            </template>
          </q-input>
          <q-input
            bottom-slots
            placeholder="Senha"
            color="white"
            outlined
            :dense="false"
            label-color="white"
            type="password"
            input-class="text-primary"
            standout="bg-white text-primary"
            bg-color="white"
            v-model="form.senha"
          >
            <template v-slot:append>
              <q-icon name="las la-lock" color="primary" />
            </template>
          </q-input>

          <q-btn
            label="Login"
            color="primary"
            @click="login"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import AuthService from '../../core/services/AuthService'

@Component({
  components: {},
})
export default class Login extends Vue {
  form = {
    email: "",
    senha: ""
  }

  async login() {
    const result = await AuthService.login(this.form)
    localStorage.setItem("token", result.token)
    this.$router.push("/")
  }

}
</script>

<style lang="stylus" scoped>
.container {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('https://cdn.pixabay.com/photo/2019/07/06/09/05/pizza-4319999_1280.jpg');
}

.blur {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(black, 0.5);
}

.logotipo {
  transform: rotate(15deg);
}

.card {
  background-color rgba(white, 0.8)
  z-index 1000
  border-radius 8px
  box-shadow: 0 1px 5px rgba(0,0,0,0.2),
  0 2px 2px rgba(0,0,0,0.14),
  0 3px 1px -2px rgba(0,0,0,0.12)
}
</style>
