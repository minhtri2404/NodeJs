<template>
    <div>
        <h1>Menu</h1>
        <div class="product-grid">
            <Product v-for="item in paginatedProducts" :key="item.id" :product="item" />
        </div>

        <!-- Nút phân trang -->
        <div class="pagination">
          <button v-for="page in totalPages" :key="page" @click="changePage(page)">
          {{ page }}
          </button>
      </div>
    </div>
</template>

<script>
import Product from './ComProduct.vue'
import { mapGetters } from 'vuex'             // import mapGetters
//import items from '../data/items'
export default {
    name:'ComHome',
    components:{
      Product
    },

    computed:{
      ...mapGetters(['paginatedProducts','totalPages']),         // sử dụng getter của vuex
    },

    methods:{
      changePage(page){
        this.$store.commit('setCurrentPage', page);
      }
    },

    mounted() {
      this.$store.dispatch('fetchProducts');
    }
    /*data(){
      return{
        products:items
      }
    }*/
    
}
</script>

<style scoped>
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 10px;
    padding: 20px;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}
</style>