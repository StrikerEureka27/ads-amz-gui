<script setup lang="ts">

import { useRouter, useRoute } from 'vue-router';

const route = useRoute();

function showAppBar(): boolean {
  return route.path!="/Welcome";
}

</script>
<template>
  <v-app-bar v-if="showAppBar()"  elevation="2">
    <v-list class="d-flex pa-2">
      <v-img width="40" src="https://i.imgur.com/gY3eDfr.png"></v-img>
      <v-list-item>
        <v-list-item-title class="text-h8">
          AMZWEB SERVICES
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-app-bar>
</template>
<style scoped></style>