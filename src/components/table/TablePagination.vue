<script setup lang="ts">
import { ref, watch } from "vue";
import { useURLQuery } from "../../composables/useURLQuery";

interface Props {
    currentPage: number
    totalCount: number
}

const {setURLQuery}=useURLQuery()

const { currentPage: propCurrentPage, totalCount } = defineProps<Props>();

const currentPage = ref(propCurrentPage);

watch(() => propCurrentPage, (newValue) => {
  currentPage.value = newValue;
});

const updatePageQuery = (val:number) => { 
  setURLQuery({page: val?.toString()??"1"})
 }

</script>


<template>
    <div class="custom-pagination">
      <vue-awesome-paginate
        :total-items="totalCount"
        v-model="currentPage"
        :items-per-page="10"
        :max-pages-shown="10"
        @click="updatePageQuery"
        
      >
        <template #prev-button>
    
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
            </svg>
         
        </template>
  
        <template #next-button>
 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
            </svg>
        
        </template>
      </vue-awesome-paginate>
    </div>
  </template>
  

  <style>
  .custom-pagination .pagination-container {
    column-gap: 10px;
    align-items: center;
    font-family: Jost-Medium;
  }
  .custom-pagination .paginate-buttons {
    height: 30px;
    width: 30px;
    cursor: pointer;
    border-radius: 4px;
    background-color: transparent;
    border: none;
    color: #667085;
  }
  
  .custom-pagination .back-button,
  .custom-pagination .next-button {
    background-color: #E6E9ED;
    color: white;
    border-radius: 8px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
  }
  .custom-pagination .active-page {
    background-color: #e5e5e5;
  }
  .custom-pagination .paginate-buttons:hover {
    background-color: #f5f5f5;
  }
  .custom-pagination .active-page:hover {
    background-color: #e5e5e5;
  }
  
  .custom-pagination .back-button svg {
    transform: rotate(180deg) translateY(0px);
  }
 
  
  .custom-pagination .back-button:hover,
  .custom-pagination .next-button:hover {
    background-color: #617091;
  }
  
  .custom-pagination .back-button:active,
  .custom-pagination .next-button:active {
    background-color: rgb(85, 85, 85);
  }
  </style>