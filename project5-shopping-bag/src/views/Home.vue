<template>
    <div class="home">
        <div class="products">

            <div 
                v-for="(prodotto,index) in this.prodotti" :key="index"
                class="product"
                :class="{inBag : isInCarrello(prodotto)}">
                <div class="product-image"
                    :style="{backgroundImage:'url('+ prodotto.image +')'}">
                    </div>
                <h4>{{ prodotto.title }}</h4>
                <p class="price">US$ {{ prodotto.price.toFixed(2) }}</p>
                <button
                    v-if="!isInCarrello(prodotto)"
                    @click="aggiungiProdottoCarrello(prodotto)">Add to bag</button>
                <button
                    v-else
                    @click="this.$store.dispatch('rimuoviProdottoCarrello',prodotto.id)"
                    class="remove">Remove</button>
                    
            </div>
            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'HomePage',
    data() {
        return {

        }
    },
    computed: mapState([
        'prodotti',
        'prodottiCarrello'

        
        // prodotti(){
        //     return this.$store.state.prodotti
        // },
        // prodottiCarrello(){
        //     return this.$store.state.prodottiCarrello
        // }
    ]),
    methods: {
        aggiungiProdottoCarrello(prodotto){
            prodotto.quantity = 1;
            this.$store.dispatch('aggiungiProdottoCarrello',prodotto)
        },
        isInCarrello(prodotto){
            return this.prodottiCarrello.find(item => item.id == prodotto.id)
        }
    }
}
</script>

<style lang="css">
.home .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.home .products .product {
    flex: 0 0 30%;
    box-sizing: border-box;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 16px;
    margin: 8px;
    height: 360px;
}

@media only screen and (max-width: 769px) {
    .home .products .product {
        flex: 0 0 40%;
    }
}

@media only screen and (max-width: 640px) {
    .home .products .product {
        flex: 0 0 90%;
    }
}

.home .products .product.inBag {
    border: 1px solid #007bff;
}

.home .products .product .product-image {
    margin: 20px auto;
    width: 160px;
    height: 140px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.home .products .product h4 {
    margin: 22px auto;
    font-size: 12px;
    max-width: 60%;
    font-weight: normal;
}

.home .products .product p.price {
    font-size: 20px;
    font-weight: bold;
}

.home .products .product button {
    color: #fff;
    background-color: #007bff;
    border: 1px solid #007bff;
    border-radius: 100px;
    font-weight: 400;
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
}

.home .products .product button:hover {
    opacity: 0.8;
}

.home .products .product button.remove {
    background-color: transparent;
    border: none;
    color: black;
    text-decoration: underline;
}
</style>