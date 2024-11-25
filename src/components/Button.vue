<script setup lang="ts">
import { defineProps } from "vue";
import Spinner from "./Spinner.vue";

const variantsMap = {
    primary: "bg-primary text-white",
    secondary: "bg-gray-200 text-dbGray",
};

type ButtonVariant = keyof typeof variantsMap;

interface ButtonProps {
    type?: "button" | "submit";
    variant?: ButtonVariant;
    disabled?: boolean;
    style?: string
    loading?: boolean;
    buttonText: string;
    onClick:()=>void
}

const {
    type = "button",
    disabled = false,
    variant = "primary",
    loading = false,
    buttonText = "",
    style="",
    onClick
} = defineProps<ButtonProps>();
</script>

<template>
    <button
   @click="onClick"
        :type="type"
        :disabled="disabled || loading"
        :class="[
            'flex px-3 h-12 w-full rounded disabled:bg-opacity-50  disabled:hover:bg-opacity-50 disabled:cursor-not-allowed items-center justify-center relative font-medium',
            variantsMap[variant],
            style
        ]"
    >
        <span v-if="loading" class="mr-1">
            <Spinner />
        </span>

        <span>{{ buttonText }}</span>
    </button>
</template>
