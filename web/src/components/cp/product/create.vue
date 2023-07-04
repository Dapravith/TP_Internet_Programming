<template>
    <h1>Product</h1>
    <main>
        <button @click="visible=true">New 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    </main>
    <a-modal v-model:visible="visible" :title="`New Product`"  wrap-class-name="full-modal">
        <div id="loader" v-if="isLoading">
            <span class="loader" ></span>
        </div>
        <div class="input_container" v-if="!isLoading">
            <div class="input_image">
                <label for="images"><img :src="imageUrl" alt="uploaded image thumbnail"></label>
                <input type="file" id="images" accept="image/*"  @change="handleImageUpload($event)">
            </div>
            
            <div class="input">
                <label for="name">Product Name : </label>
                <div class="name_input">
                    
                    <input type="text" :class="isErrorProductName ?'err':''" placeholder="Name" v-model="productName" required>
                    <p class="errMsg" v-if="isErrorProductName">{{ errMsg }}</p>
                </div>
            </div>
            
            <div class="input" >
                <label for="categoryId">Category : </label>
                <a-select 
                v-model:value="CategoryId"
                show-search
                placeholder="Select a category"
                :style="isErrorCatId?'width: 200px;box-shadow: 0 0 0 2px red;':'width: 200px;'"
                optionFilterProp="children"
                :filter-option="customFilterOption"
                @change="categoryIdChange"
                >
                <a-select-option v-for="item in store.state.categoryData" :key="item?._id" :dataSearch="item.name"  :value="item?._id" >{{item.name  }}</a-select-option>
                
            </a-select>
        </div>
        
        
        <div class="input" >
            <label for="categoryId">SubCategory : </label>
            <a-select 
            :disabled="disabledSubCategory"
            v-model:value="SubCategoryId"
            show-search
            placeholder="Select a category"
            :style="isErrorSubCategory?'width: 200px;box-shadow: 0 0 0 2px red;':'width: 200px;'"
            optionFilterProp="children"
            :filter-option="customFilterOption"
            >
            <a-select-option v-for="item in SubCategory" :key="item?._id" :dataSearch="item.name"  :value="item?._id" >{{item.name  }}</a-select-option>
            
        </a-select>
    </div>
    <div class="input_price">
        <p>Add price:</p>
        <div class="table">
            <table>
                <tr>
                    <th>No</th>
                    <th>Shop</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                <tr v-for="(item, index) in priceArr" :key="index">
                    <th>{{ index+1 }}</th>
                    <td><input type="text"  v-model="item.name"></td>
                    <td><input type="number"   step="0.1" v-model="item.price"></td>
                    <td class="delete"><svg xmlns="http://www.w3.org/2000/svg" @click="deletePrice(index)" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </td>
            </tr>
        </table>
        <button class="add" @click="AddPrice">+</button>
    </div>
</div>
</div>
<template #footer>
    <a-button key="submit" :disabled="isLoading"  @click="close">Cancel</a-button>
    <a-button key="submit" type="primary" :disabled="isLoading" :loading="isLoading"  @click="save" >Save</a-button>
</template>
</a-modal>
</template>

