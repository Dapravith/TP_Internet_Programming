<template>
    <main class="ListProductMain">
        <div id="loader" v-if="store.state.isLoading_cp">
            <span class="loader" ></span>
        </div>
        <createProduct />
        <table v-if="store.state.ProductData && !store.state.isLoading_cp">
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Sub Category</th>
                <th>Owner</th>
                <th >Created</th>
                <th style="text-align: right;">Action</th>
            </tr>
            <tr style="cursor: pointer;" v-for="(item, index) in store.state.ProductData" :key="item._id"  >
                <td @click="popUp(item)">{{index+1}}</td>
                <td @click="popUp(item)">{{ item.name }}</td>
                <td @click="popUp(item)">{{ item.subcategory?.name }}</td>
                <td style="text-transform: uppercase;" @click="popUp(item)">{{ item.user?.username }}</td>
                <td @click="popUp(item)" ><date-format :date="new Date(item.created )"  /></td>
                <td style="text-align: right;">
                    <editProduct :data="item" />
                    <deleteProduct :data="item" />
                </td>
            </tr>
        </table>
    </main>

    <a-modal v-model:visible="visible" :title="`${detailObject.name } | ${dateFormation(new Date(detailObject.created))}`" @ok="handleOk">
        <p>Id: {{ detailObject._id }}</p>
        <p>Name: {{ detailObject.name }}</p>
        <p>Category: {{ detailObject.category?.name }} | {{ detailObject.category?._id }}</p>
        <p>SubCategory: {{ detailObject.subcategory?.name }} | {{ detailObject.subcategory?._id }}</p>
        <p>User: {{ detailObject.user?.username }} | {{ detailObject.user?._id }}</p>
        <img style="width: 50%;" :src="`${store.state.fileUrl}/${detailObject.image}`" alt="">
        <a-divider orientation="left" style="font-weight: bold;">Price</a-divider>
        <table class="table_popup">

            <tr :key="item" v-for="item in detailObject.prices">
                <td>{{item.name}}</td>
                <td>{{ item.price }} $</td>
            </tr>
        </table>
       
      <template #footer>
        <a-button key="submit" type="primary" :loading="loading" @click="visible=false">OK</a-button>
      </template>
    </a-modal>

</template>

<script setup>
    import dateFormation from '../../../util/dateFormation'
    import store from "@/store/index.js"
    import {ref} from 'vue'
    import createProduct from './create.vue'
    import deleteProduct from './delete.vue'
    import editProduct from './edit.vue'

    const visible =ref(false)
    const detailObject=ref({
        title:"Basic model"
    })

    const popUp=(obj)=>{
        detailObject.value=obj
        visible.value=true
    }

</script>

<style lang="scss" scoped>
    #loader{
        width: 100%;
        min-height: 50vh;
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

    .ListProductMain{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        overflow: auto;
        scrollbar-gutter: stable;
        @media print {
            height: max-content;
            overflow:visible;
        }
        table{
            width: 100%;
            max-height: 100%;

            border-collapse: collapse;
            th,td{
                border: 2px solid black;
                height: fit-content;
            }
            th{
                background-color: rgb(108, 106, 106);
            }
            th,td{
                padding: .2rem .4rem;
                text-align: left;
                &:first-child{
                    text-align: center;
                }
            }
        }
    }
</style>