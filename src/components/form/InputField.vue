<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

interface Props {
    id?: string;
    label: string;
    modelValue: string | number;
    placeholder?: string;
    error?: string;
}

const {
    id = `custom-input-${Math.random().toString(36).slice(2, 9)}`,
    label,
    modelValue,
    placeholder,
    error,
} = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
const value = computed({
    get() {
        return modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
// defineEmits(["update:modelValue", "blur"]);
</script>

<template>
    <div class="">
        <label
            class="text-sm leading-4 h-4 mb-[10px] block text-[#8897A0] font-normal"
            :for="id"
            >{{ label }}</label
        >
        <input
            :id="id"
            type="text"
            :placeholder="placeholder"
            v-model="value"
            class="block w-full rounded-[12px] border border-lightGray px-4 outline-none text-sm h-[50px]"
        />
        <p v-if="!!error" class="error">{{ error }}</p>
    </div>
</template>
