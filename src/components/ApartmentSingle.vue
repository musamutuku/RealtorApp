<script setup>
import { ref } from 'vue';
import contactAdmin from './contactAdmin.vue';
const showModal = ref(false);

defineProps({
    descriptionData: String,
    idData: Number,
    houseNameData: String,
    priceData: String,
    imageData: String,
    imgAlt: String
})

</script>


<template>
    <div>
        <Teleport to="body">
            <contactAdmin :houseID="idData" v-if="showModal" @closeModal="showModal = false" />
        </Teleport>
        <div class="main-display">
            <h2 id="title">{{ houseNameData }}</h2>
            <div class="image-display">
                <img :src="imageData" :alt="imgAlt">
            </div>
            <div class="house-info">
                <p>{{ descriptionData }}<span id="more-info"><a href="#1" id="more-info-link">...more</a></span></p>
                <h2 id="price">Price <span id="kash-price">KES. {{ priceData }}</span></h2>
                <button @click="showModal = true">CONTACT ADMIN</button>
                <a href="#" id="house-info">See also related houses</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-display {
    min-width: 300px;
    min-height: 70%;
    width: 696px;
    height: 70%;
    background-color: rgb(231, 235, 235);
    margin-top: 12.5%;
    padding-right: 1%;
    border-radius: 2px;
}

.image-display {
    width: 100%;
}

img {
    width: 100%;
    height: 100%;
    max-height: 430px;
}

#title {
    margin-left: 10px;
    font-size: 30px;
    color: chocolate;
    font-family: quicksand;
    font-weight: bold;
    font-style: italic;
}

.house-info p {
    font-size: 18px;
    font-weight: 500;
    color: rgb(52, 61, 52);
    background-color: rgb(233, 224, 224);
    margin-top: 5px;
    font-family: quicksand;
    margin-left: 0.5%;
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
    font-family: quicksand;
    font-size: 25px;
    font-weight: bold;
}

#kash-price {
    color: brown;
    font-family: quicksand;
    font-size: 22px;
    font-weight: bold;
}

button {
    margin-left: 19px;
    font-size: 15px;
    font-weight: 600;
    background-color: #158D36;
    color: white;
    border: none;
    border-radius: 5px;
    text-align: center;
    font-family: quicksand;
    padding: 3px 10px;
    margin-top: 10px;
}

button:hover {
    cursor: pointer;
    background-color: darkgreen;
}

#house-info {
    margin-left: 10%;
    font-family: quicksand;
    font-weight: 510;
    font-size: 19px;
}
</style>