<template>
    <div class="carrello">
        <div class="items">

          <template v-if="prodottiCarrello.length">
            <div
              v-for="(prodotto,index) in prodottiCarrello" 
              :key="index"
              class="item">
                <div class="remove" @click="this.$store.dispatch('rimuoviProdottoCarrello',prodotto.id)">Remove item</div>
                <div class="photo"><img :src="prodotto.image"
                        alt=""></div>
                <div class="description">{{ prodotto.title }}</div>
                <div class="price">
                    <span class="quantity-area">
                        <button :disabled="prodotto.quantity <= 1" @click="prodotto.quantity--">-</button>
                        <span class="quantity">{{ prodotto.quantity }}</span>
                        <button @click="prodotto.quantity++">+</button>
                    </span>
                    <span class="amount">US$ {{ (prodotto.price * prodotto.quantity).toFixed(2) }}</span>
                </div>
            </div>
            <div class="grand-total"> Grand Total: US$ {{ totale() }}</div>
          </template>
          <template v-else>
            Non ci sono oggetti nel carrello
          </template>

        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
export default {
    name: 'CarrelloView',

    methods: {
      totale(){
        var totale = 0;
        this.prodottiCarrello.forEach((item) => {
          totale += item.price * item.quantity
        })
        return totale.toFixed(2);
      }
    },
    computed: mapState([
        'prodottiCarrello'
    ]),
}
</script>

<style>

.carrello {
  padding: 60px 0;
}

.carrello .items {
  max-width: 800px;
  margin: auto;
}

.carrello .items .item {
  display: flex;
  justify-content: space-between;
  padding: 40px 0;
  border-bottom: 1px solid lightgrey;
  position: relative;
}

.carrello .items .item .remove {
  position: absolute;
  top: 8px;
  right: 0;
  font-size: 11px;
  text-decoration: underline;
  cursor: pointer;
}

.carrello .items .item .quantity-area {
  margin: 8px auto;
  height: 14px;
}

.carrello .items .item .quantity-area button {
  width: 16px;
  height: 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.carrello .items .item .quantity-area .quantity {
  margin: 0 4px;
}

.carrello .items .item .photo img {
  max-width: 80px;
}

.carrello .items .item .description {
  padding-left: 30px;
  box-sizing: border-box;
  max-width: 50%;
}

.carrello .items .item .price .amount {
  font-size: 16px;
  margin-left: 8px;
  vertical-align: middle;
}

.carrello .items .grand-total {
  font-size: 24px;
  font-weight: bold;
  text-align: right;
  margin-top: 8px;
}

</style>