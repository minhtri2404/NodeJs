<template>
    <div>
        <h1>Contact</h1>
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
import { mapGetters } from 'vuex'

export default {
    name: 'ComOuterwearList',
    components: {
        Product
    },

    computed: {
        ...mapGetters(['productsByCategory', 'paginatedProducts', 'totalPages']),
        // Lọc sản phẩm thuộc danh mục "outerwear"
        paginatedProducts() {
            const outerwear = this.productsByCategory('outerwear');  // Lấy sản phẩm thuộc "outerwear"
            const start = (this.$store.state.currentPage - 1) * this.$store.state.itemsPerPage;
            const end = start + this.$store.state.itemsPerPage;
            return outerwear.slice(start, end);  // Phân trang sản phẩm "outerwear"
        }
    },

    methods: {
        changePage(page) {
            this.$store.commit('setCurrentPage', page);
        }
    },

    mounted() {
        this.$store.dispatch('fetchProducts');
        this.$store.commit('setCurrentPage', 1);
    }
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