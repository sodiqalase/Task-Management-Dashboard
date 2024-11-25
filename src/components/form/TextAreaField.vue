<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

interface Props {
    id?: string;
    label: string;
    modelValue: string | number;
    placeholder?: string;
    error?: string;
    onBlur?: () => void;
    rows?:number
}

const {modelValue,rows=3} = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
const value = computed({
    get() {
        return modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

</script>

<template>
    <div class="">
        <label
            class="text-sm leading-4 h-4 mb-[10px] block text-dbGray font-medium"
            :for="id"
            >{{ label }}</label
        >
        <textarea
            :id="id"
            type="text"
            :placeholder="placeholder"
            @blur="onBlur" 
            :rows="rows"
            v-model="value"
            class="block w-full rounded-[12px] border border-slate-300 px-4 py-1 outline-none text-sm min-h-[50px]"
        />
        <p class="text-xs mt-[2px] text-red-500" v-if="!!error" >{{ error }}</p>
    </div>
</template>
