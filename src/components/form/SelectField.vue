<script setup lang="ts">
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

import { computed } from "vue";

interface ISelectFieldOption {
    key: string;
    label: string;
}

const emit = defineEmits(["update:modelValue", "metaSelected"]);
const props = defineProps<{
    label?: string;
    name: string;
    placeholder?: string;
    options?: Array<ISelectFieldOption | string>;
    modelValue?: string | number;
    onBlur?: () => void;
    error?: string;
    onChange?: (value: string | number) => void;
}>();

const selected = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
        if (props.onChange) {
            props.onChange(value!);
        }
    },
});
const display = computed(
    () => parsedOptions.value?.find((opt) => opt.key === selected.value)?.label
);
const parsedOptions = computed(
    () =>
        props.options?.map((option) => {
            return typeof option === "string"
                ? {
                      label: option,
                      key: option,
                  }
                : option;
        }) ?? []
);
</script>

<template>
    <div class="relative">
        <label
        v-if="!!label"
            class="text-sm leading-4 h-4 mb-[10px] block text-dbGray font-medium"
            :for="name"
            >{{ label }}</label
        >
        <div>
            <Listbox v-model="selected" :name="name">
                <div class="relative">
                    <ListboxButton
                        @click="onBlur"
                        class="flex items-center bg-white w-full rounded-[12px] border border-slate-300 px-4 outline-none text-sm h-[50px]"
                        v-slot="{ open }"
                    >
                        <span
                            :class="'text-blueGray'"
                        >
                            {{ display || selected || placeholder }}
                        </span>

                        <ChevronDownIcon
                            :class="{ 'rotate-180': open }"
                            class="h-3 w-3 ml-auto transform duration-100"
                        />
                    </ListboxButton>
                    <ListboxOptions
                        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 z-[1001] ring-black/5 focus:outline-none sm:text-sm"
                    >
                        <ListboxOption
                            v-slot="{ active, selected }"
                            v-for="option in parsedOptions"
                            :key="option.key"
                            :value="option.label"
                            as="template"
                        >
                            <li
                                :class="[
                                    active
                                        ? 'bg-blue-100 text-blue-900'
                                        : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-10 pr-4',
                                ]"
                            >
                                <span
                                    :class="[
                                        selected
                                            ? 'font-medium'
                                            : 'font-normal',
                                        'block truncate',
                                    ]"
                                    >{{ option.label }}</span
                                >
                                <span
                                    v-if="selected"
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                                >
                                    <CheckIcon
                                        class="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </div>
            </Listbox>
            <p class="text-xs mt-[2px] text-red-500" v-if="!!error">
                {{ error }}
            </p>
        </div>
    </div>
</template>
