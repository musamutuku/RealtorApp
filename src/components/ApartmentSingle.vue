<script setup>
import { ref } from 'vue';
import contactAdmin from './contactAdmin.vue';
const showModal = ref(false);

defineProps({
    paragraphData: String,
    nameData: String,
    priceData: String,
    imageData: String,
    imgAlt: String
})

</script>

<template>
    <div>
        <Teleport to="body">
            <contactAdmin v-if="showModal"/>
        </Teleport>
        
        <div class="card-display">
            <h2 id="title">{{ nameData }}</h2>
            <div class="image-display">
                <img :src="imageData" :alt="imgAlt">
            </div>
            <div class="house-info">
                <p>{{ paragraphData }}<span id="more-info"><a href="#1" id="more-info-link">...more</a></span></p>
                <h2 id="price">Price <span id="kash-price">KES. {{ priceData }}</span></h2>
                <button @click="showModal=true">Contact admin</button>
                <a href="#" id="house-info">See related houses</a>
                <!-- <RouterLink :to="{name: 'houseInfo'}" id="related-houses">See related houses</RouterLink> -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-display {
    height: 95%;
    width: 720px;
    background-color: rgb(231, 235, 235);
    border-radius: 5px;
    margin-left: 3%;
    margin-top: 5%;
    float: left;
}

.image-display {
    border-radius: 20px;
}

img {
    width: 100%;
    height: 100%;
    border-radius: 0px 0px 10px 10px;
}

#title {
    margin-left: 10px;
    font-size: 30px;
    color: chocolate;
    font-weight: bold;
    font-style: italic;
}

p {
    font-family: 'Times New Roman', Times, serif;
    font-size: 19px;
    font-weight: 545;
    color: rgb(52, 61, 52);
    background-color: rgb(233, 224, 224);
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 5px;
}

#more-info {
    color: blue;
}

#moreinfo-link {
    text-decoration: none;
}

a:visited {
    color: blue;
}

#price {
    margin-left: 20px;
    font-size: 25px;
}

#kash-price {
    color: brown;
    font-size: 22px;
}

button {
    margin-left: 20px;
    font-size: 20px;
    background-color: darkgreen;
    color: white;
    border: none;
    border-radius: 5px;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    padding: 3px 10px;
    margin-top: 10px;
}

button:hover {
    cursor: pointer;
}

#house-info {
    margin-left: 10px;
    font-size: 19px;
}</style>