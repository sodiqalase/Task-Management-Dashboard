<script setup lang="ts">
import Skeleton from "../Skeleton.vue";

interface Props {
    columns: number;
}
const { columns } = defineProps<Props>();
</script>

<template>
    <tr v-for="(_, _index) in Array(10)" :key="_index">
        <td v-for="(_, index) in Array(columns)" :key="index" class="px-5 py-3">
            <Skeleton :style="'w-full h-6 rounded'" />
        </td>
    </tr>
</template>
