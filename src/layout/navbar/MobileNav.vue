<script setup lang="ts">
import SidebarItem from "../sidebar/SidebarItem.vue";

interface Props {
    onClose: () => void;
}

defineProps<Props>();
</script>

<template>
    <section
        @click="onClose"
        class="fixed z-[1000] bg-[#00000090] top-0 left-0 right-0 bottom-0 w-screen h-screen overflow-hidden backdrop-blur-sm"
    >
        <aside
            class="h-full transition bg-white px-4 py-8 w-[250px] duration-700 overflow-hidden sm:hidden flex flex-col border-r border-lightGray gap-y-6 relative"
            @click="(e) => e.stopPropagation()"
        >
            <h6 class="font-bold text-primary text-2xl">TaskMD</h6>
            <nav>
                <ul>
                    <SidebarItem
                        :path="'/dashboard/overview'"
                        :label="'Overview'"
                        :icon="'overview'"
                        :onClick="onClose"
                    />
                    <SidebarItem
                        :path="'/dashboard/task-management'"
                        :label="'Task Management'"
                        :icon="'task'"
                        :onClick="onClose"
                    />
                </ul>
            </nav>
        </aside>
    </section>
</template>

<style scoped></style>
