<script setup lang="ts" >
import { useAuth0 } from '@auth0/auth0-vue';
import LoadFile from '@/components/LoadFile.vue';
import router from '@/router';

const { logout, user, isAuthenticated } = useAuth0();


const navigation = (toPath: string):void =>{
    router.push( { path: toPath } );
}

const logOut = (): void => {
    logout({ logoutParams: { returnTo: window.location.origin + '/Welcome' } });
}
</script>
<template>
    <v-card class="flex-fill flex-lg-grow-0 flex-md-grow-1 flex-sm-grow-1 ma-1" min-width="260">
        <v-card-title>
            Actions
        </v-card-title>
        <v-divider></v-divider>
        <v-card-subtitle class="mt-2">Account</v-card-subtitle>
        <div class="d-flex justify-center">
            <div>
                <v-img class="ma-2" :style="{ borderRadius: '100px' }" :width="50" :src="user?.picture"></v-img>
            </div>
            <div class="d-flex flex-column justify-center">
                <p class="font-weight-thin ctxt"> {{ user?.nickname }}</p>
                <p class="font-weight-thin ctxt"> {{ user?.email }}</p>
            </div>
        </div>
        <v-card-subtitle class="mt-2">Actions</v-card-subtitle>
        <v-card-actions class="d-flex flex-column ma-0 pa-2">
            <v-btn class="ma-1" size="x-small" color="secondary" variant="tonal" block @click="navigation('/repository')" >
                Repository
            </v-btn>
            <v-btn class="ma-1" size="x-small" color="secondary" variant="tonal" block @click="navigation('/account')" >
                Accounts
            </v-btn>
            <v-btn class="ma-1" size="x-small" color="secondary" variant="tonal" block @click="navigation('/reference')" >
                References
            </v-btn>
            <v-btn class="ma-1" size="x-small" color="secondary" variant="tonal" block @click="navigation('/filter')" >
                Filters
            </v-btn>
            <v-btn class="ma-1" size="x-small" color="secondary" variant="tonal" block @click="navigation('/parameter')" >
                Parameters
            </v-btn>
            <v-btn class="ma-1" size="x-small" color="secondary" variant="tonal" block @click="navigation('/formula')" >
                Formulas
            </v-btn>
            <load-file></load-file>
            <v-btn class="mt-2 ma-0" size="x-small" color="red" variant="tonal" @click="logOut()" block>Logout</v-btn>
        </v-card-actions>
    </v-card>
</template>
<style scoped ></style>