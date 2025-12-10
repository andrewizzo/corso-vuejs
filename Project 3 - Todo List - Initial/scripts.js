

const todoList = {

    data(){
        return{
            list: [],
            newTodoList: {
                done:false
            }
        }
    },
    methods:{
        addNewTodo:function(){
            
            if (this.newTodoList.testo) {
                this.list.push(this.newTodoList);
                this.newTodoList = {
                done:false
                }
                console.log('aggiunto item')
                localStorage.setItem('item',JSON.stringify(this.list))
            } else 
                alert('inserisci un todo')
        },
        removeItem:function(){
            console.log('elementi rimossi')
            this.list = [];
        },
        
    },
    // beforeCreate(){
    //     console.log('brefore create');
    // },
    created(){
        this.list = localStorage.getItem('item') ? JSON.parse(localStorage.getItem('item')) : this.list
        
    },
    updated(){
        localStorage.setItem('item',JSON.stringify(this.list))
    }
    // beforeUpdate(){
    //     console.log('before update');
    // }
}


Vue.createApp(todoList).mount('#app');