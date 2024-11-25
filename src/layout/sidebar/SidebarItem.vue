<script setup lang="ts">
import { useRoute,useRouter } from "vue-router";
import { computed } from "vue";
import OverviewIcon from "../../assets/sidebar/OverviewIcon.vue";
import TaskManagementIcon from "../../assets/sidebar/TaskManagementIcon.vue";
const iconsMap = {
    overview: OverviewIcon,
    task: TaskManagementIcon,
} as const;

type IconType = keyof typeof iconsMap;
interface Props {
    path: string;
    label: string;
    icon: IconType;
    onClick?: () => void;
}

const route = useRoute();
const router = useRouter();
const { path, label, icon, onClick=null } = defineProps<Props>();


const handleClick = () => { 
    router.push({path})
    onClick?.()
 }

const isActive = computed(() => route.path === path);
</script>

<template>
    <li v-if="!onClick">
        <router-link
            :class="[
                'flex gap-x-4 rounded cursor-pointer mb-[2px] last:mb-0 items-center px-2 py-3',
                isActive ? 'bg-primary/10' : 'bg-transparent',
            ]"
            :to="path"
        >
            <component
                :is="iconsMap[icon]"
                :style="isActive ? 'text-primary' : 'text-blueGray'"
            />
            <span
                :class="[
                    'text-sm font-medium',
                    isActive ? 'text-primary' : 'text-blueGray',
                ]"
                >{{ label }}</span
            >
        </router-link>
    </li>

    <li
        v-else
        @click="handleClick"
        :class="[
            'flex gap-x-4 rounded cursor-pointer mb-[2px] last:mb-0 items-center px-2 py-3',
            isActive ? 'bg-primary/10' : 'bg-transparent',
        ]"
    >
        <component
            :is="iconsMap[icon]"
            :style="isActive ? 'text-primary' : 'text-blueGray'"
        />
        <span
            :class="[
                'text-sm font-medium',
                isActive ? 'text-primary' : 'text-blueGray',
            ]"
            >{{ label }}</span
        >
    </li>
</template>
