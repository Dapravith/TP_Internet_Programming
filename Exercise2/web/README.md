# Web 

## Customize configuration

If you want to change api url you can change in /src/store/index.js
```javascript
import { createStore } from 'vuex'
export default createStore({
  state : { 
    apiUrl:"http://localhost:3001/api"
  },
  mutations: {

  },
  actions:{
    
  }
})
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
