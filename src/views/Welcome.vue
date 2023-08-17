<script setup lang="ts">

import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';

const { loginWithRedirect, isAuthenticated } = useAuth0();
const router = useRouter();


function redirect(){
    router.push({name: 'Home'});
}

function logIn() {
    return loginWithRedirect();
};

</script>
<template>
    <v-container v-if="!isAuthenticated ? true :  redirect()" class="d-flex justify-center" fluid>
        <v-card class="amz-logo" variant="tonal">
            <v-img width="210" height="210" src="https://i.imgur.com/gY3eDfr.png"></v-img>
        </v-card>
        <v-card class="d-flex flex-column align-start" color="#FFFFFF00" elevation="0">
            <v-card-title>
                <span class="text-h1">Hello,</span>
            </v-card-title>
            <v-card-text class="font-weight-thin ctxt">
                Let's start <strong>optimizing</strong> your task <br> on amazon.
            </v-card-text>
            <v-card-actions class="pa-4">
                <v-btn color="secondary" variant="tonal" @click="logIn()">Continue</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
<style scoped>
@media only screen and (max-width: 600px) {
    .amz-logo {
        display: none;
    }
}

.ctxt {
    font-size: larger;
    color: rgba(255, 255, 255, 0.753);
}
</style>