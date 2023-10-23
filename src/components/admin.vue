<script setup>
import { ref } from 'vue';

const users = ref([])

fetch('http://127.0.0.1:3000/api/users').then(response => response.json())
.then(data => users.value = data);

</script>

<template>
    <div class="allUsers">
        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Username</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>Message</td>
                    <td>HouseID</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in users" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.username }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.message }}</td>
                    <td>{{ item.houseid }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.allUsers{
    position: absolute;
    width: 900px;
    height: 400px;
    background-color: rgb(213, 213, 226);
}
table, td{
    border: 1px solid black;
    border-collapse: collapse;

}
</style>