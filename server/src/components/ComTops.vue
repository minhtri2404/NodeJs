<template>
    <div>
        <h1>TOPS</h1>
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
    name: 'ComTopsList',
    components: {
        Product
    },

    computed: {
        ...mapGetters(['productsByCategory', 'productsByPrice', 'sortedProducts', 'paginatedProducts', 'totalPages']),
        // Lọc sản phẩm thuộc danh mục "tops"
        paginatedProducts() {
            const tops = this.productsByCategory('tops');  // Lấy sản phẩm thuộc "tops"
            const start = (this.$store.state.currentPage - 1) * this.$store.state.itemsPerPage;
            const end = start + this.$store.state.itemsPerPage;
            return tops.slice(start, end);  // Phân trang sản phẩm "tops"
        },

        filteredProducts() {
            let filtered = this.productsByCategory(this.selectedCategory);  // Lọc theo danh mục
            filtered = this.productsByPrice(this.selectedPriceFilter);       // Lọc theo giá
            return filtered;  // Trả về sản phẩm đã lọc
        },

        sortedFilteredProducts() {
            let filtered = this.filteredProducts; // Lấy các sản phẩm đã lọc
            return this.sortedProducts(filtered); // Sắp xếp sản phẩm theo lựa chọn
        },

        productsToDisplay() {
            let sortedFiltered = this.sortedFilteredProducts; // Lấy các sản phẩm đã sắp xếp và lọc
            return this.paginatedProducts(sortedFiltered);  // Phân trang sản phẩm
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