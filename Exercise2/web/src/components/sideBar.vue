<template>
    <main v-if="data">
        <div :class="isAll ? 'all active' :'all'" @click="listAll">All</div>
        <div class="category" @click="toggle($event)" v-for="item in data" :key="item._id">
            <div  class="main">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
                
                
                {{item.name  }}
            </div>
            <div class="sub_category" >
                <!-- {{ item._id }} -->
                <li @click="getProductByCategory(item._id)"><a href="#" class="sub_category_item"  >All</a></li>
                <li v-for="subItem in item.subCategory" :key="subItem._id" @click="updateData(subItem._id)"><a href="#" class="sub_category_item"  >{{ subItem.name }}</a></li>
            </div>
        </div>
        
        <div class="BtnLogin" style="margin: auto;">
            <button><router-link to="/login">Login</router-link></button>
        </div>
        
    </main>
</template>

<script setup>
import { ref } from 'vue';
import store from '../store/index'
const myElement = ref(null);
const data=ref(null)

const isAll=ref(true)

const toggle = (event) => {
    const categoryElement = event.currentTarget;
    const subCategoryElement = categoryElement.querySelector('.sub_category');
    
    if (subCategoryElement.contains(event.target)) {
        // Clicked inside the sub_category, do nothing
        return;
    }
    
    categoryElement.classList.toggle('open');
};

const updateData=(id)=>{
    isAll.value=false
    store.state.loding=true
    fetch(`${store.state.apiUrl}/product/getbysubcategory/${id}`)
    .then(res=>res.json())
    .then(d=>{
        store.state.data=d
        store.state.loding=false
        store.state.isEmpty=false
        if(store.state.data.length<=0){
            store.state.isEmpty=true
        }
    })
}

const getProductByCategory=(categoryId)=>{

    isAll.value=false
    store.state.loding=true
    fetch(`${store.state.apiUrl}/product/getbycategory/${categoryId}`)
    .then(res=> res.json())
    .then(d=>{
        store.state.data=d
        store.state.loding=false
        store.state.isEmpty=false
        if(store.state.data.length<=0){
            store.state.isEmpty=true
        }
    })
}

fetch(`${store.state.apiUrl}/category`)
.then(res=>res.json())
.then(d=>{
    data.value=d.category
})

const listAll=()=>{
    isAll.value=true
    store.state.loding=true
    fetch(`${store.state.apiUrl}/product`)
    .then(res=>res.json())
    .then(d=>{
        
        store.state.loding=false
        store.state.data=d.product
        store.state.isEmpty=false
        if(store.state.data.length<=0){
            store.state.isEmpty=true
        }
    })
}

listAll()



</script>


<style lang="scss" scoped>
main{
    width: 100%;
    min-height: 50vh;
    transition: 300ms;
    color: rgb(0, 0, 0);
    font-family: 'Siemreap', cursive;
    display: flex;
    flex-direction: column;
    // align-items: center;
    font-size: 1.2rem;
    border: 2px solid black;
    margin:0 1rem;
    margin-top: 1rem;
    border-radius: .4rem;
    padding: 1rem;
    .all{
        width: 100%;
        text-align: center;
        font-size: 1.5rem;
        // margin-left: -1rem;
        cursor: pointer;
        transition: 300ms;
        &.active{
            transition: 300ms;
            background-color: rgb(108, 106, 106);
            &:hover{
                background-color: #f1f1f1;
            }
        }
        &:hover{
            background-color: rgb(108, 106, 106);
        }
    }
    .category{
        // width: 100%;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        padding: 1rem 0;
        // padding: 1rem 2re;
        .main{
            display: flex;
            align-items: center;
            gap: .5rem;
            svg{
                width: 1.5rem;
                transition: 300ms;
            }
        }
        .sub_category{
            overflow: hidden;
            padding-left: 2rem;
            display: flex;
            flex-direction: column;
            transition: 300ms;
            gap: .4rem;
            height: 0px;
            li{
                list-style-type: none;
                text-indent: -5px;
                &:before {
                    content: "-  ";
                    text-indent: -5px;
                }
            }
        }
        &.open{
            .sub_category{
                height: 100%;
            } 
            .main{
                svg{
                    rotate: 180deg;
                }
            }
        }
        a{
            text-decoration: none;
            color: black;
            position: relative;
            transition: 300ms;
            &::after{
                content: "";
                width: 0;
                height: 2px;
                background-color: black;
                transition: 300ms;
                position: absolute;
                bottom: 0;
                left: 0;
            }
            &:hover{
                &::after{
                    width: 100%;
                }
            }
        }
    }
}
.BtnLogin:hover{
    cursor: pointer;
    color: white;
}
</style>