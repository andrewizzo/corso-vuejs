members = [
    {
        fname: 'John',
        lname: 'Lennon',
        instrument: 'Acoustic Guitar'
    },
    {
        fname: 'George',
        lname: 'Harrison',
        instrument: 'Electric Guitar'
    }
]

const handlingForms = {

    data() {
        return {
            members: window.members,
            newMember:{}
        }
    },
    methods:{
        addMember: function(){
            if (this.newMember.fname && this.newMember.lname && this.newMember.instrument) {
                this.members.push(this.newMember);
                this.newMember = {};    
            }else{
                alert('I campi devono essere valorizzati!!!')
            }
        }
    }

};

Vue.createApp(handlingForms).mount('#app');
