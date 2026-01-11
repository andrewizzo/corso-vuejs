<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Product } from '../types/Product';

const products = ref<Product[]>([
    {
        photo: "/images/big-mac.png",
        name: "Big Mac",
        price: 5.99,
        active: false,
        quantity: 1
    },
    {
        photo: "/images/lipton.png",
        name: "Ice Tea",
        price: 1.99,
        active: false,
        quantity: 1
    },
    {
        photo: "/images/water.png",
        name: "Water",
        price: 1.49,
        active: false,
        quantity: 1
    },
    {
        photo: "/images/cola.png",
        name: "Coke",
        price: 1.99,
        active: false,
        quantity: 1
    },
    {
        photo: "/images/salad.png",
        name: "Salad",
        price: 2.79,
        active: false,
        quantity: 1
    },
    {
        photo: "/images/nuggets.png",
        name: "Mc Nuggets",
        price: 3.49,
        active: false,
        quantity: 1
    },
    {
        photo: "/images/fries.png",
        name: "Fries",
        price: 2.99,
        active: false,
        quantity: 1
    },
    {
        photo: "/images/double-cb.png",
        name: "Double Cheese Burger",
        price: 2.99,
        active: false,
        quantity: 1
    },
    {
        photo: "/images/mc-chicken.png",
        name: "Mc Chicken",
        price: 4.99,
        active: false,
        quantity: 1
    }
])

const total = computed(() => {
    return products.value
        .filter(product => product.active)
        .reduce(
            (sum, product) => sum + product.price * product.quantity,
            0
        )
        .toFixed(2)
})
</script>

<template>

    <section id="app">
        <section class="items">
            <h4>Pick your items</h4>

            <!-- :class="product.active ? 'selected' : ''" -->
            <div v-for="product in products" class="product" v-on:click="product.active = !product.active"
                :class="{ selected: product.active }">
                <div class="photo">
                    <img :src="product.photo">
                </div>
                <div class="description">
                    <span class="name">{{ product.name }}</span>
                    <span class="price">{{ product.price }}</span>
                    <!-- <span class="price">price</span> -->
                    <div class="quantity-area" v-if="product.active">
                        <button @click.stop="product.quantity--" :disabled="product.quantity <= 1">-</button>
                        <span class="quantity">{{ product.quantity }}</span>
                        <button @click.stop="product.quantity++">+</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="summary" v-if="Number(total) > 0">
            <strong>Order Details</strong>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products">
                        <template v-if="product.active">
                            <td>{{ product.quantity + 'x ' + product.name }}</td>
                            <td>{{ (product.quantity * product.price).toFixed(2) }}</td>
                        </template>
                    </tr>

                    <tr>
                        <th>Total</th>
                        <th>{{ total }}</th>
                    </tr>
                </tbody>
            </table>
        </section>
    </section>
</template>

<style scoped>
section>section.items h4 {
    text-align: center;
    margin-top: 0;
    width: 100%;
}

section {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    padding-top: 20px;
}

section>section.items {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid lightgrey;
    padding: 20px;
    max-width: 500px;
    min-width: 300px;
    justify-content: center;

}

section.items .product {
    border: 1px solid lightgrey;
    margin: 6px;
    flex: 0 0 calc(33.333% - 24px);
    cursor: pointer;
    text-align: center;
}

section.items .product.selected {
    border: 2px solid rgb(29, 134, 233);

}

section.items .photo img {
    max-width: 90px;
}

section.items .description {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 11px;
    line-height: 15px;
}

section.items .description .price {
    font-weight: bold;
    margin: 4px auto;
}

section.items .description .quantity-area {
    margin: 8px auto;
    height: 14px;
}

section.items .description .quantity-area button {
    width: 16px;
    height: 16px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

section.items .description .quantity-area .quantity {
    font-weight: bold;
    margin: 0 4px;
}


section.summary {
    background-color: rgb(245, 245, 245);
    color: black;
    padding: 20px;
    min-height: 200px;
    min-width: 200px;
    text-align: center;
}

section.summary table {
    width: 100%;
    padding-top: 12px;
    font-size: 11px;
    margin: auto;
}

section.summary table tbody tr:last-of-type th {
    border-top: 1px solid black;
    padding-top: 4px;
}
</style>