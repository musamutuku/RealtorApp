<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <div class="nav-div">
        <div class="category-div">
            <div>
                <h1 id="header">REALTOR</h1>
                <div class="house-category">
                    <router-link :to="{ name: 'apartment' }">APARTMENT</router-link>&nbsp;
                    <router-link :to="{ name: 'townhouse' }">TOWNHOUSE</router-link>&nbsp;
                    <router-link :to="{ name: 'mobilehome' }">MOBILEHOME</router-link>&nbsp;
                    <router-link :to="{ name: 'farmhome' }">FARMHOME</router-link>&nbsp;
                    <router-link :to="{ name: 'ranchhouse' }">RANCHHOUSE</router-link>&nbsp;
                </div>
            </div>
            <RouterView />
        </div>
    </div>
</template>         
<style scoped>
#header {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 40px;
    font-weight: bolder;
    color: rgb(35, 47, 95);
    text-shadow: 3px 3px rgb(163, 104, 81);
}

.house-category {
    font-size: 22px;
    background-color: rgb(242, 242, 243);
    min-width: 170px;
    text-align: center;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 10px;
    border-radius: 4px;
    line-height: 24px;
    margin-top: 10%;
}

a {
    color: rgb(49, 110, 49);
    text-decoration: none;
    font-weight: 501;
    display: flex;
    flex-direction: column;
    margin-top: 0.2em;
}

a.router-link-active {
    color: rgb(194, 71, 77);
    background-color: rgb(191, 221, 121);
    border-radius: 10px;
}

.category-div {
    display: flex;
}

.list-category {
    display: none;

}</style>