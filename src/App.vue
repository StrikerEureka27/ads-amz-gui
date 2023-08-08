<script setup lang="ts">

import NavigationBar from '@/components/NavigationBar.vue';
import FotterBar from '@/components/FotterBar.vue';


</script>

<template>
    <v-app>
        <v-layout class="test">
            <NavigationBar></NavigationBar>
        <v-main class="d-flex align-center">
            <RouterView></RouterView>
        </v-main>
        <FotterBar></FotterBar>
        </v-layout>
    </v-app>
</template>

<style scoped>

/* .test {
  background: linear-gradient(-45deg, #90f6d7, #35bcbf,  #41506b, #263849);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
} */

</style>
