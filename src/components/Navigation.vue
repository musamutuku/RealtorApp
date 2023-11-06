<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <div class="nav-div">
        <div class="menu" style="display: none;"><img src="@/assets/images/menu.png"><span>REALTOR</span></div>
        <div class="category-div">
            <div class="category-div1">
                <h1 id="header">REALTOR</h1>
                <div class="house-category">
                    <router-link :to="{ name: 'apartment' }">Apartment</router-link>&nbsp;
                    <router-link :to="{ name: 'townhouse' }">Townhouse</router-link>&nbsp;
                    <router-link :to="{ name: 'mobilehome' }">Mobilehome</router-link>&nbsp;
                    <router-link :to="{ name: 'farmhome' }">Farmhome</router-link>&nbsp;
                    <router-link :to="{ name: 'ranchhouse' }">Ranchhouse</router-link>&nbsp;
                </div>
            </div>
            <RouterView />
        </div>
    </div>
</template>         
<style scoped>
.menu{
    display: flex;
    width: 30px;
    height: 30px;
    margin-left: 1%;
    margin-top: 1%;
    margin-bottom: -3%;
    gap: 1em;
}
.menu img{
    width: 30px;
    height: 30px;
}
.menu span{
    font-size: 35px;
    text-shadow: 1px 1px rgb(163, 104, 81);
    font-weight: bold;
    margin-top: -45%;
}
#header {
    font-family: quicksand;
    font-size: 40px;
    font-weight: bolder;
    color: rgb(35, 47, 95);
    text-shadow: 3px 3px rgb(163, 104, 81);
    margin-left: 2%;
}

.house-category {
    font-family: quicksand;
    font-size: 24px;
    background-color: rgb(242, 242, 243);
    width: 210px;
    min-width: 170px;
    text-align: center;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 10px;
    border-radius: 4px;
    line-height: 24px;
    margin-top: 10.9%;
    height: 90%;
}
@media screen and (max-width: 600px) {
    .category-div1{
        display: none;
    }
    .menu{
        display: block;
    }
}

a {
    text-decoration: none;
    font-weight: 510;
    display: flex;
    flex-direction: column;
    margin-top: 0.2em;
}

.router-link-active {
    color: #BA1B41;
    background-color: rgb(191, 221, 121);
    border-radius: 2px;
}

.category-div {
    display: flex;
}

.list-category {
    display: none;

}
</style>