import { createRouter, createWebHistory } from "vue-router"
import apartmentView from '../views/apartment.vue'
import townhouseView from '../views/townhouse.vue'
import mobilehomeView from '../views/mobilehome.vue'
import farmhomeView from '../views/farmhome.vue'
import ranchhouseView from '../views/ranchhouse.vue'
import NotFound from '../views/notFound.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "apartment",
            component: apartmentView
        },
        {
            path: "/townhouse",
            name: "townhouse",
            component: townhouseView,  
        },
        {
            path: "/mobilehome",
            name: "mobilehome",
            component: mobilehomeView
        },
        {
            path: "/farmhome",
            name: "farmhome",
            component: farmhomeView
        },
        {
            path: "/ranchhouse",
            name: "ranchhouse",
            component: ranchhouseView
        },
        { 
            path: '/:pathMatch(.*)*', 
            name: 'NotFound', 
            component: NotFound 
        }
    ]
})
export default router