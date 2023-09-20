<script setup lang="ts" >

import { ref, onMounted, watch } from 'vue';
import type { IAccount } from '@/data/account.model';
import Formula from '@/views/Formula.vue';

const props = defineProps(['account']);
const account = ref<IAccount>(props.account);
onMounted(()=>{
    watch(() => props.account, (newAccount) => {
        account.value = newAccount;
    }, { deep: true });
});


</script>
<template>
     <v-container class="d-flex justify-center" fluid>
       <formula :account="account" ></formula>
    </v-container>
</template>
<style></style>