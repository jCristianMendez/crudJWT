<template>
  <v-app>
    <v-row no-gutters justify="center" align="center">
      <v-col class="container-columns" cols="12" sm="6" md="6" v-if="!idMobile"
        ><div
          class="image-container d-flex align-center justify-center primary"
        >
          <v-img
            class="shadow"
            contain
            max-width="350"
            :src="require('@/assets/login.png')"
          /></div
      ></v-col>
      <v-col class="container-columns" cols="12" sm="6" md="6" v-if="showLogin">
        <v-row class="container-row" dense align="center" justify="center">
          <v-col cols="8">
            <h1 class="text-center title-login font-weight-bold">
              Your video games
            </h1>
          </v-col>
          <v-col cols="8">
            <h3 class="text-center subtitle-login">
              Please enter your credentials for access
            </h3>
          </v-col>
          <v-col cols="10" md="6">
            <v-form ref="form" lazy-validation v-model="validform">
              <v-text-field
                :rules="[rules.required, rules.email]"
                prepend-icon="mdi-account"
                v-model="loginCred.email"
                label="Email"
                color="secondary"
              >
              </v-text-field>
              <v-text-field
                :rules="[rules.required, rules.maxPass]"
                prepend-icon="mdi-lock"
                v-model="loginCred.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                label="Password"
                color="secondary"
              >
              </v-text-field>
            </v-form>
          </v-col>
          <v-col cols="12">
            <v-row align="center" justify="center">
              <v-col cols="7">
                <v-btn
                  @click="login"
                  block
                  color="accent"
                  rounded
                  :small="idMobile"
                  >Login</v-btn
                >
              </v-col>
              <v-col cols="6">
                <v-btn
                  @click="btnCreateAccount"
                  block
                  color="secondary"
                  rounded
                  :small="idMobile"
                  >Create account</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <footerComp></footerComp>
      </v-col>

      <!-- ##else## -->
      <v-col class="container-columns" cols="12" sm="6" md="6" v-else>
        <v-row class="container-row" dense align="center" justify="center">
          <v-col cols="8">
            <h3 class="text-center title-login font-weight-bold">
              Create your account
            </h3>
          </v-col>
          <v-col cols="10" md="6">
            <v-form ref="formCreate" lazy-validation v-model="validCreate">
              <v-text-field
                :rules="[rules.required, rules.email]"
                prepend-icon="mdi-account"
                v-model="create.email"
                label="Email"
                color="secondary"
                @change="validateEmail"
                :loading="loadingValidateEmail"
                :readonly="loadingValidateEmail"
              >
              </v-text-field>
              <v-text-field
                :rules="[rules.required, rules.maxPass]"
                prepend-icon="mdi-lock"
                v-model="create.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                label="Password"
                color="secondary"
              >
              </v-text-field>

              <v-alert v-if="!validEmail" type="error" outlined class="mt-8"
                >Email is already in use, please change it</v-alert
              >
            </v-form>
          </v-col>
          <v-col cols="12">
            <v-row align="center" justify="center">
              <v-col cols="7">
                <v-btn
                  @click="createAccount"
                  block
                  color="accent"
                  rounded
                  :small="idMobile"
                  >Create</v-btn
                >
              </v-col>
              <v-col cols="6">
                <v-btn
                  @click="btnCancelCreate"
                  block
                  color="secondary"
                  rounded
                  :small="idMobile"
                  >Cancel</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <footerComp></footerComp>
      </v-col>
      <dialogLoading></dialogLoading>
    </v-row>
  </v-app>
</template>

<script src="./js/login.js"></script>

<style>
.container-columns {
  height: 100vh;
  max-height: 100vh;
}
.image-container {
  height: 100%;
}
.shadow {
  position: relative;
  filter: drop-shadow(10px 10px 15px rgba(34, 34, 34, 0.438));
}

.title-login {
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 3px;
  font-family: "Roboto", sans-serif;
  font-display: swap;
  color: #43425d;
}
.subtitle-login {
  font-size: 1.5rem;
  color: #4d4f5c;
  font-weight: 300;
}
.container-row {
  max-width: 100%;
  padding-top: 20px;
  height: 90%;
}
@media screen and (max-width: 600px) {
  .container-row {
    padding-top: 0px;
  }
}
@media screen and (max-width: 400px) {
  .title-login {
    font-size: 1.3rem;
  }
  .subtitle-login {
    font-size: 0.8rem;
  }
}
</style>