<template>
  <v-app>
    <v-container>
      <v-row no-gutters justify="center" align="center">
        <v-col cols="12">
          <v-data-table
            dense
            :headers="headers"
            :items="games"
            :loading="loadingTable"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>My Games</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn @click="dialog = true" color="accent" dark class="mb-2">
                  New game
                </v-btn>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-row align="center" justify="center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-hover v-slot="{ hover }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        class="ma-1"
                        :color="hover ? '#254C9B' : '#777777'"
                        @click="editGame(item)"
                      >
                        mdi-pencil
                      </v-icon>
                    </v-hover>
                  </template>
                  <span>Edit</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-hover v-slot="{ hover }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        class="ma-1"
                        :color="hover ? '#CF1F1F' : '#777777'"
                        @click="deleteGame(item)"
                      >
                        mdi-delete
                      </v-icon>
                    </v-hover>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </v-row>
            </template>
            <template v-slot:[`item.complPercen`]="{ item }">
              <radialBar :porcentaje="item.complPercen" />
            </template>
            <template v-slot:[`item.hoursPlayed`]="{ item }">
              {{ item.hoursPlayed }} hrs
            </template>
            <template v-slot:[`item.numberDate`]="{ item }">
              {{ item.startPlayed }}
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-dialog v-model="dialog" max-width="1200px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row align="center" justify="center">
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    :rules="[rules.required]"
                    v-model="editedGame.name"
                    label="Name of the game"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model.number="editedGame.hours"
                    label="Hours Played"
                    :rules="[
                      rules.NumberValid,
                      rules.hourPositive,
                      rules.required,
                    ]"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :rules="[rules.required]"
                        v-model="editedGame.date"
                        label="Date you started to play"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedGame.date"
                      @input="menu = false"
                      :max="date"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-slider
                    :rules="[rules.required]"
                    label="Score"
                    v-model="editedGame.score"
                    color="accent"
                    step="0.1"
                    :max="10"
                    :min="0"
                    thumb-color="primary"
                    thumb-label="always"
                  ></v-slider>
                </v-col>
                <v-col cols="12">
                  <v-subheader class="pl-0 mb-5" v-if="isMobile">
                    Completion Percentage
                  </v-subheader>
                  <v-slider
                    :rules="[rules.required]"
                    v-model="editedGame.completion"
                    :label="isMobile ? '' : 'Completion Percentage'"
                    color="accent"
                    step="0.1"
                    :max="100"
                    :min="0"
                    thumb-color="primary"
                    thumb-label="always"
                  >
                    <template v-slot:thumb-label="{ value }">
                      {{ value }}%
                    </template>
                  </v-slider>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-text class="headline black--text pt-5"
            >Are you sure you want to delete {{ editedGame.name }}?</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script src="./js/games.js"></script>