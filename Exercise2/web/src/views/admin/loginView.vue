<template>
    <adminLayout>
        <main>
            <div id="loader" v-if="isLoading">
                <span class="loader" ></span>
            </div>
            <form @submit="login" v-if="!isLoading">
                
                <h1>Login</h1>
                <div class="inputs">
                    <input type="text" placeholder="Username" v-model="EUID">
                    <div :class="isHightLight?'password up':'password'">
                        <input :type="isShowPasword ? `text`: `password`" @focusin="hightLightParent(true)" @focusout="hightLightParent(false)" placeholder="Password" v-model="password">
                        <svg xmlns="http://www.w3.org/2000/svg" v-if="isShowPasword" @click="isShowPasword=false" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" v-if="!isShowPasword" @click="isShowPasword=true" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        
                    </div>
                    <p style="color: rgb(255, 255, 255); background-color: red; padding: .3rem 1rem; border-radius: .2rem;" v-if="error">{{ error }}</p>
                    <input type="submit" value="Login">
                </div>
            </form>
        </main>
        
    </adminLayout>
</template>

<script setup>
import adminLayout from '../../layout/adminLayout.vue';
import store from '../../store/index'
import {inject,ref} from 'vue'
const route=inject('router')
const EUID=ref("")
const password=ref("")
const error=ref()
const isHightLight=ref(false)
const isLoading=ref(false)
const isShowPasword=ref(false)
const login=(e)=>{
    e.preventDefault();
    isLoading.value=true
    fetch(`${store.state.apiUrl}/user/login`,{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            EUID:EUID.value,
            password:password.value,
        })
    })
    .then(res=>{
        if(res.status<200 || res.status>=300){
            res.json().then(err=>{
                console.log(err);
                error.value=err.message
            })
        }else{
            res.json().then(data=>{
                localStorage.setItem("token",data.token)
                route.push("/dashboard")
            })
            .catch(err=>{
                // console.log(err);
                error.value=err.message
            })
        }
        isLoading.value=false
    })
    
}

const hightLightParent=(value)=>{
    isHightLight.value=value
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
        border-color:rgb(0, 255, 208) rgb(0, 255, 208)  transparent transparent;
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

main{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Siemreap',cursive; 
    form{
        min-width: 20rem;
        border-radius: .2rem;
        padding: 2rem 1rem;
        border: 3px solid rgb(255, 255, 255);
        box-shadow: 0 0 10px 2px rgb(108, 106, 106),
        inset 0 0 10px 2px rgb(108, 106, 106);
        display: flex;
        flex-direction: column;
        padding-top: .5rem;
        gap: 2rem;
        h1{
            text-align: center;
            font-size:2rem;
            // background-color: white;
            // padding: 0 1rem;
        }
        .inputs{
            display: flex;
            flex-direction: column;
            gap: 2rem;
            
            input{
                font-size: 1.2rem;
                padding: .3rem;
                border: none;
                outline: none;
                box-shadow: 0 0 0 1px  black;
                border-radius: .1rem;
                transition: 250ms;
                font-family: 'Siemreap',cursive; 
                &:focus{
                    box-shadow: 0 0 0 2px  rgb(108, 106, 106);
                }
                &[type=submit]{
                    box-shadow: unset;
                    outline: none;
                    background-color: #000000;
                    color: white;
                    border-radius: .2rem;
                    transition: 300ms;
                    cursor: pointer;
                    &:hover{
                        background-color: rgb(108, 106, 106);
                    }
                }
            }
      
            .password{
                width: 100%;
                display: flex;
                box-shadow: 0 0 0 1px  black;
                border-radius: .1rem;
                transition: 300ms;
                &.up{
                    box-shadow: 0 0 0 2px  rgb(108, 106, 106);
                }
                input{
                    width: 100%;
                    box-shadow: none;
                 
                }
                svg{
                    --size:2rem;
                    cursor: pointer;
                    width: var(--size);
                    margin-right: .3rem;
                }
            }
        }
    }
}
</style>