<template>
    <svg xmlns="http://www.w3.org/2000/svg"  @click="popUpEdit()" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 edit">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
    

    <a-modal v-model:visible="visible" :title="`New Sub Category`" >
        <div class="input" v-if="!isLoading">
            <label for="name">Sub Category name : </label>
            <div class="name_input">
                
                <input type="text" :class="isErrorSubCatName ?'err':''" placeholder="Name" v-model="SubCategoryName" required>
                <p class="errMsg" v-if="isErrorSubCatName">{{ errMsg }}</p>
            </div>
        </div>
        <div class="input" v-if="!isLoading">
            <label for="categoryId">Category : </label>
            <a-select 
            v-model:value="CategoryId"
            show-search
            placeholder="Select a category"
            :style="isErrorCatId?'width: 200px;box-shadow: 0 0 0 2px red;':'width: 200px;'"
            optionFilterProp="children"
            :filter-option="customFilterOption"
            >
            <a-select-option v-for="item in options" :key="item?._id" :dataSearch="item.name"  :value="item?._id" >{{item.name}}</a-select-option>
            
        </a-select>
    </div>
    <div id="loader" v-if="isLoading">
        <span class="loader" ></span>
    </div>
    <template #footer>
        <a-button key="cancle" type="primary" :disabled="isLoading"  @click="handleCancle">Cancel</a-button>
        <a-button key="submit" type="primary" :disabled="isLoading" :loading="isLoading" @click="Save" >Save</a-button>
    </template>
</a-modal>
</template>

<script setup>
    import {ref} from 'vue'
    import store from '../../../store';
    import AdminListingENUM from '../../../util/AdminListingENUM';
    const prop=defineProps({
        data: Object,
        options:Object
    })

    const visible =ref(false)
    const SubCategoryName=ref("")
    const CategoryId=ref("")

    const isErrorSubCatName=ref(false)
    const isErrorCatId=ref(false)
    const errMsg=ref("Category name required")
    const isLoading=ref(false)
    function customFilterOption(input, option) {
        const optionText = option.dataSearch.toString().toLowerCase();
        
        return optionText.includes(input.toLowerCase());
    }
    const handleCancle=()=>{
        isErrorSubCatName.value=false
        isErrorCatId.value=false
        visible.value=false
        SubCategoryName.value=""
        CategoryId.value=""
    }

    const popUpEdit=()=>{
        CategoryId.value=prop?.data?.category?._id
        SubCategoryName.value=prop?.data?.name
        visible.value=true
    }   

    const Save=()=>{
        const regex = /^\s*$/;
        if (regex.test(SubCategoryName.value)  ) {
            isErrorSubCatName.value=true
            
        }else{
            isErrorSubCatName.value=false
        }
        if (regex.test(CategoryId.value)  ) {
            isErrorCatId.value=true
            
        }else{
            isErrorCatId.value=false
        }
        if(isErrorCatId.value || isErrorSubCatName.value){
            return
        }
        isErrorSubCatName.value=false
        isErrorCatId.value=false
        isLoading.value=true
        const token=localStorage.getItem("token")
        fetch(`${store.state.apiUrl}/sub-category/${prop?.data?._id}`,{
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({
                name:SubCategoryName.value,
                categoryId:CategoryId.value
            })
        }).then(res=>{
            if(res.status<200 || res.status>=300){
                res.json().then(data=>{errMsg.value=data.message})
                isErrorSubCatName.value=false
                isErrorCatId.value=false
            }else{
                res.json().then(data=>{
                    getSubCategory(AdminListingENUM.SUB_CATEGORY)
                    
                })
            }
        })
        
        const getSubCategory=(index)=>{
            store.state.isLoading_cp=true
            fetch(`${store.state.apiUrl}/sub-category`)
            .then(res=>res.json())
            .then(data=>{
                store.state.CP_ListingNumber=index
                store.state.SubCategoryData=data.subCategory
                store.state.isLoading_cp=false
                isErrorSubCatName.value=false
                isErrorCatId.value=false
                visible.value=false
                SubCategoryName.value=""
                CategoryId.value=""
            })
        }
        
    }
</script>

<style lang="scss" scoped>
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
            border-color: rgb(108, 106, 106) rgb(108, 106, 106)transparent transparent;
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
        &+.input{
            margin-top: 2rem;
        }
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
        background-color:  rgb(108, 106, 106);
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
    svg{
        --size:1.5rem;
        width: var(--size);
        cursor: pointer;
        &.edit{
            color: rgb(0, 119, 255);
        }
    }
</style>