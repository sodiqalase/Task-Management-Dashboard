<script setup lang="ts">
interface Props {
    style?: string;
}
const {style=''}=defineProps<Props>()

</script>

<template>
    <div :class="['custom-skeleton min-h-2',style]" />
</template>