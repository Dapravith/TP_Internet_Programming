<script setup>
import { ref, inject } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const route = inject("router");

const user = ref({
  username: "",
  password: "",
});

const loginChecking = async (e) => {
  e.preventDefault();
  const url = "http://localhost:3001/user/login";
  try {
    const res = await axios.post(url, user.value);
    localStorage.setItem("token", res.data);
    route.push("/home");
  } catch (error) {
    console.log(error);
    alert(error.response.data);
  }
};
</script>


<template>
  <main>
    <!-- <TheWelcome /> -->
    <form
      action="#"
      @submit="loginChecking"
      class="text-[1.2rem] mt-10 lg:mt-0"
    >
      <center>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          fill="currentColor"
          class="text-[#41B883] mb-10"
          viewBox="0 0 16 16"
        >
          <path
            d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"
          />
          <path
            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
          />
        </svg>
      </center>

      <label for="username">Usename</label><br />
      <input
        type="text"
        v-model="user.username"
        id="username"
        class="input mb-4 text-black"
        placeholder="Your username"
      />
      <br />
      <label for="password">Password</label> <br />
      <input
        type="password"
        v-model="user.password"
        id="password"
        class="input text-black"
        placeholder="Your password"
      />
      <br />
      <center>
        <button
          type="submit"
          class="bg-[#1EB37C] hover:bg-[#13392C] rounded-lg text-white px-10 py-2 mt-5 w-full mb-4"
        >
          Login
        </button>
      </center>

      <p class="text-end">
        Forget <span><a href="#" class="text-[#00BD7E]">password?</a></span>
      </p>
    </form>
  </main>
</template>

<style>
.input {
  border-radius: 0.5rem;
  border-width: 2px;
  padding-left: 0.5rem;
  width: 100%;
  height: 2.5rem;
  margin-top: 2px;
}
</style>
