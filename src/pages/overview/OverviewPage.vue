<script setup lang="ts">
import OverviewCard from "../../components/OverviewCard.vue";
</script>

<template>
    <div class="flex flex-col gap-y-10">
        <div class="grid sm:grid-cols-3 grid-cols-1 sm:gap-y-0 gap-y-5 gap-x-6 mt-3">
                <OverviewCard :label="'Pending Tasks'" :value="20" />
                <OverviewCard :label="'In Progress Tasks'" :value="20" />
                <OverviewCard :label="'Completed Tasks'" :value="20" />
            </div>
            <div class="grid sm:grid-cols-3 grid-cols-1 sm:gap-y-0 gap-y-5 gap-x-6 mt-3">
                <OverviewCard :label="'Low Priority Tasks'" :value="20" />
                <OverviewCard :label="'Medium Priority Tasks'" :value="20" />
                <OverviewCard :label="'High Priority Tasks'" :value="20" />
            </div>
       
    </div>
</template>
