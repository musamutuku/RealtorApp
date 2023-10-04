<script setup>
import { ref } from 'vue';
const text = ref("")
</script>

<template>
    <div class="contact-container">
        <div class="contact-div">
            <div class="close-div" @click="$emit('closeModal')"><img src="@/assets/images/close1.png"></div>
            <form action="#" class="contactForm">
                <input type="text" placeholder="Full name*" required>
                <input type="email" placeholder="Email address*" required>
                <input type="number" placeholder="Phone number*" required>
                <textarea name="" id="my-description" cols="" rows="" placeholder="How can admin help you?"
                    @focus="text = 'I am interested by this house'" required>{{ text }}</textarea>
                <input type="submit" value="SEND" id="sendBtn">
            </form>
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
    font-size: 22px;
}

.contactForm input::placeholder {
    font-size: 20px;
    margin-left: 10px;


}

#my-description {
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
    font-size: 24px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 3%;
    height: 12%;
}

#sendBtn:hover {
    background-color: darkgreen;
}

.close-div{
    width: 9%;
    height: 7%;
    background-color: rgb(248, 242, 242);
    position: absolute;
    left: 90%;
    top: 3%;
    border-radius: 5px;
}

.close-div img{
    width: 100%;
    height: 100%;
}

.close-div:hover{
    background-color: rgb(190, 169, 169);
    cursor: pointer;
}
</style>