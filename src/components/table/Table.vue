<script setup lang="ts">
import { defineProps } from "vue";

import TableLoader from "./TableLoader.vue";
import TablePagination from "./TablePagination.vue";

interface TableProps {
    tableHeight?: string;
    isLoading: boolean;
    tableData: any[];
    headers: string[];
    totalCount: number;
    currentPage: number;
}

// Props
const {
    tableHeight = "sm:h-[80vh] h-[100vh]",
    isLoading,
    tableData,
    currentPage,
    totalCount,
} = defineProps<TableProps>();


</script>

<template>
    <div
        :class="[
            'flex flex-col rounded-tl-[10px] pb-3 bg-white rounded-tr-[10px] relative overflow-y-hidden',
            tableHeight,
            isLoading && 'overflow-x-hidden',
        ]"
    >
        <div class="flex-1 overflow-hidden relative">
            <div
                :class="[
                    'h-full w-full custom-scrollbar relative',
                    isLoading ? 'overflow-hidden' : 'overflow-auto',
                ]"
            >
                <table class="table table-auto w-full border-collapse">
                    <thead :class="['sticky top-0 bg-lightGray']">
                        <tr>
                            <th
                                v-for="col in headers"
                                :key="col"
                                :class="[
                                    'first:rounded-tl-[10px] last:rounded-tr-[10px] text-sm leading-normal px-5 py-3 whitespace-nowrap',
                                    'text-dbGray',
                                ]"
                            >
                                <span
                                    class="w-full font-semibold block text-left"
                                >
                                    {{ col }}
                                </span>
                            </th>
                            <th
                                class="text-dbGray font-medium text-sm rounded-tr-[10px] leading-normal px-5 py-3 whitespace-nowrap"
                            >
                                <span class="w-full font-medium block text-left"
                                    >Action</span
                                >
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="!isLoading && tableData.length > 0">
                            <tr
                                :class="[
                                    'px-5 bg-white',
                                    'border-b border-lightGray last:border-transparent',
                                ]"
                                v-for="(row, rowIndex) in tableData"
                                :key="`table-body-row-${rowIndex}`"
                            >
                                <slot name="tr" :row="row" :rowIndex="rowIndex">
                                </slot>
                            </tr>
                        </template>

                        <TableLoader
                            :columns="headers.length + 1"
                            v-if="isLoading"
                        />

                        <tr v-else-if="!isLoading && tableData.length === 0">
                            <td
                                :colspan="headers.length + 1"
                                class="text-center py-5"
                            >
                                No data available.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="flex justify-end pr-5">
            <TablePagination
                :currentPage="currentPage"
                :totalCount="totalCount"
            />
        </div>
    </div>
</template>


