import radialBar from '@/components/radialBar.vue'
import { mapGetters } from "vuex";

export default {
    components: {
        radialBar,
    },
    data: () => ({
        valid: false,
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        dialog: false,
        dialogDelete: false,
        loadingTable: false,
        token: '',
        headers: [
            { text: 'Acciones', align: 'center', value: 'actions', sortable: false },
            { text: 'Name of the game', align: 'center', value: 'gameName' },
            { text: 'Completion Percentage', align: 'center', value: 'complPercen' },
            { text: 'Hours Played', align: 'center', value: 'hoursPlayed' },
            { text: 'Date you started playing', align: 'center', value: 'numberDate' },
            { text: 'Score', align: 'center', value: 'score' },
        ],
        games: [],
        isediting: false,
        editedGame: {
            name: '',
            completion: 0,
            hours: 0,
            date: new Date().toISOString().substr(0, 10),
            score: 0,
        },
        defaultItem: {
            name: '',
            completion: 0,
            hours: 0,
            date: '',
            score: 0,
        },
    }),

    computed: {
        ...mapGetters(["rules"]),
        formTitle() {
            return this.isediting ? 'New game' : 'Edit game'
        },
        isMobile() {
            if (this.$vuetify.breakpoint.name === "xs") {
              return true;
            } else {
              return false;
            }
          },
    },

    created() {
        this.token = this.$session.get('jwt');
        this.initialize()
    },

    methods: {
        initialize() {
            this.games = [];
            var obj = {
                token: this.token,
                url: 'game/getGamesByUserId'
            }
            this.loadingTable = true;
            this.$store.dispatch("get", obj)
                .then(data => {
                    this.loadingTable = false;
                    if (data != 401) {
                        this.games = data;
                    } else {
                        this.$store.dispatch("toastError", "Session has expired, please login again");
                        this.$session.destroy();
                        this.$router.push({ name: 'Login' })
                    }
                })
        },

        editGame(item) {
            this.isediting = true;
            this.editedGame = {
                name: item.gameName,
                completion: item.complPercen,
                hours: item.hoursPlayed,
                date: item.dateFormat,
                score: item.score,
                idGame: item.idGame
            };
            this.dialog = true
        },

        deleteGame(item) {
            this.editedGame = {
                name: item.gameName,
                idGame: item.idGame
            };
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.$store.commit("dialogLoading")
            const params = new URLSearchParams();
            params.append("idGame", this.editedGame.idGame);
            var obj = {
                url: "game/deleteGameById",
                params: params,
                token: this.token
            }
            this.$store.dispatch("delete", obj)
                .then(data => {
                    this.$store.commit("dialogLoading")
                    if (data == 401) {
                        this.$store.dispatch("toastError", "Session has expired, please login again");
                        this.$session.destroy();
                        this.$router.push({ name: 'Login' })
                    }
                    if (!data.error) {
                        this.closeDelete();
                        this.initialize();
                    }
                });
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedGame = Object.assign({}, this.defaultItem)
                this.isediting = false
                this.$refs.form.resetValidation();
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedGame = Object.assign({}, this.defaultItem)
            })
        },

        save() {
            if (this.isediting) {
                if (this.$refs.form.validate()) {
                    this.$store.commit("dialogLoading")
                    const params = new URLSearchParams();
                    params.append("gameName", this.editedGame.name);
                    params.append("complPercen", this.editedGame.completion);
                    params.append("hoursPlayed", this.editedGame.hours);
                    params.append("startPlayed", this.editedGame.date);
                    params.append("score", this.editedGame.score);
                    params.append("idGame", this.editedGame.idGame);
                    var obj = {
                        url: "game/editGameById",
                        params: params,
                        token: this.token
                    }
                    this.$store.dispatch("put", obj)
                        .then(data => {
                            this.$store.commit("dialogLoading")
                            if (data == 401) {
                                this.$store.dispatch("toastError", "Session has expired, please login again");
                                this.$session.destroy();
                                this.$router.push({ name: 'Login' })
                            }
                            if (!data.error) {
                                this.close();
                                this.initialize();
                            }
                        });
                }
            } else {
                if (this.$refs.form.validate()) {
                    this.$store.commit("dialogLoading")
                    const params = new URLSearchParams();
                    params.append("gameName", this.editedGame.name);
                    params.append("complPercen", this.editedGame.completion);
                    params.append("hoursPlayed", this.editedGame.hours);
                    params.append("startPlayed", this.editedGame.date);
                    params.append("score", this.editedGame.score);
                    var obj = {
                        url: "game/registerGame",
                        params: params,
                        token: this.token
                    }
                    this.$store.dispatch("post", obj)
                        .then(data => {
                            this.$store.commit("dialogLoading")
                            if (data == 401) {
                                this.$store.dispatch("toastError", "Session has expired, please login again");
                                this.$session.destroy();
                                this.$router.push({ name: 'Login' })
                            }
                            if (!data.error) {
                                this.close();
                                this.initialize();
                            }
                        });
                }
            }
        },
    },
}