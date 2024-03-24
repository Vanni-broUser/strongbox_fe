<template>
  <v-container class="login-container">
    <Login v-if="status == 1" @changeStatus="changeStatus" />
    <Signin v-if="status == 2" @changeStatus="changeStatus" />
    <ChangePassword v-if="status == 3" @changeStatus="changeStatus" />
  </v-container>
</template>

<script setup>
  import { ref } from 'vue';
  import Login from '@/components/users/Login';
  import Signin from '@/components/users/Signin';
  import ChangePassword from '@/components/users/ChangePassword';

  const status = ref(1);

  const changeStatus = (value) => {
    status.value = value;
  };
</script>
