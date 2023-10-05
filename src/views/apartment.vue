<script setup>
import data from '../houseData.json'
import { ref } from 'vue'
import { onMounted, watch } from 'vue';
import apartmentSingle from '@/components/ApartmentSingle.vue';

const findmatch = ref("")
const userdata = ref(data)
const paragraph = ref()
const price = ref()
const nameHouse = ref()
const imageSrc = ref()
const imgAlt = ref()
const allData = ref(userdata.value.apartments)


watch(findmatch, () => {    
    if (findmatch.value == "") {
        userdata.value = allData.value
    }
})
function searchHouse() {
    userdata.value = allData.value.filter(user => user.name.toLowerCase().includes(findmatch.value.toLowerCase()));
}
onMounted(() => {
    let userDefault = userdata.value.apartments[0]
    getDetails(userDefault);
    userdata.value = allData.value
});
function getDetails(house) {
    paragraph.value = house.paragraph
    price.value = house.price
    nameHouse.value = house.name
    imageSrc.value = house.imageSrc
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
                <input type="text" placeholder="Search apartment..." v-model.trim="findmatch">
                <div class="searchImg-div" @click="searchHouse()"><img src="@/assets/images/search.png"></div>
            </div>
                <div class="all-cards">
                    <div v-for="user in userdata" :key="user.id">
                        <div class="card-container" :id="user.id" :style="{ backgroundColor: getRadoms() }"
                            @click="getDetails(user)">
                            <div class="image">
                                <img :src="user.imageSrc">
                            </div>
                            <h2 class="house-name">{{ user.name }}</h2>
                        </div>
                    </div>
                </div>
        </div>
        <div class="small-card">
            <apartmentSingle :price-data="price" :name-data="nameHouse" :paragraph-data="paragraph"
                :image-data="imageSrc" @showModal=""/>
        </div>
    </div>
</template>
 
<style scoped>
.main-div{
    display: flex;
    width: 88vw;
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
    height: 4.9%;
    background-color: rgb(250, 247, 246);
    border-radius: 20px;
    margin: auto;
    margin-top: 3%;
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

.all-cards {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 1.5em;
    align-items: center;
    padding-top: 4%;
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
</style>
