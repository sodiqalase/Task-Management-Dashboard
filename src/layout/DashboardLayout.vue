<script setup lang="ts">
import Sidebar from "./sidebar/Sidebar.vue";

// import Overview from '@/pages/Homepage.vue';
</script>

<template>
    <div class="h-screen flex max-h-screen w-screen overflow-hidden">
        <Sidebar />
        <div class="flex bg-[#F4F7FE] flex-1 overflow-hidden flex-col h-full">
            <header
                class="h-[60px] z-50 bg-white p-4 items-center flex"
            >
                <!-- Navbar content -->
                <h1 class="font-bold">Overview</h1>
            </header>
            <main class="h-full pb-[10px] flex-1 overflow-hidden flex flex-col">
                <section class="h-full overflow-y-auto px-4 py-3">
                    <router-view />
                </section>
            </main>
        </div>
    </div>
</template>
