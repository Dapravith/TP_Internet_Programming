<template>
    <adminLayout>
        <main class="mainContainer">
            <section class="sideBar">
                <adminSideBar />
            </section>
            <section class="main">
                <listCategory v-if="store.state.CP_ListingNumber==AdminListingENUM.CATEGORY" />
                <listSubCategory v-else-if="store.state.CP_ListingNumber==AdminListingENUM.SUB_CATEGORY" />
                <listProduct v-else-if="store.state.CP_ListingNumber==AdminListingENUM.PRODUCT" />
            </section>
        </main>
        
    </adminLayout>
</template>

<script setup>
import store from '../../store';
import AdminListingENUM from '../../util/AdminListingENUM';
import adminLayout from '../../layout/adminLayout.vue';
import adminSideBar from '../../components/cp/adminSideBar.vue';
import listCategory from '../../components/cp/category/list.vue';
import listSubCategory from '../../components/cp/subCategory/list.vue';
import listProduct from '../../components/cp/product/list.vue';

</script>

<style lang="scss" scoped>
    .mainContainer{
        width: 100%;
        height: 100%;
        display: flex;
        gap: 2rem;
        section{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            @media print {
                &::-webkit-scrollbar{
                    display: none;
                }
            }
            
        }
        .sideBar{
            min-width: 20%;
            height: 100%;
            max-width: fit-content;
            @media print {
                display: none;
            }
        }
    }
</style>