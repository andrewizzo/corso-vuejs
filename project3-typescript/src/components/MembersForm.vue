<script setup lang="ts">
import { ref } from 'vue';
import type { Member } from '../types/Member';

const members = ref < Member[] > ([
    {
        fname: 'Jhon',
        lname: 'Lennon',
        instrument: 'Acoustic Guitar'
    },
    {
        fname: 'George',
        lname: 'Harrison',
        instrument: 'Eletric Guitar'
    }
]);

const newMember = ref < Partial < Member >> ({})

function addMember() {
    if (newMember.value.fname && newMember.value.lname && newMember.value.instrument) {
        members.value.push(newMember.value as Member)
        newMember.value = {}
    } else {
        alert('I campi devono essere valorizzati!!!');
    }
}
</script>

<template>
    <section id="app">



        <h1>
            Band Members
        </h1>

        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Instrument</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="member in members">
                    <td>{{ member.fname }}</td>
                    <td>{{ member.lname }}</td>
                    <td>{{ member.instrument }}</td>
                </tr>
            </tbody>
        </table>

        <section class="add-more">
            <p>Add more band members</p>
            <form>

                <label for="fname">First name:</label><br>
                <input type="text" id="fname" name="fname" v-model="newMember.fname"><br>

                <label for="lname">Last name:</label><br>
                <input type="text" id="lname" name="lname" v-model="newMember.lname"><br>

                <label for="instrument">Instrument:</label><br>
                <select name="instrument" id="instrument" v-model="newMember.instrument">
                    <option value="Bass">Bass</option>
                    <option value="Electric Guitar">Electric Guitar</option>
                    <option value="Acoustic Guitar">Acoustic Guitar</option>
                    <option value="Drums">Drums</option>
                </select>
                <br><br>
                <input type="button" value="Add" @click="addMember()">
            </form>
        </section>

    </section>
</template>

<style>
    section {
    text-align: center;
    padding: 45px;
    }

    section table {
    margin: auto;
    font-size: 14px;
    }

    section td, section th {
    padding: 8px;
    border-collapse: collapse;
    }

    section th {
        border-bottom: 1px solid lightgrey;
    }

    section p {
        margin-top: 0px;
    }

    section form input,
    section form select {
        height: 24px;
        width: 240px;
        box-sizing: border-box;
    }

    section form label {
        font-size: 12px;
    }

    section.add-more {
    background-color: rgb(67, 147, 176);
    padding: 40px;
    margin-top: 40px;
    }
</style>