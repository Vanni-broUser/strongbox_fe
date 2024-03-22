<template>
  <v-dialog width="500">
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-date-picker v-if="dateTimeFlag" show-adjacent-months v-model="data" @update:model-value="isActive.value = false" style="margin:auto;" />
        <div v-else>
          <v-card-title>
            {{ data ? 'Seleziona un orario' : 'Seleziona prima una data' }}
          </v-card-title>
          <v-card-text v-if="data">
            <v-item-group selected-class="bg-primary" class="column-container" v-model="hours">
              <v-row class="column">
                <v-col row v-for="hour in HOURS_OPTIONS">
                  <v-item v-slot="{ selectedClass, toggle }">
                    <v-card :class="['d-flex align-center', selectedClass]" height="60" dark @click="toggle">
                      <div class="text-h4 flex-grow-1 text-center">
                        {{ hour }}
                      </div>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
            <v-item-group selected-class="bg-primary" class="column-container" v-model="minutes">
              <v-row class="column">
                <v-col row v-for="minute in MINUTES_OPTIONS">
                  <v-item v-slot="{ selectedClass, toggle }">
                    <v-card :class="['d-flex align-center', selectedClass]" height="60" dark @click="toggle">
                      <div class="text-h4 flex-grow-1 text-center">
                        {{ minute }}
                      </div>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
          </v-card-text>
        </div>
      </v-card>
    </template>
    <template v-slot:activator="{ props }">
      <v-container>
        <v-form fast-fail @submit.prevent="saveNote">
          <v-card elevation="20" title="Crea una nota">
            <v-card-text v-if="!createFlag">
              <v-btn text="Crea" variant="outlined" block @click="createFlag = true" />
            </v-card-text>
            <v-card-text v-else>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field v-model="title" label="Titolo" variant="outlined" :rules="validation.requiredRules" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-textarea rows="2" v-model="content" label="Contenuto" variant="outlined" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-btn variant="outlined" v-bind="props" block @click="dateTimeFlag = true">
                    {{ !data ? 'No data' : data.toLocaleDateString('en-GB') }}
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6" v-bind="props" block @click="dateTimeFlag = false">
                  <v-btn variant="outlined" block>
                    {{ minutes != undefined && hours != undefined ? `${HOURS_OPTIONS[hours]}:${MINUTES_OPTIONS[minutes]}` : 'No ora' }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-checkbox label="Importante" style="height: 30px;" v-model="important" />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions style="float: right;" v-if="createFlag">
              <v-btn text="Annulla" variant="outlined" @click="resetData(true)" />
              <v-btn text="Reset" variant="outlined" @click="resetData(false)" v-if="!editedNote" />
              <v-btn text="Salva" variant="outlined" type="submit" />
            </v-card-actions>
          </v-card>
        </v-form>
      </v-container>
    </template>
  </v-dialog>
</template>

<script setup>
  import http from '@/utils/http';
  import { ref, watch  } from 'vue';
  import { storeToRefs } from 'pinia';
  import validation from '@/utils/validation';
  import { useNotesStore } from '@/stores/notes';

  const HOURS_OPTIONS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14',
                         '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  const MINUTES_OPTIONS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14',
                           '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
                           '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44',
                           '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];

  const title = ref('');
  const content = ref('');
  const createFlag = ref(false);
  const data = ref(undefined);
  const hours = ref(undefined);
  const important = ref(false);
  const minutes = ref(undefined);
  const dateTimeFlag = ref(true);
  const notesStore = useNotesStore();
  const { initNotes, updateEditedNote } = notesStore;
  const { editedNote } = storeToRefs(notesStore);

  const setNote = (note) => {
    title.value = note.title;
    content.value = note.content;
    important.value = note.main;
    data.value = new Date(Date.parse(note.datetime));
    hours.value = data.value.getHours();
    minutes.value = data.value.getMinutes();
  };

  watch(editedNote, function (newValue) {
    createFlag.value = true;
    if (newValue)
      setNote(newValue);
  });

  const saveNote = () => {
    if (!validation.validateInput(title.value, validation.requiredRules)) {
      let params = {
        title: title.value,
        content: content.value
      };
      if (important.value)
        params.main = true;
      if (data.value != undefined && hours != undefined && minutes != undefined)
        params.datetime = formatDateTime();
      http.postRequest(`instances/Note${editedNote.value ? '/' + editedNote.value.id : ''}`, {
        params: params
      }, function (data) {
        resetData();
        initNotes('daily');
        initNotes('weekly');
      }, editedNote.value ? 'PATCH' : 'POST');
    }
  };

  const resetData = (flag) => {
    title.value = '';
    content.value = '';
    data.value = undefined;
    minutes.value = undefined;
    hours.value = undefined;
    important.value = false;
    if (flag) {
      createFlag.value = false;
      if (editedNote.value)
        updateEditedNote(undefined);
    }
  };

  const formatDateTime = () => {
    const year = data.value.getFullYear();
    const month = String(data.value.getMonth() + 1).padStart(2, '0');
    const day = String(data.value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours.value}:${minutes.value}`;
  };
</script>

<style scoped>
  .column {
    flex-direction: column;
    width: 100px;
  }
  .column-container {
    float: left;
    height: 500px;
    overflow-y: auto;
    margin-left: 60px;
  }
</style>
