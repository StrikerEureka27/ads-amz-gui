<script setup lang="ts">

import { onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

onMounted(()=>{
    console.log(useAuth0());
});

const logIn = () => {
    const { loginWithRedirect } = useAuth0();
    return loginWithRedirect();
}

</script>
<template>
    <v-container class="d-flex justify-center" fluid>
        <v-card min-width="500" :rounded="100" :elevation="4">
            <v-card-title>
                <v-icon size="x-small">mdi-lock</v-icon> <span class="font-weight-light">Login</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form class="d-flex flex-column align-items mt-4" ref="form">
                    <v-text-field label="username" size="x-small" variant="solo-filled" clearable required></v-text-field>
                    <v-text-field label="password" size="x-small" variant="solo-filled" type="password" clearable
                        required></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-action class="d-flex flex-column pa-4">
                <v-btn color="secondary" size="small" variant="tonal" @click="logIn()" block>Continue</v-btn>
            </v-card-action>
        </v-card>
    </v-container>
</template>
<style></style>