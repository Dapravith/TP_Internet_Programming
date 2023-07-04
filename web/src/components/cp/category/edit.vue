<template>
    <svg xmlns="http://www.w3.org/2000/svg" @click="popUpDelete(data)" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 edit">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
    
    
    <!--Confirm-->
    <a-modal v-model:visible="isEdit" :title="`Edit Category | ${categoryGonnaEdit.name}` " @ok="handleOk">
        <div class="input" v-if="!isLoadingEdit">
            <label for="name">Category name : </label>
            <div class="name_input">
                
                <input type="text" :class="isError ?'err':''" placeholder="Name" v-model="categoryName" required>
                <p class="errMsg" v-if="isError">{{ errMsg }}</p>
            </div>
        </div>
        <div id="loader" v-if="isLoadingEdit">
            <span class="loader" ></span>
        </div>
        <template #footer>
            <a-button key="submit" type="primary" :disabled="isLoadingEdit"  @click="handleCancle">Cancel</a-button>
            <a-button key="submit" type="primary" :disabled="isLoadingEdit" :loading="isLoadingEdit" @click="handleEdit(categoryGonnaEdit._id)">Save</a-button>
        </template>
    </a-modal>
</template>

<script setup>
    import store from "@/store/index.js"
    import AdminListingENUM from '../../../util/AdminListingENUM';
    import {ref} from 'vue'
    const isLoadingEdit=ref(false)
    const isEdit=ref(false)
    const categoryGonnaEdit=ref("")
    const categoryName=ref("")
    const isError=ref(false)
    const errMsg=ref("Category name required")
    const prop=defineProps({
        data: Object
    })

    const popUpDelete=(category)=>{
        categoryGonnaEdit.value=category
        categoryName.value=categoryGonnaEdit.value.name
        isEdit.value=true
        
    }
    const handleEdit=(id)=>{
    

        const regex = /^\s*$/;
        if (regex.test(categoryName.value)) {
            isError.value=true
            return
        }
        isLoadingEdit.value=true
        const token=localStorage.getItem("token")
        fetch(`${store.state.apiUrl}/category/${id}`,{
            method: 'put',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({name:categoryName.value})
        }).then(res=>res.json())
        .then(data=>{
            getCategory(AdminListingENUM.CATEGORY)
        })
    }
    const handleCancle=()=>{
        isEdit.value=false,
        categoryGonnaEdit.value=""
        isLoadingEdit.value=false
        isError.value=false
    }
    const getCategory= (index)=>{
        store.state.isLoading_cp=true
        fetch(`${store.state.apiUrl}/category`)
        .then(res=>res.json())
        .then(data=>{
            store.state.CP_ListingNumber=index
            store.state.categoryData=data.category
            store.state.isLoading_cp=false
            isEdit.value=false,
            categoryGonnaEdit.value=""
            isLoadingEdit.value=false
        })
        
    }
</script>

<style lang="scss" scoped>
    .input{
        display: flex;
        gap: 1rem;
        font-size: 1rem;
        align-items: center;
        .name_input{
            position: relative;
            input{
                border: none;
                outline: none;
                border-radius: .2rem;
                padding: .2rem .5rem;
                transition: 300ms;
                box-shadow: 0 0 0 2px black;
                &.err{
                    box-shadow: 0 0 0 2px red;
                }
            }
            .errMsg{
                color: red;
                position: absolute;
                font-weight: bold;
                font-size: small;
            }
            
        }
    }
    svg{
        --size:1.5rem;
        width: var(--size);
        cursor: pointer;
        &.edit{
            color: rgb(0, 119, 255);
        }
    }
</style>