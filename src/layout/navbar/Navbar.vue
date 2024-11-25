<script setup lang="ts">
import { computed,ref } from "vue";
import { useRoute } from "vue-router";
import { extractPageTitle } from "../../utils/string.util";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import MobileNav from "./MobileNav.vue";

const route = useRoute();

const pageHeader = computed(() => { 
    return extractPageTitle(route.path);
 })

 const showNav = ref<boolean>(false)

 const closeNav = (
    
 ) => { 
    showNav.value =false
  }


</script>

<template>
    <header
                class="h-[60px] justify-between z-50 bg-white p-4 items-center flex"
            >
                <h1 class="font-bold">{{pageHeader}}</h1>
                <Bars3Icon
                @click="showNav = true"
                class="w-6 h-6 text-inputGray sm:hidden block "
                />



                <MobileNav v-if="showNav" :onClose="closeNav"/>
            </header>
</template>




<style scoped>

</style>