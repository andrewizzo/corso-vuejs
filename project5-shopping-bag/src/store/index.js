import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    prodotti:[],
    prodottiCarrello:[]
  },
  mutations: {
    caricaProdotti(state,prodotti){
        state.prodotti = prodotti;
    },

    caricaCarrello(state,prodotti){
        state.prodottiCarrello = prodotti;
        
    },

    aggiungiProdottoCarrello(state,prodotto){
      state.prodottiCarrello.push(prodotto)
      localStorage.setItem('prodottiCarrello',JSON.stringify(state.prodottiCarrello))
    },

    rimuoviProdottoCarrello(state,idProdotto){
      var carrelloAggiornato = state.prodottiCarrello.filter(item => idProdotto != item.id)
      state.prodottiCarrello = carrelloAggiornato;
      localStorage.setItem('prodottiCarrello',JSON.stringify(state.prodottiCarrello))
    }

  },
  actions: {
    caricaProdotti({commit}){
        axios
        .get('https://fakestoreapi.com/products')
        .then(res => {
            commit('caricaProdotti',res.data)
        })
    },

    caricaCarrello({commit}){
      if (localStorage.getItem('prodottiCarrello')) {
        commit('caricaCarrello',JSON.parse(localStorage.getItem('prodottiCarrello')))
      }
    },
    
    aggiungiProdottoCarrello({commit},prodotto){
      commit('aggiungiProdottoCarrello',prodotto)
    },

    rimuoviProdottoCarrello({commit},idProdotto){
      if (confirm('Vuoi eliminare prodotto dal carrello?')) {
        
        commit('rimuoviProdottoCarrello',idProdotto)
      }
    }
  },
  modules: {

  }
})
