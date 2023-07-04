<template>
    <svg xmlns="http://www.w3.org/2000/svg"  @click="popUpDelete(data)" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 delete">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
    
    <a-modal
    v-model:visible="isDelete"
    title="Delete Category"
    
    @ok="hideModal"
    >   
    <h1>Category gonna delete: {{ categoryGonnaDelete.name  }} </h1>
    <h2>Are you sure?</h2>
    <template #footer>
        <a-button key="submit" type="primary" :disabled="isLoadingDelete"  @click="cancelDelete">Cancle</a-button>
        <a-button key="submit" type="danger" :disabled="isLoadingDelete" :loading="isLoadingDelete"   @click="handleDelete(categoryGonnaDelete._id)">Delete</a-button>
    </template>
</a-modal>
</template>

<script setup>
    import store from "@/store/index.js"
    import AdminListingENUM from '../../../util/AdminListingENUM';
    import {ref} from 'vue'
    const isLoadingDelete=ref(false)
    const isDelete=ref(false)
    const categoryGonnaDelete=ref("")


    const prop=defineProps({
        data: Object
    })

    const popUpDelete=(category)=>{
        categoryGonnaDelete.value=category
        isDelete.value=true
        
    }
    const handleDelete=(id)=>{
        isLoadingDelete.value=true
        const token=localStorage.getItem("token")
        fetch(`${store.state.apiUrl}/category/${id}`,{
            method: 'delete',
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>res.json())
        .then(data=>{
            getCategory(AdminListingENUM.CATEGORY)
        })
    }
    const cancelDelete=()=>{
        isDelete.value=false,
        categoryGonnaDelete.value=""
        isLoadingDelete.value=false
    }
    const getCategory= (index)=>{
        store.state.isLoading_cp=true
        fetch(`${store.state.apiUrl}/category`)
        .then(res=>res.json())
        .then(data=>{
            store.state.CP_ListingNumber=index
            store.state.categoryData=data.category
            store.state.isLoading_cp=false
            isDelete.value=false,
            categoryGonnaDelete.value=""
            isLoadingDelete.value=false
        })
        
    }
</script>

<style lang="scss" scoped>
    svg{
        --size:1.5rem;
        width: var(--size);
        cursor: pointer;
        &.delete{
            color: red;
        }
    }
</style>