<script setup lang="ts" >

import { ref } from 'vue';
import type { IAccount } from '@/data/account.model';
import FilterView from '@/views/Filter.vue';

const props = defineProps(['account']);
const account = ref<IAccount>(props.account);


</script>
<template>
     <v-container class="d-flex justify-center" fluid>
        <filter-view :account="account" ></filter-view>
    </v-container>
</template>
<style></style>