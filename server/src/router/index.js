import { createWebHistory,createRouter } from "vue-router";
import Home from '@/components/ComHome.vue'                     // trang chủ
import NewArrivals from '@/components/ComNewArrivals'           // trang sản phẩm mới
import Tops from '@/components/ComTops'           // trang sản phẩm thuộc loại Tops
import Bottoms from '@/components/ComBottoms'    // trang sản phẩm thuộc loại bottoms
import Outerwear from '@/components/ComOuterwear'    // trang sản phẩm thuộc loại outerwear
import Saleoff from '@/components/ComSaleoff'    // trang sản phẩm thuộc loại sale off
import ProductDetail from '@/components/ComProductDetail'
import Cart from '@/components/ComCart'
import Order from '@/components/ComOrder'
import Register from '@/components/ComRegister'
import Login from '@/components/ComLogin'


// tạo mảng chứa những đường link
const routes=[
    // đối tượng trang chủ

    {
        path:"/register",
        name:"Register",
        component:Register
    },

    {
        path:"/menu",
        name:"NewArrivals",
        component:NewArrivals
    },

    {
        path:"/tops",
        name:"ComTopsList",
        component:Tops
    },

    {
        path:"/about",
        name:"ComBottomsList",
        component:Bottoms
    },

    {
        path:"/contact",
        name:"ComOuterwearList",
        component:Outerwear
    },

    {
        path:"/saleoff",
        name:"ComSaleoffList",
        component:Saleoff
    },


    {
        path:"/login",
        name:"Login",
        component:Login
    },

    {
        path:"/",
        name:"Home",
        component:Home
    },
    // đường link ko phải là trang chủ path:"/ten"
    
    {
        path:"/products/:id",
        name:"ProductDetail",
        component:ProductDetail
    },
    {
        path:"/cart",
        name:"Cart",
        component:Cart
    },
    {
        path:"/order",
        name:"ComOrder",
        component:Order
    }

]
// tạo đối tượng router
const router=createRouter({
    history:createWebHistory(),
    routes
})
export default router