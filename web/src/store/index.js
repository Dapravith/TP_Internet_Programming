
import { createStore } from 'vuex'

export default createStore({
  state : {
    apiUrl:"http://localhost:3001/api",
    fileUrl:"http://localhost:3001",
    data:[],
    categoryData:[],
    SubCategoryData:[],
    ProductData:[],
    CP_ListingNumber:0,
    loding:true,
    isEmpty:false,
    isAuthentication:false,
    isLoading_cp:false
    
  },
  mutations: {

  },
  actions:{
    
  }
})



