<script setup lang="ts" >

import { ref } from 'vue';
import type { IAccount } from '@/data/account.model';
import Reference from '@/views/Reference.vue';

const props = defineProps(['account']);
const account = ref<IAccount>(props.account);

</script>
<template>
    <v-container class="d-flex justify-center" fluid>
        <reference :account="account"  ></reference>
    </v-container>
</template>
<style></style>