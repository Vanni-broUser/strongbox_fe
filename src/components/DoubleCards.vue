<template>
  <v-container>
    <h1 :style="{ color: theme.current.value.colors.primary }">
      {{ $t('DoubleCards.title') }}
    </h1><br>
    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="20">
          <v-img src="@/assets/double_card1.jpg" style="max-height: 400px;" cover />
          <v-card-title style="white-space: normal;">
            {{ $t('DoubleCards.title1') }}
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card elevation="20">
          <v-img src="@/assets/double_card2.jpg" style="max-height: 400px;" cover />
          <v-card-title style="white-space: normal;">
            {{ $t('DoubleCards.title2') }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { useTheme } from 'vuetify';

  const theme = useTheme();
</script>
  