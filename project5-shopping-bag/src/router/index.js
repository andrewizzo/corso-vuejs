import Carrello from "@/views/Carrello.vue";
import Home from "@/views/Home.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path:'/',
        name:'Home',
        component: Home
    },
    {
        path:'/carrello',
        name:'Carrello',
        component: Carrello
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router