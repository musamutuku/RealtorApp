<script setup>
import { ref } from 'vue'
import { onMounted, watch } from 'vue';
import apartmentSingle from '@/components/ApartmentSingle.vue';
const findmatch = ref("")
const noMatch = ref("")
const description = ref()
const price = ref()
const houseName = ref()
const id = ref()
const imagesrc = ref()
const imgAlt = ref()


fetch('http://127.0.0.1:3000/api/data2').then(response => response.json())
.then(data => localStorage.setItem('houseData2', JSON.stringify(data)));
const savedData2 = JSON.parse(localStorage.getItem('houseData2'));


const finaldata = {"mobilehomes": savedData2}
const userdata = ref(finaldata)
const allData = ref(userdata.value.mobilehomes)

watch(findmatch, () => {
    if (findmatch.value == "") {
        userdata.value = allData.value
        noMatch.value = ""
    }
})
function searchHouse() {
    userdata.value = allData.value.filter(user => user.housename.toLowerCase().includes(findmatch.value.toLowerCase()));
    if(userdata.value  == ""){
        noMatch.value = "No any match!"
    }
}
onMounted(() => {
    let userDefault = userdata.value.mobilehomes[0]
    getDetails(userDefault);
    userdata.value = allData.value
});
function getDetails(house) {
    description.value = house.description
    price.value = house.price
    houseName.value = house.housename
    id.value = house.id
    imagesrc.value = house.imagesrc
    imgAlt.value = house.imgAlt
}

const colors = ref(["rgb(150, 59, 235, 0.1)",
    "rgb(198, 207, 73, 0.1)",
    "rgb(43, 226, 226, 0.1)",
    "rgb(224, 121, 23, 0.2)",
    "rgb(43, 70, 226, 0.2)",
    "rgb(73, 226, 43, 0.2)",
    "rgb(141, 141, 122, 0.2)",
    "rgb(226, 43, 134, 0.2)",
    "rgb(101, 180, 94, 0.2)"
])

function getRadoms() {
    return colors.value[Math.floor(Math.random() * (colors.value.length))]

}
</script>

<template>
    <div class="main-div">
        <div class="minor-div">
            <div class="search-div">
                <input type="text" placeholder="Search..." v-model.trim="findmatch" @keyup.enter="searchHouse()">
                <div class="searchImg-div" @click="searchHouse()"><img src="@/assets/images/search.png"></div>
            </div>
            <span class="noMatch">{{ noMatch }}</span>
            <div class="all-cards">
                <div v-for="user in userdata" :key="user.id">
                    <div class="card-container" :id="user.id" :style="{ backgroundColor: getRadoms() }"
                        @click="getDetails(user)">
                        <div class="image">
                            <img :src="user.imagesrc">
                        </div>
                        <h2 class="house-name">{{ user.housename }}</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="small-card">
            <apartmentSingle :id-data="id" :price-data="price" :houseName-data="houseName" :description-data="description" :image-data="imagesrc"
                @showModal="" />
        </div>
       <div class="footer"><p>Copyright © 2023. Artemis Limited. All rights reserved.</p></div>
    </div>
</template>
 
<style scoped>
.main-div {
    display: flex;
    width: 87vw;
    height: 98vh;
    margin-left: 1%;
}

.minor-div {
    width: 50%;
}

.search-div {
    display: flex;
    border: 1px solid gray;
    width: 40%;
    min-width: 220px;
    height: 4.7%;
    background-color: rgb(250, 247, 246);
    border-radius: 20px;
    margin: auto;
    margin-top: 28px;
}

.search-div input {
    width: 85%;
    border: none;
    border-radius: 20px 0px 0px 20px;
    padding-left: 5%;
    font-family: quicksand;
    font-size: 16px;
    outline-width: thin;
}

.searchImg-div {
    border-radius: 0px 20px 20px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(206, 192, 192, 0.5);
    width: 18%;
}

.searchImg-div:hover {
    background-color: rgb(212, 203, 200);
}

.searchImg-div img {
    width: 25px;
    height: 25px;
    margin-top: 5.9%;
}
.noMatch{
    font-size: 16px;
    color: brown;
    margin-left: 30%;
}

.all-cards {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 90%;
    gap: 1.2em;
    border-top: 1px solid rgb(231, 235, 235);
    overflow-x: hidden;
}

.card-container {
    width: 210px;
    height: 195px;
    overflow-y: hidden;
    
}

.card-container:hover {
    cursor: pointer;
    transition: 2s;
    scale: 1.1;

}

.house-name {
    text-align: center;
    font-family: quicksand;
    font-size: 16px;
}

.image {
    width: 100%;
    height: 87%;
}

img {
    width: 100%;
    height: 100%;
}
.footer{
    position: absolute;
    top: 105%;
    left: 40%;
    font-size: 16px;
    line-height: 50px;
}
</style>
