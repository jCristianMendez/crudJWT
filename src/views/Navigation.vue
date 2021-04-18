<!--
* Autor: Jose Cristian Mendez Mora
-->

<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      class="primary"
      dark
      style="
        max-width: 600px !important;
        min-width: 256px !important;
        width: none !important;
      "
    >
      <template v-slot:prepend>
        <v-list>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="body-2 text-center">
                {{userEmail}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <div v-bind:key="menu.title" v-for="menu in menus">
            <v-list-item :to="menu.link" active-class="white--text">
              <v-list-item-icon>
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{menu.title}}</v-list-item-title>
            </v-list-item>
          </div>
        </v-list>
      </template>

      <template v-slot:append>
        <v-list nav dense>
          <v-list-item active-class="white--text" link @click="btnCerrarSesion">
            <v-list-item-icon>
              <v-icon>mdi-login-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>


    </v-navigation-drawer>

    <v-main>
      <!-- uso de los componente hijos -->
      <router-view></router-view>
      <dialogLoading></dialogLoading>
      <footerComp></footerComp>
    </v-main>

  </v-app>
</template>

<script src="./js/navigation.js"></script>

<style type="text/css">
nav {
  max-width: 500px !important;
  min-width: 256px !important;
  width: none !important;
}
</style>