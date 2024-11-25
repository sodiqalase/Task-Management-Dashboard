<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue";
</script>

<template>
    <aside
        class="h-full transition bg-white px-4 py-8 w-[250px] duration-700 overflow-hidden sm:flex hidden flex-col border-r border-lightGray gap-y-6 relative"
    >
        <h6 class="font-bold text-primary text-2xl">TaskMD</h6>
        <nav>
            <ul>
                <SidebarItem
                    :path="'/dashboard/overview'"
                    :label="'Overview'"
                    :icon="'overview'"
                />
                <SidebarItem
                    :path="'/dashboard/task'"
                    :label="'Task Management'"
                    :icon="'task'"
                />
            </ul>
        </nav>
    </aside>
</template>
