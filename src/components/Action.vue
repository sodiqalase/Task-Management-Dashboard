<script setup lang="ts">
import { ref, watch, computed, onUnmounted } from "vue";
import { EllipsisVerticalIcon } from "@heroicons/vue/24/outline";

// Props
interface Option {
  name: string;
  hide?: boolean;
  onClick: () => void;
}

const props = defineProps<{
  options: Option[];
}>();

const { options } = props;

const calculateDropdownPosition = computed(() => {
  if (actionRef.value) {
    const { bottom, right } = actionRef.value.getBoundingClientRect();
    return {
      top: `${bottom}px`,
      left: `${right - 111}px`, // Assuming dropdown width is 111px
    };
  }
  return {};
});

// State
const isOpen = ref(false);

// Allowed Options (computed based on the `hide` property)
const allowedOptions = computed(() => {
  return options.filter((opt) => !opt?.hide);
});

// Toggle the dropdown
const toggleAction = () => {
  isOpen.value = !isOpen.value;
};

// Close the dropdown when clicking outside
const clickListener = (event: Event) => {
  const actionElement = actionRef.value;
  if (
    isOpen.value &&
    actionElement &&
    !actionElement.contains(event.target as Node)
  ) {
    isOpen.value = false;
  }
};

// Ref for the action wrapper
const actionRef = ref<HTMLElement | null>(null);

// Watch `isOpen` to add or remove the event listener dynamically
watch(isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener("click", clickListener);
  } else {
    document.removeEventListener("click", clickListener);
  }
});

// Cleanup on component unmount
onUnmounted(() => {
  document.removeEventListener("click", clickListener);
});
</script>

<template>
  <div ref="actionRef" class="relative">
    <!-- Trigger -->
    <slot name="trigger" :action="toggleAction">
      <EllipsisVerticalIcon
        @click="toggleAction"
        class="w-6 font-bold text-dbGray cursor-pointer"
      />
    </slot>

    <!-- Dropdown (teleported) -->
    <teleport to="body">
      <ul
        v-if="isOpen && allowedOptions.length"
        :class="[
          'fixed z-50 min-w-[111px] rounded-lg py-2 px-2 bg-white shadow-md',
        ]"
        :style="calculateDropdownPosition"
      >
        <li
          v-for="item in allowedOptions"
          :key="item.name"
          @click="
            item.onClick();
            isOpen = false;
          "
          class="text-xs cursor-pointer list-none px-2 py-1 hover:bg-slate-100 text-blueGray font-medium"
        >
          {{ item.name }}
        </li>
      </ul>
    </teleport>
  </div>
</template>

