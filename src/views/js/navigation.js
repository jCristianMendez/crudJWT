import dialogLoading from "@/components/dialogLoading.vue";
import footerComp from "@/components/footerComp.vue";

export default {
    components: {
        dialogLoading,
        footerComp
    },
    data: () => ({
      drawer: true,
      loading: false,
      userEmail: '',
  
      menus: [
          {icon: 'mdi-controller-classic', title: 'Games', link: '/sesion'},
          {icon: 'mdi-controller-classic-outline', title: 'Pagination Games', link: '/pagination'},
          {icon: 'mdi-view-agenda', title: 'Agenda', link: '/agenda'},
      ],
    }),
    beforeCreate: function () {
        if (!this.$session.exists()) {
            this.$router.push({name: 'Login'})
        }
      },
    created() {
      this.userEmail = this.$session.get('email');
    },
    methods: {
      setDrawer() {
        this.drawer = !this.drawer;
      },
      btnCerrarSesion(){
        this.$session.destroy()
        this.$router.push({name: 'Login'})
      }
    },
  };
  