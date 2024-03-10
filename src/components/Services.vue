<template>
  <v-container>
    <h1 :style="{ color: theme.current.value.colors.primary }">
      {{ $t('Services.title') }}
    </h1><br>
    <v-expansion-panels multiple>
      <v-row>
        <v-col cols="12" md="6">
          <v-expansion-panel elevation="20">
            <v-expansion-panel-title><b>
              {{ $t('Services.title1') }}
            </b></v-expansion-panel-title>
            <v-expansion-panel-text>
              {{ $t('Services.text1') }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
        <v-col cols="12" md="6">
          <v-expansion-panel elevation="20">
            <v-expansion-panel-title><b>
              {{ $t('Services.title2') }}
            </b></v-expansion-panel-title>
            <v-expansion-panel-text>
              {{ $t('Services.text2') }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
      </v-row>
    </v-expansion-panels><br>
    <v-expansion-panels multiple>
      <v-row>
        <v-col cols="12" md="6">
          <v-expansion-panel elevation="20">
            <v-expansion-panel-title><b>
              {{ $t('Services.title3') }}
            </b></v-expansion-panel-title>
            <v-expansion-panel-text>
              {{ $t('Services.text3') }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
        <v-col cols="12" md="6">
          <v-expansion-panel elevation="20">
            <v-expansion-panel-title><b>
              {{ $t('Services.title4') }}
            </b></v-expansion-panel-title>
            <v-expansion-panel-text>
              {{ $t('Services.text4') }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
      </v-row>
    </v-expansion-panels><br>
    <v-expansion-panels multiple>
      <v-row>
        <v-col cols="12" md="12">
          <v-expansion-panel elevation="20">
            <v-expansion-panel-title><b>
              {{ $t('Services.title5') }}
            </b></v-expansion-panel-title>
            <v-expansion-panel-text>
              {{ $t('Services.text5') }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
      </v-row>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
  import { useTheme } from 'vuetify';

  const theme = useTheme();
</script>
  