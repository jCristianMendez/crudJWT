import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    proyectos: [],
    dialogLoading: false,
    //https://jcmm.icu/Portafolio/ws/
    //http://localhost:8084/Portafolio/ws/
    urlAxios: 'https://jcmm.icu/Portafolio/ws/',
    rules: {
      required: (value) => !!value || "Fild is required",
      email: (value) => /.+@.+\..+/.test(value) || "Email format is not correct",
      maxPass: (value) => 20 > value.length || "Maximun 20 caracters",
      NumberValid: (value) => /^-?\d*\.?\d+$/.test(value) || "Must be only numbers",
      hourPositive: (value) => /^(\.)?\d+(\.\d*)?$/.test(value) || "Only positive hours",
    },
  },
  mutations: {
    dialogLoading(state) {
      state.dialogLoading = !state.dialogLoading;
    }
  },
  actions: {
    toastSuccess(context, title) {
      return Vue.prototype.$swal({
        //https://sweetalert2.github.io/
        icon: "success",
        title:
          "<p style='color:white'>" + title || null + "</p>",
        position: "top",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 6000,
        toast: true,
        background: "#43A047",
        iconColor: "white",
      });
    },
    toastError(context, title) {
      return Vue.prototype.$swal({
        //https://sweetalert2.github.io/
        icon: "error",
        title:
          "<p style='color:white'>" + title || null + "</p>",
        position: "top",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 6000,
        toast: true,
        background: "#D50000",
        iconColor: "white",
      });
    },
    get({ getters }, obj) {
      return axios({
        method: "GET",
        url: getters.urlAxios + obj.url,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "Authorization": "Bearer " + obj.token,
        },
      })
        .then((response) => {
          return response.data;
        }).catch((error) => {
          if (error.response) {
            if (error.response.status == 401) {
              return 401;
            } else {
              dispatch('toastError', 'error: ' + error.response.status);
            }
          } else if (error.request) {
            dispatch('toastError', 'Try again later');
          } else {
            dispatch('toastError', 'error: ' + error.message);
          }
          console.error("GetMenu: " + error);
        });
    },
    post({ getters, dispatch }, obj) {
      return axios({
        method: "POST",
        url: getters.urlAxios + obj.url,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "Authorization": "Bearer " + obj.token,
        },
        data: obj.params
      }).then((response) => {
        if (response.data.error) {
          dispatch('toastError', response.data.mensaje);
        } else {
          dispatch('toastSuccess', response.data.mensaje);
        }
        return response.data;
      }).catch((error) => {
        if (error.response) {
          if (error.response.status == 401) {
            return 401;
          } else {
            dispatch('toastError', 'error: ' + error.response.status);
          }
        } else if (error.request) {
          dispatch('toastError', 'Try again later');
        } else {
          dispatch('toastError', 'error: ' + error.message);
        }
      });
    },
    put({ getters, dispatch }, obj) {
      return axios({
        method: "PUT",
        url: getters.urlAxios + obj.url,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "Authorization": "Bearer " + obj.token,
        },
        data: obj.params
      }).then((response) => {
        if (response.data.error) {
          dispatch('toastError', response.data.mensaje);
        } else {
          dispatch('toastSuccess', response.data.mensaje);
        }
        return response.data;
      }).catch((error) => {
        if (error.response) {
          if (error.response.status == 401) {
            return 401;
          } else {
            dispatch('toastError', 'error: ' + error.response.status);
          }
        } else if (error.request) {
          dispatch('toastError', 'Try again later');
        } else {
          dispatch('toastError', 'error: ' + error.message);
        }
      });
    },
    delete({ getters, dispatch }, obj) {
      return axios({
        method: "DELETE",
        url: getters.urlAxios + obj.url,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "Authorization": "Bearer " + obj.token,
        },
        data: obj.params
      }).then((response) => {
        if (response.data.error) {
          dispatch('toastError', response.data.mensaje);
        } else {
          dispatch('toastSuccess', response.data.mensaje);
        }
        return response.data;
      }).catch((error) => {
        if (error.response) {
          if (error.response.status == 401) {
            return 401;
          } else {
            dispatch('toastError', 'error: ' + error.response.status);
          }
        } else if (error.request) {
          dispatch('toastError', 'Try again later');
        } else {
          dispatch('toastError', 'error: ' + error.message);
        }
      });
    },
  },
  getters: {
    urlAxios: (state) => state.urlAxios,
    dialogLoading: (state) => state.dialogLoading,
    rules: (state) => state.rules,
  },
})
