<template>
  <mainLayout>


    <div class="loding" v-if="store.state.loding">
      <loading />
    </div>

    <div class="isempty" v-if="store.state.isEmpty && !store.state.loding">
      <img src="../../public/empty-box.png" alt="empty">
      <h1>There no product yet</h1>
    </div>

    <main v-if="!store.state.loding && !store.state.isEmpty">
      <div  class="item" v-for="item in store.state.data" :key="item._id">
        <img :src="`${store.state.fileUrl}/${item.image}`" :alt="item.name" loading="lazy">
        <div class="infor">
          <p>{{ item.name }}</p>
          <div class="prices">
            <div class="price_item" v-for="priceitem in item.prices" :key="priceitem._id">
              <p class="shop_name">{{ priceitem.name }}</p>
              <p class="price_value">{{ priceitem.price }}$</p>
            </div>
          </div>
        </div>
      </div>
     
    </main>
    
  </mainLayout>
  
</template>

<script setup>
import mainLayout from '../layout/mainLayout.vue';
import store from '../store/index'
import loading from '../components/loading.vue';
</script>

<style lang="scss" scoped>
.loding{
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;

}
.isempty{
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-family: 'Siemreap', cursive;
  align-items: center;
  img{
    width: 10rem;
  }
}
main{
  width: 100%;
  // background-color: aqua;


  display: grid;
  grid-template-columns: repeat(auto-fill,15rem);

  padding: 1rem;
  gap: 1rem;
  // overflow: auto;
  .item{
    height: 100%;
    padding: .5rem;
    border-radius: .3rem;
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 100%;
    }
    .infor{
      width: 100%;
      p{
        text-align: center;
        font-size: 1.2rem;
        font-weight: bold;
      }
      .prices{
        width: 100%;
        .price_item{
          width: 100%;
          display: flex;
          justify-content: space-between;
          .price_value{
            color: red;
            font-weight: bold;
          }
        }

      }
    }
  } 
}
</style>