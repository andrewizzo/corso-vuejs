<script setup lang="ts">
  import { ref,computed,onMounted } from 'vue';
  import axios from 'axios';
  import ScoreBoard from './components/ScoreBoard.vue';
  import type { Quiz } from './types/Quiz';

  const api = 'https://opentdb.com/api.php?amount=1';

  const question = ref<string>('')
  const incorrectAnswers = ref<string[]>([])
  const correctAnswer = ref<string>('')
  const chosen_answer = ref<string | null>(null);
  const answer_submitted = ref<boolean>(false);
  const score_player = ref<number>(Number(localStorage.getItem('scorePlayer')) || 0);
  const score_computer = ref<number>(Number(localStorage.getItem('scoreComputer')) || 0)


  const answer = computed<string[]>(() => {
    const res = [...incorrectAnswers.value];
    res.splice(Math.round(Math.random() * res.length),0,correctAnswer.value);
    return res;
  })

  function submit(){
    if (!chosen_answer.value) {
      alert('Scegli una risposta!!!')
      return
    }else{
      answer_submitted.value = true;
      if(chosen_answer.value === correctAnswer.value){
        score_player.value++
        localStorage.setItem('scorePlayer',score_player.value.toString())
      }else{
        score_computer.value++
        localStorage.setItem('scoreComputer',score_computer.value.toString())
      }
    }
  }

  async function nextQuestion(){
    question.value = '';
    answer_submitted.value = false;
    chosen_answer.value = null

    try{
      const res = await axios.get<{ results: Quiz[] }>(api);
      const data = res.data.results[0];
      question.value = data?.question || '';
      incorrectAnswers.value = data?.incorrect_answers || [];
      correctAnswer.value = data?.correct_answer || '';
      console.log(data);
      
    }catch(error){
      console.log('Error',error);
    }
  }

  onMounted(() => {
    nextQuestion()
  })
</script>

<template>
  <ScoreBoard :player-count="score_player" :computer-count="score_computer"/>
  
  <div v-if="answer.length">
    <h1 v-html="question">
    </h1>

    <div v-for="(res,index) in answer" :key="index">
      <input 
        :disabled="answer_submitted"
        type="radio" 
        name="options" 
        :value="res"
        v-model="chosen_answer">
      <label v-html="res"></label>
      <br>
    </div>
    <button 
      v-if="!answer_submitted"
      class="send" 
      type="button"
      @click="submit()">Send
    </button>
  </div>

  <section v-if="answer_submitted" class="result">
    <h4 v-if="chosen_answer == correctAnswer">
      &#9989; La risposta scelta è corretta!:{{ correctAnswer }}
    </h4>
    <h4 v-else>
      &#10060; Mi dispiace la risposta scelta è sbagliata. {{ correctAnswer }} è corretta!!!!
    </h4>
    <button 
      class="send" 
      type="button"
      @click="nextQuestion()"
      >
      Next question
    </button>
  </section>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;
}

input[type=radio]{
  margin:12px 4px;
}

button.send{
  margin-top: 12px;
  height: 40px;
  min-width: 120px;
  padding: 0 16px;
  color: #fff;
  background-color: #1867c0;
  border: 1px solid #1867c0;
  cursor: pointer;
}
</style>
