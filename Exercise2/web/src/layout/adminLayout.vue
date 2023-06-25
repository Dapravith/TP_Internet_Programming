<template>
    
    <main class="mainAdminLayout">
        <header>
            <div>Admin Dashboard</div>
            <div>លេខមួយ.com</div>
        </header>
        <section class="sectionMain">
            <slot />
            
        </section>
    </main>
</template>

<script setup>

</script>

<style lang="scss" scoped>

.mainAdminLayout{
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    --pading:1rem;
    &>*{
        height: calc(100% - 5rem);
    }
    section{
        display: flex;
        flex-direction: column;
    }
    .sectionMain{
        padding: var(--pading);
    }
}

header{
    width: 100%;
    height: auto !important;
    display: flex;
    font-size: 1.5rem;
    font-family: 'Siemreap',cursive; 
    padding: 1rem;
    justify-content: space-between;
    background-color:  rgb(108, 106, 106);
    color: white;
    
}


</style>