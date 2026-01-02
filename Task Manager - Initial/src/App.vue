<script setup>
import { ref } from 'vue';
import Task from './components/Task.vue';
import Filter from './components/Filter.vue';
import Modal from './components/Modal.vue';
import { useTaskStore } from './stores/taskStore';

//ref si usa solo per le primitive.(boolean, string, number)
const appName = ref('task manager')

const store = useTaskStore();

store.$subscribe((mutation, state) => {
  // persist the whole state to the local storage whenever it changes
  localStorage.setItem('tasks', JSON.stringify(state.tasks))
})

let newTask = ref({
  name:'',
  description:'',
  completed:false,
})

function openModal(){
  store.openModal()
  newTask.value = {
    name:'',
    description:'',
    completed:false
  }
}
</script>

<template>

  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>
          {{ appName }}
        </h1>
      </div>
      <div class="header-side">
        <button 
        @click="openModal"
        class="btn secondary">+aggiungi task</button>
      </div>
    </div>

    <Filter/>

    <div class="tasks">
      <Task @toggleCompleted="toggleCompleted" v-for="(task) in store.filteredTasks" :task="task" :key="task.id" />
    </div>

    <Modal v-if="store.modalIsActive">
      <div class="form">
        <h3>Add a new task</h3>
        <label for="title">Title*</label>
        <input type="text" name="title" placeholder="Enter a title..." v-model="newTask.name"><br />
        <label for="description">Description*</label>
        <textarea name="description" rows="4" placeholder="Enter a description..." v-model="newTask.description"/><br />
        <button class="btn gray" @click="store.addTask(newTask)">Add Task</button>
        
      </div>
    </Modal>
  </main>
</template>


<style lang="scss" scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-side {
    display: flex;
    align-items: center;

    h1 {
      text-transform: capitalize;
      font-size: 42px;
      font-weight: 700;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
    }

    .secondary {
      margin-left: 12px;
    }
  }

}

.tasks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.add-task {
  margin-top: 60px;

  input, textarea {
    width: 360px;
    max-width: 100%;
    margin-top: 12px;
    padding: 5px;
  }

  button {
    width: 360px;
    margin-top: 12px;
  }
}


</style>