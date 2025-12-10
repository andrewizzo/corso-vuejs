<template>
  
  <ScoreBoard :player-count="this.score_player" :computer-count="this.score_computer"/>
  
  <div v-if="this.answers">
    <h1 v-html="this.question">
    </h1>

    <div v-for="(answer,index) in this.answers" :key="index">
      <input 
        :disabled="this.answer_submitted"
        type="radio" 
        name="options" 
        :value="answer"
        v-model="this.chosen_answer">
      <label v-html="answer"></label>
      <br>
    </div>
    <button 
      v-if="!this.answer_submitted"
      class="send" 
      type="button"
      @click="this.submit()">Send
    </button>
  </div>

  <section v-if="this.answer_submitted" class="result">
    <h4 v-if="this.chosen_answer == this.correctAnswer">
      &#9989; La risposta scelta è corretta!:{{ this.correctAnswer }}
    </h4>
    <h4 v-else>
      &#10060; Mi dispiace la risposta scelta è sbagliata. {{ this.correctAnswer }} è corretta!!!!
    </h4>
    <button 
      class="send" 
      type="button"
      @click="this.nextQuestion()"
      >
      Next question
    </button>
  </section>
    
</template>

<script>

import ScoreBoard from './components/ScoreBoard.vue';
var api = 'https://opentdb.com/api.php?amount=1';
export default {
  name: 'App',
  components:{
    ScoreBoard
  },
  data(){
    return{
      question: "",
      incorrectAnswers:[],
      correctAnswer:"",
      chosen_answer: null,
      answer_submitted: false,
      score_player:0,
      score_computer:0,
    }
  },
  computed:{
    answers(){
      var answers = [...this.incorrectAnswers]
      answers.splice(Math.round(Math.random() * answers.length),0,this.correctAnswer);
      return answers;
    }
  },
  methods:{
    submit(){
      if (!this.chosen_answer) {
        alert("Scegli una risposta!")
      } else {
        this.answer_submitted = true;
        if (this.chosen_answer == this.correctAnswer){
          this.score_player++;
          console.log("Risposta Corretta!!!");
          localStorage.setItem('scorePlayer',this.score_player)
        } else {
          this.score_computer++
          console.log("risposta sbagliata")
          localStorage.setItem('scoreComputer',this.score_computer)
        }
      } 
    },
    nextQuestion(){

      this.answer_submitted = false;
      this.chosen_answer = null;
      this.question = "";


      this.axios
      .get(api)
      .then((res) => {
        this.question = res.data.results[0].question;
        this.incorrectAnswers = res.data.results[0].incorrect_answers;
        this.correctAnswer = res.data.results[0].correct_answer
        console.log(res.data.results[0]);
      })
    }
  },
  created(){
    this.nextQuestion();

    this.score_player = Number(localStorage.getItem('scorePlayer')) || 0;
    this.score_computer = Number(localStorage.getItem('scoreComputer')) || 0;
  }
}

// https://opentdb.com/api.php?amount=1

</script>

<style>
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
