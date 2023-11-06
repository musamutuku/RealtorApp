<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    houseID: Number
})


const showMsg = ref(false)
const message = ref("")
const username = ref("")
const email = ref("")
const phone = ref("")
const loadingMsg = ref(false)
const hideWaitMsg = ref("SEND")
const sendbackMsg1 = ref("")
const sendbackMsg2 = ref("")
const errorMsg = ref("")
const hideMsg = ref(false)
const sendbackImg = ref("")
const msgColor = ref({ color: '' })
const formStyles = ref({ opacity: 1, pointerEvents: '' })
const clickable = ref({pointerEvents: ''})
const emit = defineEmits(['closeModal'])

const changeCase = computed(() => email.value = email.value.toLowerCase())


function postData() {
    const userData = {
        id: props.houseID,
        userName: username.value,
        userEmail: email.value,
        userPhone: phone.value,
        userMessage: message.value
    }
    if (username.value != '' && email.value != '' && phone.value != '' && message.value != '') {
        if (email.value.includes('@')) {
            hideWaitMsg.value = "";
            loadingMsg.value = true;
            formStyles.value = {
                opacity: 0.98,
                pointerEvents: 'none'
            }

            fetch('http://127.0.0.1:3000/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Server Error');
                    }
                })
                .then(data => sendSuccess(data.loadingMsg, data.returnMsg1, data.returnImg, data.returnMsg2, data.returnColor))
                .catch(error => {
                    console.error('Error:', error);
                    setTimeout(() => {
                        loadingMsg.value = false;
                        hideWaitMsg.value = 'SEND'
                        username.value = '';
                        email.value = '';
                        phone.value = '';
                        message.value = '';
                        sendbackMsg1.value = 'Server error!';
                        sendbackMsg2.value = 'Checkout your connection or try again later';
                        sendbackImg.value = 'src/assets/images/error_img.png';
                        msgColor.value = { color: 'brown' }
                        hideMsg.value = true;
                        formStyles.value = {
                            opacity: 0.98,
                            pointerEvents: 'none'
                        }
                        clickable.value = {
                            pointerEvents: 'all'
                        }
                        setTimeout(() => {
                            hideMsg.value = false;
                            formStyles.value = {
                                opacity: 1,
                                pointerEvents: ''
                            }
                        }, 8000);
                    }, 10000);
                })
        }
        else {
            showMsg.value = true
            errorMsg.value = "Please enter a valid email!"
        }
    }
    else {
        showMsg.value = true
        errorMsg.value = "Please fill all the fields!"
        setTimeout(() => {
            showMsg.value = false
        }, 10000);
    }
}
function sendSuccess(loadMsg, feedbackMsg1, feedbackImg, feedbackMsg2, feebackColor) {
    loadingMsg.value = loadMsg;
    hideWaitMsg.value = 'SEND'
    username.value = '';
    email.value = '';
    phone.value = '';
    message.value = '';
    sendbackMsg1.value = feedbackMsg1;
    sendbackMsg2.value = feedbackMsg2;
    sendbackImg.value = feedbackImg;
    msgColor.value = { color: feebackColor }
    hideMsg.value = true;
    formStyles.value = {
        opacity: 0.98,
        pointerEvents: 'none'
    }
    clickable.value = {
        pointerEvents: 'all'
    }
    setTimeout(() => {
        emit('closeModal')
    }, 10000);
}

function showDefaultMsg() {
    showMsg.value = false;
    if (message.value == '') {
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
            <p class="error-msg" v-show="showMsg">{{ errorMsg }}</p>
            <div class="contactForm" :style="formStyles">
                <div class="close-div" @click="$emit('closeModal')" title="Close" :style="clickable"><img src="@/assets/images/close1.png"></div>
                <input type="text" placeholder="Full name*" v-model="username" @focus="showMsg = false" maxlength="50"
                    required>
                <input type="email" placeholder="Email address*" @blur="changeCase" v-model="email" @focus="showMsg = false"
                    maxlength="50" required>
                <input placeholder="Phone number*" @input="handleInput($event)" maxlength="12" v-model="phone"
                    @focus="showMsg = false" required>
                <textarea name="" id="my-description" cols="" rows="" placeholder="How can admin help you?"
                    @focus="showDefaultMsg()" v-model="message" maxlength="250" @keyup.enter="postData()"
                    required></textarea>
                <button @click="postData()" id="sendBtn" :style="btnBgColor">{{ hideWaitMsg }}<span v-show="loadingMsg"
                        class="loadingMsg"><img src="@/assets/images/waiting_img.png">Please wait...</span></button>
            </div>
            <div class="success-div" :style="msgColor" v-show="hideMsg">
                <p class="p1">{{ sendbackMsg1 }}</p><span class="success_img"><img :src="sendbackImg"></span>
                <p class="p2">{{ sendbackMsg2 }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>  
.contact-container {
    width: 100%;
    height: 110%;
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
    height: 71%;
    justify-content: center;
    align-items: center;
    position: relative;
}

.error-msg {
    background-color: rgba(255, 230, 230);
    color: #980200;
    position: absolute;
    width: 84%;
    min-width: 250px;
    height: 8%;
    top: -4%;
    border-radius: 5px;
    font-size: 17px;
    padding-top: 5px;
    padding-left: 6px;
}

.contactForm {
    align-items: center;
    width: 90%;
    min-width: 350px;
    height: 90%;
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding-top: 1%;
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
    color: white;
    font-family: quicksand;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 3%;
    width: 93%;
    background-color: #006400c0;
    height: 13%;
    border-radius: 5px;
}

#sendBtn:hover {
    background-color: darkgreen;
    cursor: pointer;
}

.close-div {
    /* width: 9%;
    min-width: 30px;
    height: 7%;
    position: absolute;
    right: 0%;
    margin-left: auto;
    top: 3%; */
    /* background-color: rgb(248, 242, 242); */
    margin-left: auto;
    /* margin-top: -24px; */
    margin-bottom: -15px;
    border-radius: 5px;
    /* padding-top: 2px; */
    z-index: 10;
    width: 7.5%;
    padding-right: 5px;
    height: 4.5%;
}

.close-div img {
    width: 100%;
    height: 100%;
}

.close-div:hover {
    background-color: rgb(190, 169, 169);
    cursor: pointer;
}

.success-div {
    position: absolute;
    display: flex;
    width: 80%;
    height: 21%;
    justify-content: center;
    padding-top: 5%;
    border-radius: 5px;
    z-index: 10;
    background-color: rgb(172, 238, 172);
}

.success-div .p1 {
    font-size: 20px;
}

.success-div .p2 {
    position: absolute;
    top: 46%;
    font-size: 17.5px;
    text-align: center;
}

.success_img {
    width: 6.6%;
    height: 26%;
    margin-left: 0.4%;
    margin-top: 1.3%;
}

.success_img img {
    width: 100%;
    height: 100%;
}

.loadingMsg {
    display: flex;
    align-items: center;
    gap: 0.4em;
    font-size: 22px;
    justify-content: center;
}

.loadingMsg img {
    width: 10%;
    height: 12%;
    animation: rotate 2s linear infinite;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>