<script setup>
    import store from '../../../store';
    import {ref} from 'vue'
    import axios from 'axios'
    import AdminListingENUM from '../../../util/AdminListingENUM';
    const imageUrl = ref("../../../../public/add_image_default.png");

    const visible=ref(false)
    const productName=ref("")
    const isErrorProductName=ref(false)
    const CategoryId=ref("")
    const SubCategoryId=ref("")
    const isErrorCatId=ref(false)
    const SubCategory=ref("")
    const isErrorSubCategory=ref(false)
    const disabledSubCategory=ref(true)
    const imageFile=ref()
    const errMsg=ref("Product name require")
    const isLoading=ref(false)
    const priceArr=ref([])

    function customFilterOption(input, option) {
        const optionText = option.dataSearch.toString().toLowerCase();
        return optionText.includes(input.toLowerCase());
    }

    function categoryIdChange(){
        console.log(CategoryId.value);
        fetch(`${store.state.apiUrl}/sub-category/${CategoryId.value}`)
        .then(res=>{
            if(res.status<200 || res.status>=300){
                alert(res.body)
            }else{
                res.json().then(data=>{
                    SubCategory.value=data
                    SubCategoryId.value=""
                    disabledSubCategory.value=false
                })
                
            }
        })
    }

    const AddPrice=()=>{
        priceArr.value.push({
            name:`Shop ${priceArr.value.length+1}`,
            price:0
        })
    }
    const deletePrice=(index)=>{
        if(priceArr.value.length==0) return 
        priceArr.value.splice(index,1)
    }



    const checkError=()=>{
        const regex = /^\s*$/;
        if(regex.test(CategoryId.value)){
            isErrorCatId.value=true
        }else{
            isErrorCatId.value=false
        }
        
        
        if(regex.test(SubCategoryId.value)){
            isErrorSubCategory.value=true
        }else isErrorSubCategory.value=false
        
        
        if(regex.test(productName.value)){
            isErrorProductName.value=true
        }else isErrorProductName.value=false
    }
    const save=()=>{
        checkError()
        if(isErrorCatId.value) return
        if(isErrorSubCategory.value) return
        if(isErrorProductName.value) return
        
        const formData = new FormData();
        
        formData.append("name",productName.value)
        formData.append("categoryId",CategoryId.value)
        formData.append("subCategoryId",SubCategoryId.value)
        if(imageFile.value)     formData.append("file",imageFile.value)
        if(priceArr.value.length>0) formData.append("price",JSON.stringify(priceArr.value ))
        const token=localStorage.getItem("token");
        axios({
            method: 'post',
            url: `${store.state.apiUrl}/product`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data' ,
                'Authorization':`Bearer ${token}`
            }
        })
        .then(res=>{
            getProduct(AdminListingENUM.PRODUCT)
            close()
        }).catch(err=>{
            console.log(err);
            alert(err)
        })
        
    }
    const close=()=>{
        isErrorCatId.value=false
        isErrorProductName.value=false
        isErrorSubCategory.value=false
        productName.value=""
        CategoryId.value=""
        priceArr.value=[]
        imageFile.value=""
        visible.value=false
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

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            imageFile.value=file
            imageUrl.value = URL.createObjectURL(file);
        } 
    };
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
    .input_container{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .input_image{
            display: flex;
            flex-direction: column;
            align-items: center;
            input{
                display: none;
            }
            label{
                cursor: pointer;
                img{
                    width: 100%;
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
        .input_price{
            display: flex;
            gap: 1rem;
            font-size: 1rem;
            align-items: center;
            
            p{
                width: fit-content;
                white-space: nowrap;
            }
            .table{
                width: 100%;
                table{
                    width: 100%;
                    th{
                        text-transform: uppercase;
                    }
                    td,th{
                        text-align: center;
                        border: 2px solid black;
                        
                    }
                    td{
                        input{
                            width: 100%;
                            border: none;
                            outline: none;
                            padding-left: 1rem;
                        }
                        svg{
                            width: 1.5rem;
                            color: red;
                            cursor: pointer;
                            margin: auto;
                        }
                        
                    }
                    
                }
                .add{
                    margin-top: .5rem;
                    width: 100%;
                    background-color: #f1f1f1;
                    text-align: center;
                    font-size: 1.5rem;
                    font-weight: bolder;
                    height: fit-content;
                    color: rgb(45, 45, 45);
                    border: none;
                    outline: none;
                    line-height: 1;
                    cursor: pointer;
                    transition: 300ms;
                    opacity: 0;
                    &:hover{
                        background-color: #000000;
                        color:white;
                        
                    };
                }
                &:hover{
                    .add{
                        opacity: 1;
                    }
                }
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