<template>
    <main class="slideMain">
        <section>
            <button :ref="allEle[0]" @click="toggle($event,AdminListingENUM.CATEGORY)" class="active">Category</button>
            <button :ref="allEle[1]" @click="toggle($event,AdminListingENUM.SUB_CATEGORY)">Sub Category</button>
            <button :ref="allEle[2]" @click="toggle($event,AdminListingENUM.PRODUCT)">Product</button>
        </section>
        <section>
            <button  @click="logout">Logout</button>
        </section>
    </main>
</template>

<script setup>
    import AdminListingENUM from '../../util/AdminListingENUM';
    import {ref,inject} from 'vue'
    import store from "@/store/index.js"
    const allEle=[ref(null),ref(null),ref(null),ref(null)]
    const route=inject('router')


    const toggle = (event,index) => {
        const buttonElement = event.currentTarget;
        
        allEle.forEach(item=>{
            if(item.value!=null){
                item.value.classList.remove("active")
            }
        })
        
        if(index==AdminListingENUM.CATEGORY){
            getCategory(index)
        }else if(index==AdminListingENUM.SUB_CATEGORY){
            getSubCategory(index)
        }else if(index==AdminListingENUM.PRODUCT){
            getProduct(index)
        }
        buttonElement.classList.add('active');
    };

    const getCategory= (index)=>{
        store.state.isLoading_cp=true
        fetch(`${store.state.apiUrl}/category`)
        .then(res=>res.json())
        .then(data=>{
            store.state.CP_ListingNumber=index
            store.state.categoryData=data.category
            store.state.isLoading_cp=false
        })
        
    }

    const getSubCategory=(index)=>{
        store.state.isLoading_cp=true
        fetch(`${store.state.apiUrl}/sub-category`)
        .then(res=>res.json())
        .then(data=>{
            store.state.CP_ListingNumber=index
            store.state.SubCategoryData=data.subCategory
            store.state.isLoading_cp=false
        })
    }
    const getProduct=(index)=>{
        store.state.isLoading_cp=true
        fetch(`${store.state.apiUrl}/product`)
        .then(res=>res.json())
        .then(data=>{
            store.state.CP_ListingNumber=index
            store.state.ProductData=data.product
            store.state.isLoading_cp=false
        })
    }

    getCategory(AdminListingENUM.CATEGORY)


    const logout=()=>{
        localStorage.removeItem("token")
        route.push("/")
    }
</script>

<style lang="scss" scoped>
    .slideMain{
        width: 100%;
        
        height: 100%;
        border: 2px solid black;
        border-radius: .2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem .5rem;
        @media print {
            display: none;
        }
        button{
            padding: .2rem 0;
            font-size: 1rem;
            border: none;
            outline: none;
            border-radius: .2rem;
            box-shadow: 0 0 0 1px rgb(108, 106, 106);
            background-color: transparent;
            transition: 500ms;
            cursor: pointer;
            &:hover{
                background-color:rgb(108, 106, 106);
                box-shadow: 0 0 0 2px   black;
            }
            &.active{
                background-color:rgb(108, 106, 106);
                box-shadow: 0 0 0 2px   black;
            }
        }
        section{
            display: flex;
            flex-direction: column;
            gap: 1rem;
            
        }
    }
</style>