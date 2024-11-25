<script setup lang="ts">
interface Props {
    label: string;
    value: number;
}

const { value, label } = defineProps<Props>();
</script>

<template>
    <div class="w-full bg-white rounded p-5 shadow-card">
        <h6 class="text-blueGray">{{ label }}</h6>
        <p class="mt-1 font-xl font-bold text-blueGray">{{ value }}</p>
    </div>
</template>
