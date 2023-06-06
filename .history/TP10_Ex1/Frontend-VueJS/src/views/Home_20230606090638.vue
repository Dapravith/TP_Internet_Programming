<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, inject, onMounted } from "vue";
import axios from "axios";
const route = inject("router");
const token = localStorage.getItem("token");
const url = "http://localhost:3001/user/home";

if (!token) route.push("/");

const res = axios
  .get(url, {
    headers: {
      "auth-token": token,
    },
  })
  .catch(() => {
    route.push("/");
  });

const logout = () => {
  localStorage.removeItem("token");
  route.push("/");
};
</script>

<template>

  

  <div>
    <main>
      <div><h1>You're in Home Page</h1></div>
      <!-- <p>Well done🥰</p> -->
      <!-- <button @onclick="created"> Back to Login</button> -->

      <label v-if="data != null"> Username : {{ data.data.username }}</label><br>
      <label v-if="data != null"> Firstname: {{ data.data.firstname }}</label><br>
      <label v-if="data != null"> Lastname : {{ data.data.lastname }}</label><br>
      <label v-if="data != null"> Email    : {{ data.data.email }}</label><br><br><br><br><br>

      <button
        class="w-100 btn btn-lg btn-primary"
        type="submit"
        @click="created"
      >
        Log out
      </button>
    </main>
  </div>
</template>


<script>
export default {
  data() {
    return {
      data: null,
    };
  },

  async mounted() {
    const requestOptions = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(),
      // session: {"jwt": "document.cookie"}
    };

    console.log(requestOptions);
    //post data to api
    const response = await fetch("http://localhost:3001/me", requestOptions);

    const data = await response.json();
    console.log("data: ", data);
    this.data = data;
   
  },
  methods: {
    async created() {
      
        const request = {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(),
        };

        const response = await fetch("http://localhost:3001/logout", request);

        const data = await response.json();
        console.log("data: ", data);

        this.$router.push({ name: "login", hash: "" });
      
    },
  },
};
</script>


<style>
header {
  display: none;
}
h3 {
  background-color: rgba(111, 168, 220, 0.8);
  text-align: center;
  margin-bottom: 20px;
}
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#btn_logout {
  cursor: pointer;
  background-color: rgba(239, 54, 54);
  color: white;
  border-style: outset;
  border-color: #0066a2;
  height: 2rem;
  width: 4rem;
  font: sans-serif;
  text-shadow: none;
  margin-top: 0.645rem;
  border-radius: 0.165rem;
  margin: 0.5rem 0 0.67rem 0;
}

.btn-primary {
  background-color: #41b883;
  border-color: #41b883;
}
</style>
</template>
