<script setup>
import { ref, computed,onMounted } from 'vue';


const showMsg = ref(false)
const username = ref("")
const email = ref("")
const phone = ref("")
const message = ref("")
const sendbackMsg = ref("")
const errorMsg = ref("")
const hideMsg = ref(false)
const formStyles = ref({opacity: 1, pointerEvents: ''})
const emit = defineEmits(['closeModal'])

const changeCase = computed(() => email.value = email.value.toLowerCase())


function postData(){
    const userData = {
        userName: username.value,
        userEmail: email.value,
        userPhone: phone.value,
        userMessage: message.value
    }
    if (username.value!='' && email.value!='' && phone.value!='' && message.value!='') {
        if(email.value.includes('@')){
            fetch('http://127.0.0.1:3000/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            .then(response => response.json())
            .then(data => sendSuccess(data.returnMsg))
        }
        else{
            showMsg.value = true
            errorMsg.value = "Please enter a valid email!"
        }
    }
    else{
        showMsg.value = true
        errorMsg.value = "Please fill all the fields!"
        setTimeout(() => {
            showMsg.value = false
        }, 10000);
    }
}
function sendSuccess(feedbackMsg){
    username.value = '';
    email.value = '';
    phone.value = '';
    message.value = '';
    sendbackMsg.value = feedbackMsg;
    hideMsg.value = true;
    formStyles.value = {
        opacity: 0.98,
        pointerEvents: 'none'
    }
    setTimeout(() => {
        emit('closeModal')
    }, 10000);
}

function showDefaultMsg(){
    showMsg.value = false;
    if(message.value == ''){
        message.value = 'I am interested in buying this house';
    }   
}

function handleInput(event) {
      // Get the input value and remove any non-numeric characters
      let inputValue = event.target.value.replace(/\D/g, '');

      // If the input starts with '0', retain it
      if (inputValue.startsWith('0')) {
        phone.value = '0' + inputValue.slice(1);
      } else {
        phone.value = inputValue;
      }
    }

</script>

<template>
    <div class="contact-container">
        <div class="contact-div">
            <p class="error-msg" v-show="showMsg">{{errorMsg}}</p>
            <div class="close-div" @click="$emit('closeModal')" title="Close"><img src="@/assets/images/close1.png"></div>
            <div class="contactForm" :style="formStyles">
                <input type="text" placeholder="Full name*" v-model="username" @focus="showMsg=false" maxlength="50" required>
                <input type="email" placeholder="Email address*" @blur="changeCase" v-model="email" @focus="showMsg=false" maxlength="50" required>
                <input placeholder="Phone number*" @input="handleInput($event)" maxlength="12" v-model="phone" @focus="showMsg=false" required>
                <textarea name="" id="my-description" cols="" rows="" placeholder="How can admin help you?"
                    @focus="showDefaultMsg()" v-model="message" maxlength="250" @keyup.enter="postData()" required></textarea>
                <button @click="postData()" id="sendBtn">SEND</button>
            </div>
            <div class="success-div" v-show="hideMsg">
                <p class="p1">{{sendbackMsg}}</p><span class="success_img"><img src="@/assets/images/success_img.png"></span>
                <p class="p2">You will get a feedback after 24 hours</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.contact-container {
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    display: flex;
    background-color: rgba(0, 0, 0, 0.78);
    position: absolute;
    z-index: 10;
}

.contact-div {
    display: flex;
    width: 28%;
    height: 75%;
    justify-content: center;
    align-items: center;
    position: relative;
}
.error-msg{
    background-color: rgba(255, 230, 230);
    color: #980200;
    position: absolute;
    width: 83%;
    height: 8%;
    top: -4%;
    left: 5%;
    border-radius: 5px;
    font-size: 17px;
    padding-top: 5px;
    padding-left: 6px;
}
.contactForm {
    align-items: center;
    width: 90%;
    height: 86%;
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding-top: 4.8%;
    border-radius: 8px;
    background-color: white;
    border: 1px solid rgba(212, 208, 208, 0.9);

}

.contactForm input {
    width: 93%;
    height: 14%;
    border-radius: 8px;
    outline: none;
    border: 1px solid rgb(155, 62, 62);
    font-family: quicksand;
    font-size: 22px;
}

.contactForm input::placeholder {
    font-size: 20px;
    margin-left: 10px;


}

#my-description {
    font-family: quicksand;
    font-size: 20px;
    border-radius: 5px;
    border: 1px solid rgb(155, 62, 62);
    outline: none;
    height: 33%;
    width: 93%;
}

#sendBtn {
    border: 1px solid green;
    background-color: #006400c0;
    color: white;
    font-family: quicksand;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 3%;
    width: 93%;
    height: 12%;
    border-radius: 5px;
}

#sendBtn:hover {
    background-color: darkgreen;
    cursor: pointer;
}

.close-div {
    width: 9%;
    height: 7%;
    background-color: rgb(248, 242, 242);
    position: absolute;
    left: 90%;
    top: 3%;
    border-radius: 5px;
    z-index: 10;
}

.close-div img {
    width: 100%;
    height: 100%;
}

.close-div:hover {
    background-color: rgb(190, 169, 169);
    cursor: pointer;
}
.success-div{
    position: absolute;
    display: flex;
    background-color: white;
    width: 80%;
    height: 21%;
    color: dark gray;
    justify-content: center;
    padding-top: 5%;
    border-radius: 5px;
    z-index: 10;
    background-color: lightgreen;
}
.success-div .p1{
    font-size: 20px;
}
.success-div .p2{
    position: absolute;
    top: 46%;
    font-size: 17.5px;
}
.success_img{
    width: 6.6%;
    height: 26%;
    margin-left: 0.4%;
    margin-top: 1.3%;
}
.success_img img{
    width: 100%;
    height: 100%;
}
</style>