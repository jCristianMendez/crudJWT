import { mapGetters } from "vuex";
import dialogLoading from "@/components/dialogLoading.vue";
import footerComp from "@/components/footerComp.vue";

export default {
    components: {
        dialogLoading,
        footerComp
    },
    data: () => ({
      validform: false,
      validCreate: false,
      loginCred:{
        email: "",
        password: "",
      },
      show1: false,
      showLogin: true,
      create:{
        email: "",
        password: "", 
      },
      validEmail: true,
      loadingValidateEmail: false,
    }),
    methods: {
      login() {
        if (this.$refs.form.validate()) {
            this.$store.commit("dialogLoading")
            const params = new URLSearchParams();
            params.append("email", this.loginCred.email);
            params.append("password", this.loginCred.password);
            var obj = {
                url: "user/login",
                params: params
            }
            this.$store.dispatch("post",obj)
            .then(data => {
                if(!data.error){
                    this.$session.start()
                    this.$session.set('jwt', data.usuario.token)
                    this.$session.set('email', data.usuario.email)
                    this.$router.push({ name: "Games" });
                }
                this.$store.commit("dialogLoading")
            });
        }
      },
      createAccount(){
        if (this.$refs.formCreate.validate()) {
            if(this.validEmail && !this.loadingValidateEmail){
                this.$store.commit("dialogLoading")
                const params = new URLSearchParams();
                params.append("email", this.create.email);
                params.append("password", this.create.password);
                var obj = {
                    url: "user/registrar",
                    params: params
                }
                this.$store.dispatch("post",obj)
                .then(data => {
                    this.$store.commit("dialogLoading")
                    if(!data.error){
                        this.btnCancelCreate();
                    }
                });
            }else{
                if(!this.validEmail){
                    this.$store.dispatch("toastError","Email is already in use, please change it");
                }else{
                    this.$store.dispatch("toastError","Wait for email validation please");
                }
            }
        }
      },
      validateEmail(){
        if(/.+@.+\..+/.test(this.create.email)){
            this.loadingValidateEmail = true;
            const params = new URLSearchParams();
            params.append("email", this.create.email);
            var obj = {
                url: "user/checkEmail",
                params: params
            }
            this.$store.dispatch("post",obj)
            .then(data => {
                this.loadingValidateEmail = false;
                if(data.error){
                    this.validEmail = false;
                }else{
                    this.validEmail = true;
                }
            });
        }
      },
      btnCreateAccount() {
        this.showLogin = false;
      },
      btnCancelCreate(){
        this.showLogin = true;
        this.create = {
            email: "",
            password: "", 
        };
        this.$refs.formCreate.resetValidation();
      }
    },
    computed: {
      ...mapGetters(["rules"]),
      idMobile() {
        if (this.$vuetify.breakpoint.name === "xs") {
          return true;
        } else {
          return false;
        }
      },
    },
  };