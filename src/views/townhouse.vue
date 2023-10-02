<script setup>
import data from '../houseData.json'
import { ref } from 'vue'
import { onMounted, watch } from 'vue';

const findmatch = ref("")
const userdata = ref(data)
const paragraph = ref()
const price = ref()
const nameHouse = ref()
const imageSrc = ref()  
const imgAlt = ref()
const allData = ref(userdata.value.townhouses)


watch(findmatch, () => {
if (findmatch.value == "") {
    userdata.value = allData.value
}
})
function searchHouse(){
    userdata.value = allData.value.filter(user => user.name.toLowerCase().includes(findmatch.value.toLowerCase()));
}
onMounted(() => {
    let userDefault = userdata.value.townhouses[0]
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
        <div class="search-div"><input type="text" placeholder="Search townhouse..." v-model.trim="findmatch"><div class="searchImg-div" @click="searchHouse()"><img
                src="@/assets/images/search.png"></div></div>
        <main class="all-cards">
            <div class="main-cards">
                <div v-for="user in userdata" :key="user.id">
                    <div class="card-container" :id="user.id" :style="{ backgroundColor: getRadoms() }"
                        @click="getDetails(user)">
                        <h2 class="house-no">{{ user.name }}</h2>
                        <div class="image">
                            <img :src="user.imageSrc">
                        </div>
                    </div>
                </div>
            </div>
            <div class="small-card">
                <ApartmentSingle :price-data="price" :name-data="nameHouse" :paragraph-data="paragraph"
                    :image-data="imageSrc" :imgAlt="imgAlt" />
            </div>
        </main>
    </div>
</template>
 
<style scoped>
.main-div{
    width: 55%;
}
.search-div {
    display: flex;
    border: 1px solid gray;
    width: 270px;
    height: 33px;
    background-color: rgb(250, 247, 246);
    border-radius: 5px;
    cursor: pointer;
    margin-left: 45%;
    margin-top: 3%;
}
.searchImg-div{
    width: 16%;
    border-radius: 0px 3px 3px 0px;
}

.search-div:hover {
    background-color: rgb(212, 203, 200);
}

.search-div img {
    width: 25px;
    height: 25px;
    margin-left: 10px;
    margin-top: 5px;
}

.search-div input {
    width: 225px;
    outline: none;
    border-radius: 3px 0px 0px 3px;
    border: 1px solid gray;
}

.main-cards {
    display: flex;
    flex-wrap: wrap;
    max-width: 800px;
    gap: 1em;
}


.all-cards {
    padding: 10px;
    display: flex;
    height: fit-content;
    margin-left: 1%;
    margin-top: 2%;
}

.card-container {
    border-radius: 10px;
    width: 200px;
    height: 200px;
    overflow-y: hidden;
    box-shadow: 4px 4px lightblue;
}

.card-container:hover {
    cursor: pointer;
    transition: 2s;
    scale: 1.05;

}

.house-no {
    text-align: center;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 16px;
    margin-top: 5px;
}

img {
    width: 100%;
    height: 100%;
}

.image {
    width: 100%;
    height: 80%;
}
</style>
