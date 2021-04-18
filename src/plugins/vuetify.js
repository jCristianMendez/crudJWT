import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; 
import VueSession from 'vue-session'
import VueApexCharts from 'vue-apexcharts'


Vue.use(Vuetify);
Vue.use(VueSweetalert2);
Vue.use(VueSession)
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)


export default new Vuetify({
	theme: {
        themes: {
            light: {
                primary: '#C73866',
                secondary: '#FE676E',
                accent: '#FD8F52',
            }
        },
    },
  icons: {
    iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
});
