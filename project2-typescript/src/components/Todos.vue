<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import type { Todo } from '../types/Todo';

const list = ref<Todo[]>([])

const newTodo = reactive<Todo>({
    testo: "",
    done: false
})

function addNewTodo() {
    if (newTodo.testo.trim()) {
        list.value.push({ ...newTodo })
        newTodo.testo = ""
        newTodo.done = false
    } else {
        alert('Inserisci un todo')
    }
}

function removeTodos() {
    list.value = []
}

onMounted(() => {
    const saved = localStorage.getItem('Todos')
    if (saved) {
        list.value = JSON.parse(saved) as Todo[]
    }
})

watch(list, (newList) => {
    localStorage.setItem('Todos', JSON.stringify(newList))
}, { deep: true })

</script>

<template>
    <main id="app">
        <section class="todo-list">


            <h3>To-do List</h3>

            <div class="all-todos">
                <div v-for="item in list" class="single-todo" :class="{ done: item.done }"
                    @click="item.done = !item.done">
                    <p>{{ item.testo }}</p>
                </div>
            </div>

            <button class="clear" @click="removeTodos()" v-if="list.length">Clear All</button>

            <input type="text" placeholder="Add new to-do" v-model="newTodo.testo">
            <button class="add" @click="addNewTodo()">Add</button>

            <div class="instructions">
                Instructions:
                <ul>
                    <li>Click the to-do text to toggle between done / undone</li>
                    <li>Use clear all button to remove all items</li>
                    <li>Use the input field to add new to-dos</li>
                </ul>
            </div>
        </section>
    </main>
</template>

<style scoped>
main {
    display: flex;
    justify-content: center;
    align-items:flex-start;
    flex-wrap: wrap;
    padding-top: 60px;
}

.all-todos{
    color: black;
}

main section h3{
    color: black;
}

main .todo-list input {
    box-sizing: border-box;
    color: black;
    background-color: white;
    height: 28px;
    border-radius: .25rem;
    width: 80%;
    border: 1px solid lightgrey;
    margin-top: 32px;
}

main button {
    background-color: transparent;
    cursor: pointer;
    box-sizing: border-box;
    height: 28px;
    border-radius: .25rem;
    color: #fff;
}

main button:hover {
    opacity: 0.8;
}

main button.add {
    background-color: #007bff;
    border: 1px solid  #007bff;
    margin-left: 2px;
}

main button.clear {
    background-color: #dc3545;
    border: 1px solid #dc3545;
    display: block;
    margin: auto;
}

main button:focus {
    outline:0;
}

main > section.todo-list h3 {
    text-align: center;
    margin-top: 24px;
    width: 100%;
}


main > section.todo-list {

    flex-wrap: wrap;
    border: 1px solid lightgrey;
    background-color: rgb(248, 248, 248);
    padding: 20px;
    max-width: 500px;
    min-width: 300px;
    text-align: center;
    border-radius: .25rem;
}

main .all-todos .single-todo {
    display: flex;
    align-items: center;
    justify-content: center;
    
}

main .all-todos .single-todo p {
    margin: 12px 0;
    cursor: pointer;
}

main .all-todos .single-todo.done p {
    text-decoration: line-through;
}

main .all-todos .single-todo button.remove {
    width: 12px;
    height: 12px;
    border: none;
    background: transparent url('img/remove.png') no-repeat center;
    background-size: contain;
    cursor: pointer;
    margin-left: 8px;
}

main > section.todo-list button.clear {

    margin-top: 24px;
}

div.instructions {
    font-size: 11px;
    margin-top: 40px;
    color: grey;
}

div.instructions ul {
    list-style: inside;
    text-align: center;
    padding: 0;
}

div.instructions ul li {
    margin: 4px auto;
}
</style>