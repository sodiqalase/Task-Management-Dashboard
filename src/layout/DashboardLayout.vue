<script setup lang="ts">
import Navbar from "./navbar/Navbar.vue";
import Sidebar from "./sidebar/Sidebar.vue";

// import Overview from '@/pages/Homepage.vue';
</script>

<template>
    <div class="h-screen flex max-h-screen w-screen overflow-hidden">
        <Sidebar />
        <div class="flex bg-[#F4F7FE] flex-1 overflow-hidden flex-col h-full">
           <Navbar/>
            <main class="h-full pb-[10px] flex-1 overflow-hidden flex flex-col">
                <section class="h-full overflow-y-auto px-4 py-3">
                    <router-view />
                </section>
            </main>
        </div>
    </div>
</template>
