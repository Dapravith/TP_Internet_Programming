<template>
    <h1>Category</h1>
    <main>
        <button @click="visible=true">New 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    </main>
    <a-modal v-model:visible="visible" :title="`New Category`" >
        <div class="input" v-if="!isLoading">
            <label for="name">Category name : </label>
            <div class="name_input">
                
                <input type="text" :class="isError ?'err':''" placeholder="Name" v-model="newCategoryName" required>
                <p class="errMsg" v-if="isError">{{ errMsg }}</p>
            </div>
        </div>
        <div id="loader" v-if="isLoading">
            <span class="loader" ></span>
        </div>
        <template #footer>
            <a-button key="submit" type="primary" :disabled="isLoading"  @click="handleCancle">Cancel</a-button>
            <a-button key="submit" type="primary" :disabled="isLoading" :loading="isLoading" @click="Save">Save</a-button>
        </template>
    </a-modal>
</template>

<script setup>
    import {ref} from 'vue'
    import store from '../../../store';
    import AdminListingENUM from '../../../util/AdminListingENUM';
    const visible =ref(false)
    const newCategoryName=ref("")
    const isError=ref(false)
    const errMsg=ref("Category name required")
    const isLoading=ref(false)
    const handleCancle=()=>{
        isError.value=false
        visible.value=false
        newCategoryName.value=""
    }
    const Save=()=>{
        const regex = /^\s*$/;
        if (regex.test(newCategoryName.value)) {
            isError.value=true
            return
        }
        isLoading.value=true
        const token=localStorage.getItem("token")
        fetch(`${store.state.apiUrl}/category`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({name:newCategoryName.value})
        }).then(res=>{
            if(res.status<200 || res.status>=300){
                res.json().then(data=>{errMsg.value=data.message})
                isError.value=true
            }else{
                res.json().then(data=>{
                    getCategory(AdminListingENUM.CATEGORY)
                    
                })
            }
        })
        
        
    }
    const getCategory= (index)=>{
        store.state.isLoading_cp=true
        fetch(`${store.state.apiUrl}/category`)
        .then(res=>res.json())
        .then(data=>{
            store.state.CP_ListingNumber=index
            store.state.categoryData=data.category
            store.state.isLoading_cp=false
            isError.value=false
            visible.value=false
            newCategoryName.value=""
            isLoading.value=false
        })
        
    }
</script>

<style lang="scss" scoped>
    h1{
        background-color:  rgb(108, 106, 106);
        color: white;
        width: 100%;
        padding: 20px;
        text-align: center;
    }
    #loader{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .loader {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            border: 3px solid;
            border-color:rgb(108, 106, 106) rgb(108, 106, 106)  transparent transparent;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
        }
        .loader::after,
        .loader::before {
            content: '';  
            box-sizing: border-box;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            border: 3px solid;
            border-color: transparent transparent #000000 #000000;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-sizing: border-box;
            animation: rotationBack 0.5s linear infinite;
            transform-origin: center center;
        }
        .loader::before {
            width: 32px;
            height: 32px;
            border-color: rgb(108, 106, 106) rgb(108, 106, 106) transparent transparent;
            animation: rotation 1.5s linear infinite;
        }
        
        @keyframes rotation {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        } 
        @keyframes rotationBack {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(-360deg);
            }
        }
    }
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
    main{
        width: 100%;
        text-align: right;
        padding: .3rem 1rem;
        display: flex;
        justify-content: flex-end;
        button{
            display: flex;
            align-items: center;
            padding: .3rem .6rem;
            gap: .5rem;
            border: 2px solid black;
            outline: none;
            background-color: transparent;
            border-radius: .2rem;
            transition: 300ms;
            cursor: pointer;
            &:hover{
                background-color:  rgb(0, 217, 255);
                color: white;
            }
            svg{
                --size:1.5rem;
                width: var(--size);
            }
        }
    }
</style>